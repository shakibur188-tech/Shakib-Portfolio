const fs = require('fs');
const path = require('path');

const ecomPath = path.resolve(__dirname, '..', 'offers', 'ecommerce.html');
let html = fs.readFileSync(ecomPath, 'utf8');

// Replace the Welcome Popup Modal HTML with compact Bangla version (No Cross Icon, Reduced Empty Space)
const oldPopupRegex = /<!-- =========================================================================\s*8\. WELCOME POPUP:[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

const newPopupHtml = `<!-- =========================================================================
       8. WELCOME POPUP: UNLOCK EMI & FREE DOMAIN + 10GB HOSTING (COMPACT BANGLA, NO CROSS ICON)
       ========================================================================= -->
  <div id="welcomePopupModal" class="hidden fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300">
    <div class="relative w-full max-w-md p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#E2E8F0] shadow-2xl space-y-3.5 sm:space-y-4 max-h-[95vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
      
      <!-- FORM STATE CONTAINER -->
      <div id="popupFormState" class="space-y-3 sm:space-y-3.5">
        
        <!-- Header & Offer Badge -->
        <div class="text-left space-y-1.5">
          <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0066FF]/10 text-[#0066FF] text-[10.5px] font-bold uppercase tracking-wider">
            <i class="fa-solid fa-gift text-xs animate-bounce"></i>
            <span>স্পেশাল অফার</span>
          </div>
          
          <h3 class="text-lg sm:text-xl font-black text-[#0B0F19] tracking-tight leading-snug">
            সহজ কিস্তি (EMI) সুবিধা আনলক করুন এবং সাথে নিন ১টি <span class="text-[#0066FF]">ফ্রি ডোমেইন ও 10GB NVMe SSD হোস্টিং সম্পূর্ণ ফ্রি</span>!
          </h3>
        </div>

        <!-- Form -->
        <form id="welcomePopupForm" class="space-y-2.5 sm:space-y-3 pt-0.5" onsubmit="handleWelcomePopupSubmit(event)">
          
          <!-- Name Field -->
          <div class="space-y-0.5 text-left">
            <label class="text-[11.5px] font-bold text-[#0B0F19]">আপনার পুরো নাম *</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-[#94A3B8]">
                <i class="fa-solid fa-user text-xs"></i>
              </span>
              <input type="text" id="popupName" required placeholder="মোঃ শাকিল / আপনার নাম" class="w-full pl-8 pr-3 py-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0B0F19] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0066FF] focus:bg-white transition-colors">
            </div>
          </div>

          <!-- WhatsApp Contact Field with Validation -->
          <div class="space-y-0.5 text-left">
            <div class="flex items-center justify-between">
              <label class="text-[11.5px] font-bold text-[#0B0F19]">WhatsApp নম্বর *</label>
              <span class="text-[9.5px] text-emerald-600 font-bold">১১ ডিজিট নম্বর</span>
            </div>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-emerald-600">
                <i class="fa-brands fa-whatsapp text-sm"></i>
              </span>
              <input type="tel" id="popupPhone" required placeholder="01XXXXXXXXX বা +8801XXXXXXXXX" oninput="validateWhatsAppNumber(this)" class="w-full pl-8 pr-3 py-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0B0F19] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0066FF] focus:bg-white transition-colors">
            </div>
            <p id="phoneValidationError" class="hidden text-[10.5px] text-rose-600 font-medium pt-0.5">
              <i class="fa-solid fa-circle-exclamation mr-1"></i>সঠিক WhatsApp নম্বর দিন (১১ ডিজিট, যেমন: 017XXXXXXXX)।
            </p>
          </div>

          <!-- Where did you find us Dropdown -->
          <div class="space-y-0.5 text-left">
            <label class="text-[11.5px] font-bold text-[#0B0F19]">আমাদের সম্পর্কে কোথা থেকে জেনেছেন? *</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-[#94A3B8]">
                <i class="fa-solid fa-magnifying-glass text-xs"></i>
              </span>
              <select id="popupSource" required class="w-full pl-8 pr-7 py-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0B0F19] focus:outline-none focus:border-[#0066FF] focus:bg-white transition-colors appearance-none cursor-pointer">
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
              <span class="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-[#94A3B8]">
                <i class="fa-solid fa-chevron-down text-[10px]"></i>
              </span>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="pt-1.5 space-y-1.5">
            <button type="submit" id="popupSubmitBtn" class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0052FF] hover:from-[#0052FF] hover:to-[#0040C1] text-white font-black text-xs uppercase tracking-wider shadow-md shadow-[#0066FF]/25 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 active:scale-98">
              <span>অফারটি আনলক করুন ➔</span>
            </button>
            <button type="button" onclick="closeWelcomePopup()" class="w-full py-1.5 text-center text-[11px] font-semibold text-[#94A3B8] hover:text-[#64748B] transition-colors">
              সরাসরি পেজে যেতে চান? স্কিপ করুন (Skip to Page)
            </button>
          </div>

        </form>
      </div>


      <!-- CONGRATULATIONS SUCCESS STATE (Hidden by default) -->
      <div id="popupSuccessState" class="hidden text-center space-y-3.5 py-2 animate-in fade-in zoom-in-95 duration-300">
        
        <!-- Celebration Animated Icon -->
        <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/25 animate-bounce">
          🎉
        </div>

        <!-- Congratulations Text -->
        <div class="space-y-1.5 max-w-sm mx-auto">
          <div class="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-black uppercase">
            <i class="fa-solid fa-check-circle"></i>
            <span>অভিনন্দন! Congratulations!</span>
          </div>

          <h3 class="text-lg sm:text-xl font-black text-[#0B0F19] tracking-tight leading-snug">
            অফারটি সফলভাবে আনলক হয়েছে!
          </h3>
          
          <p class="text-xs font-bold text-emerald-700 bg-emerald-50/90 p-3 rounded-xl border border-emerald-200 leading-relaxed">
            আপনি <strong>সহজ কিস্তি (EMI) সুবিধা</strong> এবং সাথে ১টি <strong>ফ্রি ডোমেইন ও 10GB NVMe SSD হোস্টিং সম্পূর্ণ ফ্রি</strong> পাওয়ার জন্য নির্বাচিত হয়েছেন!
          </p>
        </div>

        <!-- Action Button to reveal page -->
        <div class="pt-1">
          <button type="button" onclick="closeWelcomePopup()" class="w-full py-3 px-5 rounded-xl bg-[#0066FF] hover:bg-[#0052FF] text-white font-black text-xs uppercase tracking-wider shadow-md shadow-[#0066FF]/25 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 active:scale-98">
            <span>ওয়েবসাইট ও প্যাকেজগুলো দেখুন ➔</span>
          </button>
        </div>

      </div>

    </div>
  </div>`;

if (oldPopupRegex.test(html)) {
  html = html.replace(oldPopupRegex, newPopupHtml);
} else {
  const findStr = '<!-- =========================================================================\n       8. WELCOME POPUP:';
  const startIdx = html.indexOf(findStr);
  if (startIdx !== -1) {
    const endStr = '<script>';
    const endIdx = html.indexOf(endStr, startIdx);
    if (endIdx !== -1) {
      html = html.substring(0, startIdx) + newPopupHtml + '\n\n  ' + html.substring(endIdx);
    }
  }
}

fs.writeFileSync(ecomPath, html, 'utf8');
console.log('Successfully updated Welcome Popup: in Bangla, removed top cross icon, and reduced empty space for phone view!');
