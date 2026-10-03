const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// =========================================================================
// 1. UPDATE offers.html and offers/index.html with Dual View (Grid + Table)
// =========================================================================
const comparisonTableHtml = `
      <!-- Comparison Matrix Table View (Toggled via Switcher) -->
      <div id="offersTableView" class="hidden morphy-card p-0 rounded-3xl bg-white border border-[#E2E8F0] shadow-xl overflow-hidden transition-all duration-300">
        <!-- Mobile Swipe Indicator -->
        <div class="md:hidden flex items-center justify-center gap-2 p-3 text-[11px] font-bold text-[#64748B] bg-[#F8FAFC] border-b border-[#E2E8F0]">
          <i class="fa-solid fa-arrows-left-right text-[#0066FF] animate-pulse"></i>
          <span>Swipe horizontally to compare all 3 packages</span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr class="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                <th class="p-5 sm:p-6 text-sm font-black text-[#0B0F19] w-[28%]">Package Features &amp; Scope</th>
                
                <!-- Package 1: E-Com -->
                <th class="p-5 sm:p-6 text-center border-l border-[#E2E8F0] w-[24%]">
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#0066FF]/10 text-[#0066FF] uppercase">E-Commerce</span>
                  <div class="text-base font-black text-[#0B0F19] mt-2">E-Com Storefront</div>
                  <div class="text-[11px] font-bold text-[#10B981] mt-0.5">0% EMI Available</div>
                </th>

                <!-- Package 2: Service Platform -->
                <th class="p-5 sm:p-6 text-center border-l border-[#E2E8F0] w-[24%]">
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#0066FF]/10 text-[#0066FF] uppercase">Service Platform</span>
                  <div class="text-base font-black text-[#0B0F19] mt-2">Service Engine</div>
                  <div class="text-[11px] font-bold text-[#10B981] mt-0.5">0% EMI Available</div>
                </th>

                <!-- Package 3: Portfolio -->
                <th class="p-5 sm:p-6 text-center border-l border-[#E2E8F0] w-[24%]">
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#0066FF]/10 text-[#0066FF] uppercase">Executive</span>
                  <div class="text-base font-black text-[#0B0F19] mt-2">Personal Portfolio</div>
                  <div class="text-[11px] font-bold text-[#10B981] mt-0.5">0% EMI Available</div>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#F1F5F9] text-xs font-medium text-[#475569]">
              <tr class="hover:bg-[#F8FAFC]">
                <td class="p-4 sm:p-5 font-bold text-[#0B0F19]">Primary Architecture</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">Headless Storefront (Shopify / Next.js)</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">Custom Service Funnel &amp; Quotation Engine</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">Luxury Morphy Bento Portfolio Architecture</td>
              </tr>

              <tr class="hover:bg-[#F8FAFC]">
                <td class="p-4 sm:p-5 font-bold text-[#0B0F19]">Payment Gateways</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-[#10B981] font-bold">bKash, Nagad, Cards, SSLCommerz</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-[#10B981] font-bold">Integrated Invoice &amp; Online Booking</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-[#10B981] font-bold">Consultation Booking &amp; Lead Funnel</td>
              </tr>

              <tr class="hover:bg-[#F8FAFC]">
                <td class="p-4 sm:p-5 font-bold text-[#0B0F19]">Performance &amp; Speed</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">&lt; 1s Sub-Second Checkouts</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">&lt; 1s High-Conversion Speed</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">99/100 Google PageSpeed Score</td>
              </tr>

              <tr class="hover:bg-[#F8FAFC]">
                <td class="p-4 sm:p-5 font-bold text-[#0B0F19]">Hosting &amp; Domain</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">Free Domain + 10GB NVMe Hosting</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">Free Domain + 10GB NVMe Hosting</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">Free Domain + High-Speed CDN</td>
              </tr>

              <tr class="hover:bg-[#F8FAFC]">
                <td class="p-4 sm:p-5 font-bold text-[#0B0F19]">Admin CMS &amp; Full Access</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-[#10B981] font-bold text-sm">✓ Included</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-[#10B981] font-bold text-sm">✓ Included</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-[#10B981] font-bold text-sm">✓ Included</td>
              </tr>

              <tr class="hover:bg-[#F8FAFC]">
                <td class="p-4 sm:p-5 font-bold text-[#0B0F19]">Flexible 0% Interest EMI</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] font-bold text-[#0066FF]">3, 6, 9 &amp; 12 Months EMI</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] font-bold text-[#0066FF]">3, 6, 9 &amp; 12 Months EMI</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] font-bold text-[#0066FF]">3, 6, 9 &amp; 12 Months EMI</td>
              </tr>

              <!-- Action Row -->
              <tr class="bg-[#F8FAFC] border-t-2 border-[#E2E8F0]">
                <td class="p-5 font-bold text-[#0B0F19]">Package Details &amp; Plans</td>
                <td class="p-5 text-center border-l border-[#E2E8F0]">
                  <a href="/offers/ecommerce" class="inline-flex py-2.5 px-4 rounded-full bg-[#0066FF] hover:bg-[#0052FF] text-white text-xs font-extrabold transition-all shadow-md shadow-[#0066FF]/20">
                    <span>View E-Com Matrix →</span>
                  </a>
                </td>
                <td class="p-5 text-center border-l border-[#E2E8F0]">
                  <a href="/offers/service-platform" class="inline-flex py-2.5 px-4 rounded-full bg-[#0066FF] hover:bg-[#0052FF] text-white text-xs font-extrabold transition-all shadow-md shadow-[#0066FF]/20">
                    <span>View Service Matrix →</span>
                  </a>
                </td>
                <td class="p-5 text-center border-l border-[#E2E8F0]">
                  <a href="/offers/portfolio" class="inline-flex py-2.5 px-4 rounded-full bg-[#0066FF] hover:bg-[#0052FF] text-white text-xs font-extrabold transition-all shadow-md shadow-[#0066FF]/20">
                    <span>View Portfolio Matrix →</span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
`;

function getFullOffersSection(cardsHtml) {
  return `
  <!-- HERO & OFFERS GRID SECTION (With Grid & Table Dual Mode) -->
  <section class="relative pt-28 pb-14 md:pt-36 md:pb-20 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6 md:space-y-8">
      
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto space-y-3 reveal-fade-up">
        <div class="morphy-tag-primary justify-center mb-1">
          <i class="fa-solid fa-bolt"></i>
          <span>SPECIAL GROWTH PACKAGES &amp; OFFERS</span>
        </div>
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B0F19] tracking-tight leading-tight">
          Engineered for <span class="bg-gradient-to-r from-[#0066FF] to-[#0052FF] bg-clip-text text-transparent">Rapid Commercial ROI</span>
        </h1>
        <p class="text-xs sm:text-sm text-[#64748B] max-w-xl mx-auto leading-relaxed">
          High-velocity digital packages with turnkey deliverables, 100% intellectual property ownership, and flexible 0% interest EMI options.
        </p>

        <!-- View Switcher (Grid View vs Comparison Table View) -->
        <div class="pt-3 flex items-center justify-center">
          <div class="p-1 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs inline-flex items-center gap-1">
            <button id="viewGridModeBtn" type="button" class="px-4 sm:px-5 py-2 rounded-xl bg-[#0066FF] text-white font-extrabold text-xs flex items-center gap-2 shadow-xs transition-all duration-200">
              <i class="fa-solid fa-table-cells-large text-[11px]"></i>
              <span>Card Grid</span>
            </button>
            <button id="viewTableModeBtn" type="button" class="px-4 sm:px-5 py-2 rounded-xl bg-transparent text-[#64748B] hover:text-[#0B0F19] font-bold text-xs flex items-center gap-2 transition-all duration-200">
              <i class="fa-solid fa-table-list text-[11px]"></i>
              <span>Comparison Table</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 1. Card Grid View -->
      <div id="offersGrid" class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 items-stretch transition-all duration-300">
${cardsHtml}
      </div>

${comparisonTableHtml}

    </div>
  </section>
`;
}

// Generate the cards HTML from content.json
const contentJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'data', 'content.json'), 'utf8'));

const cardsHtml = contentJson.offers.map(offer => `
      <!-- Offer Card: ${offer.title} -->
      <div class="morphy-card bg-white border border-[#E2E8F0] hover:border-[#0066FF]/40 rounded-3xl overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group">
        <!-- 1. Card Top Image -->
        <div class="relative aspect-[16/10] w-full overflow-hidden bg-[#F1F5F9]">
          <img src="${offer.image || '/assets/offers/ecom.jpg'}" alt="${offer.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
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

            <p class="text-xs sm:text-sm text-[#64748B] leading-relaxed line-clamp-3">
              ${offer.description || ''}
            </p>
          </div>

          <!-- 3. Button -->
          <div class="pt-5 mt-5 border-t border-[#F1F5F9]">
            <a href="${offer.ctaLink || '/contact'}" class="w-full py-3.5 px-5 rounded-full bg-[#F8FAFC] hover:bg-gradient-to-r hover:from-[#0066FF] hover:to-[#0052FF] text-[#0B0F19] hover:text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-between border border-[#E2E8F0] hover:border-transparent shadow-2xs hover:shadow-lg hover:shadow-[#0066FF]/25 active:scale-98">
              <span>${offer.ctaText || 'View Plans & EMI Matrix'}</span>
              <i class="fa-solid fa-arrow-right text-[10px]"></i>
            </a>
          </div>
        </div>
      </div>
`).join('');

const fullSection = getFullOffersSection(cardsHtml);

for (const offerPage of [path.join(rootDir, 'offers.html'), path.join(rootDir, 'offers', 'index.html')]) {
  if (!fs.existsSync(offerPage)) continue;
  let content = fs.readFileSync(offerPage, 'utf8');

  const offersSectionRegex = /<!--\s*HERO & OFFERS GRID SECTION[\s\S]*?<\/section>/i;
  if (content.match(offersSectionRegex)) {
    content = content.replace(offersSectionRegex, fullSection.trim());
    fs.writeFileSync(offerPage, content, 'utf8');
    console.log(`Updated ${offerPage} with Grid + Table dual mode!`);
  }
}


// =========================================================================
// 2. UPDATE app.js and site-hydration.js to handle view switching
// =========================================================================
const appJsPath = path.join(rootDir, 'app.js');
let appJs = fs.readFileSync(appJsPath, 'utf8');

if (!appJs.includes('initOffersViewSwitcher')) {
  const switcherJs = `
/* ==========================================================================
   Offers Dual View Switcher (Card Grid vs Comparison Table)
   ========================================================================== */
function initOffersViewSwitcher() {
  const gridBtn = document.getElementById('viewGridModeBtn');
  const tableBtn = document.getElementById('viewTableModeBtn');
  const gridView = document.getElementById('offersGrid');
  const tableView = document.getElementById('offersTableView');

  if (!gridBtn || !tableBtn || !gridView || !tableView) return;

  function setView(mode) {
    if (mode === 'table') {
      gridView.classList.add('hidden');
      tableView.classList.remove('hidden');

      tableBtn.classList.remove('bg-transparent', 'text-[#64748B]');
      tableBtn.classList.add('bg-[#0066FF]', 'text-white', 'shadow-xs');

      gridBtn.classList.remove('bg-[#0066FF]', 'text-white', 'shadow-xs');
      gridBtn.classList.add('bg-transparent', 'text-[#64748B]');
    } else {
      tableView.classList.add('hidden');
      gridView.classList.remove('hidden');

      gridBtn.classList.remove('bg-transparent', 'text-[#64748B]');
      gridBtn.classList.add('bg-[#0066FF]', 'text-white', 'shadow-xs');

      tableBtn.classList.remove('bg-[#0066FF]', 'text-white', 'shadow-xs');
      tableBtn.classList.add('bg-transparent', 'text-[#64748B]');
    }
  }

  gridBtn.addEventListener('click', () => setView('grid'));
  tableBtn.addEventListener('click', () => setView('table'));
}
`;

  appJs += '\n' + switcherJs;
  appJs = appJs.replace(
    'initMobileMenu();',
    'initMobileMenu();\n  initOffersViewSwitcher();'
  );
  fs.writeFileSync(appJsPath, appJs, 'utf8');
  console.log('Updated app.js with initOffersViewSwitcher!');
}

console.log('Dual view system for packages implemented successfully!');
