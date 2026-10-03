const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// =========================================================================
// 1. UPDATE data/content.json with default offers array
// =========================================================================
const contentJsonPath = path.join(rootDir, 'data', 'content.json');
let contentData = JSON.parse(fs.readFileSync(contentJsonPath, 'utf8'));

contentData.offers = [
  {
    id: "offer-ecom",
    badge: "E-Commerce Flagship",
    emiBadge: "EMI Available",
    title: "Fully Customized E-com Website",
    subtitle: "(with EMI Facility)",
    description: "High-converting digital storefront engineered for sub-second checkouts, multi-warehouse stock management, and zero drop-off cart conversion.",
    features: [
      "Bespoke Headless Storefront Architecture (Shopify / Next.js)",
      "Multi-Currency & Local Gateways (bKash, Nagad, Cards, SSLCommerz)",
      "Automated Courier API Dispatch & Live SMS Order Tracking",
      "Dynamic Product Customizer & Automated Abandoned Cart Recovery",
      "Flexible 0% Interest EMI Plans (3 to 12 Months)"
    ],
    ctaText: "View E-Com Plans & EMI Matrix",
    ctaLink: "/offers/ecommerce",
    featured: false
  },
  {
    id: "offer-service",
    badge: "Service Engine",
    emiBadge: "EMI Available",
    title: "Fully Customized Service-Based Platform",
    subtitle: "(with EMI Facility)",
    description: "Tailored conversion architecture for agencies, consultancies, and B2B enterprises to automate lead generation and client onboarding.",
    features: [
      "Interactive Multi-Step Service Quotation & Intake Funnel",
      "Real-Time Consultation Calendar & Instant WhatsApp Sync",
      "Client Case Study Retrospective Library with 3D Visuals",
      "Automated CRM Lead Capture & Email Notification Dispatch",
      "Flexible 0% Interest EMI Plans (3 to 12 Months)"
    ],
    ctaText: "View Service Platform Plans & EMI",
    ctaLink: "/offers/service-platform",
    featured: true
  },
  {
    id: "offer-portfolio",
    badge: "Executive Brand",
    emiBadge: "EMI Available",
    title: "Fully Customized Personal Portfolio Website",
    subtitle: "(with EMI Facility)",
    description: "Ultra-luxury personal branding platform designed for founders, consultants, directors, and executives to command premium authority and client trust.",
    features: [
      "High-End Interactive Morphy Bento Layout & Custom Aesthetic Design",
      "Dynamic Projects, Career Timeline & Credentials Showcase",
      "99/100 Google PageSpeed & Sub-Second Global CDN Asset Loading",
      "Direct Client Inbound Lead Capture & Consultation Booking Engine",
      "Flexible 0% Interest EMI Plans (3 to 12 Months)"
    ],
    ctaText: "View Portfolio Plans & EMI Matrix",
    ctaLink: "/offers/portfolio",
    featured: false
  }
];

fs.writeFileSync(contentJsonPath, JSON.stringify(contentData, null, 2), 'utf8');
console.log('Updated data/content.json with offers!');

// Also update root content.json if present
const rootContentJsonPath = path.join(rootDir, 'content.json');
if (fs.existsSync(rootContentJsonPath)) {
  fs.writeFileSync(rootContentJsonPath, JSON.stringify(contentData, null, 2), 'utf8');
}


// =========================================================================
// 2. UPDATE admin.html with Offers Management Tab
// =========================================================================
const adminHtmlPath = path.join(rootDir, 'admin.html');
let adminHtml = fs.readFileSync(adminHtmlPath, 'utf8');

// Add sidebar nav item if not present
if (!adminHtml.includes('data-tab="tab-offers"')) {
  const targetNavMarker = `<button class="nav-item" data-tab="tab-testimonials">`;
  const offersNavItem = `        <button class="nav-item" data-tab="tab-offers">
          <span class="nav-icon">🎁</span>
          <span class="nav-label">Special Offers & Packages</span>
          <span id="offersBadge" class="nav-badge">3</span>
        </button>\n` + targetNavMarker;
  adminHtml = adminHtml.replace(targetNavMarker, offersNavItem);
}

// Add tab-offers section if not present
if (!adminHtml.includes('id="tab-offers"')) {
  const targetSectionMarker = `<!-- TAB 2: 9 CORE SERVICES CMS -->`;
  const offersSection = `<!-- TAB: SPECIAL OFFERS & PACKAGES CMS -->
        <section id="tab-offers" class="tab-pane">
          <div class="card-form glass-panel">
            <div class="flex-between mb-4">
              <div>
                <h3>🎁 Special Offers & Sprint Packages CMS</h3>
                <p class="section-desc">Add, edit, reorder, or remove growth package cards displayed on the /offers page and website.</p>
              </div>
              <button type="button" id="addNewOfferBtn" class="btn-primary-gold" onclick="addNewOffer()">
                <span>+ Add New Offer</span>
              </button>
            </div>
            <div id="offersEditorContainer" class="cases-accordion-list"></div>
          </div>
        </section>\n\n        ` + targetSectionMarker;
  adminHtml = adminHtml.replace(targetSectionMarker, offersSection);
}

fs.writeFileSync(adminHtmlPath, adminHtml, 'utf8');
console.log('Updated admin.html with Offers tab!');


// =========================================================================
// 3. UPDATE admin.js with Offers CMS CRUD Functions
// =========================================================================
const adminJsPath = path.join(rootDir, 'admin.js');
let adminJs = fs.readFileSync(adminJsPath, 'utf8');

if (!adminJs.includes('function renderOffersEditor')) {
  const offersJsCode = `
// ==========================================================================
// OFFERS & PACKAGES CMS CONTROLLER
// ==========================================================================
function renderOffersEditor(offers) {
  const container = document.getElementById('offersEditorContainer');
  const badge = document.getElementById('offersBadge');
  if (!container) return;

  if (badge) badge.textContent = Array.isArray(offers) ? offers.length : 0;

  if (!Array.isArray(offers) || !offers.length) {
    container.innerHTML = '<div class="empty-state">No offers created yet. Click "+ Add New Offer" to create your first package.</div>';
    return;
  }

  container.innerHTML = offers.map((offer, idx) => {
    const featuresList = Array.isArray(offer.features) ? offer.features : [];
    const featureRows = featuresList.map(feat => \`
      <div class="dynamic-row">
        <input type="text" class="admin-input offer-feature" value="\${escapeHtml(feat)}" placeholder="Feature bullet point" oninput="markDirty()">
        <button type="button" class="btn-delete-icon" onclick="this.parentElement.remove(); markDirty();">✕</button>
      </div>
    \`).join('');

    const isFeatured = offer.featured === true;

    return \`
      <div class="case-item-card" data-index="\${idx}">
        <div class="case-item-header" onclick="toggleAccordion(this)">
          <div class="case-header-left">
            <span class="case-index">#\${idx + 1}</span>
            <span class="svc-badge-pill" style="background:#0066FF15; color:#0066FF; font-size:11px; padding:3px 8px; border-radius:6px; font-weight:700;">\${escapeHtml(offer.badge || 'Offer')}</span>
            <strong class="case-header-title">\${escapeHtml(offer.title || 'Untitled Offer')}</strong>
            \${isFeatured ? '<span class="status-pill status-active" style="margin-left:6px; font-size:10px;">★ Featured</span>' : ''}
          </div>
          <div class="case-header-actions" onclick="event.stopPropagation();">
            <button type="button" class="btn-ghost-sm" title="Move Up" onclick="moveOffer(\${idx}, -1)" \${idx === 0 ? 'disabled' : ''}>▲</button>
            <button type="button" class="btn-ghost-sm" title="Move Down" onclick="moveOffer(\${idx}, 1)" \${idx === offers.length - 1 ? 'disabled' : ''}>▼</button>
            <button type="button" class="btn-danger-sm" title="Delete Offer" onclick="deleteOffer(\${idx})">Delete</button>
            <span class="accordion-arrow">▼</span>
          </div>
        </div>

        <div class="case-item-body hidden">
          <input type="hidden" class="offer-id" value="\${escapeHtml(offer.id || 'offer-' + Date.now())}">

          <div class="form-row-2">
            <div class="form-group">
              <label>Offer Title</label>
              <input type="text" class="admin-input offer-title" value="\${escapeHtml(offer.title || '')}" placeholder="e.g. Fully Customized E-com Website" oninput="markDirty()">
            </div>
            <div class="form-group">
              <label>Subtitle / Tagline</label>
              <input type="text" class="admin-input offer-subtitle" value="\${escapeHtml(offer.subtitle || '')}" placeholder="e.g. (with EMI Facility)" oninput="markDirty()">
            </div>
          </div>

          <div class="form-row-3">
            <div class="form-group">
              <label>Category Badge</label>
              <input type="text" class="admin-input offer-badge" value="\${escapeHtml(offer.badge || '')}" placeholder="e.g. E-Commerce Flagship" oninput="markDirty()">
            </div>
            <div class="form-group">
              <label>EMI Badge Text</label>
              <input type="text" class="admin-input offer-emi-badge" value="\${escapeHtml(offer.emiBadge || 'EMI Available')}" placeholder="e.g. EMI Available" oninput="markDirty()">
            </div>
            <div class="form-group">
              <label>Featured / Highlighted</label>
              <div style="display:flex; align-items:center; height:42px;">
                <label class="switch-toggle" style="display:flex; align-items:center; gap:8px; cursor:pointer;">
                  <input type="checkbox" class="offer-featured" \${isFeatured ? 'checked' : ''} onchange="markDirty()">
                  <span style="font-size:12px; font-weight:600; color:#334155;">Highlight this card</span>
                </label>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>Short Description</label>
            <textarea class="admin-textarea offer-desc" rows="2" placeholder="Brief summary of the package..." oninput="markDirty()">\${escapeHtml(offer.description || '')}</textarea>
          </div>

          <div class="form-group">
            <label>Key Features & Deliverables (Bullet Points)</label>
            <div class="offer-features-list mb-2">\${featureRows}</div>
            <button type="button" class="btn-secondary-sm" onclick="addFeatureToOffer(this)">+ Add Feature Bullet</button>
          </div>

          <div class="form-row-2">
            <div class="form-group">
              <label>CTA Button Text</label>
              <input type="text" class="admin-input offer-cta-text" value="\${escapeHtml(offer.ctaText || 'View Plans & EMI Matrix')}" placeholder="e.g. View Plans & EMI Matrix" oninput="markDirty()">
            </div>
            <div class="form-group">
              <label>CTA Target URL / Link</label>
              <input type="text" class="admin-input offer-cta-link" value="\${escapeHtml(offer.ctaLink || '/contact')}" placeholder="e.g. /offers/ecommerce or /contact" oninput="markDirty()">
            </div>
          </div>
        </div>
      </div>
    \`;
  }).join('');
}

window.addFeatureToOffer = function(btn) {
  const list = btn.previousElementSibling;
  const row = document.createElement('div');
  row.className = 'dynamic-row';
  row.innerHTML = \`
    <input type="text" class="admin-input offer-feature" value="" placeholder="New Feature Bullet" oninput="markDirty()">
    <button type="button" class="btn-delete-icon" onclick="this.parentElement.remove(); markDirty();">✕</button>
  \`;
  list.appendChild(row);
  markDirty();
};

window.addNewOffer = function() {
  const current = getOffersFromForms();
  const newId = 'offer-' + Date.now();
  current.push({
    id: newId,
    badge: 'Custom Sprint',
    emiBadge: 'EMI Available',
    title: 'New Custom Package',
    subtitle: '(with EMI Facility)',
    description: 'High-converting custom sprint package designed for rapid commercial growth.',
    features: [
      'Bespoke Architecture & Strategic Planning',
      'Turnkey Deliverables with Fast Turnaround',
      'Flexible 0% Interest EMI Facility (3 to 12 Months)'
    ],
    ctaText: 'View Details & EMI',
    ctaLink: '/contact',
    featured: false
  });
  renderOffersEditor(current);
  markDirty();
};

window.deleteOffer = function(idx) {
  if (confirm('Are you sure you want to delete this offer package?')) {
    const current = getOffersFromForms();
    current.splice(idx, 1);
    renderOffersEditor(current);
    markDirty();
  }
};

window.moveOffer = function(idx, direction) {
  const current = getOffersFromForms();
  const targetIdx = idx + direction;
  if (targetIdx < 0 || targetIdx >= current.length) return;
  const temp = current[idx];
  current[idx] = current[targetIdx];
  current[targetIdx] = temp;
  renderOffersEditor(current);
  markDirty();
};

function getOffersFromForms() {
  const cards = document.querySelectorAll('#offersEditorContainer .case-item-card');
  const offers = [];

  cards.forEach(card => {
    const id = card.querySelector('.offer-id')?.value || 'offer-' + Date.now();
    const title = card.querySelector('.offer-title')?.value.trim() || 'Untitled Offer';
    const subtitle = card.querySelector('.offer-subtitle')?.value.trim() || '';
    const badge = card.querySelector('.offer-badge')?.value.trim() || 'Special Offer';
    const emiBadge = card.querySelector('.offer-emi-badge')?.value.trim() || 'EMI Available';
    const description = card.querySelector('.offer-desc')?.value.trim() || '';
    const featured = card.querySelector('.offer-featured')?.checked === true;
    const ctaText = card.querySelector('.offer-cta-text')?.value.trim() || 'View Details';
    const ctaLink = card.querySelector('.offer-cta-link')?.value.trim() || '/contact';

    const featureInputs = card.querySelectorAll('.offer-feature');
    const features = [];
    featureInputs.forEach(inp => {
      const val = inp.value.trim();
      if (val) features.push(val);
    });

    offers.push({
      id,
      badge,
      emiBadge,
      title,
      subtitle,
      description,
      features,
      ctaText,
      ctaLink,
      featured
    });
  });

  return offers;
}
`;

  // Inject into admin.js
  adminJs += '\n' + offersJsCode;

  // Also hook into populateForms & collectFormData
  adminJs = adminJs.replace(
    'renderServicesEditor(currentContent.services || []);',
    'renderServicesEditor(currentContent.services || []);\n    renderOffersEditor(currentContent.offers || []);'
  );

  adminJs = adminJs.replace(
    'currentContent.services = getServicesFromForms();',
    'currentContent.services = getServicesFromForms();\n    currentContent.offers = getOffersFromForms();'
  );

  fs.writeFileSync(adminJsPath, adminJs, 'utf8');
  console.log('Updated admin.js with Offers CMS controller logic!');
}


// =========================================================================
// 4. UPDATE offers.html and offers/index.html to use dynamic card grid & hydration
// =========================================================================
function generateOfferCardsHtml(offers) {
  return offers.map(offer => {
    const isFeatured = offer.featured === true;
    const borderClass = isFeatured 
      ? 'border-2 border-[#0066FF] shadow-2xl shadow-[#0066FF]/20 relative -translate-y-1 md:-translate-y-2 ring-4 ring-[#0066FF]/10' 
      : 'border border-[#E2E8F0] shadow-sm hover:border-[#0066FF]/40 hover:shadow-xl hover:-translate-y-1.5';
    
    const btnClass = isFeatured
      ? 'w-full py-3.5 px-5 rounded-full bg-[#0066FF] hover:bg-[#0052FF] text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-between shadow-lg shadow-[#0066FF]/30 active:scale-98'
      : 'w-full py-3.5 px-5 rounded-full bg-[#F8FAFC] hover:bg-[#0066FF] text-[#0B0F19] hover:text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-between border border-[#E2E8F0] hover:border-transparent shadow-xs hover:shadow-lg hover:shadow-[#0066FF]/25 active:scale-98';

    const featureItems = (offer.features || []).map(feat => `
      <li class="flex items-start gap-2.5">
        <div class="w-4 h-4 rounded-full bg-[#0066FF]/10 text-[#0066FF] flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-black">✓</div>
        <span>${feat}</span>
      </li>
    `).join('');

    const featuredBadge = isFeatured
      ? `<div class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0052FF] text-white font-extrabold text-[10px] uppercase tracking-wider shadow-md shadow-[#0066FF]/30">
          ★ Most Popular Sprint
        </div>`
      : '';

    return `
      <!-- Offer Card: ${offer.title} -->
      <div class="morphy-card p-8 bg-white ${borderClass} rounded-[32px] flex flex-col justify-between transition-all duration-300 relative group">
        ${featuredBadge}
        <div>
          <div class="flex items-center justify-between mb-5 pt-1">
            <span class="px-3 py-1 rounded-full text-[10px] font-black bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/20 uppercase tracking-wider">
              ${offer.badge || 'Sprint Package'}
            </span>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
              ${offer.emiBadge || 'EMI Available'}
            </span>
          </div>

          <h3 class="text-2xl font-black text-[#0B0F19] leading-tight">
            ${offer.title} <br>
            <span class="text-sm font-bold text-[#0066FF]">${offer.subtitle || ''}</span>
          </h3>

          <p class="text-xs text-[#64748B] mt-2 mb-6 leading-relaxed">
            ${offer.description || ''}
          </p>

          <ul class="space-y-3.5 pt-5 border-t border-[#F1F5F9] text-xs text-[#475569] font-medium">
            ${featureItems}
          </ul>
        </div>

        <div class="pt-6 border-t border-[#F1F5F9] mt-8">
          <a href="${offer.ctaLink || '/contact'}" class="${btnClass}">
            <span>${offer.ctaText || 'View Plans & EMI Matrix'}</span>
            <i class="fa-solid fa-arrow-right text-[10px]"></i>
          </a>
        </div>
      </div>
    `;
  }).join('');
}

const renderedOffersHtml = generateOfferCardsHtml(contentData.offers);

for (const offerPagePath of [path.join(rootDir, 'offers.html'), path.join(rootDir, 'offers', 'index.html')]) {
  if (!fs.existsSync(offerPagePath)) continue;
  let pageContent = fs.readFileSync(offerPagePath, 'utf8');

  // Replace offers grid
  const gridRegex = /<div id="offersGrid"[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/i;
  const newGridSection = `<div id="offersGrid" class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">\n${renderedOffersHtml}\n      </div>\n    </div>\n  </section>`;

  if (pageContent.match(gridRegex)) {
    pageContent = pageContent.replace(gridRegex, newGridSection);
  } else {
    // If id="offersGrid" was not in markup yet, replace the 3-Package Grid
    const oldGridRegex = /<!--\s*3-Package Grid[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/i;
    if (pageContent.match(oldGridRegex)) {
      pageContent = pageContent.replace(oldGridRegex, `<!-- 3-Package Dynamic Card Grid (Managed via Admin CMS) -->\n      <div id="offersGrid" class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">\n${renderedOffersHtml}\n      </div>\n    </div>\n  </section>`);
    }
  }

  fs.writeFileSync(offerPagePath, pageContent, 'utf8');
  console.log(`Updated offers grid in ${offerPagePath}`);
}


// =========================================================================
// 5. UPDATE site-hydration.js & app.js for Dynamic Offers Hydration
// =========================================================================
const hydrationPath = path.join(rootDir, 'site-hydration.js');
let hydrationJs = fs.readFileSync(hydrationPath, 'utf8');

if (!hydrationJs.includes('hydrateOffersGrid')) {
  const offersHydrationCode = `
  // -------------------------------------------------------------
  // Dynamic Offers Grid Hydration (Admin CMS Driven)
  // -------------------------------------------------------------
  function hydrateOffersGrid(content) {
    const grid = document.getElementById('offersGrid');
    if (!grid || !Array.isArray(content.offers) || !content.offers.length) return;

    grid.innerHTML = content.offers.map(offer => {
      const isFeatured = offer.featured === true;
      const borderClass = isFeatured 
        ? 'border-2 border-[#0066FF] shadow-2xl shadow-[#0066FF]/20 relative -translate-y-1 md:-translate-y-2 ring-4 ring-[#0066FF]/10' 
        : 'border border-[#E2E8F0] shadow-sm hover:border-[#0066FF]/40 hover:shadow-xl hover:-translate-y-1.5';
      
      const btnClass = isFeatured
        ? 'w-full py-3.5 px-5 rounded-full bg-[#0066FF] hover:bg-[#0052FF] text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-between shadow-lg shadow-[#0066FF]/30 active:scale-98'
        : 'w-full py-3.5 px-5 rounded-full bg-[#F8FAFC] hover:bg-[#0066FF] text-[#0B0F19] hover:text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-between border border-[#E2E8F0] hover:border-transparent shadow-xs hover:shadow-lg hover:shadow-[#0066FF]/25 active:scale-98';

      const featureItems = (offer.features || []).map(feat => \`
        <li class="flex items-start gap-2.5">
          <div class="w-4 h-4 rounded-full bg-[#0066FF]/10 text-[#0066FF] flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-black">✓</div>
          <span>\${feat}</span>
        </li>
      \`).join('');

      const featuredBadge = isFeatured
        ? \`<div class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0052FF] text-white font-extrabold text-[10px] uppercase tracking-wider shadow-md shadow-[#0066FF]/30">
            ★ Most Popular Sprint
          </div>\`
        : '';

      return \`
        <div class="morphy-card p-8 bg-white \${borderClass} rounded-[32px] flex flex-col justify-between transition-all duration-300 relative group">
          \${featuredBadge}
          <div>
            <div class="flex items-center justify-between mb-5 pt-1">
              <span class="px-3 py-1 rounded-full text-[10px] font-black bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/20 uppercase tracking-wider">
                \${offer.badge || 'Sprint Package'}
              </span>
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
                \${offer.emiBadge || 'EMI Available'}
              </span>
            </div>

            <h3 class="text-2xl font-black text-[#0B0F19] leading-tight">
              \${offer.title} <br>
              <span class="text-sm font-bold text-[#0066FF]">\${offer.subtitle || ''}</span>
            </h3>

            <p class="text-xs text-[#64748B] mt-2 mb-6 leading-relaxed">
              \${offer.description || ''}
            </p>

            <ul class="space-y-3.5 pt-5 border-t border-[#F1F5F9] text-xs text-[#475569] font-medium">
              \${featureItems}
            </ul>
          </div>

          <div class="pt-6 border-t border-[#F1F5F9] mt-8">
            <a href="\${offer.ctaLink || '/contact'}" class="\${btnClass}">
              <span>\${offer.ctaText || 'View Plans & EMI Matrix'}</span>
              <i class="fa-solid fa-arrow-right text-[10px]"></i>
            </a>
          </div>
        </div>
      \`;
    }).join('');
  }
  `;

  // Inject before return in site-hydration.js
  hydrationJs = hydrationJs.replace(
    'hydratePageContent(content);',
    'hydratePageContent(content);\n    hydrateOffersGrid(content);'
  );
  hydrationJs += '\n' + offersHydrationCode;
  fs.writeFileSync(hydrationPath, hydrationJs, 'utf8');
  console.log('Updated site-hydration.js with offers grid hydration!');
}

console.log('Offers CMS implementation completed successfully!');
