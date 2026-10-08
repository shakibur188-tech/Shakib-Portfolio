const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../offers/ecommerce.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Remove Header (<header id="navbar" ...> ... </header>)
const headerRegex = /<!-- 2\. FIXED NAVBAR -->[\s\S]*?<\/header>/;
if (headerRegex.test(html)) {
  html = html.replace(headerRegex, '<!-- Navbar hidden as requested for focused landing page -->');
  console.log('Removed Navbar/Header');
} else {
  console.log('Navbar pattern not found via exact regex, checking alternative');
  const altHeaderRegex = /<header id="navbar"[\s\S]*?<\/header>/;
  if (altHeaderRegex.test(html)) {
    html = html.replace(altHeaderRegex, '<!-- Navbar hidden as requested -->');
    console.log('Removed Navbar via alt pattern');
  }
}

// 2. Adjust Hero Section Padding
html = html.replace(
  '<section class="relative pt-32 pb-8 md:pt-40 md:pb-12 overflow-hidden">',
  '<section class="relative pt-12 pb-8 md:pt-16 md:pb-12 overflow-hidden">'
);

// 3. Remove Footer (<!-- 5. FOOTER --> ... </footer>)
const footerRegex = /<!-- =+[\s\n]*5\.\s*FOOTER[\s\S]*?<\/footer>/;
if (footerRegex.test(html)) {
  html = html.replace(footerRegex, `<footer class="py-6 border-t border-[#E2E8F0] bg-white text-center text-xs text-[#94A3B8] relative z-10">
    <div class="max-w-7xl mx-auto px-4">
      &copy; 2026 Md. Shakibur Rahaman. All rights reserved.
    </div>
  </footer>`);
  console.log('Replaced 4-column footer with clean minimal copyright strip');
} else {
  const altFooterRegex = /<footer class="py-16[\s\S]*?<\/footer>/;
  if (altFooterRegex.test(html)) {
    html = html.replace(altFooterRegex, `<footer class="py-6 border-t border-[#E2E8F0] bg-white text-center text-xs text-[#94A3B8] relative z-10">
    <div class="max-w-7xl mx-auto px-4">
      &copy; 2026 Md. Shakibur Rahaman. All rights reserved.
    </div>
  </footer>`);
    console.log('Replaced footer via alt regex');
  }
}

fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully updated offers/ecommerce.html');
