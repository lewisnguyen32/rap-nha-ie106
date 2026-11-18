import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("./dist/", import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".mp4": "video/mp4",
  ".vtt": "text/vtt; charset=utf-8",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
};

createServer(async (request, response) => {
  try {
    if (!["GET", "HEAD"].includes(request.method)) {
      response.writeHead(405, { Allow: "GET, HEAD" }).end();
      return;
    }
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    const file = resolve(root, pathname === "/" ? "index.html" : "." + pathname);
    if (!file.startsWith(resolve(root) + sep)) {
      response.writeHead(403).end();
      return;
    }
    const entry = await stat(file);
    if (!entry.isFile()) {
      response.writeHead(404).end();
      return;
    }
    const headers = {
      "Content-Type": types[extname(file)] || "application/octet-stream",
      "Content-Length": entry.size,
      "Cache-Control": "no-cache",
      "Accept-Ranges": "bytes",
    };
    const range = request.headers.range;
    let options;
    if (range) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(range);
      const start = match?.[1] ? Number(match[1]) : Math.max(0, entry.size - Number(match?.[2]));
      const end = Math.min(entry.size - 1, match?.[1] && match?.[2] ? Number(match[2]) : entry.size - 1);
      if (!match || !Number.isSafeInteger(start) || start < 0 || start > end || (!match[1] && !match[2])) {
        response.writeHead(416, { "Content-Range": `bytes */${entry.size}` }).end();
        return;
      }
      headers["Content-Range"] = `bytes ${start}-${end}/${entry.size}`;
      headers["Content-Length"] = end - start + 1;
      options = { start, end };
    }
    response.writeHead(options ? 206 : 200, headers);
    if (request.method === "HEAD") response.end();
    else {
      const stream = createReadStream(file, options);
      stream.on("error", () => response.destroy());
      response.on("close", () => stream.destroy());
      stream.pipe(response);
    }
  } catch (error) {
    response.writeHead(error instanceof URIError ? 400 : 404).end();
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Local: http://127.0.0.1:${port}/`);
});
