const fs = require('fs');
const path = require('path');

const ecomPath = path.resolve(__dirname, '..', 'offers', 'ecommerce.html');
let html = fs.readFileSync(ecomPath, 'utf8');

// Normalize Unicode (NFC)
html = html.normalize('NFC');

// Ensure proper Google Fonts import for Bengali
const fontLinkOld = /<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Hind\+Siliguri[^"]*"/;
const fontLinkNew = '<link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap"';

if (fontLinkOld.test(html)) {
  html = html.replace(fontLinkOld, fontLinkNew);
}

// Enhance the internal CSS to enforce the Bengali font stack across all elements
const styleBlockOld = /<style>[\s\S]*?<\/style>/;
const styleBlockNew = `<style>
    @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap');

    :root {
      --font-bengali: 'Hind Siliguri', 'Noto Sans Bengali', 'SolaimanLipi', 'Segoe UI', -apple-system, sans-serif;
    }

    body, button, input, textarea, select, h1, h2, h3, h4, h5, h6, p, span, li, a, td, th {
      font-family: var(--font-bengali) !important;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .font-eng {
      font-family: 'Plus Jakarta Sans', -apple-system, sans-serif !important;
    }
  </style>`;

if (styleBlockOld.test(html)) {
  html = html.replace(styleBlockOld, styleBlockNew);
}

fs.writeFileSync(ecomPath, html, 'utf8');
console.log('Successfully optimized Bengali typography and font fallback stack in offers/ecommerce.html');
