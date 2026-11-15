const fs = require("node:fs");
const path = require("node:path");
const esbuild = require("esbuild");
const cache = path.resolve(".cache");
fs.mkdirSync(cache, { recursive: true });
const define = {};
for (const [key, value] of Object.entries(process.env))
  if (key.startsWith("REACT_APP_"))
    define[`process.env.${key}`] = JSON.stringify(value);
for (const key of [
  "FIREBASE_API_KEY",
  "FIREBASE_PROJECT_ID",
  "FIREBASE_APP_ID",
  "FIREBASE_AUTH_DOMAIN",
  "RECAPTCHA_SITE_KEY",
])
  define[`process.env.REACT_APP_${key}`] ??= '""';
esbuild.buildSync({
  entryPoints: ["scripts/render.jsx"],
  bundle: true,
  platform: "node",
  format: "cjs",
  jsx: "automatic",
  outfile: ".cache/render.cjs",
  loader: { ".js": "jsx", ".css": "empty" },
  define,
});
const {
  render,
  pageMetadata,
  origin,
  projectRoutes,
} = require("../.cache/render.cjs");
const template = fs.readFileSync("build/index.html", "utf8");
const escape = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
for (const [route, file] of [
  ["/", "index.html"],
  ...Object.values(projectRoutes).map((route) => [
    route,
    route.slice(1) + ".html",
  ]),
  ["/404", "404.html"],
]) {
  const page = pageMetadata(route);
  const meta = {
    description: page.description,
    robots: page.noindex ? "noindex, follow" : "index, follow",
    "og:title": page.title,
    "og:description": page.description,
    "og:type": "website",
    "og:site_name": "George Atkinson",
    "og:image": origin + page.image,
    "og:image:width": "1200",
    "og:image:height": "630",
    "twitter:card": "summary_large_image",
    "twitter:title": page.title,
    "twitter:description": page.description,
    "twitter:image": origin + page.image,
  };
  if (page.path) meta["og:url"] = origin + page.path;
  let head = Object.entries(meta)
    .map(
      ([key, value]) =>
        `<meta ${key.startsWith("og:") ? "property" : "name"}="${key}" content="${escape(value)}">`,
    )
    .join("");
  if (page.path) head += `<link rel="canonical" href="${origin + page.path}">`;
  let html = template
    .replace(/<title>.*?<\/title>/, `<title>${escape(page.title)}</title>`)
    .replace("</head>", head + "</head>")
    .replace('<div id="root"></div>', `<div id="root">${render(route)}</div>`);
  const output = path.join("build", file);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, html);
  console.log(`Prerendered ${route} → ${file}`);
}

// Firebase handles the old URL live. Give the static preview the same link.
const [underwaterRedirect] = require("../firebase.json").hosting.redirects;
const { source, destination } = underwaterRedirect;
fs.writeFileSync(
  path.join("build", `${source.slice(1)}.html`),
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Underwater Image Enhancement</title><meta name="robots" content="noindex"><link rel="canonical" href="${origin}${escape(destination)}"><script>location.replace(${JSON.stringify(destination)} + location.search + location.hash)</script></head><body><a href="${escape(destination)}">Underwater Image Enhancement</a></body></html>`,
);
