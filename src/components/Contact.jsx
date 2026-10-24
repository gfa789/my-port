import { lazy, Suspense, useRef, useState } from "react";
const ReCAPTCHA = lazy(() => import("react-google-recaptcha"));
const siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;
const contactEnabled =
  process.env.REACT_APP_CONTACT_ENABLED === "true" && Boolean(siteKey);
const errors = {
  429: "You have sent several messages. Please try again later or connect on LinkedIn.",
  403: "Verification did not complete. Please try again or connect on LinkedIn.",
  503: "The message service is unavailable. Please connect on LinkedIn instead.",
};
export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState(null);
  const [verificationReady, setVerificationReady] = useState(false);
  const [verificationError, setVerificationError] = useState(false);
  const captcha = useRef(null);
  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setStatus(null);
    try {
      const token = await captcha.current?.executeAsync();
      if (!token) throw new Error(errors[403]);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message, token }),
        signal: AbortSignal.timeout(20000),
      });
      if (!response.ok)
        throw new Error(
          errors[response.status] ||
            "Your message could not be received. Please try again or connect on LinkedIn.",
        );
      setEmail("");
      setMessage("");
      setStatus({
        success: true,
        text: "Your message has been received. Thank you for getting in touch.",
      });
    } catch (error) {
      setStatus({
        success: false,
        text:
          error.name === "TimeoutError"
            ? "The request timed out. Please try again or connect on LinkedIn."
            : error.message,
      });
    } finally {
      captcha.current?.reset();
      setBusy(false);
    }
  }
  return (
    <section
      id="contact"
      className="contact-section section"
      aria-labelledby="contact-title"
    >
      <div className="shell contact-layout">
        <div>
          <p className="eyebrow">03 / Get in touch</p>
          <h2 id="contact-title">
            Good things start
            <br />
            with a conversation<span>.</span>
          </h2>
          <p>
            Have a project in mind, a question about my work, or just want to
            say hello?
          </p>
          <a
            className="button button-primary"
            href="https://linkedin.com/in/georgeatki"
          >
            Connect on LinkedIn <span aria-hidden="true">↗</span>
          </a>
        </div>
        {contactEnabled ? (
          <form
            className="contact-form"
            onSubmit={submit}
            aria-label="Send a message"
            aria-busy={busy}
          >
            <label htmlFor="email">Your email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={busy}
            />
            <label htmlFor="message">Your message</label>
            <textarea
              id="message"
              name="message"
              required
              minLength={10}
              maxLength={5000}
              rows={5}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              disabled={busy}
            />
            <Suspense fallback={<p>Loading message verification…</p>}>
              <ReCAPTCHA
                ref={captcha}
                sitekey={siteKey}
                size="invisible"
                asyncScriptOnLoad={() => setVerificationReady(true)}
                onErrored={() => {
                  setVerificationError(true);
                  setVerificationReady(false);
                }}
              />
            </Suspense>
            <button
              className="button button-primary"
              type="submit"
              disabled={busy || !verificationReady}
            >
              {busy ? "Sending…" : "Send message"}
            </button>
            {verificationError && (
              <p role="alert">
                Message verification is unavailable. Please connect on LinkedIn
                instead.
              </p>
            )}
            <p className="form-note">
              Your email and message are used to respond to your enquiry.
              Protected by reCAPTCHA: Google’s{" "}
              <a href="https://policies.google.com/privacy">Privacy Policy</a>{" "}
              and{" "}
              <a href="https://policies.google.com/terms">Terms of Service</a>{" "}
              apply.
            </p>
            {status && (
              <p role={status.success ? "status" : "alert"}>{status.text}</p>
            )}
          </form>
        ) : (
          <div className="contact-note">
            <span aria-hidden="true">↗</span>
            <h3>Let’s connect.</h3>
            <p>
              LinkedIn is the best place to reach me. You can also explore more
              of my code on GitHub.
            </p>
            <a className="text-link" href="https://github.com/gfa789">
              Explore GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
