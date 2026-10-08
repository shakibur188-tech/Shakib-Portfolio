const fs = require('fs');
const path = require('path');

const ecomPath = path.resolve(__dirname, '..', 'offers', 'ecommerce.html');
let html = fs.readFileSync(ecomPath, 'utf8');

// Replace any potentially problematic mixed-script items with clean, natural phrasing
html = html.replace(/<li>✓ ১০ GB NVMe হোস্টিং \(১ম বছর ফ্রি\)<\/li>/g, '<li>✓ 10 GB NVMe ক্লাউড হোস্টিং (১ম বছর ফ্রি)</li>');
html = html.replace(/<li>✓ ১০ GB NVMe হোস্টিং ও ফ্রি ডোমেইন<\/li>/g, '<li>✓ 10 GB NVMe হোস্টিং ও ফ্রি ডোমেইন</li>');
html = html.replace(/<span>১০ GB NVMe হোস্টিং \+ ফ্রি ডোমেইন<\/span>/g, '<span>10 GB NVMe হোস্টিং + ফ্রি ডোমেইন</span>');
html = html.replace(/১০ GB NVMe ক্লাউড হোস্টিং/g, '10 GB NVMe ক্লাউড হোস্টিং');
html = html.replace(/১০ GB NVMe \(১ম বছর\)/g, '10 GB NVMe (১ম বছর)');

// Make sure font styling is robust across all browsers
const robustStyle = `<style>
    @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap');

    :root {
      --font-bengali: 'Hind Siliguri', 'Noto Sans Bengali', 'SolaimanLipi', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    * {
      font-family: var(--font-bengali);
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .font-eng {
      font-family: 'Plus Jakarta Sans', -apple-system, sans-serif !important;
    }
  </style>`;

html = html.replace(/<style>[\s\S]*?<\/style>/, robustStyle);

fs.writeFileSync(ecomPath, html, 'utf8');
console.log('Successfully polished text and font rendering in offers/ecommerce.html');
