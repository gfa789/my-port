# George Atkinson’s portfolio

React portfolio with statically rendered public pages and Firebase Hosting.

## Local development

Use Node 22 and `npm ci`, then `npm start` (http://localhost:3000).
No production credentials are needed to explore the site. LinkedIn remains available for contact.
`npm run build` produces route-specific HTML, metadata and social previews.
`npm run preview` serves the build on http://localhost:4173 with clean URLs and real 404 responses.
Run `npm run check:seo`, `npm test -- --watchAll=false`, and `npm --prefix functions test`.

## Contact form deployment

The public Firestore rules intentionally deny direct client access. The form submits only to the validated `/api/contact` function. Do not open database writes to fix contact delivery.

1. Install function dependencies with `npm --prefix functions ci`.
2. Configure Firebase secrets `RECAPTCHA_SECRET_KEY`, `GMAIL_EMAIL`, and `GMAIL_APP_PASSWORD` with `firebase functions:secrets:set NAME`. The Gmail account receives notifications; use a Gmail app password. Secret values never belong in source or client configuration.
3. Set `CONTACT_HOSTNAMES` in `functions/.env` if using additional production hosts; see `functions/.env.example`. Configure the matching invisible reCAPTCHA v2 site key for those hosts.
4. Deploy functions and rules with `firebase deploy --only functions,firestore:rules`. Keep the existing hosting release separate until delivery is verified. The functions require a Firebase plan that supports Cloud Functions.
5. In a controlled environment verify a real submission is stored and its notification delivered. Only then set the public build variables `REACT_APP_CONTACT_ENABLED=true` and `REACT_APP_RECAPTCHA_SITE_KEY`. Copy `.env.example` to `.env.local` for local development. The default is a LinkedIn contact panel, so missing configuration never presents a broken form.
6. Build and deploy hosting. `/api/contact` is the only hosting rewrite. All public pages are real HTML files; unknown routes return the custom 404.

The endpoint validates message length and email, verifies CAPTCHA server-side and restricts submissions to five per IP per hour using a Firestore transaction. IPs are stored as keyed hashes only. Configure Firestore TTL on `contactRateLimits.expiresAt` to remove expired limiter records. The notification function retries failures; a rare duplicate email is possible on retries. “Received” means the message was persisted, not that an email delivery was confirmed.

The existing GitHub workflows deploy hosting only. Function changes and secrets need the explicit deployment above before enabling the form. The workflows read `REACT_APP_CONTACT_ENABLED` from GitHub repository variables (defaults to `false`) and `REACT_APP_RECAPTCHA_SITE_KEY` from repository secrets. Preview hostnames must be authorised in both CAPTCHA configuration and `CONTACT_HOSTNAMES` before enabling the preview form. No production services are modified by local builds or tests.

## Content and assets

The current role copy is based on George’s supplied responsibilities. Project descriptions avoid unverified performance claims. Stereo vision lives in `gfa789/darts-cw/Part2`; dartboard detection is in `Part1`. OverWater research code is in `gfa789/finalproject`.
