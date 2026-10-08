const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// =========================================================================
// 1. UPDATE offers/ecommerce.html
// =========================================================================
const ecomPath = path.join(rootDir, 'offers', 'ecommerce.html');
if (fs.existsSync(ecomPath)) {
  let ecom = fs.readFileSync(ecomPath, 'utf8');

  // Add view switcher in hero
  const heroEndRegex = /<\/div>\s*<\/section>\s*<!--\s*PRICING & MATRIX SECTION/i;
  const switcherHtml = `
      <!-- Smart View Switcher (PC: Table Default, Phone: Cards Default) -->
      <div class="pt-3 flex items-center justify-center">
        <div class="p-1 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs inline-flex items-center gap-1">
          <button id="viewTableBtn" type="button" class="px-4 sm:px-5 py-2 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all duration-200">
            <i class="fa-solid fa-table-list text-[11px]"></i>
            <span>Comparison Table</span>
          </button>
          <button id="viewCardsBtn" type="button" class="px-4 sm:px-5 py-2 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all duration-200">
            <i class="fa-solid fa-table-cells-large text-[11px]"></i>
            <span>Card Grid</span>
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- PRICING & MATRIX SECTION`;

  ecom = ecom.replace(heroEndRegex, switcherHtml);

  // Add 4-cards grid alongside table
  const cardsHtml = `
      <!-- 2. CARD GRID VIEW (Default on Mobile Phones) -->
      <div id="pricingCardsView" class="hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch transition-all duration-300">
        
        <!-- Card 1: Startup -->
        <div class="morphy-card p-6 bg-white border border-[#E2E8F0] rounded-3xl flex flex-col justify-between space-y-4 hover:border-[#0066FF]/40 hover:shadow-xl transition-all">
          <div>
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-black uppercase text-[#64748B] bg-[#F8FAFC] px-2.5 py-1 rounded-md border border-[#E2E8F0]">12-Month EMI</span>
            </div>
            <h3 class="text-xl font-black text-[#0B0F19] mt-3">Startup Plan</h3>
            <div class="text-2xl font-black text-[#0B0F19] mt-1">৳ 3,000 <span class="text-xs text-[#64748B] font-normal">/mo</span></div>
            <p class="text-xs font-bold text-[#0066FF] mt-1">Total ৳ 36,000 (Save 40%)</p>
            <ul class="space-y-2 pt-4 border-t border-[#F1F5F9] text-xs text-[#475569] font-medium">
              <li>✓ Free Domain (1st Year)</li>
              <li>✓ 10 GB NVMe Hosting</li>
              <li>✓ Secured + Gmail Login</li>
              <li>✓ Payment Gateway &amp; Cart Recovery</li>
              <li>✓ cPanel Handover: Month 12</li>
            </ul>
          </div>
          <button onclick="openOfferModal('E-Com Startup (12-Mo EMI)', '৳3,000/month (Total ৳36,000)')" class="w-full py-3 rounded-xl bg-[#F8FAFC] hover:bg-[#0066FF] hover:text-white font-extrabold text-xs text-[#0B0F19] transition-all border border-[#E2E8F0]">
            Get Started
          </button>
        </div>

        <!-- Card 2: Momentum -->
        <div class="morphy-card p-6 bg-white border border-[#E2E8F0] rounded-3xl flex flex-col justify-between space-y-4 hover:border-[#0066FF]/40 hover:shadow-xl transition-all">
          <div>
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-black uppercase text-[#64748B] bg-[#F8FAFC] px-2.5 py-1 rounded-md border border-[#E2E8F0]">9-Month EMI</span>
            </div>
            <h3 class="text-xl font-black text-[#0B0F19] mt-3">Momentum Plan</h3>
            <div class="text-2xl font-black text-[#0B0F19] mt-1">৳ 3,800 <span class="text-xs text-[#64748B] font-normal">/mo</span></div>
            <p class="text-xs font-bold text-[#0066FF] mt-1">Total ৳ 34,200 (Save 43%)</p>
            <ul class="space-y-2 pt-4 border-t border-[#F1F5F9] text-xs text-[#475569] font-medium">
              <li>✓ Free Domain (2 Years)</li>
              <li>✓ 10 GB NVMe Hosting</li>
              <li>✓ Secured + Gmail Login</li>
              <li>✓ Payment Gateway &amp; Cart Recovery</li>
              <li>✓ cPanel Handover: Month 9</li>
            </ul>
          </div>
          <button onclick="openOfferModal('E-Com Momentum (9-Mo EMI)', '৳3,800/month (Total ৳34,200)')" class="w-full py-3 rounded-xl bg-[#F8FAFC] hover:bg-[#0066FF] hover:text-white font-extrabold text-xs text-[#0B0F19] transition-all border border-[#E2E8F0]">
            Get Started
          </button>
        </div>

        <!-- Card 3: Accelerate -->
        <div class="morphy-card p-6 bg-white border border-[#E2E8F0] rounded-3xl flex flex-col justify-between space-y-4 hover:border-[#0066FF]/40 hover:shadow-xl transition-all">
          <div>
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-black uppercase text-[#64748B] bg-[#F8FAFC] px-2.5 py-1 rounded-md border border-[#E2E8F0]">6-Month EMI</span>
            </div>
            <h3 class="text-xl font-black text-[#0B0F19] mt-3">Accelerate Plan</h3>
            <div class="text-2xl font-black text-[#0B0F19] mt-1">৳ 5,425 <span class="text-xs text-[#64748B] font-normal">/mo</span></div>
            <p class="text-xs font-bold text-[#0066FF] mt-1">Total ৳ 32,550 (Save 46%)</p>
            <ul class="space-y-2 pt-4 border-t border-[#F1F5F9] text-xs text-[#475569] font-medium">
              <li>✓ Free Domain (1st Year)</li>
              <li>✓ 10 GB NVMe Hosting</li>
              <li>✓ Secured + Gmail Login</li>
              <li>✓ Payment Gateway &amp; Cart Recovery</li>
              <li>✓ cPanel Handover: Month 6</li>
            </ul>
          </div>
          <button onclick="openOfferModal('E-Com Accelerate (6-Mo EMI)', '৳5,425/month (Total ৳32,550)')" class="w-full py-3 rounded-xl bg-[#F8FAFC] hover:bg-[#0066FF] hover:text-white font-extrabold text-xs text-[#0B0F19] transition-all border border-[#E2E8F0]">
            Get Started
          </button>
        </div>

        <!-- Card 4: Founder Pay In Full -->
        <div class="morphy-card p-6 bg-white border-2 border-[#0066FF] rounded-3xl flex flex-col justify-between space-y-4 shadow-xl shadow-[#0066FF]/15 relative hover:-translate-y-1 transition-all">
          <div class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#0066FF] text-white text-[9px] font-black uppercase tracking-wider shadow-xs">Best Value</div>
          <div>
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-black uppercase text-[#0066FF] bg-[#0066FF]/10 px-2.5 py-1 rounded-md border border-[#0066FF]/20">Pay In Full</span>
            </div>
            <h3 class="text-xl font-black text-[#0B0F19] mt-3">Founder Plan</h3>
            <div class="text-2xl font-black text-[#0B0F19] mt-1">৳ 25,000 <span class="text-xs text-[#64748B] font-normal">One-time</span></div>
            <p class="text-xs font-black text-emerald-600 mt-1">Save 58% Discount</p>
            <ul class="space-y-2 pt-4 border-t border-[#F1F5F9] text-xs text-[#475569] font-medium">
              <li>✓ <strong>Master Access</strong> Day 1</li>
              <li>✓ <strong>cPanel Handover: Immediate</strong></li>
              <li>✓ <strong>Unlimited Business Emails</strong></li>
              <li>✓ Free Domain &amp; SSL Included</li>
              <li>✓ 10 GB NVMe Hosting Bundle</li>
            </ul>
          </div>
          <button onclick="openOfferModal('E-Com Founder (Pay In Full)', '৳25,000 One-time (Save 58%)')" class="w-full py-3 rounded-xl bg-[#0066FF] hover:bg-[#0052FF] font-black text-xs text-white transition-all shadow-md shadow-[#0066FF]/30 active:scale-98">
            Claim Offer ➔
          </button>
        </div>

      </div>
`;

  // Insert cardsHtml right after #pricingTableView
  const tableEndRegex = /<\/div>\s*<\/div>\s*<\/section>\s*<!--\s*6\.\s*COMMISSION/i;
  if (ecom.match(tableEndRegex)) {
    ecom = ecom.replace(tableEndRegex, `</div>\n      </div>\n${cardsHtml}\n    </div>\n  </section>\n  <!-- 6. COMMISSION`);
  }

  fs.writeFileSync(ecomPath, ecom, 'utf8');
  console.log('Updated ecommerce.html with smart dual views!');
}


// =========================================================================
// 2. UPDATE offers/service-platform.html
// =========================================================================
const svcPath = path.join(rootDir, 'offers', 'service-platform.html');
if (fs.existsSync(svcPath)) {
  let svc = fs.readFileSync(svcPath, 'utf8');

  // Add view switcher in hero
  const heroEndRegex = /<\/div>\s*<\/section>\s*<!--\s*PRICING & MATRIX SECTION/i;
  const switcherHtml = `
      <!-- Smart View Switcher (PC: Table Default, Phone: Cards Default) -->
      <div class="pt-3 flex items-center justify-center">
        <div class="p-1 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs inline-flex items-center gap-1">
          <button id="viewTableBtn" type="button" class="px-4 sm:px-5 py-2 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all duration-200">
            <i class="fa-solid fa-table-list text-[11px]"></i>
            <span>Comparison Table</span>
          </button>
          <button id="viewCardsBtn" type="button" class="px-4 sm:px-5 py-2 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all duration-200">
            <i class="fa-solid fa-table-cells-large text-[11px]"></i>
            <span>Card Grid</span>
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- PRICING & MATRIX SECTION`;

  svc = svc.replace(heroEndRegex, switcherHtml);

  const cardsHtml = `
      <!-- 2. CARD GRID VIEW (Default on Mobile Phones) -->
      <div id="pricingCardsView" class="hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch transition-all duration-300">
        
        <!-- Card 1: Starter -->
        <div class="morphy-card p-6 bg-white border border-[#E2E8F0] rounded-3xl flex flex-col justify-between space-y-4 hover:border-[#0066FF]/40 hover:shadow-xl transition-all">
          <div>
            <span class="text-[10px] font-black uppercase text-[#64748B] bg-[#F8FAFC] px-2.5 py-1 rounded-md border border-[#E2E8F0]">12-Month EMI</span>
            <h3 class="text-xl font-black text-[#0B0F19] mt-3">Starter Engine</h3>
            <div class="text-2xl font-black text-[#0B0F19] mt-1">৳ 3,200 <span class="text-xs text-[#64748B] font-normal">/mo</span></div>
            <p class="text-xs font-bold text-[#0066FF] mt-1">Total ৳ 38,400 (Save 38%)</p>
            <ul class="space-y-2 pt-4 border-t border-[#F1F5F9] text-xs text-[#475569] font-medium">
              <li>✓ Custom Lead Quotation Funnel</li>
              <li>✓ 10 GB NVMe Hosting</li>
              <li>✓ Consultation Calendar Sync</li>
              <li>✓ WhatsApp Instant Routing</li>
              <li>✓ cPanel Handover: Month 12</li>
            </ul>
          </div>
          <button onclick="openOfferModal('Service Platform Starter (12-Mo EMI)', '৳3,200/month')" class="w-full py-3 rounded-xl bg-[#F8FAFC] hover:bg-[#0066FF] hover:text-white font-extrabold text-xs text-[#0B0F19] transition-all border border-[#E2E8F0]">
            Get Started
          </button>
        </div>

        <!-- Card 2: Growth -->
        <div class="morphy-card p-6 bg-white border border-[#E2E8F0] rounded-3xl flex flex-col justify-between space-y-4 hover:border-[#0066FF]/40 hover:shadow-xl transition-all">
          <div>
            <span class="text-[10px] font-black uppercase text-[#64748B] bg-[#F8FAFC] px-2.5 py-1 rounded-md border border-[#E2E8F0]">9-Month EMI</span>
            <h3 class="text-xl font-black text-[#0B0F19] mt-3">Growth Platform</h3>
            <div class="text-2xl font-black text-[#0B0F19] mt-1">৳ 4,000 <span class="text-xs text-[#64748B] font-normal">/mo</span></div>
            <p class="text-xs font-bold text-[#0066FF] mt-1">Total ৳ 36,000 (Save 42%)</p>
            <ul class="space-y-2 pt-4 border-t border-[#F1F5F9] text-xs text-[#475569] font-medium">
              <li>✓ Multi-Step Client Intake Funnel</li>
              <li>✓ Free Domain for 2 Years</li>
              <li>✓ Automated CRM Lead Capture</li>
              <li>✓ Case Study 3D Retrospective</li>
              <li>✓ cPanel Handover: Month 9</li>
            </ul>
          </div>
          <button onclick="openOfferModal('Service Platform Growth (9-Mo EMI)', '৳4,000/month')" class="w-full py-3 rounded-xl bg-[#F8FAFC] hover:bg-[#0066FF] hover:text-white font-extrabold text-xs text-[#0B0F19] transition-all border border-[#E2E8F0]">
            Get Started
          </button>
        </div>

        <!-- Card 3: Enterprise -->
        <div class="morphy-card p-6 bg-white border border-[#E2E8F0] rounded-3xl flex flex-col justify-between space-y-4 hover:border-[#0066FF]/40 hover:shadow-xl transition-all">
          <div>
            <span class="text-[10px] font-black uppercase text-[#64748B] bg-[#F8FAFC] px-2.5 py-1 rounded-md border border-[#E2E8F0]">6-Month EMI</span>
            <h3 class="text-xl font-black text-[#0B0F19] mt-3">Enterprise Suite</h3>
            <div class="text-2xl font-black text-[#0B0F19] mt-1">৳ 5,600 <span class="text-xs text-[#64748B] font-normal">/mo</span></div>
            <p class="text-xs font-bold text-[#0066FF] mt-1">Total ৳ 33,600 (Save 46%)</p>
            <ul class="space-y-2 pt-4 border-t border-[#F1F5F9] text-xs text-[#475569] font-medium">
              <li>✓ Custom B2B Portal Architecture</li>
              <li>✓ High-Speed NVMe Hosting Bundle</li>
              <li>✓ Client Management Dashboard</li>
              <li>✓ Email &amp; SMS Inbound Triggers</li>
              <li>✓ cPanel Handover: Month 6</li>
            </ul>
          </div>
          <button onclick="openOfferModal('Service Platform Enterprise (6-Mo EMI)', '৳5,600/month')" class="w-full py-3 rounded-xl bg-[#F8FAFC] hover:bg-[#0066FF] hover:text-white font-extrabold text-xs text-[#0B0F19] transition-all border border-[#E2E8F0]">
            Get Started
          </button>
        </div>

        <!-- Card 4: Founder Full-Stack -->
        <div class="morphy-card p-6 bg-white border-2 border-[#0066FF] rounded-3xl flex flex-col justify-between space-y-4 shadow-xl shadow-[#0066FF]/15 relative hover:-translate-y-1 transition-all">
          <div class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#0066FF] text-white text-[9px] font-black uppercase tracking-wider shadow-xs">Best Value</div>
          <div>
            <span class="text-[10px] font-black uppercase text-[#0066FF] bg-[#0066FF]/10 px-2.5 py-1 rounded-md border border-[#0066FF]/20">Pay In Full</span>
            <h3 class="text-xl font-black text-[#0B0F19] mt-3">Founder Launch</h3>
            <div class="text-2xl font-black text-[#0B0F19] mt-1">৳ 28,000 <span class="text-xs text-[#64748B] font-normal">One-time</span></div>
            <p class="text-xs font-black text-emerald-600 mt-1">Save 55% Discount</p>
            <ul class="space-y-2 pt-4 border-t border-[#F1F5F9] text-xs text-[#475569] font-medium">
              <li>✓ <strong>Master Access Day 1</strong></li>
              <li>✓ <strong>cPanel Handover: Immediate</strong></li>
              <li>✓ <strong>Unlimited Inbound Leads CRM</strong></li>
              <li>✓ Full IP Ownership &amp; Code Repository</li>
              <li>✓ 1-Year Priority Support &amp; Updates</li>
            </ul>
          </div>
          <button onclick="openOfferModal('Service Platform Founder (Pay In Full)', '৳28,000 One-time')" class="w-full py-3 rounded-xl bg-[#0066FF] hover:bg-[#0052FF] font-black text-xs text-white transition-all shadow-md shadow-[#0066FF]/30 active:scale-98">
            Claim Offer ➔
          </button>
        </div>

      </div>
`;

  const tableEndRegex = /<\/div>\s*<\/div>\s*<\/section>\s*<!--\s*6\.\s*COMMISSION/i;
  if (svc.match(tableEndRegex)) {
    svc = svc.replace(tableEndRegex, `</div>\n      </div>\n${cardsHtml}\n    </div>\n  </section>\n  <!-- 6. COMMISSION`);
  }

  fs.writeFileSync(svcPath, svc, 'utf8');
  console.log('Updated service-platform.html with smart dual views!');
}


// =========================================================================
// 3. UPDATE offers/portfolio.html
// =========================================================================
const portPath = path.join(rootDir, 'offers', 'portfolio.html');
if (fs.existsSync(portPath)) {
  let port = fs.readFileSync(portPath, 'utf8');

  const heroEndRegex = /<\/div>\s*<\/section>\s*<!--\s*PRICING & MATRIX SECTION/i;
  const switcherHtml = `
      <!-- Smart View Switcher (PC: Table Default, Phone: Cards Default) -->
      <div class="pt-3 flex items-center justify-center">
        <div class="p-1 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs inline-flex items-center gap-1">
          <button id="viewTableBtn" type="button" class="px-4 sm:px-5 py-2 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all duration-200">
            <i class="fa-solid fa-table-list text-[11px]"></i>
            <span>Comparison Table</span>
          </button>
          <button id="viewCardsBtn" type="button" class="px-4 sm:px-5 py-2 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all duration-200">
            <i class="fa-solid fa-table-cells-large text-[11px]"></i>
            <span>Card Grid</span>
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- PRICING & MATRIX SECTION`;

  port = port.replace(heroEndRegex, switcherHtml);

  const cardsHtml = `
      <!-- 2. CARD GRID VIEW (Default on Mobile Phones) -->
      <div id="pricingCardsView" class="hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch transition-all duration-300">
        
        <!-- Card 1: Executive Starter -->
        <div class="morphy-card p-6 bg-white border border-[#E2E8F0] rounded-3xl flex flex-col justify-between space-y-4 hover:border-[#0066FF]/40 hover:shadow-xl transition-all">
          <div>
            <span class="text-[10px] font-black uppercase text-[#64748B] bg-[#F8FAFC] px-2.5 py-1 rounded-md border border-[#E2E8F0]">12-Month EMI</span>
            <h3 class="text-xl font-black text-[#0B0F19] mt-3">Executive Starter</h3>
            <div class="text-2xl font-black text-[#0B0F19] mt-1">৳ 2,500 <span class="text-xs text-[#64748B] font-normal">/mo</span></div>
            <p class="text-xs font-bold text-[#0066FF] mt-1">Total ৳ 30,000 (Save 40%)</p>
            <ul class="space-y-2 pt-4 border-t border-[#F1F5F9] text-xs text-[#475569] font-medium">
              <li>✓ Custom Bento Portfolio Design</li>
              <li>✓ High-Speed NVMe Hosting</li>
              <li>✓ Credentials &amp; Project Showcase</li>
              <li>✓ Lead Inbound WhatsApp Contact</li>
              <li>✓ cPanel Handover: Month 12</li>
            </ul>
          </div>
          <button onclick="openOfferModal('Portfolio Starter (12-Mo EMI)', '৳2,500/month')" class="w-full py-3 rounded-xl bg-[#F8FAFC] hover:bg-[#0066FF] hover:text-white font-extrabold text-xs text-[#0B0F19] transition-all border border-[#E2E8F0]">
            Get Started
          </button>
        </div>

        <!-- Card 2: Authority -->
        <div class="morphy-card p-6 bg-white border border-[#E2E8F0] rounded-3xl flex flex-col justify-between space-y-4 hover:border-[#0066FF]/40 hover:shadow-xl transition-all">
          <div>
            <span class="text-[10px] font-black uppercase text-[#64748B] bg-[#F8FAFC] px-2.5 py-1 rounded-md border border-[#E2E8F0]">9-Month EMI</span>
            <h3 class="text-xl font-black text-[#0B0F19] mt-3">Authority Brand</h3>
            <div class="text-2xl font-black text-[#0B0F19] mt-1">৳ 3,200 <span class="text-xs text-[#64748B] font-normal">/mo</span></div>
            <p class="text-xs font-bold text-[#0066FF] mt-1">Total ৳ 28,800 (Save 42%)</p>
            <ul class="space-y-2 pt-4 border-t border-[#F1F5F9] text-xs text-[#475569] font-medium">
              <li>✓ Ultra-Luxury Editorial Layout</li>
              <li>✓ Free Domain for 2 Years</li>
              <li>✓ Interactive Career Timeline</li>
              <li>✓ 99/100 PageSpeed Performance</li>
              <li>✓ cPanel Handover: Month 9</li>
            </ul>
          </div>
          <button onclick="openOfferModal('Portfolio Authority (9-Mo EMI)', '৳3,200/month')" class="w-full py-3 rounded-xl bg-[#F8FAFC] hover:bg-[#0066FF] hover:text-white font-extrabold text-xs text-[#0B0F19] transition-all border border-[#E2E8F0]">
            Get Started
          </button>
        </div>

        <!-- Card 3: VIP Bento -->
        <div class="morphy-card p-6 bg-white border border-[#E2E8F0] rounded-3xl flex flex-col justify-between space-y-4 hover:border-[#0066FF]/40 hover:shadow-xl transition-all">
          <div>
            <span class="text-[10px] font-black uppercase text-[#64748B] bg-[#F8FAFC] px-2.5 py-1 rounded-md border border-[#E2E8F0]">6-Month EMI</span>
            <h3 class="text-xl font-black text-[#0B0F19] mt-3">VIP Bento Suite</h3>
            <div class="text-2xl font-black text-[#0B0F19] mt-1">৳ 4,500 <span class="text-xs text-[#64748B] font-normal">/mo</span></div>
            <p class="text-xs font-bold text-[#0066FF] mt-1">Total ৳ 27,000 (Save 46%)</p>
            <ul class="space-y-2 pt-4 border-t border-[#F1F5F9] text-xs text-[#475569] font-medium">
              <li>✓ Bespoke 3D &amp; Ambient Visuals</li>
              <li>✓ Client Testimonial Endorsement CMS</li>
              <li>✓ Consultation Booking Calendar</li>
              <li>✓ Media Press &amp; Thought Leadership</li>
              <li>✓ cPanel Handover: Month 6</li>
            </ul>
          </div>
          <button onclick="openOfferModal('Portfolio VIP (6-Mo EMI)', '৳4,500/month')" class="w-full py-3 rounded-xl bg-[#F8FAFC] hover:bg-[#0066FF] hover:text-white font-extrabold text-xs text-[#0B0F19] transition-all border border-[#E2E8F0]">
            Get Started
          </button>
        </div>

        <!-- Card 4: Founder Master -->
        <div class="morphy-card p-6 bg-white border-2 border-[#0066FF] rounded-3xl flex flex-col justify-between space-y-4 shadow-xl shadow-[#0066FF]/15 relative hover:-translate-y-1 transition-all">
          <div class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#0066FF] text-white text-[9px] font-black uppercase tracking-wider shadow-xs">Best Value</div>
          <div>
            <span class="text-[10px] font-black uppercase text-[#0066FF] bg-[#0066FF]/10 px-2.5 py-1 rounded-md border border-[#0066FF]/20">Pay In Full</span>
            <h3 class="text-xl font-black text-[#0B0F19] mt-3">Founder Master</h3>
            <div class="text-2xl font-black text-[#0B0F19] mt-1">৳ 20,000 <span class="text-xs text-[#64748B] font-normal">One-time</span></div>
            <p class="text-xs font-black text-emerald-600 mt-1">Save 60% Discount</p>
            <ul class="space-y-2 pt-4 border-t border-[#F1F5F9] text-xs text-[#475569] font-medium">
              <li>✓ <strong>Master Access Day 1</strong></li>
              <li>✓ <strong>cPanel Handover: Immediate</strong></li>
              <li>✓ <strong>100% IP &amp; Source Code Ownership</strong></li>
              <li>✓ Sub-Second Global CDN Delivery</li>
              <li>✓ Unlimited Lead Capture Storage</li>
            </ul>
          </div>
          <button onclick="openOfferModal('Portfolio Founder (Pay In Full)', '৳20,000 One-time')" class="w-full py-3 rounded-xl bg-[#0066FF] hover:bg-[#0052FF] font-black text-xs text-white transition-all shadow-md shadow-[#0066FF]/30 active:scale-98">
            Claim Offer ➔
          </button>
        </div>

      </div>
`;

  const tableEndRegex = /<\/div>\s*<\/div>\s*<\/section>\s*<!--\s*6\.\s*COMMISSION/i;
  if (port.match(tableEndRegex)) {
    port = port.replace(tableEndRegex, `</div>\n      </div>\n${cardsHtml}\n    </div>\n  </section>\n  <!-- 6. COMMISSION`);
  }

  fs.writeFileSync(portPath, port, 'utf8');
  console.log('Updated portfolio.html with smart dual views!');
}


// =========================================================================
// 4. SMART VIEW CONTROLLER (PC: Table First, Phone: Cards First)
// =========================================================================
const smartViewControllerJs = `
/* ==========================================================================
   Smart Pricing View Controller (PC: Table First, Phone: Cards First)
   ========================================================================== */
function initSubpagePricingSwitcher() {
  const tableBtn = document.getElementById('viewTableBtn');
  const cardsBtn = document.getElementById('viewCardsBtn');
  const tableView = document.getElementById('pricingTableView');
  const cardsView = document.getElementById('pricingCardsView');

  if (!tableBtn || !cardsBtn || !tableView || !cardsView) return;

  function renderView(mode) {
    if (mode === 'cards') {
      tableView.classList.add('hidden');
      cardsView.classList.remove('hidden');

      cardsBtn.classList.remove('bg-transparent', 'text-[#64748B]');
      cardsBtn.classList.add('bg-[#0066FF]', 'text-white', 'shadow-xs');

      tableBtn.classList.remove('bg-[#0066FF]', 'text-white', 'shadow-xs');
      tableBtn.classList.add('bg-transparent', 'text-[#64748B]');
    } else {
      cardsView.classList.add('hidden');
      tableView.classList.remove('hidden');

      tableBtn.classList.remove('bg-transparent', 'text-[#64748B]');
      tableBtn.classList.add('bg-[#0066FF]', 'text-white', 'shadow-xs');

      cardsBtn.classList.remove('bg-[#0066FF]', 'text-white', 'shadow-xs');
      cardsBtn.classList.add('bg-transparent', 'text-[#64748B]');
    }
  }

  // Device-smart initial default: Phone (<768px) shows Cards, PC (>=768px) shows Table
  const isMobile = window.innerWidth < 768;
  renderView(isMobile ? 'cards' : 'table');

  tableBtn.addEventListener('click', () => renderView('table'));
  cardsBtn.addEventListener('click', () => renderView('cards'));
}
`;

const appJsPath = path.join(rootDir, 'app.js');
let appJs = fs.readFileSync(appJsPath, 'utf8');

if (!appJs.includes('initSubpagePricingSwitcher')) {
  appJs += '\n' + smartViewControllerJs;
  appJs = appJs.replace(
    'initOffersViewSwitcher();',
    'initOffersViewSwitcher();\n  initSubpagePricingSwitcher();'
  );
  fs.writeFileSync(appJsPath, appJs, 'utf8');
  console.log('Updated app.js with initSubpagePricingSwitcher!');
}

console.log('Finished implementing smart device package views!');
