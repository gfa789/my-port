const functions = require("firebase-functions/v1");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const {createHmac} = require("node:crypto");
const {createContactHandler} = require("./contact-handler");
admin.initializeApp();

exports.contactMessage = functions
    .runWith({secrets: ["RECAPTCHA_SECRET_KEY"]})
    .https.onRequest(
        createContactHandler({
          configured: () => Boolean(process.env.RECAPTCHA_SECRET_KEY),
          verifyToken: async (token) => {
            const response = await fetch(
                "https://www.google.com/recaptcha/api/siteverify",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                  body: new URLSearchParams({
                    secret: process.env.RECAPTCHA_SECRET_KEY,
                    response: token,
                  }),
                  signal: AbortSignal.timeout(10000),
                },
            );
            if (!response.ok) {
              throw new Error("verification-service-unavailable");
            }
            const result = await response.json();
            const hosts = (
              process.env.CONTACT_HOSTNAMES ||
          "atki-portfolio.web.app,atki-portfolio.firebaseapp.com"
            )
                .split(",")
                .map((host) => host.trim());
            return result.success === true && hosts.includes(result.hostname);
          },
          saveMessage: async (message, ip) => {
            const db = admin.firestore();
            const key = createHmac("sha256", process.env.RECAPTCHA_SECRET_KEY)
                .update(ip)
                .digest("hex");
            const limit = db.collection("contactRateLimits").doc(key);
            const receipt = db.collection("messages").doc();
            await db.runTransaction(async (transaction) => {
              const snapshot = await transaction.get(limit);
              const now = Date.now();
              const previous = snapshot.data();
              const active = previous && now - previous.windowStart < 3600000;
              const count = active ? previous.count : 0;
              if (count >= 5) {
                const error = new Error("rate-limit");
                error.code = "rate-limit";
                throw error;
              }
              transaction.set(limit, {
                windowStart: active ? previous.windowStart : now,
                count: count + 1,
                expiresAt: admin.firestore.Timestamp.fromMillis(now + 86400000),
              });
              transaction.set(receipt, {
                ...message,
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
              });
            });
          },
        }),
    );

exports.sendEmailNotification = functions
    .runWith({
      secrets: ["GMAIL_EMAIL", "GMAIL_APP_PASSWORD"],
      failurePolicy: true,
    })
    .firestore.document("messages/{messageId}")
    .onCreate(async (snapshot) => {
      const message = snapshot.data();
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_EMAIL,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });
      await transporter.sendMail({
        from: process.env.GMAIL_EMAIL,
        to: process.env.GMAIL_EMAIL,
        replyTo: message.email,
        subject: "Portfolio enquiry",
        text: `From: ${message.email}\n\n${message.message}`,
      });
    });
