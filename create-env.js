const fs = require('fs');

fs.writeFileSync('.env', `REACT_APP_RECAPTCHA_SITE_KEY=${process.env.REACT_APP_RECAPTCHA_SITE_KEY}\n`);