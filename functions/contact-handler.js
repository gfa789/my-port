const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/**
 * Build a contact endpoint with injectable external services for offline tests.
 * @param {object} services CAPTCHA verification, storage and readiness checks.
 * @return {Function} Express-compatible request handler.
 */
function createContactHandler({verifyToken, saveMessage, configured}) {
  return async (req, res) => {
    res.set("Cache-Control", "no-store");
    if (req.method !== "POST") {
      res.set("Allow", "POST");
      return res.status(405).json({error: "method-not-allowed"});
    }
    if (!configured()) {
      return res.status(503).json({error: "service-unavailable"});
    }
    if (!req.is("application/json")) {
      return res.status(415).json({error: "json-required"});
    }
    const {email, message, token} = req.body || {};
    if (
      typeof email !== "string" ||
      email.length > 254 ||
      !emailPattern.test(email.trim()) ||
      typeof message !== "string" ||
      message.trim().length < 10 ||
      message.length > 5000 ||
      typeof token !== "string" ||
      !token ||
      token.length > 4096
    ) {
      return res.status(400).json({error: "invalid-input"});
    }
    try {
      if (!(await verifyToken(token))) {
        return res.status(403).json({error: "verification-failed"});
      }
      await saveMessage(
          {email: email.trim(), message: message.trim()},
          req.ip || "unknown",
      );
      return res.status(202).json({received: true});
    } catch (error) {
      if (error.code === "rate-limit") {
        return res.status(429).json({error: "rate-limit"});
      }
      console.error("Contact service failed:", error.code || error.name);
      return res.status(503).json({error: "service-unavailable"});
    }
  };
}
module.exports = {createContactHandler};
