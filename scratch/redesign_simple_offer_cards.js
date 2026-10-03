const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// =========================================================================
// 1. UPDATE data/content.json with simple uniform offers
// =========================================================================
const contentJsonPath = path.join(rootDir, 'data', 'content.json');
let contentData = JSON.parse(fs.readFileSync(contentJsonPath, 'utf8'));

contentData.offers = [
  {
    id: "offer-ecom",
    image: "https://images.unsplash.com/photo-1556742049-0a67e557b89f?q=80&w=800&auto=format&fit=crop",
    badge: "E-Commerce Flagship",
    emiBadge: "EMI Available",
    title: "Fully Customized E-com Website",
    subtitle: "(with EMI Facility)",
    description: "High-converting digital storefront engineered for sub-second checkouts, multi-currency payment gateways, inventory management, and zero drop-off cart conversion.",
    ctaText: "View E-Com Plans & EMI Matrix",
    ctaLink: "/offers/ecommerce"
  },
  {
    id: "offer-service",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    badge: "Service Engine",
    emiBadge: "EMI Available",
    title: "Fully Customized Service-Based Platform",
    subtitle: "(with EMI Facility)",
    description: "Tailored conversion architecture for agencies, consultancies, and B2B enterprises to automate lead generation, interactive quotations, and client onboarding.",
    ctaText: "View Service Platform Plans & EMI",
    ctaLink: "/offers/service-platform"
  },
  {
    id: "offer-portfolio",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
    badge: "Executive Brand",
    emiBadge: "EMI Available",
    title: "Fully Customized Personal Portfolio Website",
    subtitle: "(with EMI Facility)",
    description: "Ultra-luxury personal branding platform designed for founders, consultants, directors, and executives to command premium authority and client trust.",
    ctaText: "View Portfolio Plans & EMI Matrix",
    ctaLink: "/offers/portfolio"
  }
];

fs.writeFileSync(contentJsonPath, JSON.stringify(contentData, null, 2), 'utf8');

const rootContentJsonPath = path.join(rootDir, 'content.json');
if (fs.existsSync(rootContentJsonPath)) {
  fs.writeFileSync(rootContentJsonPath, JSON.stringify(contentData, null, 2), 'utf8');
}
console.log('Updated data/content.json with simple uniform offers!');


// =========================================================================
// 2. GENERATE UNIFORM SIMPLE CARDS HTML
// =========================================================================
function generateSimpleOfferCardsHtml(offers) {
  return offers.map(offer => {
    return `
      <!-- Offer Card: ${offer.title} -->
      <div class="morphy-card bg-white border border-[#E2E8F0] hover:border-[#0066FF]/40 rounded-3xl overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group">
        <!-- 1. Card Top Image -->
        <div class="relative aspect-video w-full overflow-hidden bg-[#F1F5F9]">
          <img src="${offer.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop'}" alt="${offer.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
          <div class="absolute top-3 left-3 flex items-center gap-2">
            <span class="px-3 py-1 rounded-full text-[10px] font-black bg-white/95 text-[#0066FF] border border-[#E2E8F0] uppercase tracking-wider backdrop-blur-md shadow-xs">
              ${offer.badge || 'Package'}
            </span>
          </div>
          <div class="absolute top-3 right-3">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#10B981]/90 text-white backdrop-blur-md shadow-xs">
              ${offer.emiBadge || 'EMI Available'}
            </span>
          </div>
        </div>

        <!-- 2. Card Body Content -->
        <div class="p-6 sm:p-7 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="text-xl sm:text-2xl font-black text-[#0B0F19] leading-tight group-hover:text-[#0066FF] transition-colors">
              ${offer.title}
            </h3>
            <div class="text-xs font-bold text-[#0066FF] mt-1 mb-3">${offer.subtitle || ''}</div>

            <p class="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              ${offer.description || ''}
            </p>
          </div>

          <!-- 3. Button -->
          <div class="pt-5 mt-6 border-t border-[#F1F5F9]">
            <a href="${offer.ctaLink || '/contact'}" class="w-full py-3.5 px-5 rounded-full bg-[#F8FAFC] hover:bg-gradient-to-r hover:from-[#0066FF] hover:to-[#0052FF] text-[#0B0F19] hover:text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-between border border-[#E2E8F0] hover:border-transparent shadow-2xs hover:shadow-lg hover:shadow-[#0066FF]/25 active:scale-98">
              <span>${offer.ctaText || 'View Plans & EMI Matrix'}</span>
              <i class="fa-solid fa-arrow-right text-[10px]"></i>
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

const simpleCardsHtml = generateSimpleOfferCardsHtml(contentData.offers);


// =========================================================================
// 3. UPDATE offers.html and offers/index.html (Remove Section 3, Use Clean Simple Layout)
// =========================================================================
const cleanOffersBody = `
  <!-- HERO & OFFERS GRID SECTION -->
  <section class="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
      
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto space-y-4 reveal-fade-up">
        <div class="morphy-tag-primary justify-center mb-2">
          <i class="fa-solid fa-bolt"></i>
          <span>SPECIAL GROWTH PACKAGES &amp; OFFERS</span>
        </div>
        <h1 class="text-3xl sm:text-5xl md:text-6xl font-black text-[#0B0F19] tracking-tight leading-tight">
          Engineered for <span class="bg-gradient-to-r from-[#0066FF] to-[#0052FF] bg-clip-text text-transparent">Rapid Commercial ROI</span>
        </h1>
        <p class="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto leading-relaxed">
          High-velocity digital packages with turnkey deliverables, 100% intellectual property ownership, and flexible 0% interest EMI options.
        </p>
      </div>

      <!-- 3-Package Dynamic Card Grid (Managed via Admin CMS) -->
      <div id="offersGrid" class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
${simpleCardsHtml}
      </div>

    </div>
  </section>
`;

for (const offerPagePath of [path.join(rootDir, 'offers.html'), path.join(rootDir, 'offers', 'index.html')]) {
  if (!fs.existsSync(offerPagePath)) continue;
  let pageContent = fs.readFileSync(offerPagePath, 'utf8');

  // Replace from <!-- 3. HERO SECTION --> through </section> (the old section 4 offers grid)
  const fullOffersRegex = /(?:<!--\s*3\.\s*HERO SECTION[\s\S]*?<\/section>\s*)?(?:<!--\s*4\.\s*OFFERS GRID SECTION[\s\S]*?<\/section>|<!--\s*HERO & OFFERS GRID SECTION[\s\S]*?<\/section>)/i;
  
  if (pageContent.match(fullOffersRegex)) {
    pageContent = pageContent.replace(fullOffersRegex, cleanOffersBody);
    fs.writeFileSync(offerPagePath, pageContent, 'utf8');
    console.log(`Updated ${offerPagePath} with clean header & simple cards!`);
  } else {
    console.log(`Could not match fullOffersRegex in ${offerPagePath}`);
  }
}


// =========================================================================
// 4. UPDATE admin.js to support image input in Offers CMS
// =========================================================================
const adminJsPath = path.join(rootDir, 'admin.js');
let adminJs = fs.readFileSync(adminJsPath, 'utf8');

const updatedOffersControllerJs = `
// ==========================================================================
// OFFERS & PACKAGES CMS CONTROLLER (Simple Uniform Card Design)
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
    return \`
      <div class="case-item-card" data-index="\${idx}">
        <div class="case-item-header" onclick="toggleAccordion(this)">
          <div class="case-header-left">
            <span class="case-index">#\${idx + 1}</span>
            <span class="svc-badge-pill" style="background:#0066FF15; color:#0066FF; font-size:11px; padding:3px 8px; border-radius:6px; font-weight:700;">\${escapeHtml(offer.badge || 'Offer')}</span>
            <strong class="case-header-title">\${escapeHtml(offer.title || 'Untitled Offer')}</strong>
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

          <div class="form-group">
            <label>Card Thumbnail / Cover Image URL</label>
            <input type="text" class="admin-input offer-image" value="\${escapeHtml(offer.image || '')}" placeholder="https://... or /assets/..." oninput="markDirty()">
          </div>

          <div class="form-row-2">
            <div class="form-group">
              <label>Category Badge</label>
              <input type="text" class="admin-input offer-badge" value="\${escapeHtml(offer.badge || '')}" placeholder="e.g. E-Commerce Flagship" oninput="markDirty()">
            </div>
            <div class="form-group">
              <label>EMI Badge Text</label>
              <input type="text" class="admin-input offer-emi-badge" value="\${escapeHtml(offer.emiBadge || 'EMI Available')}" placeholder="e.g. EMI Available" oninput="markDirty()">
            </div>
          </div>

          <div class="form-group">
            <label>Short Description (Text)</label>
            <textarea class="admin-textarea offer-desc" rows="3" placeholder="Brief summary of the package..." oninput="markDirty()">\${escapeHtml(offer.description || '')}</textarea>
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

window.addNewOffer = function() {
  const current = getOffersFromForms();
  const newId = 'offer-' + Date.now();
  current.push({
    id: newId,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    badge: 'Custom Package',
    emiBadge: 'EMI Available',
    title: 'New Growth Package',
    subtitle: '(with EMI Facility)',
    description: 'High-converting custom sprint package designed for rapid commercial growth.',
    ctaText: 'View Details & Plans',
    ctaLink: '/contact'
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
    const image = card.querySelector('.offer-image')?.value.trim() || '';
    const badge = card.querySelector('.offer-badge')?.value.trim() || 'Special Offer';
    const emiBadge = card.querySelector('.offer-emi-badge')?.value.trim() || 'EMI Available';
    const description = card.querySelector('.offer-desc')?.value.trim() || '';
    const ctaText = card.querySelector('.offer-cta-text')?.value.trim() || 'View Details';
    const ctaLink = card.querySelector('.offer-cta-link')?.value.trim() || '/contact';

    offers.push({
      id,
      image,
      badge,
      emiBadge,
      title,
      subtitle,
      description,
      ctaText,
      ctaLink
    });
  });

  return offers;
}
`;

const oldControllerRegex = /\/\* =+\s*OFFERS & PACKAGES CMS CONTROLLER[\s\S]*?return offers;\s*\}/;
if (adminJs.match(oldControllerRegex)) {
  adminJs = adminJs.replace(oldControllerRegex, updatedOffersControllerJs);
  fs.writeFileSync(adminJsPath, adminJs, 'utf8');
  console.log('Updated admin.js offers controller!');
}


// =========================================================================
// 5. UPDATE site-hydration.js with Simple Uniform Cards Hydration
// =========================================================================
const hydrationPath = path.join(rootDir, 'site-hydration.js');
let hydrationJs = fs.readFileSync(hydrationPath, 'utf8');

const updatedHydrationCode = `
  // -------------------------------------------------------------
  // Dynamic Offers Grid Hydration (Simple Image + Text + Button Cards)
  // -------------------------------------------------------------
  function hydrateOffersGrid(content) {
    const grid = document.getElementById('offersGrid');
    if (!grid || !Array.isArray(content.offers) || !content.offers.length) return;

    grid.innerHTML = content.offers.map(offer => {
      return \`
        <div class="morphy-card bg-white border border-[#E2E8F0] hover:border-[#0066FF]/40 rounded-3xl overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group">
          <!-- Card Image -->
          <div class="relative aspect-video w-full overflow-hidden bg-[#F1F5F9]">
            <img src="\${offer.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop'}" alt="\${offer.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
            <div class="absolute top-3 left-3 flex items-center gap-2">
              <span class="px-3 py-1 rounded-full text-[10px] font-black bg-white/95 text-[#0066FF] border border-[#E2E8F0] uppercase tracking-wider backdrop-blur-md shadow-xs">
                \${offer.badge || 'Package'}
              </span>
            </div>
            <div class="absolute top-3 right-3">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#10B981]/90 text-white backdrop-blur-md shadow-xs">
                \${offer.emiBadge || 'EMI Available'}
              </span>
            </div>
          </div>

          <!-- Card Body -->
          <div class="p-6 sm:p-7 flex-1 flex flex-col justify-between">
            <div>
              <h3 class="text-xl sm:text-2xl font-black text-[#0B0F19] leading-tight group-hover:text-[#0066FF] transition-colors">
                \${offer.title}
              </h3>
              <div class="text-xs font-bold text-[#0066FF] mt-1 mb-3">\${offer.subtitle || ''}</div>

              <p class="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                \${offer.description || ''}
              </p>
            </div>

            <div class="pt-5 mt-6 border-t border-[#F1F5F9]">
              <a href="\${offer.ctaLink || '/contact'}" class="w-full py-3.5 px-5 rounded-full bg-[#F8FAFC] hover:bg-gradient-to-r hover:from-[#0066FF] hover:to-[#0052FF] text-[#0B0F19] hover:text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-between border border-[#E2E8F0] hover:border-transparent shadow-2xs hover:shadow-lg hover:shadow-[#0066FF]/25 active:scale-98">
                <span>\${offer.ctaText || 'View Plans & EMI Matrix'}</span>
                <i class="fa-solid fa-arrow-right text-[10px]"></i>
              </a>
            </div>
          </div>
        </div>
      \`;
    }).join('');
  }
`;

const oldHydrationRegex = /\/\/\s*-+\s*Dynamic Offers Grid Hydration[\s\S]*?\}\s*<\/div>\s*`;\s*\}\)\.join\(''\);\s*\}/;
if (hydrationJs.match(oldHydrationRegex)) {
  hydrationJs = hydrationJs.replace(oldHydrationRegex, updatedHydrationCode.trim());
  fs.writeFileSync(hydrationPath, hydrationJs, 'utf8');
  console.log('Updated site-hydration.js with simple cards hydration!');
}

console.log('Redesign simple offer cards completed successfully!');
