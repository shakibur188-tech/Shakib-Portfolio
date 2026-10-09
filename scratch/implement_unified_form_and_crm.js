const fs = require('fs');
const path = require('path');

// =========================================================================
// 1. UPDATE offers/ecommerce.html
// =========================================================================
const ecomPath = path.join(__dirname, '../offers/ecommerce.html');
let ecomHtml = fs.readFileSync(ecomPath, 'utf8');

// Replace the modal HTML
const oldModalHtmlRegex = /<!-- =+[\s\n]*7\.\s*INTERACTIVE CLAIM MODAL[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

const newModalHtml = `<!-- =========================================================================
       7. INTERACTIVE UNIFIED BOOKING MODAL (বাংলা)
       ========================================================================= -->
  <div id="offerModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
    <div class="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
      
      <!-- Close Button -->
      <button onclick="closeOfferModal()" aria-label="Close Modal" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#0B0F19] flex items-center justify-center hover:bg-[#0066FF] hover:text-white transition-colors">
        <i class="fa-solid fa-xmark"></i>
      </button>

      <!-- Modal Header -->
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0066FF]/10 text-[#0066FF] text-[10.5px] font-bold uppercase tracking-wider">
          <i class="fa-solid fa-tag text-[#0066FF]"></i>
          <span>ই-কমার্স প্যাকেজ বুকিং</span>
        </div>
        <h3 class="text-xl sm:text-2xl font-black text-[#0B0F19] mt-2" id="modalOfferTitle">
          প্যাকেজ বুকিং ফর্ম
        </h3>
        <p class="text-xs font-semibold text-[#64748B] mt-1" id="modalOfferSub">
          আপনার তথ্য দিন — আমরা দ্রুত আপনার সাথে যোগাযোগ করব
        </p>
      </div>

      <!-- Form -->
      <form id="offerBookingForm" class="space-y-4">
        
        <!-- 1. Name -->
        <div class="space-y-1">
          <label class="text-xs font-bold text-[#0B0F19]">আপনার নাম *</label>
          <input type="text" id="modalName" required placeholder="মোঃ রহিম" class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0B0F19] font-medium focus:outline-none focus:border-[#0066FF]">
        </div>

        <!-- 2. Contact & Email in 2 columns -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="space-y-1">
            <label class="text-xs font-bold text-[#0B0F19]">মোবাইল / WhatsApp নম্বর *</label>
            <input type="tel" id="modalPhone" required placeholder="017XXXXXXXX" class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0B0F19] font-medium focus:outline-none focus:border-[#0066FF]">
          </div>
          <div class="space-y-1">
            <label class="text-xs font-bold text-[#0B0F19]">ইমেইল এড্রেস *</label>
            <input type="email" id="modalEmail" required placeholder="rahim@brand.com" class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0B0F19] font-medium focus:outline-none focus:border-[#0066FF]">
          </div>
        </div>

        <!-- 3. Which package he wants to take (Dropdown) -->
        <div class="space-y-1">
          <label class="text-xs font-bold text-[#0B0F19]">যে প্যাকেজটি নিতে চান *</label>
          <select id="modalPackage" required class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0B0F19] font-bold focus:outline-none focus:border-[#0066FF]">
            <option value="Startup Plan (12-Mo EMI) - ৳ 2,500/মাস">Startup Plan (12-Mo EMI) - ৳ 2,500/মাস (মোট ৳ 30,000)</option>
            <option value="Accelerate Plan (6-Mo EMI) - ৳ 4,500/মাস">Accelerate Plan (6-Mo EMI) - ৳ 4,500/মাস (মোট ৳ 27,000)</option>
            <option value="Momentum Plan (3-Mo EMI) - ৳ 8,500/মাস">Momentum Plan (3-Mo EMI) - ৳ 8,500/মাস (মোট ৳ 25,500)</option>
            <option value="Founder Plan (Pay In Full) - ৳ 19,990 এককালীন">Founder Plan (Pay In Full) - ৳ 19,990 এককালীন (Save 67%)</option>
          </select>
        </div>

        <!-- 4. Details about the business -->
        <div class="space-y-1">
          <label class="text-xs font-bold text-[#0B0F19]">বিজনেসের বিবরণ বা কোনো বিশেষ রিকোয়ারমেন্ট *</label>
          <textarea id="modalMessage" rows="3" required placeholder="আপনার প্রোডাক্ট বা বিজনেসের ধরন, শপ/পেইজের নাম, টার্গেট লঞ্চ টাইম..." class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0B0F19] font-medium focus:outline-none focus:border-[#0066FF]"></textarea>
        </div>

        <!-- Alert Box -->
        <div id="modalAlertBox" class="hidden p-3.5 rounded-xl text-xs font-semibold"></div>

        <!-- Action Buttons -->
        <div class="pt-2 flex flex-col sm:flex-row gap-2.5">
          <button type="submit" id="modalSubmitBtn" class="btn-morphy-primary flex-1 justify-center text-xs py-3.5">
            <span>প্যাকেজ বুকিং সাবমিট করুন</span>
            <i class="fa-solid fa-paper-plane text-xs"></i>
          </button>
          <button type="button" onclick="directWhatsAppClaim()" class="px-4 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5B] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98">
            <i class="fa-brands fa-whatsapp text-sm"></i>
            <span>WhatsApp-এ পাঠান</span>
          </button>
        </div>

      </form>

    </div>
  </div>`;

if (oldModalHtmlRegex.test(ecomHtml)) {
  ecomHtml = ecomHtml.replace(oldModalHtmlRegex, newModalHtml);
  console.log('Updated modal HTML in offers/ecommerce.html');
}

// Update the script handlers in offers/ecommerce.html
const oldScriptRegex = /\/\/ Modal Controller[\s\S]*?bookingForm\.addEventListener\('submit'[\s\S]*?\}\);\s*\}\s*\}\);/m;

const newScriptLogic = `// Modal Controller
    function openOfferModal(title, sub) {
      const packageSelect = document.getElementById('modalPackage');
      if (packageSelect && title) {
        // Find matching option
        for (let i = 0; i < packageSelect.options.length; i++) {
          if (packageSelect.options[i].value.toLowerCase().includes(title.toLowerCase().split(' ')[0])) {
            packageSelect.selectedIndex = i;
            break;
          }
        }
      }
      if (document.getElementById('modalOfferTitle')) {
        document.getElementById('modalOfferTitle').textContent = title || 'প্যাকেজ বুকিং ফর্ম';
      }
      if (document.getElementById('modalOfferSub')) {
        document.getElementById('modalOfferSub').textContent = sub || 'আপনার তথ্য দিন — আমরা দ্রুত আপনার সাথে যোগাযোগ করব';
      }
      const modal = document.getElementById('offerModal');
      if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeOfferModal() {
      const modal = document.getElementById('offerModal');
      if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
      }
    }

    function directWhatsAppClaim() {
      const selectedPkg = document.getElementById('modalPackage')?.value || 'E-Commerce Package';
      const name = document.getElementById('modalName')?.value.trim() || 'Client';
      const phone = document.getElementById('modalPhone')?.value.trim() || '';
      const email = document.getElementById('modalEmail')?.value.trim() || '';
      const details = document.getElementById('modalMessage')?.value.trim() || 'Ready to start';
      
      let msg = \`*E-Commerce Package Booking*\` +
        \`\\n\\n*Package:* \${selectedPkg}\` +
        \`\\n*Name:* \${name}\` +
        \`\\n*Phone:* \${phone}\` +
        \`\\n*Email:* \${email}\` +
        \`\\n*Business Details:* \${details}\`;
        
      window.open('https://wa.me/8801838070468?text=' + encodeURIComponent(msg), '_blank');
    }

    
    // Interactive View Switcher (Mobile: Cards First, PC: Table First)
    function initPricingViewToggle() {
      const cardsBtn = document.getElementById('viewCardsBtn');
      const tableBtn = document.getElementById('viewTableBtn');
      const cardsView = document.getElementById('pricingCardsView');
      const tableView = document.getElementById('pricingTableView');

      if (!cardsBtn || !tableBtn || !cardsView || !tableView) return;

      function setView(mode) {
        if (mode === 'cards') {
          tableView.classList.add('hidden');
          cardsView.classList.remove('hidden');
          cardsBtn.className = 'px-4 sm:px-5 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all duration-200 bg-[#0066FF] text-white shadow-xs';
          tableBtn.className = 'px-4 sm:px-5 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all duration-200 bg-transparent text-[#64748B] hover:text-[#0B0F19]';
        } else {
          cardsView.classList.add('hidden');
          tableView.classList.remove('hidden');
          tableBtn.className = 'px-4 sm:px-5 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all duration-200 bg-[#0066FF] text-white shadow-xs';
          cardsBtn.className = 'px-4 sm:px-5 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all duration-200 bg-transparent text-[#64748B] hover:text-[#0B0F19]';
        }
      }

      // Default smart check: Desktop (>=768px) shows Table, Phone (<768px) shows Cards
      const isMobile = window.innerWidth < 768;
      setView(isMobile ? 'cards' : 'table');

      cardsBtn.onclick = function() { setView('cards'); };
      tableBtn.onclick = function() { setView('table'); };
    }


    document.addEventListener('DOMContentLoaded', () => {
      initPricingViewToggle();

      const bookingForm = document.getElementById('offerBookingForm');
      if (bookingForm) {
        bookingForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          const btn = document.getElementById('modalSubmitBtn');
          const alertBox = document.getElementById('modalAlertBox');
          
          const name = document.getElementById('modalName').value.trim();
          const phone = document.getElementById('modalPhone').value.trim();
          const email = document.getElementById('modalEmail').value.trim();
          const selectedPackage = document.getElementById('modalPackage').value;
          const message = document.getElementById('modalMessage').value.trim();

          btn.disabled = true;
          btn.innerHTML = '<span>বুকিং প্রসেস হচ্ছে...</span><i class="fa-solid fa-spinner fa-spin text-xs"></i>';
          
          const payload = {
            name: name,
            email: email,
            phone: phone,
            services: selectedPackage,
            budget: selectedPackage,
            message: message,
            source: 'offers/ecommerce',
            status: 'new',
            notes: '',
            date: new Date().toISOString()
          };

          try {
            const res = await fetch('/api/leads', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });

            alertBox.classList.remove('hidden', 'bg-rose-50', 'text-rose-700', 'border-rose-200');
            alertBox.classList.add('bg-emerald-50', 'text-emerald-700', 'border', 'border-emerald-200');
            alertBox.innerHTML = '<i class="fa-solid fa-circle-check mr-2"></i>ধন্যবাদ! আপনার প্যাকেজ বুকিং সফলভাবে জমা হয়েছে। আমরা দ্রুত যোগাযোগ করব।';
            
            bookingForm.reset();
            btn.innerHTML = '<span>✓ বুকিং সফল হয়েছে</span>';
            
            setTimeout(() => {
              closeOfferModal();
              btn.disabled = false;
              btn.innerHTML = '<span>প্যাকেজ বুকিং সাবমিট করুন</span><i class="fa-solid fa-paper-plane text-xs"></i>';
              alertBox.classList.add('hidden');
            }, 3000);
          } catch (err) {
            console.error(err);
            alertBox.classList.remove('hidden', 'bg-emerald-50', 'text-emerald-700', 'border-emerald-200');
            alertBox.classList.add('bg-rose-50', 'text-rose-700', 'border', 'border-rose-200');
            alertBox.innerHTML = '<i class="fa-solid fa-triangle-exclamation mr-2"></i>বুকিং জমা দিতে সমস্যা হয়েছে। সরাসরি WhatsApp-এ যোগাযোগ করুন।';
            btn.disabled = false;
            btn.innerHTML = '<span>আবার চেষ্টা করুন</span>';
          }
        });
      }
    });`;

if (oldScriptRegex.test(ecomHtml)) {
  ecomHtml = ecomHtml.replace(oldScriptRegex, newScriptLogic);
  console.log('Updated modal script handlers in offers/ecommerce.html');
}

fs.writeFileSync(ecomPath, ecomHtml, 'utf8');
console.log('Successfully saved offers/ecommerce.html');
