const fs = require('node:fs');
const path = require('node:path');
const esbuild = require('esbuild');
const cache = path.resolve('.cache');
fs.mkdirSync(cache, { recursive: true });
const define = {};
for (const [key, value] of Object.entries(process.env)) if (key.startsWith('REACT_APP_')) define[`process.env.${key}`] = JSON.stringify(value);
for (const key of ['FIREBASE_API_KEY','FIREBASE_PROJECT_ID','FIREBASE_APP_ID','FIREBASE_AUTH_DOMAIN','RECAPTCHA_SITE_KEY']) define[`process.env.REACT_APP_${key}`] ??= '""';
esbuild.buildSync({ entryPoints: ['scripts/render.jsx'], bundle: true, platform: 'node', format: 'cjs', jsx: 'automatic', outfile: '.cache/render.cjs', loader: { '.js': 'jsx', '.css': 'empty' }, define });
const { render, pageMetadata, origin } = require('../.cache/render.cjs');
const template = fs.readFileSync('build/index.html', 'utf8');
const escape = value => String(value).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
for (const [route, file] of [['/','index.html'],['/overwater','overwater.html'],['/404','404.html']]) {
  const page = pageMetadata(route);
  const meta = { description: page.description, robots: page.noindex ? 'noindex, follow' : 'index, follow', 'og:title': page.title, 'og:description': page.description, 'og:type': 'website', 'og:site_name': 'George Atkinson', 'og:image': origin + page.image, 'og:image:width': '1200', 'og:image:height': '630', 'twitter:card': 'summary_large_image', 'twitter:title': page.title, 'twitter:description': page.description, 'twitter:image': origin + page.image };
  if (page.path) meta['og:url'] = origin + page.path;
  let head = Object.entries(meta).map(([key,value]) => `<meta ${key.startsWith('og:') ? 'property' : 'name'}="${key}" content="${escape(value)}">`).join('');
  if (page.path) head += `<link rel="canonical" href="${origin + page.path}">`;
  let html = template.replace(/<title>.*?<\/title>/, `<title>${escape(page.title)}</title>`).replace('</head>', head + '</head>').replace('<div id="root"></div>', `<div id="root">${render(route)}</div>`);
  // Content remains available before client JavaScript or when scripts are blocked.
  html = html.replace(/opacity:0(?=[;"}])/g, 'opacity:1').replaceAll('opacity-0','opacity-100');
  fs.writeFileSync(path.join('build',file), html);
  console.log(`Prerendered ${route} → ${file}`);
}
