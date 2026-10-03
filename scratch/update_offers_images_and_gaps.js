const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// 1. UPDATE data/content.json & content.json with local image assets
const contentJsonPath = path.join(rootDir, 'data', 'content.json');
let contentData = JSON.parse(fs.readFileSync(contentJsonPath, 'utf8'));

contentData.offers = [
  {
    id: "offer-ecom",
    image: "/assets/offers/ecom.jpg",
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
    image: "/assets/offers/service.jpg",
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
    image: "/assets/offers/portfolio.jpg",
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
console.log('Updated content.json with local image paths!');


// 2. GENERATE COMPACT, REDUCED-GAP CARDS HTML
function generateCompactOfferCardsHtml(offers) {
  return offers.map(offer => {
    return `
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
    `;
  }).join('');
}

const compactCardsHtml = generateCompactOfferCardsHtml(contentData.offers);

// 3. UPDATE offers.html and offers/index.html with reduced gaps
const compactOffersBody = `
  <!-- HERO & OFFERS GRID SECTION (Reduced Gaps) -->
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
      </div>

      <!-- 3-Package Dynamic Card Grid (Managed via Admin CMS) -->
      <div id="offersGrid" class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 items-stretch">
${compactCardsHtml}
      </div>

    </div>
  </section>
`;

for (const offerPagePath of [path.join(rootDir, 'offers.html'), path.join(rootDir, 'offers', 'index.html')]) {
  if (!fs.existsSync(offerPagePath)) continue;
  let pageContent = fs.readFileSync(offerPagePath, 'utf8');

  const offersSectionRegex = /<!--\s*HERO & OFFERS GRID SECTION[\s\S]*?<\/section>/i;
  if (pageContent.match(offersSectionRegex)) {
    pageContent = pageContent.replace(offersSectionRegex, compactOffersBody.trim());
    fs.writeFileSync(offerPagePath, pageContent, 'utf8');
    console.log(`Updated ${offerPagePath} with reduced gap and local images!`);
  }
}

// 4. UPDATE site-hydration.js for fallback local images
const hydrationPath = path.join(rootDir, 'site-hydration.js');
let hydrationJs = fs.readFileSync(hydrationPath, 'utf8');

hydrationJs = hydrationJs.replace(
  `img src="\${offer.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop'}"`,
  `img src="\${offer.image || '/assets/offers/ecom.jpg'}"`
);
fs.writeFileSync(hydrationPath, hydrationJs, 'utf8');

console.log('Finished updating all files!');
