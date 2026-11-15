const fs = require("node:fs");
const assert = require("node:assert/strict");
const sitemap = fs.readFileSync("build/sitemap.xml", "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (entry) => new URL(entry[1]),
);
assert.equal(urls.length, 6, "Homepage and five case studies");
for (const url of urls) {
  const route = url.pathname;
  const file = route === "/" ? "index" : route.slice(1);
  const html = fs.readFileSync(`build/${file}.html`, "utf8");
  assert.equal(
    (html.match(/<h1[ >]/g) || []).length,
    1,
    `${file}: exactly one main heading`,
  );
  for (const needle of [
    'rel="canonical"',
    'property="og:title"',
    'name="twitter:card"',
    'name="description"',
  ])
    assert(html.includes(needle), `${file}: ${needle}`);
  assert(
    html.includes(
      `rel="canonical" href="https://georgeatkinson.co.uk${route}"`,
    ),
    `${file}: preferred canonical`,
  );
  assert(
    html.includes('id="main-content"'),
    `${file}: prerendered main content`,
  );
  if (route !== "/") {
    assert(
      html.includes('id="demo-title"'),
      `${file}: prerendered project demonstration`,
    );
    const image = html.match(
      /property="og:image" content="https:\/\/georgeatkinson\.co\.uk(\/[^"]+)"/,
    )?.[1];
    assert(
      image && fs.existsSync("build" + image),
      `${file}: social image exists`,
    );
  }
}
assert(fs.readFileSync("build/404.html", "utf8").includes("noindex, follow"));
assert(
  fs
    .readFileSync("build/robots.txt", "utf8")
    .includes("https://georgeatkinson.co.uk/sitemap.xml"),
);
assert(
  !JSON.parse(fs.readFileSync("firebase.json")).hosting.rewrites?.some(
    (rule) => rule.source === "**",
  ),
);
console.log(
  "SEO checks passed: rendered pages, headings, metadata, sitemap, 404 configuration.",
);
