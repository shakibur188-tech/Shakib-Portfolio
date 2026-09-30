const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const offersDir = path.join(rootDir, 'offers');

// 1. Update offers.html and offers/index.html: Replace <button href="..."> with <a href="...">
function fixOffersHub(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace button with <a> for e-com
  content = content.replace(
    /<button href="\/offers\/ecommerce"([^>]*)>([\s\S]*?)<\/button>/g,
    `<a href="/offers/ecommerce"$1>$2</a>`
  );

  // Replace button with <a> for service-platform
  content = content.replace(
    /<button href="\/offers\/service-platform"([^>]*)>([\s\S]*?)<\/button>/g,
    `<a href="/offers/service-platform"$1>$2</a>`
  );

  // Replace button with <a> for portfolio
  content = content.replace(
    /<button href="\/offers\/portfolio"([^>]*)>([\s\S]*?)<\/button>/g,
    `<a href="/offers/portfolio"$1>$2</a>`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed buttons to anchor tags in ' + filePath);
}

fixOffersHub(path.join(rootDir, 'offers.html'));
fixOffersHub(path.join(offersDir, 'index.html'));

// 2. Enhance mobile responsiveness on all offer subpages (offers/ecommerce.html, offers/service-platform.html, offers/portfolio.html)
function enhanceMobileOnSubpages(subPath, pageName) {
  const filePath = path.join(offersDir, subPath);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Add a mobile horizontal scroll tip above the table
  const scrollTip = `
      <!-- Mobile Scroll Indicator (visible only on small screens) -->
      <div class="md:hidden flex items-center justify-center gap-2 mb-3 text-[11px] font-bold text-[#64748B] bg-white p-2.5 rounded-xl border border-[#E2E8F0] shadow-2xs">
        <i class="fa-solid fa-arrows-left-right text-[#0066FF] animate-pulse"></i>
        <span>Swipe horizontally to compare all 4 plans</span>
      </div>`;

  if (!content.includes('Swipe horizontally to compare all 4 plans')) {
    content = content.replace(
      /(<div id="pricingTableView"[^>]*>\s*<div class="overflow-x-auto">)/,
      `${scrollTip}\n      $1\n          <table class="w-full text-left border-collapse min-w-[680px]">`
    );
    content = content.replace('<table class="w-full text-left border-collapse">', '');
  }

  // Ensure default on mobile automatically selects card view if window width < 768px on load
  const mobileScript = `
    // Mobile-optimized default view selection
    if (window.innerWidth < 768) {
      const btnCards = document.getElementById('viewCardsBtn');
      const btnTable = document.getElementById('viewTableBtn');
      const tableSec = document.getElementById('pricingTableView');
      const cardsSec = document.getElementById('pricingCardsView');
      if (btnCards && btnTable && tableSec && cardsSec) {
        cardsSec.classList.remove('hidden');
        tableSec.classList.add('hidden');
        btnCards.className = 'px-4 py-2 rounded-xl bg-[#0066FF] text-white shadow-xs font-black text-xs flex items-center gap-1.5 transition-all';
        btnTable.className = 'px-4 py-2 rounded-xl bg-transparent text-[#64748B] hover:text-[#0B0F19] font-bold text-xs flex items-center gap-1.5 transition-all';
      }
    }
  `;

  if (!content.includes('Mobile-optimized default view selection')) {
    content = content.replace('setupViewSwitcher();', `setupViewSwitcher();\n    ${mobileScript}`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Enhanced mobile responsiveness on offers/${subPath}`);
}

enhanceMobileOnSubpages('ecommerce.html', 'E-Commerce');
enhanceMobileOnSubpages('service-platform.html', 'Service Platform');
enhanceMobileOnSubpages('portfolio.html', 'Portfolio');

// 3. Update .htaccess for 100% rock-solid routing for /offers and all subpages
const htaccessPath = path.join(rootDir, '.htaccess');
const htaccessContent = `# ==============================================================================
# Shakibur Rahaman Portfolio & CMS - Apache / cPanel / LiteSpeed Configuration
# Universal Clean Extensionless URLs (.html hidden), Security & Mobile Optimization
# ==============================================================================

DirectoryIndex index.html index.php
Options -Indexes

<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /

    # 1. Strip trailing slashes (except real directories)
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)/$ /$1 [L,R=301]

    # 2. Redirect explicit .html requests to clean extensionless URLs (301 Redirect)
    RewriteCond %{THE_REQUEST} ^[A-Z]{3,9} /([^/]+/)*([^.]+)\.html(\?[^ ]*)? HTTP/ [NC]
    RewriteCond %{REQUEST_URI} !^/api/ [NC]
    RewriteRule ^((?:[^/]+/)*[^.]+)\.html$ /$1 [R=301,L,NC]

    # 3. Route /api/* requests to PHP backend
    RewriteRule ^api/(.*)$ api/index.php [L,QSA]
    RewriteRule ^api$ api/index.php [L,QSA]

    # 4. Map clean URL /admin -> admin.html
    RewriteRule ^admin/?$ admin.html [L,QSA]

    # 5. Direct explicit routing for Offers subpages
    RewriteRule ^offers/ecommerce/?$ offers/ecommerce.html [L,QSA]
    RewriteRule ^offers/service-platform/?$ offers/service-platform.html [L,QSA]
    RewriteRule ^offers/portfolio/?$ offers/portfolio.html [L,QSA]
    RewriteRule ^offers/?$ offers/index.html [L,QSA]
    RewriteRule ^offers/index/?$ offers/index.html [L,QSA]

    # 6. Direct explicit routing for Services subpages
    RewriteRule ^services/branding/?$ services/branding.html [L,QSA]
    RewriteRule ^services/graphics-design/?$ services/graphics-design.html [L,QSA]
    RewriteRule ^services/web-development/?$ services/web-development.html [L,QSA]
    RewriteRule ^services/social-media-marketing/?$ services/social-media-marketing.html [L,QSA]
    RewriteRule ^services/photoshoot-videography/?$ services/photoshoot-videography.html [L,QSA]
    RewriteRule ^services/event-activation/?$ services/event-activation.html [L,QSA]
    RewriteRule ^services/google-ads/?$ services/google-ads.html [L,QSA]
    RewriteRule ^services/seo-aeo/?$ services/seo-aeo.html [L,QSA]
    RewriteRule ^services/public-relations/?$ services/public-relations.html [L,QSA]
    RewriteRule ^services/?$ services/index.html [L,QSA]
    RewriteRule ^services/index/?$ services/index.html [L,QSA]

    # 7. Generic rewrite for root pages (e.g. /about -> about.html, /projects -> projects.html)
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{DOCUMENT_ROOT}/$1.html -f
    RewriteRule ^(.*)$ $1.html [L,QSA]

    # 8. Fallback for subdirectories
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME}.html -f
    RewriteRule ^(.*)$ $1.html [L,QSA]

    # 9. Block access to private data files and git
    RewriteRule ^data(/.*)?$ - [F,L]
    RewriteRule ^\.git.*$ - [F,L]
</IfModule>

# Correct MIME Types
<IfModule mod_mime.c>
    AddType text/plain .txt
    AddType text/html .html
    AddType text/css .css
    AddType application/javascript .js
    AddType application/json .json
    AddType image/svg+xml .svg
    AddType font/woff2 .woff2
</IfModule>

# Enable GZIP Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json image/svg+xml
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/html "access plus 0 seconds"
    ExpiresByType application/json "access plus 0 seconds"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/svg+xml "access plus 1 month"
    ExpiresByType font/woff2 "access plus 1 year"
</IfModule>
`;

fs.writeFileSync(htaccessPath, htaccessContent, 'utf8');
console.log('.htaccess updated with explicit routing for all offers and services!');
