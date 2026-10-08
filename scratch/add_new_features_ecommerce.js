const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../offers/ecommerce.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Update Cards View in offers/ecommerce.html
// Startup card list
const startupOldList = `<ul class="space-y-2 pt-4 border-t border-[#E2E8F0] text-xs text-[#475569] font-medium leading-relaxed">
              <li>✓ সম্পূর্ণ কাস্টমাইজড ই-কমার্স স্টোর</li>
              <li>✓ লোডিং স্পিড: 1 সেকেন্ডের কম</li>
              <li>✓ মোবাইল ও ট্যাব 100% অপ্টিমাইজড</li>
              <li>✓ ফুল অ্যাডমিন ড্যাশবোর্ড অ্যাক্সেস</li>
              <li>✓ ফ্রি ডোমেইন (.com)</li>
              <li>✓ SSL (১ম বছর ফ্রি)</li>
              <li>✓ 10 GB NVMe ক্লাউড হোস্টিং (1 বছর ফ্রি)</li>
              <li>✓ পেমেন্ট গেটওয়ে (বিকাশ, নগদ, কার্ড)</li>
              <li>✓ ইনকমপ্লিট কার্ট রিকভারি</li>
              <li>✓ কুরিয়ার এপিআই (Steadfast ও Pathao)</li>
              <li>✓ <strong>2 টি বিজনেস ইমেইল</strong></li>
              <li>✓ <strong>cPanel হ্যান্ডওভার: 12 মাস পর</strong></li>
            </ul>`;

const startupNewList = `<ul class="space-y-2 pt-4 border-t border-[#E2E8F0] text-xs text-[#475569] font-medium leading-relaxed">
              <li>✓ সম্পূর্ণ কাস্টমাইজড ই-কমার্স স্টোর</li>
              <li>✓ লোডিং স্পিড: 1 সেকেন্ডের কম</li>
              <li>✓ মোবাইল ও ট্যাব 100% অপ্টিমাইজড</li>
              <li>✓ ফুল অ্যাডমিন ড্যাশবোর্ড অ্যাক্সেস</li>
              <li>✓ ফ্রি ডোমেইন (.com)</li>
              <li>✓ SSL (১ম বছর ফ্রি)</li>
              <li>✓ 10 GB NVMe ক্লাউড হোস্টিং (1 বছর ফ্রি)</li>
              <li>✓ পেমেন্ট গেটওয়ে (বিকাশ, নগদ, কার্ড, EMI System)</li>
              <li>✓ অর্ডার টাইমে অ্যাডভান্স পেমেন্ট সিস্টেম</li>
              <li>✓ ইনকমপ্লিট কার্ট রিকভারি</li>
              <li>✓ কুরিয়ার এপিআই (Steadfast ও Pathao)</li>
              <li>✓ কাস্টমার অ্যাড্রেস ভিত্তিক অটো কুরিয়ার চার্জ</li>
              <li>✓ ফ্রি পিক্সেল সেটআপ (Facebook Pixel & CAPI)</li>
              <li>✓ <strong>2 টি বিজনেস ইমেইল</strong></li>
              <li>✓ <strong>cPanel হ্যান্ডওভার: 12 মাস পর</strong></li>
            </ul>`;

// Accelerate card list
const accOldList = `<ul class="space-y-2 pt-4 border-t border-[#E2E8F0] text-xs text-[#475569] font-medium leading-relaxed">
              <li>✓ সম্পূর্ণ কাস্টমাইজড ই-কমার্স স্টোর</li>
              <li>✓ লোডিং স্পিড: 1 সেকেন্ডের কম</li>
              <li>✓ মোবাইল ও ট্যাব 100% অপ্টিমাইজড</li>
              <li>✓ ফুল অ্যাডমিন ড্যাশবোর্ড অ্যাক্সেস</li>
              <li>✓ ফ্রি ডোমেইন (.com)</li>
              <li>✓ SSL (১ম বছর ফ্রি)</li>
              <li>✓ 10 GB NVMe ক্লাউড হোস্টিং (1 বছর ফ্রি)</li>
              <li>✓ পেমেন্ট গেটওয়ে (বিকাশ, নগদ, কার্ড)</li>
              <li>✓ ইনকমপ্লিট কার্ট রিকভারি</li>
              <li>✓ কুরিয়ার এপিআই (Steadfast ও Pathao)</li>
              <li>✓ <strong>2 টি বিজনেস ইমেইল</strong></li>
              <li>✓ <strong>cPanel হ্যান্ডওভার: 6 মাস পর</strong></li>
            </ul>`;

const accNewList = `<ul class="space-y-2 pt-4 border-t border-[#E2E8F0] text-xs text-[#475569] font-medium leading-relaxed">
              <li>✓ সম্পূর্ণ কাস্টমাইজড ই-কমার্স স্টোর</li>
              <li>✓ লোডিং স্পিড: 1 সেকেন্ডের কম</li>
              <li>✓ মোবাইল ও ট্যাব 100% অপ্টিমাইজড</li>
              <li>✓ ফুল অ্যাডমিন ড্যাশবোর্ড অ্যাক্সেস</li>
              <li>✓ ফ্রি ডোমেইন (.com)</li>
              <li>✓ SSL (১ম বছর ফ্রি)</li>
              <li>✓ 10 GB NVMe ক্লাউড হোস্টিং (1 বছর ফ্রি)</li>
              <li>✓ পেমেন্ট গেটওয়ে (বিকাশ, নগদ, কার্ড, EMI System)</li>
              <li>✓ অর্ডার টাইমে অ্যাডভান্স পেমেন্ট সিস্টেম</li>
              <li>✓ ইনকমপ্লিট কার্ট রিকভারি</li>
              <li>✓ কুরিয়ার এপিআই (Steadfast ও Pathao)</li>
              <li>✓ কাস্টমার অ্যাড্রেস ভিত্তিক অটো কুরিয়ার চার্জ</li>
              <li>✓ ফ্রি পিক্সেল সেটআপ (Facebook Pixel & CAPI)</li>
              <li>✓ <strong>2 টি বিজনেস ইমেইল</strong></li>
              <li>✓ <strong>cPanel হ্যান্ডওভার: 6 মাস পর</strong></li>
            </ul>`;

// Momentum card list
const momOldList = `<ul class="space-y-2 pt-4 border-t border-[#E2E8F0] text-xs text-[#475569] font-medium leading-relaxed">
              <li>✓ সম্পূর্ণ কাস্টমাইজড ই-কমার্স স্টোর</li>
              <li>✓ লোডিং স্পিড: 1 সেকেন্ডের কম</li>
              <li>✓ মোবাইল ও ট্যাব 100% অপ্টিমাইজড</li>
              <li>✓ ফুল অ্যাডমিন ড্যাশবোর্ড অ্যাক্সেস</li>
              <li>✓ ফ্রি ডোমেইন (.com)</li>
              <li>✓ SSL (১ম বছর ফ্রি)</li>
              <li>✓ 10 GB NVMe ক্লাউড হোস্টিং (1 বছর ফ্রি)</li>
              <li>✓ পেমেন্ট গেটওয়ে (বিকাশ, নগদ, কার্ড)</li>
              <li>✓ ইনকমপ্লিট কার্ট রিকভারি</li>
              <li>✓ কুরিয়ার এপিআই (Steadfast ও Pathao)</li>
              <li>✓ <strong>2 টি বিজনেস ইমেইল</strong></li>
              <li>✓ <strong>cPanel হ্যান্ডওভার: 3 মাস পর</strong></li>
            </ul>`;

const momNewList = `<ul class="space-y-2 pt-4 border-t border-[#E2E8F0] text-xs text-[#475569] font-medium leading-relaxed">
              <li>✓ সম্পূর্ণ কাস্টমাইজড ই-কমার্স স্টোর</li>
              <li>✓ লোডিং স্পিড: 1 সেকেন্ডের কম</li>
              <li>✓ মোবাইল ও ট্যাব 100% অপ্টিমাইজড</li>
              <li>✓ ফুল অ্যাডমিন ড্যাশবোর্ড অ্যাক্সেস</li>
              <li>✓ ফ্রি ডোমেইন (.com)</li>
              <li>✓ SSL (১ম বছর ফ্রি)</li>
              <li>✓ 10 GB NVMe ক্লাউড হোস্টিং (1 বছর ফ্রি)</li>
              <li>✓ পেমেন্ট গেটওয়ে (বিকাশ, নগদ, কার্ড, EMI System)</li>
              <li>✓ অর্ডার টাইমে অ্যাডভান্স পেমেন্ট সিস্টেম</li>
              <li>✓ ইনকমপ্লিট কার্ট রিকভারি</li>
              <li>✓ কুরিয়ার এপিআই (Steadfast ও Pathao)</li>
              <li>✓ কাস্টমার অ্যাড্রেস ভিত্তিক অটো কুরিয়ার চার্জ</li>
              <li>✓ ফ্রি পিক্সেল সেটআপ (Facebook Pixel & CAPI)</li>
              <li>✓ <strong>2 টি বিজনেস ইমেইল</strong></li>
              <li>✓ <strong>cPanel হ্যান্ডওভার: 3 মাস পর</strong></li>
            </ul>`;

// Founder card list
const fndOldList = `<ul class="space-y-2 pt-4 border-t border-[#F1F5F9] text-xs text-[#334155] font-medium leading-relaxed">
              <li>✓ সম্পূর্ণ কাস্টমাইজড ই-কমার্স স্টোর</li>
              <li>✓ লোডিং স্পিড: 1 সেকেন্ডের কম</li>
              <li>✓ মোবাইল ও ট্যাব 100% অপ্টিমাইজড</li>
              <li>✓ <strong>1st দিনেই ফুল মাস্টার অ্যাক্সেস</strong></li>
              <li>✓ ফ্রি ডোমেইন (.com)</li>
              <li>✓ SSL (১ম বছর ফ্রি)</li>
              <li>✓ 10 GB NVMe ক্লাউড হোস্টিং (1 বছর ফ্রি)</li>
              <li>✓ পেমেন্ট গেটওয়ে (বিকাশ, নগদ, কার্ড)</li>
              <li>✓ ইনকমপ্লিট কার্ট রিকভারি</li>
              <li>✓ কুরিয়ার এপিআই (Steadfast ও Pathao)</li>
              <li>✓ <strong>আনলিমিটেড বিজনেস ইমেইল</strong></li>
              <li>✓ <strong>cPanel হ্যান্ডওভার: তাত্ক্ষণিক (1st দিনে)</strong></li>
            </ul>`;

const fndNewList = `<ul class="space-y-2 pt-4 border-t border-[#F1F5F9] text-xs text-[#334155] font-medium leading-relaxed">
              <li>✓ সম্পূর্ণ কাস্টমাইজড ই-কমার্স স্টোর</li>
              <li>✓ লোডিং স্পিড: 1 সেকেন্ডের কম</li>
              <li>✓ মোবাইল ও ট্যাব 100% অপ্টিমাইজড</li>
              <li>✓ <strong>1st দিনেই ফুল মাস্টার অ্যাক্সেস</strong></li>
              <li>✓ ফ্রি ডোমেইন (.com)</li>
              <li>✓ SSL (১ম বছর ফ্রি)</li>
              <li>✓ 10 GB NVMe ক্লাউড হোস্টিং (1 বছর ফ্রি)</li>
              <li>✓ পেমেন্ট গেটওয়ে (বিকাশ, নগদ, কার্ড, EMI System)</li>
              <li>✓ অর্ডার টাইমে অ্যাডভান্স পেমেন্ট সিস্টেম</li>
              <li>✓ ইনকমপ্লিট কার্ট রিকভারি</li>
              <li>✓ কুরিয়ার এপিআই (Steadfast ও Pathao)</li>
              <li>✓ কাস্টমার অ্যাড্রেস ভিত্তিক অটো কুরিয়ার চার্জ</li>
              <li>✓ ফ্রি পিক্সেল সেটআপ (Facebook Pixel & CAPI)</li>
              <li>✓ <strong>আনলিমিটেড বিজনেস ইমেইল</strong></li>
              <li>✓ <strong>cPanel হ্যান্ডওভার: তাত্ক্ষণিক (1st দিনে)</strong></li>
            </ul>`;

html = html.replace(startupOldList, startupNewList);
html = html.replace(accOldList, accNewList);
html = html.replace(momOldList, momNewList);
html = html.replace(fndOldList, fndNewList);

// 2. Update Comparison Table Tbody
const oldTableTbody = `<tbody class="divide-y divide-[#F1F5F9] text-xs font-medium text-[#475569]">
              <tr class="hover:bg-[#F8FAFC]">
                <td class="p-4 sm:p-5 font-bold text-[#0B0F19]">ওয়েবসাইট পারফরম্যান্স</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">1 সেকেন্ডের কম</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">1 সেকেন্ডের কম</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">1 সেকেন্ডের কম</td>
                <td class="p-4 sm:p-5 text-center border-l-2 border-[#0066FF] bg-[#0066FF]/5 font-bold text-[#0B0F19]">1 সেকেন্ডের কম</td>
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
                <td class="p-4 sm:p-5 font-bold text-[#0B0F19]">ফ্রি ডোমেইন (.com)</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-emerald-600 font-bold">1ম বছর ফ্রি</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-emerald-600 font-bold">1ম বছর ফ্রি</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-emerald-600 font-bold">1ম বছর ফ্রি</td>
                <td class="p-4 sm:p-5 text-center border-l-2 border-[#0066FF] bg-[#0066FF]/5 font-bold text-emerald-600">1ম বছর ফ্রি</td>
              </tr>
              <tr class="hover:bg-[#F8FAFC]">
                <td class="p-4 sm:p-5 font-bold text-[#0B0F19]">SSL সার্টিফিকেট</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-emerald-600 font-bold">1ম বছর ফ্রি</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-emerald-600 font-bold">1ম বছর ফ্রি</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-emerald-600 font-bold">1ম বছর ফ্রি</td>
                <td class="p-4 sm:p-5 text-center border-l-2 border-[#0066FF] bg-[#0066FF]/5 font-bold text-emerald-600">1ম বছর ফ্রি</td>
              </tr>
              <tr class="hover:bg-[#F8FAFC]">
                <td class="p-4 sm:p-5 font-bold text-[#0B0F19]">হোস্টিং ব্যান্ডউইথ ও স্টোরেজ</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">10 GB NVMe (1 বছর ফ্রি)</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">10 GB NVMe (1 বছর ফ্রি)</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">10 GB NVMe (1 বছর ফ্রি)</td>
                <td class="p-4 sm:p-5 text-center border-l-2 border-[#0066FF] bg-[#0066FF]/5 font-bold">10 GB NVMe (1 বছর ফ্রি)</td>
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
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] font-bold">2 টি অ্যাকাউন্ট</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] font-bold">2 টি অ্যাকাউন্ট</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] font-bold">2 টি অ্যাকাউন্ট</td>
                <td class="p-4 sm:p-5 text-center border-l-2 border-[#0066FF] bg-[#0066FF]/5 font-black text-[#0066FF]">আনলিমিটেড</td>
              </tr>
              <tr class="hover:bg-[#F8FAFC]">
                <td class="p-4 sm:p-5 font-bold text-[#0B0F19]">cPanel হ্যান্ডওভার</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">12 মাস পর</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">6 মাস পর</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">3 মাস পর</td>
                <td class="p-4 sm:p-5 text-center border-l-2 border-[#0066FF] bg-[#0066FF]/5 font-black text-emerald-600">তাত্ক্ষণিক (1st দিনে)</td>
              </tr>
              <tr class="bg-[#F8FAFC]">`;

const newTableTbody = `<tbody class="divide-y divide-[#F1F5F9] text-xs font-medium text-[#475569]">
              <tr class="hover:bg-[#F8FAFC]">
                <td class="p-4 sm:p-5 font-bold text-[#0B0F19]">ওয়েবসাইট পারফরম্যান্স</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">1 সেকেন্ডের কম</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">1 সেকেন্ডের কম</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">1 সেকেন্ডের কম</td>
                <td class="p-4 sm:p-5 text-center border-l-2 border-[#0066FF] bg-[#0066FF]/5 font-bold text-[#0B0F19]">1 সেকেন্ডের কম</td>
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
                <td class="p-4 sm:p-5 font-bold text-[#0B0F19]">ফ্রি ডোমেইন (.com)</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-emerald-600 font-bold">1ম বছর ফ্রি</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-emerald-600 font-bold">1ম বছর ফ্রি</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-emerald-600 font-bold">1ম বছর ফ্রি</td>
                <td class="p-4 sm:p-5 text-center border-l-2 border-[#0066FF] bg-[#0066FF]/5 font-bold text-emerald-600">1ম বছর ফ্রি</td>
              </tr>
              <tr class="hover:bg-[#F8FAFC]">
                <td class="p-4 sm:p-5 font-bold text-[#0B0F19]">SSL সার্টিফিকেট</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-emerald-600 font-bold">1ম বছর ফ্রি</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-emerald-600 font-bold">1ম বছর ফ্রি</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-emerald-600 font-bold">1ম বছর ফ্রি</td>
                <td class="p-4 sm:p-5 text-center border-l-2 border-[#0066FF] bg-[#0066FF]/5 font-bold text-emerald-600">1ম বছর ফ্রি</td>
              </tr>
              <tr class="hover:bg-[#F8FAFC]">
                <td class="p-4 sm:p-5 font-bold text-[#0B0F19]">হোস্টিং ব্যান্ডউইথ ও স্টোরেজ</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">10 GB NVMe (1 বছর ফ্রি)</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">10 GB NVMe (1 বছর ফ্রি)</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">10 GB NVMe (1 বছর ফ্রি)</td>
                <td class="p-4 sm:p-5 text-center border-l-2 border-[#0066FF] bg-[#0066FF]/5 font-bold">10 GB NVMe (1 বছর ফ্রি)</td>
              </tr>
              <tr class="hover:bg-[#F8FAFC]">
                <td class="p-4 sm:p-5 font-bold text-[#0B0F19]">পেমেন্ট গেটওয়ে (বিকাশ, নগদ, কার্ড, EMI System)</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-emerald-600 font-bold text-base">✓</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-emerald-600 font-bold text-base">✓</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-emerald-600 font-bold text-base">✓</td>
                <td class="p-4 sm:p-5 text-center border-l-2 border-[#0066FF] bg-[#0066FF]/5 text-emerald-600 font-bold text-base">✓</td>
              </tr>
              <tr class="hover:bg-[#F8FAFC]">
                <td class="p-4 sm:p-5 font-bold text-[#0B0F19]">অর্ডার টাইমে অ্যাডভান্স পেমেন্ট সিস্টেম</td>
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
                <td class="p-4 sm:p-5 font-bold text-[#0B0F19]">কাস্টমার অ্যাড্রেস ভিত্তিক অটো কুরিয়ার চার্জ</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-emerald-600 font-bold text-base">✓</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-emerald-600 font-bold text-base">✓</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-emerald-600 font-bold text-base">✓</td>
                <td class="p-4 sm:p-5 text-center border-l-2 border-[#0066FF] bg-[#0066FF]/5 text-emerald-600 font-bold text-base">✓</td>
              </tr>
              <tr class="hover:bg-[#F8FAFC]">
                <td class="p-4 sm:p-5 font-bold text-[#0B0F19]">ফ্রি পিক্সেল সেটআপ (Facebook Pixel & CAPI)</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-emerald-600 font-bold text-base">✓</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-emerald-600 font-bold text-base">✓</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] text-emerald-600 font-bold text-base">✓</td>
                <td class="p-4 sm:p-5 text-center border-l-2 border-[#0066FF] bg-[#0066FF]/5 text-emerald-600 font-bold text-base">✓</td>
              </tr>
              <tr class="hover:bg-[#F8FAFC]">
                <td class="p-4 sm:p-5 font-bold text-[#0B0F19]">বিজনেস ইমেইল অ্যাকাউন্ট</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] font-bold">2 টি অ্যাকাউন্ট</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] font-bold">2 টি অ্যাকাউন্ট</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0] font-bold">2 টি অ্যাকাউন্ট</td>
                <td class="p-4 sm:p-5 text-center border-l-2 border-[#0066FF] bg-[#0066FF]/5 font-black text-[#0066FF]">আনলিমিটেড</td>
              </tr>
              <tr class="hover:bg-[#F8FAFC]">
                <td class="p-4 sm:p-5 font-bold text-[#0B0F19]">cPanel হ্যান্ডওভার</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">12 মাস পর</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">6 মাস পর</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">3 মাস পর</td>
                <td class="p-4 sm:p-5 text-center border-l-2 border-[#0066FF] bg-[#0066FF]/5 font-black text-emerald-600">তাত্ক্ষণিক (1st দিনে)</td>
              </tr>
              <tr class="bg-[#F8FAFC]">`;

html = html.replace(oldTableTbody, newTableTbody);

fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully updated features in offers/ecommerce.html');
