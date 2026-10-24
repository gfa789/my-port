const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve("build");
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".ico": "image/x-icon",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json",
};
http
  .createServer((req, res) => {
    let pathname;
    try {
      pathname = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
    } catch {
      res.writeHead(400).end();
      return;
    }
    if (pathname.length > 1 && pathname.endsWith("/")) {
      res.writeHead(301, { Location: pathname.slice(0, -1) }).end();
      return;
    }
    let filename = path.resolve(
      root,
      "." + (pathname === "/" ? "/index.html" : pathname),
    );
    if (!filename.startsWith(root + path.sep)) {
      res.writeHead(403).end();
      return;
    }
    if (!path.extname(filename) && fs.existsSync(filename + ".html"))
      filename += ".html";
    let status = 200;
    if (!fs.existsSync(filename) || !fs.statSync(filename).isFile()) {
      filename = path.join(root, "404.html");
      status = 404;
    }
    const size = fs.statSync(filename).size;
    const headers = {
      "Content-Type":
        types[path.extname(filename)] || "application/octet-stream",
      "Content-Length": size,
      "Accept-Ranges": "bytes",
    };
    const range = req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
    if (range && status === 200) {
      const start = Number(range[1]),
        end = Math.min(range[2] ? Number(range[2]) : size - 1, size - 1);
      if (start >= size || end < start) {
        res.writeHead(416, { "Content-Range": `bytes */${size}` }).end();
        return;
      }
      res.writeHead(206, {
        ...headers,
        "Content-Length": end - start + 1,
        "Content-Range": `bytes ${start}-${end}/${size}`,
      });
      fs.createReadStream(filename, { start, end }).pipe(res);
      return;
    }
    res.writeHead(status, headers);
    if (req.method === "HEAD") res.end();
    else fs.createReadStream(filename).pipe(res);
  })
  .listen(process.env.PORT || 4173, "127.0.0.1", () =>
    console.log(
      `Portfolio preview: http://localhost:${process.env.PORT || 4173}`,
    ),
  );
