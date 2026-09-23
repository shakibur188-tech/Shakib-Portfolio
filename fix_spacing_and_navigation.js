const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

// 1. Fix site-hydration.js
const hydrationPath = path.join(rootDir, 'site-hydration.js');
if (fs.existsSync(hydrationPath)) {
  let code = fs.readFileSync(hydrationPath, 'utf8');

  // Replace the aggressive click interceptor with clean hover prefetching
  const oldTransitionsCode = /\/\/ 4\. Instant Turbo Router[\s\S]*?function initInstantPageTransitions\(\) \{[\s\S]*?\n  \}/gi;
  
  const cleanTransitionsCode = `// 4. Instant Pre-fetching Engine (< 0.01s instant click)
  const preloadedUrls = new Set();

  function prefetchUrl(url) {
    if (!url || preloadedUrls.has(url) || url.startsWith('#') || url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('https://wa.me') || url.includes('/admin')) return;
    if (url.startsWith('http') && !url.includes(window.location.hostname)) return;

    preloadedUrls.add(url);
    try {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);
    } catch (e) {}

    fetch(url, { priority: 'low' }).catch(() => {});
  }

  function initInstantPageTransitions() {
    const coreRoutes = [
      '/',
      '/about.html',
      '/services.html',
      '/projects.html',
      '/case-studies.html',
      '/case-study.html',
      '/offers.html',
      '/contact.html',
      '/testimonials.html'
    ];

    setTimeout(() => {
      coreRoutes.forEach(r => {
        if (r !== window.location.pathname) prefetchUrl(r);
      });
    }, 50);

    // Instant Hover / Touch Pre-load so clicking renders immediately from cache in <0.01s
    document.addEventListener('mouseover', (e) => {
      const anchor = e.target.closest('a');
      if (anchor && anchor.getAttribute('href')) {
        prefetchUrl(anchor.getAttribute('href'));
      }
    }, { passive: true });

    document.addEventListener('touchstart', (e) => {
      const anchor = e.target.closest('a');
      if (anchor && anchor.getAttribute('href')) {
        prefetchUrl(anchor.getAttribute('href'));
      }
    }, { passive: true });
  }`;

  code = code.replace(oldTransitionsCode, cleanTransitionsCode);
  fs.writeFileSync(hydrationPath, code, 'utf8');
  console.log('Fixed site-hydration.js page navigation');
}

// 2. Fix Spacing in all HTML files
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

  // Fix excessive top paddings
  content = content.replace(/pt-36 pb-20 md:pt-44 md:pb-28/g, 'pt-24 pb-16 md:pt-28 md:pb-20');
  content = content.replace(/pt-32 pb-16 md:pt-40 md:pb-24/g, 'pt-24 pb-12 md:pt-28 md:pb-16');
  content = content.replace(/pt-32 pb-12 md:pt-40 md:pb-20/g, 'pt-24 pb-10 md:pt-28 md:pb-16');
  content = content.replace(/pt-32 pb-12 md:pt-40/g, 'pt-24 pb-10 md:pt-28');
  content = content.replace(/pt-32 pb-14 md:pt-40/g, 'pt-24 pb-10 md:pt-28');
  content = content.replace(/pt-32 pb-16 md:pt-40/g, 'pt-24 pb-12 md:pt-28');
  content = content.replace(/pt-36 md:pt-44/g, 'pt-24 md:pt-28');

  // In case-study.html: fix duplicate spacers
  if (relPath === 'case-study.html') {
    content = content.replace(/<!-- Spacer for fixed navbar -->\s*<div class="h-20 sm:h-24"><\/div>/g, '<!-- Fixed navbar offset -->\n  <div class="h-20"></div>');
    content = content.replace(/pt-10 sm:pt-14 pb-12 sm:pb-16/g, 'pt-4 sm:pt-6 pb-8 sm:pb-10');
  }

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Adjusted spacing in ${relPath}`);
});
