const express = require('express');
const router = express.Router();

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrapWords(text, maxCharsPerLine) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';

  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (next.length > maxCharsPerLine) {
      if (line) lines.push(line);
      line = w;
    } else {
      line = next;
    }
  }

  if (line) lines.push(line);
  return lines;
}

router.get('/', (req, res) => {
  const title = escapeXml((req.query.title || 'Yeva').slice(0, 90));
  const subtitle = escapeXml((req.query.subtitle || '').slice(0, 100));
  const bg = escapeXml(req.query.bg || '#dcd2c2');
  const color = escapeXml(req.query.color || '#38382b');

  const lines = wrapWords(title, 22).slice(0, 3);

  const line1 = lines[0] || 'Yeva';
  const line2 = lines[1] || '';
  const line3 = lines[2] || '';

  const baseY = 335;
  const lineHeight = 72;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="${bg}"/>
  <text x="600" y="${baseY}" text-anchor="middle" font-family="Courier New, Courier, monospace" font-size="54" font-weight="400" fill="${color}">
    ${line1}
  </text>
  ${
    line2
      ? `<text x="600" y="${baseY + lineHeight}" text-anchor="middle" font-family="Courier New, Courier, monospace" font-size="54" font-weight="400" fill="${color}">${line2}</text>`
      : ''
  }
  ${
    line3
      ? `<text x="600" y="${baseY + lineHeight * 2}" text-anchor="middle" font-family="Courier New, Courier, monospace" font-size="54" font-weight="400" fill="${color}">${line3}</text>`
      : ''
  }
  ${
    subtitle
      ? `<text x="600" y="520" text-anchor="middle" font-family="Courier New, Courier, monospace" font-size="28" font-weight="400" fill="${color}" opacity="0.85">${subtitle}</text>`
      : ''
  }
</svg>`;

  res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
  res.status(200).send(svg);
});

module.exports = router;

