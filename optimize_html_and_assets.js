const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const htmlFiles = [
  'index.html',
  'about.html',
  'services.html',
  'projects.html',
  'case-studies.html',
  'case-study.html',
  'offers.html',
  'contact.html',
  'testimonials.html',
  'form.html',
  'services/index.html',
  'services/graphics-design.html',
  'services/web-development.html',
  'services/social-media-marketing.html',
  'services/public-relations.html',
  'services/google-ads.html',
  'services/event-activation.html'
];

htmlFiles.forEach(relPath => {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) return;

  let content = fs.readFileSync(fullPath, 'utf8');

  // Replace Tailwind CDN script and config with compiled styles.min.css
  const tailwindCdnRegex = /<!-- Tailwind CSS CDN.*?-->\s*<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>\s*<script>[\s\S]*?tailwind\.config[\s\S]*?<\/script>/gi;
  
  if (tailwindCdnRegex.test(content)) {
    content = content.replace(tailwindCdnRegex, '<!-- Compiled Ultra-Fast Standalone CSS -->\n  <link rel="stylesheet" href="/styles.min.css?v=4.0">');
    console.log(`Updated Tailwind CDN in ${relPath}`);
  } else {
    // Fallback: simple script replacement
    content = content.replace(/<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>/gi, '<link rel="stylesheet" href="/styles.min.css?v=4.0">');
    content = content.replace(/<script>\s*tailwind\.config\s*=[\s\S]*?<\/script>/gi, '');
  }

  // Also replace styles.css with styles.min.css
  content = content.replace(/<link rel="stylesheet" href="(\.\/|\/)?styles\.css(\?v=[\d\.]+)?">/gi, '<link rel="stylesheet" href="/styles.min.css?v=4.0">');

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Optimized ${relPath}`);
});
