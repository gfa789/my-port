const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});


exports.sendEmailNotification = functions.firestore
    .document("messages/{messageId}")
    .onCreate(async (snap, context) => {
      const newMessage = snap.data();

      const mailOptions = {
        from: `Your App <${gmailEmail}>`,
        to: "georgeatki1@gmail.com",
        subject: "New Contact Form Submission",
        text: `
                New message from: ${newMessage.email}
                
                Message:
                ${newMessage.message}
                
                Timestamp: ${newMessage.timestamp.toDate()}
            `,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log("Email notification sent successfully");
        return null;
      } catch (error) {
        console.error("There was an error while sending the email:", error);
        return null;
      }
    });

exports.testEmail = functions.https.onRequest(async (req, res) => {
  const mailOptions = {
    from: `Test App <${gmailEmail}>`,
    to: "georgeatki1@gmail.com",
    subject: "Test Email from Firebase Function",
    text: "This is a test email sent from a Firebase Cloud Function.",
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Test email sent successfully");
    res.status(200).send("Test email sent successfully");
  } catch (error) {
    console.error("There was an error while sending the test email:", error);
    res.status(500).send("Error sending test email");
  }
});
