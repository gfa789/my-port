const fs = require('fs');

const reCaptchaSiteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY || 
                         (process.env.FIREBASE_CONFIG && JSON.parse(process.env.FIREBASE_CONFIG).react_app.recaptcha_site_key);

fs.writeFileSync('.env', `REACT_APP_RECAPTCHA_SITE_KEY=${reCaptchaSiteKey || ''}\n`);

console.log('Environment variables set:', {
  REACT_APP_RECAPTCHA_SITE_KEY: reCaptchaSiteKey || 'Not set'
});