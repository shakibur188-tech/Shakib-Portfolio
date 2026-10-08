const fs = require('fs');
const path = require('path');

const ecomPath = path.resolve(__dirname, '..', 'offers', 'ecommerce.html');
let html = fs.readFileSync(ecomPath, 'utf8');

// 1. Updated 4-Card View with all complete specs matching the matrix table
const updatedCardsViewHtml = `<!-- 1. CARD GRID VIEW (Default on Mobile) -->
      <div id="pricingCardsView" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        
        <!-- Plan 1: 12-Month EMI (Startup Plan) -->
        <div class="morphy-card p-6 bg-white border border-[#E2E8F0] rounded-3xl flex flex-col justify-between space-y-5 hover:border-[#0066FF]/40 hover:shadow-xl transition-all">
          <div>
            <div class="flex items-center justify-between">
              <span class="text-[10.5px] font-black uppercase text-[#64748B] bg-[#F8FAFC] px-2.5 py-1 rounded-md border border-[#E2E8F0]">১২ মাসের কিস্তি</span>
              <span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">সেভ ৫০%</span>
            </div>
            <h3 class="text-xl font-black text-[#0B0F19] mt-3">Startup প্ল্যান</h3>
            <div class="text-2xl font-black text-[#0B0F19] mt-1">৳ ২,৫০০ <span class="text-xs text-[#64748B] font-normal font-bengali">/ মাস</span></div>
            <p class="text-xs font-bold text-[#0066FF] mt-1 font-eng">Total ৳ 30,000 (12 Installments)</p>
            
            <ul class="space-y-2 pt-4 border-t border-[#E2E8F0] text-xs text-[#475569] font-medium leading-relaxed">
              <li>✓ সম্পূর্ণ কাস্টমাইজড ই-কমার্স স্টোর</li>
              <li>✓ লোডিং স্পিড: ১ সেকেন্ডের কম</li>
              <li>✓ মোবাইল ও ট্যাব ১০০% অপ্টিমাইজড</li>
              <li>✓ ফুল অ্যাডমিন ড্যাশবোর্ড অ্যাক্সেস</li>
              <li>✓ ফ্রি ডোমেইন (.com/.net) ও SSL (১ম বছর ফ্রি)</li>
              <li>✓ 10 GB NVMe ক্লাউড হোস্টিং (১ম বছর ফ্রি)</li>
              <li>✓ পেমেন্ট গেটওয়ে (বিকাশ, নগদ, কার্ড)</li>
              <li>✓ ইনকমপ্লিট কার্ট রিকভারি</li>
              <li>✓ কুরিয়ার এপিআই (Steadfast ও Pathao)</li>
              <li>✓ <strong>২ টি বিজনেস ইমেইল</strong></li>
              <li>✓ <strong>cPanel হ্যান্ডওভার: ১২ মাস পর</strong></li>
            </ul>
          </div>
          <button onclick="openOfferModal('Startup Plan (12-Mo EMI)', '৳২,৫০০/মাস (মোট ৳৩০,০০০)')" class="w-full py-3 rounded-xl bg-[#F8FAFC] hover:bg-[#0066FF] hover:text-white font-bold text-xs text-[#0B0F19] transition-all border border-[#E2E8F0] shadow-2xs">
            প্যাকেজটি বেছে নিন
          </button>
        </div>

        <!-- Plan 2: 6-Month EMI (Accelerate Plan) -->
        <div class="morphy-card p-6 bg-white border border-[#E2E8F0] rounded-3xl flex flex-col justify-between space-y-5 hover:border-[#0066FF]/40 hover:shadow-xl transition-all">
          <div>
            <div class="flex items-center justify-between">
              <span class="text-[10.5px] font-black uppercase text-[#64748B] bg-[#F8FAFC] px-2.5 py-1 rounded-md border border-[#E2E8F0]">৬ মাসের কিস্তি</span>
              <span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">সেভ ৫৫%</span>
            </div>
            <h3 class="text-xl font-black text-[#0B0F19] mt-3">Accelerate প্ল্যান</h3>
            <div class="text-2xl font-black text-[#0B0F19] mt-1">৳ ৪,৫০০ <span class="text-xs text-[#64748B] font-normal font-bengali">/ মাস</span></div>
            <p class="text-xs font-bold text-[#0066FF] mt-1 font-eng">Total ৳ 27,000 (6 Installments)</p>
            
            <ul class="space-y-2 pt-4 border-t border-[#E2E8F0] text-xs text-[#475569] font-medium leading-relaxed">
              <li>✓ সম্পূর্ণ কাস্টমাইজড ই-কমার্স স্টোর</li>
              <li>✓ লোডিং স্পিড: ১ সেকেন্ডের কম</li>
              <li>✓ মোবাইল ও ট্যাব ১০০% অপ্টিমাইজড</li>
              <li>✓ ফুল অ্যাডমিন ড্যাশবোর্ড অ্যাক্সেস</li>
              <li>✓ ফ্রি ডোমেইন (.com/.net) ও SSL (১ম বছর ফ্রি)</li>
              <li>✓ 10 GB NVMe ক্লাউড হোস্টিং (১ম বছর ফ্রি)</li>
              <li>✓ পেমেন্ট গেটওয়ে (বিকাশ, নগদ, কার্ড)</li>
              <li>✓ ইনকমপ্লিট কার্ট রিকভারি</li>
              <li>✓ কুরিয়ার এপিআই (Steadfast ও Pathao)</li>
              <li>✓ <strong>২ টি বিজনেস ইমেইল</strong></li>
              <li>✓ <strong>cPanel হ্যান্ডওভার: ৬ মাস পর</strong></li>
            </ul>
          </div>
          <button onclick="openOfferModal('Accelerate Plan (6-Mo EMI)', '৳৪,৫০০/মাস (মোট ৳২৭,০০০)')" class="w-full py-3 rounded-xl bg-[#F8FAFC] hover:bg-[#0066FF] hover:text-white font-bold text-xs text-[#0B0F19] transition-all border border-[#E2E8F0] shadow-2xs">
            প্যাকেজটি বেছে নিন
          </button>
        </div>

        <!-- Plan 3: 3-Month EMI (Momentum Plan) -->
        <div class="morphy-card p-6 bg-white border border-[#E2E8F0] rounded-3xl flex flex-col justify-between space-y-5 hover:border-[#0066FF]/40 hover:shadow-xl transition-all">
          <div>
            <div class="flex items-center justify-between">
              <span class="text-[10.5px] font-black uppercase text-[#64748B] bg-[#F8FAFC] px-2.5 py-1 rounded-md border border-[#E2E8F0]">৩ মাসের কিস্তি</span>
              <span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">সেভ ৫৭.৫%</span>
            </div>
            <h3 class="text-xl font-black text-[#0B0F19] mt-3">Momentum প্ল্যান</h3>
            <div class="text-2xl font-black text-[#0B0F19] mt-1">৳ ৮,৫০০ <span class="text-xs text-[#64748B] font-normal font-bengali">/ মাস</span></div>
            <p class="text-xs font-bold text-[#0066FF] mt-1 font-eng">Total ৳ 25,500 (3 Installments)</p>
            
            <ul class="space-y-2 pt-4 border-t border-[#E2E8F0] text-xs text-[#475569] font-medium leading-relaxed">
              <li>✓ সম্পূর্ণ কাস্টমাইজড ই-কমার্স স্টোর</li>
              <li>✓ লোডিং স্পিড: ১ সেকেন্ডের কম</li>
              <li>✓ মোবাইল ও ট্যাব ১০০% অপ্টিমাইজড</li>
              <li>✓ ফুল অ্যাডমিন ড্যাশবোর্ড অ্যাক্সেস</li>
              <li>✓ ফ্রি ডোমেইন (.com/.net) ও SSL (১ম বছর ফ্রি)</li>
              <li>✓ 10 GB NVMe ক্লাউড হোস্টিং (১ম বছর ফ্রি)</li>
              <li>✓ পেমেন্ট গেটওয়ে (বিকাশ, নগদ, কার্ড)</li>
              <li>✓ ইনকমপ্লিট কার্ট রিকভারি</li>
              <li>✓ কুরিয়ার এপিআই (Steadfast ও Pathao)</li>
              <li>✓ <strong>২ টি বিজনেস ইমেইল</strong></li>
              <li>✓ <strong>cPanel হ্যান্ডওভার: ৩ মাস পর</strong></li>
            </ul>
          </div>
          <button onclick="openOfferModal('Momentum Plan (3-Mo EMI)', '৳৮,৫০০/মাস (মোট ৳২৫,৫০০)')" class="w-full py-3 rounded-xl bg-[#F8FAFC] hover:bg-[#0066FF] hover:text-white font-bold text-xs text-[#0B0F19] transition-all border border-[#E2E8F0] shadow-2xs">
            প্যাকেজটি বেছে নিন
          </button>
        </div>

        <!-- Plan 4: Pay In Full (Founder Plan) -->
        <div class="morphy-card p-6 bg-white border-2 border-[#0066FF] rounded-3xl flex flex-col justify-between space-y-5 shadow-xl shadow-[#0066FF]/15 relative hover:-translate-y-1 transition-all">
          <div class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#0066FF] text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
            সর্বোচ্চ ডিসকাউন্ট 🔥
          </div>
          <div>
            <div class="flex items-center justify-between">
              <span class="text-[10.5px] font-black uppercase text-[#0066FF] bg-[#0066FF]/10 px-2.5 py-1 rounded-md border border-[#0066FF]/20">এককালীন পেমেন্ট</span>
              <span class="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Save 67%</span>
            </div>
            <h3 class="text-xl font-black text-[#0B0F19] mt-3">Founder প্ল্যান</h3>
            <div class="text-2xl font-black text-[#0B0F19] mt-1">৳ ১৯,৯৯০ <span class="text-xs text-[#64748B] font-normal font-bengali">এককালীন</span></div>
            <p class="text-xs font-black text-emerald-600 mt-1 font-eng">One-Time (Save 67% Discount)</p>
            
            <ul class="space-y-2 pt-4 border-t border-[#F1F5F9] text-xs text-[#334155] font-medium leading-relaxed">
              <li>✓ সম্পূর্ণ কাস্টমাইজড ই-কমার্স স্টোর</li>
              <li>✓ লোডিং স্পিড: ১ সেকেন্ডের কম</li>
              <li>✓ মোবাইল ও ট্যাব ১০০% অপ্টিমাইজড</li>
              <li>✓ <strong>১ম দিনেই ফুল মাস্টার অ্যাক্সেস</strong></li>
              <li>✓ ফ্রি ডোমেইন (.com/.net) ও SSL (১ম বছর ফ্রি)</li>
              <li>✓ 10 GB NVMe ক্লাউড হোস্টিং (১ম বছর ফ্রি)</li>
              <li>✓ পেমেন্ট গেটওয়ে (বিকাশ, নগদ, কার্ড)</li>
              <li>✓ ইনকমপ্লিট কার্ট রিকভারি</li>
              <li>✓ কুরিয়ার এপিআই (Steadfast ও Pathao)</li>
              <li>✓ <strong>আনলিমিটেড বিজনেস ইমেইল</strong></li>
              <li>✓ <strong>cPanel হ্যান্ডওভার: তাত্ক্ষণিক (১ম দিনে)</strong></li>
            </ul>
          </div>
          <button onclick="openOfferModal('Founder Plan (Pay In Full)', '৳১৯,৯৯০ এককালীন (Save 67%)')" class="w-full py-3.5 rounded-xl bg-[#0066FF] hover:bg-[#0052FF] font-black text-xs text-white transition-all shadow-md shadow-[#0066FF]/30 active:scale-98">
            অফারটি ক্লেইম করুন ➔
          </button>
        </div>

      </div>`;

// 2. Updated Comparison Table View with clean Bengali labels & correct email counts
const updatedTableViewHtml = `<!-- 2. COMPARISON TABLE VIEW (Default on Desktop) -->
      <div id="pricingTableView" class="hidden morphy-card p-0 rounded-3xl bg-white border border-[#E2E8F0] shadow-xl overflow-hidden">
        
        <!-- Mobile Horizontal Scroll Alert -->
        <div class="md:hidden flex items-center justify-center gap-2 p-3 text-xs font-bold text-[#64748B] bg-[#F8FAFC] border-b border-[#E2E8F0]">
          <i class="fa-solid fa-arrows-left-right text-[#0066FF] animate-pulse"></i>
          <span>৪টি প্ল্যান তুলনা করতে ডানে-বামে সোয়াইপ করুন</span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr class="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                <th class="p-5 sm:p-6 text-sm font-black text-[#0B0F19] w-[24%]">মডিউল ও ফিচারসমূহ</th>
                
                <th class="p-5 sm:p-6 text-center border-l border-[#E2E8F0] w-[19%]">
                  <div class="text-xs font-black uppercase text-[#64748B]">Startup</div>
                  <div class="text-xs font-bold text-[#0066FF] mt-0.5">১২ মাসের কিস্তি</div>
                  <div class="text-lg font-black text-[#0B0F19] mt-2">৳ ২,৫০০ <span class="text-[10px] font-normal text-[#64748B]">/ মাস</span></div>
                  <div class="text-[10px] font-bold text-[#0066FF] bg-[#0066FF]/10 py-1 px-2 rounded-lg mt-1 inline-block font-eng">মোট ৳ ৩০,০০০</div>
                </th>

                <th class="p-5 sm:p-6 text-center border-l border-[#E2E8F0] w-[19%]">
                  <div class="text-xs font-black uppercase text-[#64748B]">Accelerate</div>
                  <div class="text-xs font-bold text-[#0066FF] mt-0.5">৬ মাসের কিস্তি</div>
                  <div class="text-lg font-black text-[#0B0F19] mt-2">৳ ৪,৫০০ <span class="text-[10px] font-normal text-[#64748B]">/ মাস</span></div>
                  <div class="text-[10px] font-bold text-[#0066FF] bg-[#0066FF]/10 py-1 px-2 rounded-lg mt-1 inline-block font-eng">মোট ৳ ২৭,০০০</div>
                </th>

                <th class="p-5 sm:p-6 text-center border-l border-[#E2E8F0] w-[19%]">
                  <div class="text-xs font-black uppercase text-[#64748B]">Momentum</div>
                  <div class="text-xs font-bold text-[#0066FF] mt-0.5">৩ মাসের কিস্তি</div>
                  <div class="text-lg font-black text-[#0B0F19] mt-2">৳ ৮,৫০০ <span class="text-[10px] font-normal text-[#64748B]">/ মাস</span></div>
                  <div class="text-[10px] font-bold text-[#0066FF] bg-[#0066FF]/10 py-1 px-2 rounded-lg mt-1 inline-block font-eng">মোট ৳ ২৫,৫০০</div>
                </th>

                <th class="p-5 sm:p-6 text-center border-l-2 border-[#0066FF] bg-[#0066FF]/5 w-[19%] relative">
                  <div class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#0066FF] text-white text-[9px] font-black uppercase tracking-wider">বেস্ট ভ্যালু</div>
                  <div class="text-xs font-black uppercase text-[#0066FF]">Founder</div>
                  <div class="text-xs font-bold text-[#0B0F19] mt-0.5">এককালীন পেমেন্ট</div>
                  <div class="text-xl font-black text-[#0B0F19] mt-2">৳ ১৯,৯৯০ <span class="text-[10px] font-normal text-[#64748B]">এককালীন</span></div>
                  <div class="text-[10px] font-black text-white bg-[#0066FF] py-1 px-2 rounded-lg mt-1 inline-block shadow-xs font-eng">সেভ ৬৭% ডিসকাউন্ট</div>
                </th>
              </tr>
            </thead>
            
            <tbody class="divide-y divide-[#F1F5F9] text-xs font-medium text-[#475569]">
              <tr class="hover:bg-[#F8FAFC]">
                <td class="p-4 sm:p-5 font-bold text-[#0B0F19]">ওয়েবসাইট পারফরম্যান্স</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">১ সেকেন্ডের কম</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">১ সেকেন্ডের কম</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">১ সেকেন্ডের কম</td>
                <td class="p-4 sm:p-5 text-center border-l-2 border-[#0066FF] bg-[#0066FF]/5 font-bold text-[#0B0F19]">১ সেকেন্ডের কম</td>
              </tr>
              <tr class="hover:bg-[#F8FAFC]">
                <td class="p-4 sm:p-5 font-bold text-[#0B0F19]">মোবাইল ও ট্যাব অপ্টিমাইজড</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-emerald-600 font-bold text-base">✓</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-emerald-600 font-bold text-base">✓</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-emerald-600 font-bold text-base">✓</td>
                <td class="p-4 sm:p-5 text-center border-l-2 border-[#0066FF] bg-[#0066FF]/5 text-emerald-600 font-bold text-base">✓</td>
              </tr>
              <tr class="hover:bg-[#F8FAFC]">
                <td class="p-4 sm:p-5 font-bold text-[#0B0F19]">অ্যাডমিন ড্যাশবোর্ড অ্যাক্সেস</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">অ্যাডমিন অ্যাক্সেস</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">অ্যাডমিন অ্যাক্সেস</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">অ্যাডমিন অ্যাক্সেস</td>
                <td class="p-4 sm:p-5 text-center border-l-2 border-[#0066FF] bg-[#0066FF]/5 font-black text-[#0066FF]">মাস্টার অ্যাক্সেস</td>
              </tr>
              <tr class="hover:bg-[#F8FAFC]">
                <td class="p-4 sm:p-5 font-bold text-[#0B0F19]">ফ্রি ডোমেইন ও SSL সার্টিফিকেট</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">১ম বছর ফ্রি</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">১ম বছর ফ্রি</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">১ম বছর ফ্রি</td>
                <td class="p-4 sm:p-5 text-center border-l-2 border-[#0066FF] bg-[#0066FF]/5 font-bold">১ম বছর ফ্রি</td>
              </tr>
              <tr class="hover:bg-[#F8FAFC]">
                <td class="p-4 sm:p-5 font-bold text-[#0B0F19]">হোস্টিং ব্যান্ডউইথ ও স্টোরেজ</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">10 GB NVMe (১ম বছর ফ্রি)</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">10 GB NVMe (১ম বছর ফ্রি)</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">10 GB NVMe (১ম বছর ফ্রি)</td>
                <td class="p-4 sm:p-5 text-center border-l-2 border-[#0066FF] bg-[#0066FF]/5 font-bold">10 GB NVMe (১ম বছর ফ্রি)</td>
              </tr>
              <tr class="hover:bg-[#F8FAFC]">
                <td class="p-4 sm:p-5 font-bold text-[#0B0F19]">পেমেন্ট গেটওয়ে (বিকাশ, নগদ, কার্ড)</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-emerald-600 font-bold text-base">✓</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-emerald-600 font-bold text-base">✓</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-emerald-600 font-bold text-base">✓</td>
                <td class="p-4 sm:p-5 text-center border-l-2 border-[#0066FF] bg-[#0066FF]/5 text-emerald-600 font-bold text-base">✓</td>
              </tr>
              <tr class="hover:bg-[#F8FAFC]">
                <td class="p-4 sm:p-5 font-bold text-[#0B0F19]">ইনকমপ্লিট কার্ট রিকভারি</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-emerald-600 font-bold text-base">✓</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-emerald-600 font-bold text-base">✓</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-emerald-600 font-bold text-base">✓</td>
                <td class="p-4 sm:p-5 text-center border-l-2 border-[#0066FF] bg-[#0066FF]/5 text-emerald-600 font-bold text-base">✓</td>
              </tr>
              <tr class="hover:bg-[#F8FAFC]">
                <td class="p-4 sm:p-5 font-bold text-[#0B0F19]">কুরিয়ার এপিআই (Steadfast/Pathao)</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-emerald-600 font-bold text-base">✓</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-emerald-600 font-bold text-base">✓</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-emerald-600 font-bold text-base">✓</td>
                <td class="p-4 sm:p-5 text-center border-l-2 border-[#0066FF] bg-[#0066FF]/5 text-emerald-600 font-bold text-base">✓</td>
              </tr>
              <tr class="hover:bg-[#F8FAFC]">
                <td class="p-4 sm:p-5 font-bold text-[#0B0F19]">বিজনেস ইমেইল অ্যাকাউন্ট</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] font-bold">২ টি অ্যাকাউন্ট</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] font-bold">২ টি অ্যাকাউন্ট</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] font-bold">২ টি অ্যাকাউন্ট</td>
                <td class="p-4 sm:p-5 text-center border-l-2 border-[#0066FF] bg-[#0066FF]/5 font-black text-[#0066FF]">আনলিমিটেড</td>
              </tr>
              <tr class="hover:bg-[#F8FAFC]">
                <td class="p-4 sm:p-5 font-bold text-[#0B0F19]">cPanel হ্যান্ডওভার</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">১২ মাস পর</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">৬ মাস পর</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">৩ মাস পর</td>
                <td class="p-4 sm:p-5 text-center border-l-2 border-[#0066FF] bg-[#0066FF]/5 font-black text-emerald-600">তাত্ক্ষণিক (১ম দিনে)</td>
              </tr>
              <tr class="bg-[#F8FAFC]">
                <td class="p-4 sm:p-5 font-bold text-[#0B0F19]">অ্যাকশন</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">
                  <button onclick="openOfferModal('Startup Plan (12-Mo EMI)', '৳২,৫০০/মাস (মোট ৳৩০,০০০)')" class="w-full py-2.5 rounded-xl bg-white hover:bg-[#0066FF] hover:text-white font-bold text-xs text-[#0B0F19] transition-all border border-[#E2E8F0]">
                    সিলেক্ট করুন
                  </button>
                </td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">
                  <button onclick="openOfferModal('Accelerate Plan (6-Mo EMI)', '৳৪,৫০০/মাস (মোট ৳২৭,০০০)')" class="w-full py-2.5 rounded-xl bg-white hover:bg-[#0066FF] hover:text-white font-bold text-xs text-[#0B0F19] transition-all border border-[#E2E8F0]">
                    সিলেক্ট করুন
                  </button>
                </td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">
                  <button onclick="openOfferModal('Momentum Plan (3-Mo EMI)', '৳৮,৫০০/মাস (মোট ৳২৫,৫০০)')" class="w-full py-2.5 rounded-xl bg-white hover:bg-[#0066FF] hover:text-white font-bold text-xs text-[#0B0F19] transition-all border border-[#E2E8F0]">
                    সিলেক্ট করুন
                  </button>
                </td>
                <td class="p-4 sm:p-5 text-center border-l-2 border-[#0066FF] bg-[#0066FF]/5">
                  <button onclick="openOfferModal('Founder Plan (Pay In Full)', '৳১৯,৯৯০ এককালীন (Save 67%)')" class="w-full py-2.5 rounded-xl bg-[#0066FF] hover:bg-[#0052FF] font-black text-xs text-white transition-all shadow-md shadow-[#0066FF]/25">
                    ক্লেইম করুন ➔
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>`;

// Replace Card Grid View
const cardsRegex = /<!-- 1\. CARD GRID VIEW[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
if (cardsRegex.test(html)) {
  html = html.replace(cardsRegex, updatedCardsViewHtml);
}

// Replace Comparison Table View
const tableRegex = /<!-- 2\. COMPARISON TABLE VIEW[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
if (tableRegex.test(html)) {
  html = html.replace(tableRegex, updatedTableViewHtml);
}

// Ensure the font styling is ultra-crisp with direct font-family definitions and font-feature-settings
const superCrispFont = `<style>
    @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

    :root {
      --font-bengali: 'Hind Siliguri', 'Noto Sans Bengali', 'SolaimanLipi', 'Segoe UI', sans-serif;
    }

    * {
      font-family: var(--font-bengali);
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      font-feature-settings: "kern" 1, "liga" 1;
    }

    .font-eng {
      font-family: 'Plus Jakarta Sans', sans-serif !important;
    }
  </style>`;

html = html.replace(/<style>[\s\S]*?<\/style>/, superCrispFont);

fs.writeFileSync(ecomPath, html, 'utf8');
console.log('Successfully synced all specs to cards, corrected emails to 2, renamed to "cPanel হ্যান্ডওভার", and perfected typography!');
