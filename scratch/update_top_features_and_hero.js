const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../offers/ecommerce.html');
let html = fs.readFileSync(filePath, 'utf8');

// Update Hero badges
const oldHeroBadges = `<div class="pt-1 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-bold text-[#334155]">
        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E2E8F0] shadow-2xs">
          <i class="fa-solid fa-gauge-high text-[#0066FF]"></i> ১ সেকেন্ডের কম লোডিং
        </span>
        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E2E8F0] shadow-2xs">
          <i class="fa-solid fa-shield-halved text-emerald-600"></i> ১০০% ফুল অ্যাডমিন কন্ট্রোল
        </span>
        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E2E8F0] shadow-2xs">
          <i class="fa-solid fa-truck-fast text-blue-600"></i> Steadfast / Pathao কুরিয়ার ইন্টিগ্রেশন
        </span>
        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E2E8F0] shadow-2xs">
          <i class="fa-solid fa-credit-card text-purple-600"></i> বিকাশ, নগদ ও গেটওয়ে রেডি
        </span>
      </div>`;

const newHeroBadges = `<div class="pt-1 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-bold text-[#334155]">
        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E2E8F0] shadow-2xs">
          <i class="fa-solid fa-gauge-high text-[#0066FF]"></i> 1 সেকেন্ডের কম লোডিং
        </span>
        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E2E8F0] shadow-2xs">
          <i class="fa-solid fa-shield-halved text-emerald-600"></i> 100% ফুল অ্যাডমিন কন্ট্রোল
        </span>
        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E2E8F0] shadow-2xs">
          <i class="fa-solid fa-credit-card text-purple-600"></i> বিকাশ, নগদ, কার্ড ও EMI গেটওয়ে
        </span>
        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E2E8F0] shadow-2xs">
          <i class="fa-solid fa-truck-fast text-blue-600"></i> অটো কুরিয়ার চার্জ ও ট্র্যাকিং
        </span>
      </div>`;

// Update Card 3 & 4 in Top Section
const oldCard3 = `<!-- Module Card 3: Orders & Courier Dispatch -->
        <div class="p-6 bg-[#FAFCFF] border border-[#E2E8F0] rounded-3xl space-y-3 hover:border-[#0066FF]/40 hover:shadow-lg transition-all">
          <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg font-bold">
            <i class="fa-solid fa-box"></i>
          </div>
          <h3 class="text-lg font-black text-[#0B0F19]">৩. অর্ডার ও কুরিয়ার ডিসপ্যাচ</h3>
          <p class="text-xs text-[#64748B] leading-relaxed">
            ইনকমপ্লিট অর্ডার, পেন্ডিং ও কনফার্মড অর্ডার স্ট্যাটাস ফিল্টার এবং Steadfast ও Pathao কুরিয়ারে ১-ক্লিকে অটোমেটেড পার্সেল তৈরি।
          </p>
          <ul class="text-xs text-[#334155] space-y-1.5 pt-2 border-t border-[#E2E8F0]">
            <li>✓ ড্রপড ও ইনকমপ্লিট কার্ট রিকভারি</li>
            <li>✓ ১-ক্লিক স্টেডফাস্ট ও পাঠাও এপিআই</li>
            <li>✓ কাস্টমার কল ও ট্র্যাকিং হিস্ট্রি</li>
          </ul>
        </div>`;

const newCard3 = `<!-- Module Card 3: Orders & Courier Dispatch -->
        <div class="p-6 bg-[#FAFCFF] border border-[#E2E8F0] rounded-3xl space-y-3 hover:border-[#0066FF]/40 hover:shadow-lg transition-all">
          <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg font-bold">
            <i class="fa-solid fa-box"></i>
          </div>
          <h3 class="text-lg font-black text-[#0B0F19]">৩. অর্ডার ও অটো কুরিয়ার চার্জ</h3>
          <p class="text-xs text-[#64748B] leading-relaxed">
            ইনকমপ্লিট অর্ডার ফিল্টার, কাস্টমার অ্যাড্রেস ভিত্তিক অটো কুরিয়ার চার্জ এবং Steadfast ও Pathao কুরিয়ারে ১-ক্লিকে অটোমেটেড পার্সেল তৈরি।
          </p>
          <ul class="text-xs text-[#334155] space-y-1.5 pt-2 border-t border-[#E2E8F0]">
            <li>✓ কাস্টমার অ্যাড্রেস ভিত্তিক অটো কুরিয়ার চার্জ</li>
            <li>✓ ড্রপড ও ইনকমপ্লিট কার্ট রিকভারি</li>
            <li>✓ ১-ক্লিক স্টেডফাস্ট ও পাঠাও এপিআই</li>
          </ul>
        </div>`;

const oldCard4 = `<!-- Module Card 4: Payment Gateways -->
        <div class="p-6 bg-[#FAFCFF] border border-[#E2E8F0] rounded-3xl space-y-3 hover:border-[#0066FF]/40 hover:shadow-lg transition-all">
          <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg font-bold">
            <i class="fa-solid fa-credit-card"></i>
          </div>
          <h3 class="text-lg font-black text-[#0B0F19]">৪. মাল্টিপল পেমেন্ট গেটওয়ে</h3>
          <p class="text-xs text-[#64748B] leading-relaxed">
            বিকাশ মার্চেন্ট, বিকাশ পার্সোনাল সেন্ড মানি (TrxID ভেরিফিকেশনসহ), নগদ ডিরেক্ট, SSLCommerz, PayStation ও aamarPay সহজেই অন-অফ কন্ট্রোল।
          </p>
          <ul class="text-xs text-[#334155] space-y-1.5 pt-2 border-t border-[#E2E8F0]">
            <li>✓ বিকাশ মার্চেন্ট ও পার্সোনাল TrxID</li>
            <li>✓ নগদ, রকেট, উপায় ও ভিসা/মাস্টারকার্ড</li>
            <li>✓ অ্যাডভান্স ডিপোজিট সহ ক্যাশ অন ডেলিভারি</li>
          </ul>
        </div>`;

const newCard4 = `<!-- Module Card 4: Payment Gateways -->
        <div class="p-6 bg-[#FAFCFF] border border-[#E2E8F0] rounded-3xl space-y-3 hover:border-[#0066FF]/40 hover:shadow-lg transition-all">
          <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg font-bold">
            <i class="fa-solid fa-credit-card"></i>
          </div>
          <h3 class="text-lg font-black text-[#0B0F19]">৪. পেমেন্ট গেটওয়ে ও অ্যাডভান্স পেমেন্ট</h3>
          <p class="text-xs text-[#64748B] leading-relaxed">
            বিকাশ, নগদ, কার্ড, EMI System, অর্ডার টাইমে অ্যাডভান্স পেমেন্ট সিস্টেম (ডেলিভারি চার্জ অগ্রিম গ্রহণ) ও ফ্রি পিক্সেল সেটআপ।
          </p>
          <ul class="text-xs text-[#334155] space-y-1.5 pt-2 border-t border-[#E2E8F0]">
            <li>✓ পেমেন্ট গেটওয়ে (বিকাশ, নগদ, কার্ড, EMI System)</li>
            <li>✓ অর্ডার টাইমে অ্যাডভান্স পেমেন্ট সিস্টেম</li>
            <li>✓ ফ্রি পিক্সেল সেটআপ (Facebook Pixel & CAPI)</li>
          </ul>
        </div>`;

html = html.replace(oldHeroBadges, newHeroBadges);
html = html.replace(oldCard3, newCard3);
html = html.replace(oldCard4, newCard4);

fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully updated top section and hero in offers/ecommerce.html');
