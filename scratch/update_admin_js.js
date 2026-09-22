const fs = require('fs');
const path = require('path');

const adminJsPath = path.join(__dirname, '..', 'admin.js');
let code = fs.readFileSync(adminJsPath, 'utf8');

// 1. Add event listeners in setupEventListeners
if (!code.includes('addNewOfferBtn')) {
  const target = "const exportLeadsCsvBtn = document.getElementById('exportLeadsCsvBtn');";
  const replacement = `  const addNewOfferBtn = document.getElementById('addNewOfferBtn');
  if (addNewOfferBtn) addNewOfferBtn.addEventListener('click', addNewOffer);

  const offersAdminSearch = document.getElementById('offersAdminSearch');
  if (offersAdminSearch) {
    offersAdminSearch.addEventListener('input', (e) => filterOffersAdmin(e.target.value));
  }

  const exportLeadsCsvBtn = document.getElementById('exportLeadsCsvBtn');`;
  code = code.replace(target, replacement);
}

// 2. Add switchTab mapping
if (!code.includes("'tab-offers':")) {
  const target = "'tab-casestudies': { title: 'Case Studies & Recent Works CMS', sub: 'Write, edit, feature, and publish comprehensive case studies and measurable results for your audience.' },";
  const replacement = `'tab-casestudies': { title: 'Case Studies & Recent Works CMS', sub: 'Write, edit, feature, and publish comprehensive case studies and measurable results for your audience.' },
    'tab-offers': { title: 'Offers & Growth Packages CMS', sub: 'Create, edit, reorder, and configure public growth packages, pricing tiers, deliverables checklist, and bonuses.' },`;
  code = code.replace(target, replacement);
}

// 3. Update updateOverviewStats
if (!code.includes("const offersCount =")) {
  const target = "const projectsCount = currentContent && currentContent.webProjects ? currentContent.webProjects.length : 15;";
  const replacement = `const projectsCount = currentContent && currentContent.webProjects ? currentContent.webProjects.length : 15;
  const offersCount = currentContent && currentContent.offers ? currentContent.offers.length : 6;

  const offersBadge = document.getElementById('offersBadge');
  if (offersBadge) offersBadge.textContent = offersCount;`;
  code = code.replace(target, replacement);
}

// 4. Update populateAdminForms
if (!code.includes("renderOffersEditor(c.offers")) {
  const target = "renderCaseStudiesEditor(c.caseStudies || []);";
  const replacement = `renderCaseStudiesEditor(c.caseStudies || []);
  renderOffersEditor(c.offers || []);`;
  code = code.replace(target, replacement);
}

// 5. Update gatherContentFromForms
if (!code.includes("offers: getOffersFromForms()")) {
  const target = "caseStudies: getCaseStudiesFromForms(),";
  const replacement = `caseStudies: getCaseStudiesFromForms(),
    offers: getOffersFromForms(),`;
  code = code.replace(target, replacement);
}

// 6. Add Offers CMS Engine functions
if (!code.includes("function renderOffersEditor(")) {
  const offersEngineCode = `
/* ==========================================================================
   OFFERS & GROWTH PACKAGES CMS ENGINE
   ========================================================================== */
function renderOffersEditor(offers) {
  const container = document.getElementById('offersEditorContainer');
  if (!container) return;

  const countBadge = document.getElementById('offersBadge');
  const countLabel = document.getElementById('offersAdminCount');
  if (countBadge) countBadge.textContent = offers.length;
  if (countLabel) countLabel.textContent = \`\${offers.length} offer packages loaded\`;

  const categoryOptions = [
    { val: 'ads', label: 'Paid Ads & ROAS' },
    { val: 'web', label: 'Web & SEO' },
    { val: 'brand', label: 'Brand & PR' },
    { val: 'retainer', label: 'Fractional Retainers' },
    { val: 'audit', label: 'Growth Audits' }
  ];

  if (!offers || offers.length === 0) {
    container.innerHTML = '<div class="empty-state">No offers configured yet. Click "+ Add New Offer Package" to create one.</div>';
    return;
  }

  container.innerHTML = offers.map((offer, idx) => {
    const deliverablesStr = Array.isArray(offer.deliverables) ? offer.deliverables.join('\\n') : (offer.deliverables || '');
    const isActive = offer.active !== false;

    const catOptionsHtml = categoryOptions.map(c => \`
      <option value="\${c.val}" \${offer.category === c.val ? 'selected' : ''}>\${c.label}</option>
    \`).join('');

    return \`
      <div class="case-item-card offer-admin-card \${isActive ? '' : 'opacity-70'}" data-offer-idx="\${idx}">
        <div class="case-header-row" onclick="toggleAccordion(this)">
          <div class="case-header-left">
            <span class="case-badge-pill" style="background:rgba(112,128,93,0.15); border-color:#70805D; color:#70805D;">\${escapeHtml(offer.badge || 'Package')}</span>
            <span class="case-title-txt font-bold">\${escapeHtml(offer.title)}</span>
            <span class="text-xs font-black text-[#EAB308] bg-[#EAB308]/10 px-2 py-0.5 rounded border border-[#EAB308]/30">\${escapeHtml(offer.price || 'Custom')}</span>
            \${!isActive ? '<span class="text-[10px] font-bold text-red-400 bg-red-950/40 px-2 py-0.5 rounded border border-red-800">HIDDEN</span>' : ''}
          </div>
          <div class="flex-gap align-center">
            <span class="text-xs text-slate-400 font-bold">\${escapeHtml(offer.timeline || '')}</span>
            <button type="button" class="btn-move-arrow" title="Move Up" onclick="event.stopPropagation(); moveOffer(\${idx}, -1);" \${idx === 0 ? 'disabled' : ''}>▲</button>
            <button type="button" class="btn-move-arrow" title="Move Down" onclick="event.stopPropagation(); moveOffer(\${idx}, 1);" \${idx === offers.length - 1 ? 'disabled' : ''}>▼</button>
            <button type="button" class="btn-delete-icon" onclick="event.stopPropagation(); deleteOffer(\${idx});">🗑️</button>
          </div>
        </div>

        <div class="case-body-content hidden">
          <input type="hidden" class="offer-id" value="\${escapeHtml(offer.id || ('offer-' + (idx + 1)))}">

          <div class="form-row-2">
            <div class="form-group">
              <label>Package Title / Headline *</label>
              <input type="text" class="admin-input offer-title font-bold" value="\${escapeHtml(offer.title)}" placeholder="e.g. Full-Funnel Meta & Google Ads Scaling" oninput="markDirty()">
            </div>
            <div class="form-group">
              <label>Category Filter *</label>
              <select class="admin-input offer-category" onchange="markDirty()">
                \${catOptionsHtml}
              </select>
            </div>
          </div>

          <div class="form-row-3">
            <div class="form-group">
              <label>Badge / Tag Pill (e.g. 🔥 Most Popular, ⚡ Best Value)</label>
              <input type="text" class="admin-input offer-badge" value="\${escapeHtml(offer.badge || '')}" placeholder="🔥 Most Popular" oninput="markDirty()">
            </div>
            <div class="form-group">
              <label>Timeline / Turnaround (e.g. 30-Day Sprint, 2-3 Weeks)</label>
              <input type="text" class="admin-input offer-timeline" value="\${escapeHtml(offer.timeline || '')}" placeholder="30-Day Sprint" oninput="markDirty()">
            </div>
            <div class="form-group">
              <label class="flex items-center gap-2 cursor-pointer mt-6 font-bold text-xs text-[#70805D]">
                <input type="checkbox" class="admin-checkbox offer-active" \${isActive ? 'checked' : ''} onchange="markDirty()">
                <span>Active on Live Site</span>
              </label>
            </div>
          </div>

          <div class="form-row-3">
            <div class="form-group">
              <label>Offer Price * (e.g. $499, $799, $1,200)</label>
              <input type="text" class="admin-input offer-price font-bold" value="\${escapeHtml(offer.price || '')}" placeholder="$499" oninput="markDirty()">
            </div>
            <div class="form-group">
              <label>Original Strikethrough Price (e.g. $850, optional)</label>
              <input type="text" class="admin-input offer-originalPrice" value="\${escapeHtml(offer.originalPrice || '')}" placeholder="$850" oninput="markDirty()">
            </div>
            <div class="form-group">
              <label>Billing Period / Suffix (e.g. / First Month, / Month)</label>
              <input type="text" class="admin-input offer-period" value="\${escapeHtml(offer.period || '')}" placeholder="/ First Month Sprint" oninput="markDirty()">
            </div>
          </div>

          <div class="form-group">
            <label>Subtext / Guarantee Note (e.g. Includes Full Setup + Active Ad Management)</label>
            <input type="text" class="admin-input offer-subtext" value="\${escapeHtml(offer.subtext || '')}" placeholder="Includes Full Setup + Active Ad Management" oninput="markDirty()">
          </div>

          <div class="form-group">
            <label>Value Pitch / Short Description *</label>
            <textarea class="admin-input offer-description" rows="2" placeholder="Describe the commercial impact and strategic scope of this package..." oninput="markDirty()">\${escapeHtml(offer.description || '')}</textarea>
          </div>

          <div class="form-group">
            <label>Included Deliverables &amp; Bonuses Checklist (One per line) *</label>
            <textarea class="admin-input offer-deliverables" rows="5" placeholder="Meta Pixel & CAPI Server-side precision tracking&#10;Google Performance Max funnels&#10;8 Custom Ad Creatives&#10;FREE BONUS: Competitor Ad Intelligence Teardown" oninput="markDirty()">\${escapeHtml(deliverablesStr)}</textarea>
            <small class="text-dim">Enter each deliverable bullet on a new line. You can prefix lines with FREE BONUS: or SPECIAL PERK: for bonus styling.</small>
          </div>

        </div>
      </div>
    \`;
  }).join('');
}

window.addNewOffer = function() {
  const current = getOffersFromForms();
  current.unshift({
    id: 'offer-' + Date.now(),
    title: 'New Strategic Growth Package',
    category: 'ads',
    categoryLabel: 'Paid Ads & ROAS',
    badge: '⚡ Limited Offer',
    timeline: '30-Day Sprint',
    description: 'Describe the core objective and quantifiable business ROI delivered by this package.',
    price: '$500',
    originalPrice: '$900',
    period: '/ Sprint',
    subtext: 'Milestone-based delivery with weekly KPI reporting',
    deliverables: [
      'Strategic Architecture & Funnel Setup',
      'High-Converting Creative Production',
      'Multi-Channel Performance Optimization',
      'FREE BONUS: Dedicated Strategy Session'
    ],
    active: true
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

window.moveOffer = function(idx, dir) {
  const current = getOffersFromForms();
  const targetIdx = idx + dir;
  if (targetIdx < 0 || targetIdx >= current.length) return;
  const temp = current[idx];
  current[idx] = current[targetIdx];
  current[targetIdx] = temp;
  renderOffersEditor(current);
  markDirty();
};

function getOffersFromForms() {
  const cards = document.querySelectorAll('#offersEditorContainer .offer-admin-card');
  const offers = [];

  const categoryLabels = {
    ads: 'Paid Ads & ROAS',
    web: 'Web & SEO',
    brand: 'Brand & PR',
    retainer: 'Fractional Retainers',
    audit: 'Growth Audits'
  };

  cards.forEach((card, idx) => {
    const id = card.querySelector('.offer-id')?.value || ('offer-' + (idx + 1));
    const title = card.querySelector('.offer-title')?.value.trim() || 'Untitled Offer';
    const category = card.querySelector('.offer-category')?.value || 'ads';
    const categoryLabel = categoryLabels[category] || 'Growth Package';
    const badge = card.querySelector('.offer-badge')?.value.trim() || '';
    const timeline = card.querySelector('.offer-timeline')?.value.trim() || 'Sprint';
    const price = card.querySelector('.offer-price')?.value.trim() || '$0';
    const originalPrice = card.querySelector('.offer-originalPrice')?.value.trim() || '';
    const period = card.querySelector('.offer-period')?.value.trim() || '';
    const subtext = card.querySelector('.offer-subtext')?.value.trim() || '';
    const description = card.querySelector('.offer-description')?.value.trim() || '';
    const active = card.querySelector('.offer-active')?.checked !== false;

    const delivRaw = card.querySelector('.offer-deliverables')?.value || '';
    const deliverables = delivRaw.split(/[\\r\\n]+/).map(d => d.trim()).filter(Boolean);

    offers.push({
      id,
      title,
      category,
      categoryLabel,
      badge,
      timeline,
      price,
      originalPrice,
      period,
      subtext,
      description,
      deliverables,
      active
    });
  });

  return offers;
}

function filterOffersAdmin(query) {
  const q = (query || '').toLowerCase().trim();
  const cards = document.querySelectorAll('#offersEditorContainer .offer-admin-card');
  let visibleCount = 0;
  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    if (!q || text.includes(q)) {
      card.style.display = '';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });
  const countLabel = document.getElementById('offersAdminCount');
  if (countLabel) countLabel.textContent = \`\${visibleCount} of \${cards.length} offer packages visible\`;
}
`;

  // Append before the end of file or after case studies
  code = code + '\n' + offersEngineCode;
}

fs.writeFileSync(adminJsPath, code, 'utf8');
console.log('Successfully updated admin.js with full Offers CMS engine!');
