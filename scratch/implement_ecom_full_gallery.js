const fs = require('fs');
const path = require('path');

const ecomPath = path.resolve(__dirname, '..', 'offers', 'ecommerce.html');
let ecomHtml = fs.readFileSync(ecomPath, 'utf8');

const oldShowcaseRegex = /<!-- E-Commerce Live Admin & Analytics Showcase -->[\s\S]*?<!-- Feature Highlights Bar -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

const newShowcaseHtml = `<!-- E-Commerce Live Admin, Traffic & Store Intelligence Showcase (6 Live Screenshots) -->
      <div class="pt-6 max-w-5xl mx-auto space-y-4">
        
        <!-- Showcase Navigation Tabs (Scrollable on Mobile) -->
        <div class="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none px-1">
          <button type="button" onclick="switchEcomScreen('analytics')" id="tab-analytics" class="ecom-tab-btn active px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all duration-200 shrink-0 bg-[#0066FF] text-white shadow-md shadow-[#0066FF]/20">
            <i class="fa-solid fa-chart-pie text-[11px]"></i>
            <span>1. Revenue & Sales</span>
          </button>
          <button type="button" onclick="switchEcomScreen('traffic')" id="tab-traffic" class="ecom-tab-btn px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all duration-200 shrink-0 bg-white hover:bg-[#F8FAFC] text-[#64748B] hover:text-[#0B0F19] border border-[#E2E8F0]">
            <i class="fa-solid fa-bolt text-[11px] text-amber-500"></i>
            <span>2. Live Traffic & Funnel</span>
          </button>
          <button type="button" onclick="switchEcomScreen('orders')" id="tab-orders" class="ecom-tab-btn px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all duration-200 shrink-0 bg-white hover:bg-[#F8FAFC] text-[#64748B] hover:text-[#0B0F19] border border-[#E2E8F0]">
            <i class="fa-solid fa-box text-[11px] text-blue-500"></i>
            <span>3. Orders & Courier</span>
          </button>
          <button type="button" onclick="switchEcomScreen('payments')" id="tab-payments" class="ecom-tab-btn px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all duration-200 shrink-0 bg-white hover:bg-[#F8FAFC] text-[#64748B] hover:text-[#0B0F19] border border-[#E2E8F0]">
            <i class="fa-solid fa-credit-card text-[11px] text-emerald-500"></i>
            <span>4. Payment Gateways</span>
          </button>
          <button type="button" onclick="switchEcomScreen('customers')" id="tab-customers" class="ecom-tab-btn px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all duration-200 shrink-0 bg-white hover:bg-[#F8FAFC] text-[#64748B] hover:text-[#0B0F19] border border-[#E2E8F0]">
            <i class="fa-solid fa-users text-[11px] text-indigo-500"></i>
            <span>5. Customer LTV</span>
          </button>
          <button type="button" onclick="switchEcomScreen('billing')" id="tab-billing" class="ecom-tab-btn px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all duration-200 shrink-0 bg-white hover:bg-[#F8FAFC] text-[#64748B] hover:text-[#0B0F19] border border-[#E2E8F0]">
            <i class="fa-solid fa-file-invoice-dollar text-[11px] text-purple-500"></i>
            <span>6. EMI Ledger</span>
          </button>
        </div>

        <!-- Glassmorphic Mac Browser Window Frame -->
        <div class="morphy-card p-2.5 sm:p-4 bg-white border border-[#E2E8F0] rounded-3xl shadow-2xl overflow-hidden group">
          
          <!-- Browser Frame Top Bar -->
          <div class="flex items-center justify-between px-3 py-2 border-b border-[#F1F5F9] mb-2.5 bg-[#FAFCFF] rounded-t-2xl">
            <div class="flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            </div>
            <div class="flex items-center gap-2 px-3 py-1 rounded-lg bg-white border border-[#E2E8F0] text-[11px] font-semibold text-[#64748B] shadow-2xs">
              <i class="fa-solid fa-lock text-[10px] text-emerald-600"></i>
              <span id="screenUrl" class="truncate max-w-[200px] sm:max-w-none">luxora-furniture.com/admin/analytics</span>
            </div>
            <button type="button" onclick="openImageLightbox()" class="text-[10.5px] font-bold text-[#0066FF] hover:text-[#0052FF] bg-[#0066FF]/10 hover:bg-[#0066FF]/15 px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5">
              <i class="fa-solid fa-expand text-[9px]"></i>
              <span class="hidden sm:inline">Inspect Fullscreen</span>
            </button>
          </div>

          <!-- Dynamic Active Image Container (Clickable for Fullscreen) -->
          <div class="relative rounded-2xl overflow-hidden border border-[#E2E8F0]/80 shadow-xs bg-[#F8FAFC] cursor-zoom-in" onclick="openImageLightbox()">
            <img id="activeScreenImg" src="/assets/offers/ecom-admin.png" alt="Luxora Furniture E-Commerce Admin Module" class="w-full h-auto object-contain transition-all duration-300 group-hover:scale-[1.008]" loading="lazy">
            <div class="absolute bottom-3 right-3 bg-black/70 hover:bg-black/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg pointer-events-none">
              <i class="fa-solid fa-magnifying-glass-plus text-xs"></i>
              <span>Click to Zoom</span>
            </div>
          </div>

          <!-- Screenshot Context Info Bar -->
          <div class="mt-3.5 p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-left">
            <div>
              <div id="screenTitle" class="text-xs sm:text-sm font-black text-[#0B0F19]">
                Executive Analytics & Sales Velocity
              </div>
              <div id="screenDesc" class="text-[11px] text-[#64748B] font-medium mt-0.5">
                Real-time lighting mirror sales velocity, conversion telemetry, and executive revenue trajectory.
              </div>
            </div>
            <div class="shrink-0">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Production Ready</span>
              </span>
            </div>
          </div>

        </div>

      </div>

      <!-- Fullscreen Image Lightbox Modal -->
      <div id="imageLightboxModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md transition-all duration-300" onclick="closeImageLightbox()">
        <div class="relative max-w-7xl max-h-[92vh] w-full flex flex-col items-center justify-center" onclick="event.stopPropagation()">
          <button type="button" onclick="closeImageLightbox()" aria-label="Close Lightbox" class="absolute -top-12 right-0 sm:top-4 sm:right-4 z-50 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-md transition-all">
            <i class="fa-solid fa-xmark text-lg"></i>
          </button>
          <img id="lightboxImg" src="/assets/offers/ecom-admin.png" alt="Fullscreen Screenshot Preview" class="w-full h-auto max-h-[88vh] object-contain rounded-2xl shadow-2xl border border-white/10">
          <div id="lightboxCaption" class="mt-3 text-center text-xs font-bold text-white/80">
            Executive Analytics & Sales Velocity (Luxora Furniture Admin)
          </div>
        </div>
      </div>`;

if (oldShowcaseRegex.test(ecomHtml)) {
  ecomHtml = ecomHtml.replace(oldShowcaseRegex, newShowcaseHtml);
} else {
  // Try finding and replacing the container
  const findStr = '<!-- E-Commerce Live Admin & Analytics Showcase -->';
  const startIdx = ecomHtml.indexOf(findStr);
  if (startIdx !== -1) {
    const endStr = '<!-- Smart View Switcher';
    const endIdx = ecomHtml.indexOf(endStr, startIdx);
    if (endIdx !== -1) {
      ecomHtml = ecomHtml.substring(0, startIdx) + newShowcaseHtml + '\n\n      ' + ecomHtml.substring(endIdx);
    }
  }
}

// Add the JS controller for switching screens and lightbox
const scriptAddition = `
  <script>
    const ecomScreens = {
      analytics: {
        title: "Executive Analytics & Sales Velocity",
        desc: "Real-time lighting mirror sales velocity, conversion telemetry, and executive revenue trajectory.",
        url: "luxora-furniture.com/admin/analytics",
        img: "/assets/offers/ecom-admin.png"
      },
      traffic: {
        title: "Live Active Website Traffic & 24h Funnel",
        desc: "Live visitor browsing tracker, hourly conversion buckets (Visitors, Add to Cart, Orders), and drop-off analysis.",
        url: "luxora-furniture.com/admin/visitor-analytics",
        img: "/assets/offers/ecom-traffic.jpg"
      },
      orders: {
        title: "Client Orders & Dispatch Console",
        desc: "All-in-one order status board (Incomplete, Pending, Confirmed) with Steadfast & Pathao courier dispatch.",
        url: "luxora-furniture.com/admin/orders",
        img: "/assets/offers/ecom-orders.png"
      },
      payments: {
        title: "Integrated Payment Gateway Suite",
        desc: "bKash Merchant Payment, bKash Personal Send Money, Nagad Direct, SSLCommerz, PayStation & aamarPay.",
        url: "luxora-furniture.com/admin/payment-gateways",
        img: "/assets/offers/ecom-payments.png"
      },
      customers: {
        title: "Customer Intelligence & Lifetime Value (LTV)",
        desc: "Buyer profiles, total lifetime spend, average order value per customer, repeat buyer rates, and exportable reports.",
        url: "luxora-furniture.com/admin/customers",
        img: "/assets/offers/ecom-customers.png"
      },
      billing: {
        title: "Transparent EMI Ledger & Agency Billing",
        desc: "Contractual website maintenance, monthly hosting dues, verification ledger, and 6-12 month installment schedule.",
        url: "luxora-furniture.com/admin/agency-billing",
        img: "/assets/offers/ecom-billing.png"
      }
    };

    function switchEcomScreen(key) {
      const data = ecomScreens[key];
      if (!data) return;

      const imgEl = document.getElementById('activeScreenImg');
      const titleEl = document.getElementById('screenTitle');
      const descEl = document.getElementById('screenDesc');
      const urlEl = document.getElementById('screenUrl');

      if (imgEl) {
        imgEl.style.opacity = '0.3';
        imgEl.src = data.img;
        imgEl.onload = () => { imgEl.style.opacity = '1'; };
      }
      if (titleEl) titleEl.textContent = data.title;
      if (descEl) descEl.textContent = data.desc;
      if (urlEl) urlEl.textContent = data.url;

      // Update Tab Styles
      document.querySelectorAll('.ecom-tab-btn').forEach(btn => {
        btn.classList.remove('bg-[#0066FF]', 'text-white', 'shadow-md', 'shadow-[#0066FF]/20', 'active');
        btn.classList.add('bg-white', 'hover:bg-[#F8FAFC]', 'text-[#64748B]', 'hover:text-[#0B0F19]', 'border', 'border-[#E2E8F0]');
      });

      const activeBtn = document.getElementById('tab-' + key);
      if (activeBtn) {
        activeBtn.classList.remove('bg-white', 'hover:bg-[#F8FAFC]', 'text-[#64748B]', 'hover:text-[#0B0F19]', 'border', 'border-[#E2E8F0]');
        activeBtn.classList.add('bg-[#0066FF]', 'text-white', 'shadow-md', 'shadow-[#0066FF]/20', 'active');
      }
    }

    function openImageLightbox() {
      const modal = document.getElementById('imageLightboxModal');
      const lightboxImg = document.getElementById('lightboxImg');
      const activeImg = document.getElementById('activeScreenImg');
      const titleEl = document.getElementById('screenTitle');
      const captionEl = document.getElementById('lightboxCaption');

      if (modal && lightboxImg && activeImg) {
        lightboxImg.src = activeImg.src;
        if (captionEl && titleEl) captionEl.textContent = titleEl.textContent + ' (Luxora Furniture Admin)';
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeImageLightbox() {
      const modal = document.getElementById('imageLightboxModal');
      if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      }
    }
  </script>
`;

// Replace or append script
if (!ecomHtml.includes('switchEcomScreen')) {
  ecomHtml = ecomHtml.replace('</body>', scriptAddition + '\n</body>');
}

fs.writeFileSync(ecomPath, ecomHtml, 'utf8');
console.log('Successfully updated offers/ecommerce.html with 6 live screenshot gallery and lightbox!');
