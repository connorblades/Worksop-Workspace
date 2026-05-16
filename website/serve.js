const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8765;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.mp4': 'video/mp4', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff',
};

http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';
  else if (!path.extname(urlPath)) urlPath = urlPath.replace(/\/$/, '') + '/index.html';

  const filePath = path.join(ROOT, urlPath);
  const ext = path.extname(filePath);

  fs.stat(filePath, (err, stat) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }

    const mime = MIME[ext] || 'application/octet-stream';
    const rangeHeader = req.headers.range;

    /* ── Range requests (required for video seeking) ── */
    if (rangeHeader && ext === '.mp4') {
      const fileSize = stat.size;
      const [startStr, endStr] = rangeHeader.replace(/bytes=/, '').split('-');
      const start = parseInt(startStr, 10);
      const end   = endStr ? parseInt(endStr, 10) : fileSize - 1;
      const chunk = end - start + 1;

      res.writeHead(206, {
        'Content-Range':  `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges':  'bytes',
        'Content-Length': chunk,
        'Content-Type':   mime,
      });
      fs.createReadStream(filePath, { start, end }).pipe(res);
      return;
    }

    /* ── Normal full-file response ── */
    res.writeHead(200, {
      'Content-Type':   mime,
      'Content-Length': stat.size,
      'Accept-Ranges':  'bytes',
    });
    fs.createReadStream(filePath).pipe(res);
  });

}).listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
