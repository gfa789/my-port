const fs = require('node:fs');
const assert = require('node:assert/strict');
for (const file of ['index','overwater']) {
  const html=fs.readFileSync(`build/${file}.html`,'utf8');
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${file}: exactly one main heading`);
  for(const needle of ['rel="canonical"','property="og:title"','name="twitter:card"','name="description"']) assert(html.includes(needle), `${file}: ${needle}`);
  assert(html.length>5000,`${file}: actual prerendered content`);
}
assert(fs.readFileSync('build/404.html','utf8').includes('noindex, follow'));
assert(fs.readFileSync('build/sitemap.xml','utf8').includes('/overwater</loc>'));
assert(!JSON.parse(fs.readFileSync('firebase.json')).hosting.rewrites?.some(rule=>rule.source==='**'));
console.log('SEO checks passed: rendered pages, headings, metadata, sitemap, 404 configuration.');
