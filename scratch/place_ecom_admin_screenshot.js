const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// 1. Update content.json and data/content.json
['content.json', 'data/content.json'].forEach(relPath => {
  const filePath = path.join(rootDir, relPath);
  if (fs.existsSync(filePath)) {
    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (data.offers) {
      data.offers = data.offers.map(offer => {
        if (offer.id === 'offer-ecom' || offer.ctaLink === '/offers/ecommerce') {
          return {
            ...offer,
            image: '/assets/offers/ecom-admin.png'
          };
        }
        return offer;
      });
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`Updated ${relPath} with ecom-admin.png`);
    }
  }
});

// 2. Update offers.html and offers/index.html
['offers.html', 'offers/index.html'].forEach(relPath => {
  const filePath = path.join(rootDir, relPath);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/\/assets\/offers\/ecom\.jpg/g, '/assets/offers/ecom-admin.png');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${relPath} image src`);
  }
});

// 3. Update offers/ecommerce.html with the screenshot showcase section
const ecomPath = path.join(rootDir, 'offers', 'ecommerce.html');
if (fs.existsSync(ecomPath)) {
  let ecomHtml = fs.readFileSync(ecomPath, 'utf8');

  // Let's craft the high-converting showcase component
  const showcaseHtml = `
      <!-- E-Commerce Live Admin & Analytics Showcase -->
      <div class="pt-4 max-w-5xl mx-auto">
        <div class="morphy-card p-2 sm:p-4 bg-white border border-[#E2E8F0] rounded-3xl shadow-xl overflow-hidden group">
          <!-- Browser Frame Top Bar -->
          <div class="flex items-center justify-between px-3 py-2 border-b border-[#F1F5F9] mb-2 bg-[#FAFCFF] rounded-t-2xl">
            <div class="flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            </div>
            <div class="flex items-center gap-2 px-3 py-1 rounded-lg bg-white border border-[#E2E8F0] text-[11px] font-semibold text-[#64748B]">
              <i class="fa-solid fa-lock text-[10px] text-emerald-600"></i>
              <span class="truncate max-w-[200px] sm:max-w-none">luxora-furniture.com/admin/analytics</span>
            </div>
            <span class="text-[10px] font-bold text-[#0066FF] bg-[#0066FF]/10 px-2.5 py-0.5 rounded-md shrink-0">Live Storefront Admin</span>
          </div>

          <!-- Screenshot Frame -->
          <div class="relative rounded-2xl overflow-hidden border border-[#E2E8F0]/80 shadow-xs bg-[#F8FAFC]">
            <img src="/assets/offers/ecom-admin.png" alt="Luxora Furniture Live E-Commerce Admin Analytics & Management Dashboard" class="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]" loading="lazy">
          </div>

          <!-- Feature Highlights Bar -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 px-1 text-left">
            <div class="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div class="text-[9.5px] font-extrabold uppercase text-[#64748B]">Real-Time Telemetry</div>
              <div class="text-xs font-black text-[#0B0F19] mt-0.5">Live Sales & AOV Tracking</div>
            </div>
            <div class="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div class="text-[9.5px] font-extrabold uppercase text-[#64748B]">Payment Engines</div>
              <div class="text-xs font-black text-[#0B0F19] mt-0.5">bKash, Nagad & SSLCommerz</div>
            </div>
            <div class="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div class="text-[9.5px] font-extrabold uppercase text-[#64748B]">Visual CMS Builder</div>
              <div class="text-xs font-black text-[#0B0F19] mt-0.5">10+ Header/Footer Layouts</div>
            </div>
            <div class="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div class="text-[9.5px] font-extrabold uppercase text-[#64748B]">Conversion Shield</div>
              <div class="text-xs font-black text-[#0B0F19] mt-0.5">Cart Recovery & Pixels</div>
            </div>
          </div>
        </div>
      </div>
  `;

  // Place showcaseHtml inside the hero section, before the switcher
  const heroTarget = `<div class="pt-3 flex items-center justify-center">
        <div class="p-1 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs inline-flex items-center gap-1">`;

  if (ecomHtml.includes(heroTarget)) {
    ecomHtml = ecomHtml.replace(heroTarget, showcaseHtml + '\n\n      ' + heroTarget);
    fs.writeFileSync(ecomPath, ecomHtml, 'utf8');
    console.log('Successfully placed screenshot showcase in offers/ecommerce.html');
  } else {
    console.log('Hero target not found in offers/ecommerce.html, checking alternative insertion point...');
  }
}
