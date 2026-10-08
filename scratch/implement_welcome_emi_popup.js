const fs = require('fs');
const path = require('path');

const ecomPath = path.resolve(__dirname, '..', 'offers', 'ecommerce.html');
let html = fs.readFileSync(ecomPath, 'utf8');

// The Welcome EMI Unlock Popup Modal HTML
const welcomePopupModalHtml = `
  <!-- =========================================================================
       8. WELCOME POPUP: UNLOCK EMI & FREE DOMAIN + 10GB HOSTING (AUTO POPUP)
       ========================================================================= -->
  <div id="welcomePopupModal" class="hidden fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md transition-opacity duration-300">
    <div class="relative w-full max-w-lg p-6 sm:p-8 rounded-[32px] bg-white border border-[#E2E8F0] shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
      
      <!-- Close / Skip Button -->
      <button onclick="closeWelcomePopup()" aria-label="Close Modal" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] flex items-center justify-center hover:bg-[#0066FF] hover:text-white transition-colors">
        <i class="fa-solid fa-xmark text-sm"></i>
      </button>

      <!-- FORM STATE CONTAINER -->
      <div id="popupFormState" class="space-y-5">
        
        <!-- Header & Offer Badge -->
        <div class="text-left space-y-2">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0066FF]/10 text-[#0066FF] text-[11px] font-bold uppercase tracking-wider">
            <i class="fa-solid fa-gift text-xs animate-bounce"></i>
            <span>স্পেশাল আনলক অফার (Special Offer)</span>
          </div>
          
          <h3 class="text-xl sm:text-2xl font-black text-[#0B0F19] tracking-tight leading-snug">
            Unlock the EMI Facilities and get one <span class="text-[#0066FF]">Free Domain with 10GB NVMe SSD Hosting Free</span>!
          </h3>
          
          <p class="text-xs sm:text-[13px] text-[#64748B] leading-relaxed">
            আপনার ই-কমার্স বিজনেসের জন্য সহজ কিস্তি (EMI) সুবিধা এবং ১ম বছরের জন্য ফ্রি ডোমেইন ও ১০ জিবি NVMe ক্লাউড হোস্টিং আনলক করতে নিচের তথ্যগুলো দিন:
          </p>
        </div>

        <!-- Form -->
        <form id="welcomePopupForm" class="space-y-4 pt-1" onsubmit="handleWelcomePopupSubmit(event)">
          
          <!-- Name Field -->
          <div class="space-y-1 text-left">
            <label class="text-xs font-bold text-[#0B0F19]">আপনার নাম (Name) *</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#94A3B8]">
                <i class="fa-solid fa-user text-xs"></i>
              </span>
              <input type="text" id="popupName" required placeholder="মোঃ শাকিল / আপনার নাম" class="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0B0F19] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0066FF] focus:bg-white transition-colors">
            </div>
          </div>

          <!-- WhatsApp Contact Field with Validation -->
          <div class="space-y-1 text-left">
            <div class="flex items-center justify-between">
              <label class="text-xs font-bold text-[#0B0F19]">WhatsApp নম্বর (Whatsapp Contact) *</label>
              <span class="text-[10px] text-emerald-600 font-bold">11 Digits Validation</span>
            </div>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 text-emerald-600">
                <i class="fa-brands fa-whatsapp text-sm"></i>
              </span>
              <input type="tel" id="popupPhone" required placeholder="01XXXXXXXXX বা +8801XXXXXXXXX" oninput="validateWhatsAppNumber(this)" class="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0B0F19] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0066FF] focus:bg-white transition-colors">
            </div>
            <p id="phoneValidationError" class="hidden text-[11px] text-rose-600 font-medium pt-0.5">
              <i class="fa-solid fa-circle-exclamation mr-1"></i>অনুগ্রহ করে একটি সঠিক WhatsApp নম্বর দিন (১১ ডিজিট, যেমন: 017XXXXXXXX)।
            </p>
          </div>

          <!-- Where did you find us Dropdown -->
          <div class="space-y-1 text-left">
            <label class="text-xs font-bold text-[#0B0F19]">আমাদের সম্পর্কে কোথা থেকে জেনেছেন? (Where did you found us) *</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#94A3B8]">
                <i class="fa-solid fa-magnifying-glass text-xs"></i>
              </span>
              <select id="popupSource" required class="w-full pl-9 pr-8 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0B0F19] focus:outline-none focus:border-[#0066FF] focus:bg-white transition-colors appearance-none cursor-pointer">
                <option value="" disabled selected>একটি মাধ্যম নির্বাচন করুন...</option>
                <option value="Facebook / মেটা বিজ্ঞাপন">Facebook / মেটা বিজ্ঞাপন</option>
                <option value="Instagram">Instagram</option>
                <option value="Google Search / গুগল">Google Search / গুগল</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="YouTube">YouTube</option>
                <option value="Friend / Referral / পরিচিত কারো মাধ্যমে">Friend / পরিচিত কারো মাধ্যমে</option>
                <option value="Direct Website / সরাসরি ওয়েবসাইট">Direct Website / সরাসরি ওয়েবসাইট</option>
                <option value="Other / অন্যান্য">Other / অন্যান্য</option>
              </select>
              <span class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#94A3B8]">
                <i class="fa-solid fa-chevron-down text-[10px]"></i>
              </span>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="pt-2 space-y-2">
            <button type="submit" id="popupSubmitBtn" class="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#0052FF] hover:from-[#0052FF] hover:to-[#0040C1] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-[#0066FF]/25 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-98">
              <span>অফারটি আনলক করুন (Unlock EMI & Free Gifts)</span>
              <i class="fa-solid fa-arrow-right text-xs"></i>
            </button>
            <button type="button" onclick="closeWelcomePopup()" class="w-full py-2 text-center text-xs font-semibold text-[#94A3B8] hover:text-[#64748B] transition-colors">
              সরাসরি পেজ দেখতে চান? স্কিপ করুন (Skip to Page)
            </button>
          </div>

        </form>
      </div>


      <!-- CONGRATULATIONS SUCCESS STATE (Hidden by default) -->
      <div id="popupSuccessState" class="hidden text-center space-y-5 py-4 animate-in fade-in zoom-in-95 duration-300">
        
        <!-- Celebration Animated Icon -->
        <div class="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center text-3xl shadow-xl shadow-emerald-500/25 animate-bounce">
          🎉
        </div>

        <!-- Congratulations Text -->
        <div class="space-y-2 max-w-sm mx-auto">
          <div class="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-black uppercase">
            <i class="fa-solid fa-check-circle"></i>
            <span>অফার আনলক সফল হয়েছে!</span>
          </div>

          <h3 class="text-xl sm:text-2xl font-black text-[#0B0F19] tracking-tight leading-snug">
            Congratulations! 🎉
          </h3>
          
          <p class="text-xs sm:text-[13px] font-bold text-emerald-700 bg-emerald-50/80 p-3.5 rounded-2xl border border-emerald-200/80 leading-relaxed">
            You're eligible for <strong>EMI Facilities</strong> and get one <strong>Free Domain with 10GB NVMe SSD Hosting Free</strong>!
          </p>

          <p class="text-xs text-[#64748B] leading-relaxed pt-1">
            আপনার বোনাস ও অফার ডাটাবেজে কনফার্ম করা হয়েছে। এখন নিচের বাটনে ক্লিক করে পুরো ওয়েবসাইটের প্ল্যান ও লাইভ ড্যাশবোর্ড দেখুন:
          </p>
        </div>

        <!-- Action Button to reveal page -->
        <div class="pt-2">
          <button type="button" onclick="closeWelcomePopup()" class="w-full py-3.5 px-6 rounded-2xl bg-[#0066FF] hover:bg-[#0052FF] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-[#0066FF]/25 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-98">
            <span>ওয়েবসাইট ও প্যাকেজগুলো দেখুন (View Packages)</span>
            <i class="fa-solid fa-arrow-right text-xs"></i>
          </button>
        </div>

      </div>

    </div>
  </div>
`;

// Insert the Welcome Popup Modal before </body> if not already present
if (!html.includes('id="welcomePopupModal"')) {
  html = html.replace('</body>', welcomePopupModalHtml + '\n</body>');
}

// Add the JS controller for Auto-Popup & Phone Validation
const welcomePopupScript = `
  <script>
    // WhatsApp Phone Number Validator (Bangladesh / International)
    function validateWhatsAppNumber(input) {
      const val = input.value.trim().replace(/\\s+/g, '');
      const errEl = document.getElementById('phoneValidationError');
      // Must be at least 11 digits, or standard BD phone format 01XXXXXXXXX or +8801XXXXXXXXX
      const bdRegex = /^(?:\\+?8801|01)[3-9]\\d{8}$/;
      const intlRegex = /^\\+?[1-9]\\d{9,14}$/;

      if (val.length > 0 && !bdRegex.test(val) && !intlRegex.test(val)) {
        if (errEl) errEl.classList.remove('hidden');
        input.classList.add('border-rose-500', 'bg-rose-50/30');
        input.classList.remove('border-[#E2E8F0]');
        return false;
      } else {
        if (errEl) errEl.classList.add('hidden');
        input.classList.remove('border-rose-500', 'bg-rose-50/30');
        input.classList.add('border-[#E2E8F0]');
        return true;
      }
    }

    // Auto-Open Popup on first load
    function initWelcomePopup() {
      const popup = document.getElementById('welcomePopupModal');
      if (!popup) return;

      // Check if user has already unlocked in this session
      const alreadyUnlocked = sessionStorage.getItem('ecom_emi_unlocked');
      if (!alreadyUnlocked) {
        setTimeout(() => {
          popup.classList.remove('hidden');
          document.body.style.overflow = 'hidden';
        }, 500); // Smooth half-second delay
      }
    }

    function closeWelcomePopup() {
      const popup = document.getElementById('welcomePopupModal');
      if (popup) {
        popup.classList.add('hidden');
        document.body.style.overflow = '';
      }
    }

    // Handle Form Submit
    async function handleWelcomePopupSubmit(e) {
      e.preventDefault();
      
      const nameInput = document.getElementById('popupName');
      const phoneInput = document.getElementById('popupPhone');
      const sourceInput = document.getElementById('popupSource');
      const submitBtn = document.getElementById('popupSubmitBtn');

      const name = nameInput.value.trim();
      const phone = phoneInput.value.trim();
      const source = sourceInput.value;

      // Validate WhatsApp Number
      const bdRegex = /^(?:\\+?8801|01)[3-9]\\d{8}$/;
      const intlRegex = /^\\+?[1-9]\\d{9,14}$/;
      if (!bdRegex.test(phone) && !intlRegex.test(phone)) {
        const errEl = document.getElementById('phoneValidationError');
        if (errEl) errEl.classList.remove('hidden');
        phoneInput.focus();
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>অফার আনলক হচ্ছে...</span><i class="fa-solid fa-spinner fa-spin text-xs"></i>';

      const payload = {
        name: name,
        phone: phone,
        source: source,
        service: 'E-Commerce Offer Unlocked: EMI Facilities + Free Domain & 10GB NVMe SSD Hosting',
        message: 'Where did you find us: ' + source + ' | Unlocked EMI + Free Domain + 10GB NVMe Hosting',
        date: new Date().toISOString()
      };

      try {
        // Send lead to /api/leads
        await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.log('Lead recording notice:', err);
      }

      // Mark in session so it does not annoy user again
      sessionStorage.setItem('ecom_emi_unlocked', 'true');

      // Transition to Congratulations Success State
      document.getElementById('popupFormState').classList.add('hidden');
      document.getElementById('popupSuccessState').classList.remove('hidden');
    }

    // Trigger Popup on Load
    document.addEventListener('DOMContentLoaded', () => {
      initWelcomePopup();
    });
  </script>
`;

if (!html.includes('function initWelcomePopup()')) {
  html = html.replace('</body>', welcomePopupScript + '\n</body>');
}

fs.writeFileSync(ecomPath, html, 'utf8');
console.log('Successfully implemented Welcome EMI & Free Domain/Hosting Popup in offers/ecommerce.html');
