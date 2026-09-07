/**
 * Md. Shakibur Rahaman - Multi-Industry Brand & Performance Portfolio Engine
 * Powered by dynamic Admin CMS with real-time hydration, full SEO engine, and Leads capture.
 */

let dynamicContent = null;
let currentTypewriterTitles = [
  'Hospitality & Fine Dining Growth',
  'Luxury Interior & Architecture Leads',
  'Private Club Membership Drives',
  'Education & Study Abroad Student Intakes',
  'Recruiting & Corporate Staffing Pipelines',
  'Travel Agency & Tour Booking Funnels',
  'D2C E-Commerce ROAS & Catalog Scaling'
];

let CASE_STUDIES = {};

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Fetch dynamic CMS content from backend & Hydrate SEO/Content
  await fetchAndHydrateContent();

  // 2. Initialize UI modules
  initTypewriter();
  initThemeToggle();
  initMobileMenu();
  initPortfolioFilter();
  initCaseStudyModal();
  initContactComposer();
  initScrollEffects();
  initAnalyticsBackground();
});

/* ==========================================================================
   0. Dynamic CMS Content Hydration & Global SEO Engine
   ========================================================================== */
async function fetchAndHydrateContent() {
  try {
    const res = await fetch('/api/content');
    if (!res.ok) return;
    dynamicContent = await res.json();

    // ===================================
    // A. Dynamic SEO Engine Hydration
    // ===================================
    if (dynamicContent.seo) {
      hydrateSeoMetadata(dynamicContent.seo);
    }

    // ===================================
    // B. Hydrate Profile / Bio / Eyebrow
    // ===================================
    if (dynamicContent.profile) {
      const p = dynamicContent.profile;
      const eyebrowEl = document.querySelector('[data-cms="eyebrow"]');
      if (eyebrowEl && p.eyebrow) eyebrowEl.textContent = p.eyebrow;

      const headlineEl = document.querySelector('[data-cms="headline"]');
      if (headlineEl && p.headline) headlineEl.textContent = p.headline;

      const bioEl = document.querySelector('[data-cms="bio"]');
      if (bioEl && p.bio) bioEl.textContent = p.bio;

      const statusBadgeEl = document.querySelector('[data-cms="statusBadge"]');
      if (statusBadgeEl && p.statusBadge) statusBadgeEl.textContent = p.statusBadge;

      // Update phone/whatsapp/email links
      if (p.whatsapp) {
        document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
          a.href = `https://wa.me/${p.whatsapp.replace(/\D/g, '')}?text=Hi%20Shakibur,%20I%20would%20like%20to%20discuss%20a%20marketing%20strategy.`;
        });
      }
      if (p.email) {
        document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
          a.href = `mailto:${p.email}?subject=Strategy%20Inquiry%20from%20Portfolio`;
        });
      }
    }

    // ===================================
    // C. Hydrate Typewriter Titles
    // ===================================
    if (dynamicContent.typewriter && dynamicContent.typewriter.length > 0) {
      currentTypewriterTitles = dynamicContent.typewriter;
    }

    // ===================================
    // D. Hydrate Trust & Credibility Strip
    // ===================================
    if (dynamicContent.trustAssurance) {
      const t = dynamicContent.trustAssurance;
      const trustHeadline = document.getElementById('trustHeadline');
      if (trustHeadline && t.headline) trustHeadline.textContent = t.headline;

      const trustBadge = document.getElementById('trustBadge');
      if (trustBadge && t.badgeText) trustBadge.textContent = t.badgeText;

      const trustSub = document.getElementById('trustSubheadline');
      if (trustSub && t.subheadline) trustSub.textContent = t.subheadline;
    }

    // ===================================
    // E. Hydrate Top Stats
    // ===================================
    if (dynamicContent.stats && Array.isArray(dynamicContent.stats)) {
      const statEls = document.querySelectorAll('[data-cms-stat]');
      statEls.forEach((el, idx) => {
        if (dynamicContent.stats[idx]) {
          const valSpan = el.querySelector('.stat-val');
          const lblSpan = el.querySelector('.stat-lbl');
          if (valSpan) valSpan.textContent = dynamicContent.stats[idx].value;
          if (lblSpan) lblSpan.textContent = dynamicContent.stats[idx].label;
        }
      });
    }

    // ===================================
    // F. Hydrate Case Studies Dictionary
    // ===================================
    if (dynamicContent.caseStudies && Array.isArray(dynamicContent.caseStudies)) {
      dynamicContent.caseStudies.forEach((cs, idx) => {
        if (cs.id) CASE_STUDIES[cs.id] = cs;
        if (cs.sectorId) CASE_STUDIES[cs.sectorId] = cs;
        CASE_STUDIES[String(idx + 1)] = cs;
      });
    }

  } catch (err) {
    console.log('Using default static content fallback:', err.message);
  }
}

/**
 * Dynamically injects and updates all SEO tags, OpenGraph metadata, JSON-LD Schema,
 * and Tracking Snippets (GA4, Meta Pixel) from dynamicContent.seo.
 */
function hydrateSeoMetadata(seo) {
  if (!seo) return;

  // 1. Page Title
  if (seo.pageTitle) {
    document.title = seo.pageTitle;
  }

  // 2. Meta Tags Helper
  function setMetaTag(attr, val, content) {
    if (!content) return;
    let meta = document.querySelector(`meta[${attr}="${val}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attr, val);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  }

  // 3. Standard Search Engine Meta
  setMetaTag('name', 'description', seo.metaDescription);
  setMetaTag('name', 'keywords', seo.metaKeywords);
  setMetaTag('name', 'author', seo.author || 'Md. Shakibur Rahaman');

  if (seo.googleSiteVerification) {
    setMetaTag('name', 'google-site-verification', seo.googleSiteVerification);
  }

  // 4. Canonical URL Link
  if (seo.canonicalUrl) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', seo.canonicalUrl);
  }

  // 5. OpenGraph Tags (Facebook / LinkedIn / WhatsApp)
  setMetaTag('property', 'og:title', seo.ogTitle || seo.pageTitle);
  setMetaTag('property', 'og:description', seo.ogDescription || seo.metaDescription);
  setMetaTag('property', 'og:url', seo.canonicalUrl || window.location.href);
  if (seo.ogImage) {
    setMetaTag('property', 'og:image', seo.ogImage);
  }
  setMetaTag('property', 'og:type', 'website');

  // 6. Twitter Card Tags
  setMetaTag('name', 'twitter:card', seo.twitterCard || 'summary_large_image');
  setMetaTag('name', 'twitter:title', seo.ogTitle || seo.pageTitle);
  setMetaTag('name', 'twitter:description', seo.ogDescription || seo.metaDescription);
  if (seo.ogImage) {
    setMetaTag('name', 'twitter:image', seo.ogImage);
  }

  // 7. Schema.org JSON-LD Structured Data
  if (seo.schemaJson) {
    let schemaScript = document.getElementById('dynamic-schema-ld');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'dynamic-schema-ld';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = typeof seo.schemaJson === 'object' ? JSON.stringify(seo.schemaJson) : seo.schemaJson;
  }

  // 8. Google Analytics 4 (GA4) Injection
  if (seo.googleAnalyticsId && seo.googleAnalyticsId.startsWith('G-') && !window.gaInitialized) {
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${seo.googleAnalyticsId}`;
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', seo.googleAnalyticsId);
    window.gaInitialized = true;
  }

  // 9. Meta Pixel Injection
  if (seo.metaPixelId && !window.fbqInitialized && /^\d+$/.test(seo.metaPixelId)) {
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', seo.metaPixelId);
    fbq('track', 'PageView');
    window.fbqInitialized = true;
  }

  // 10. Custom Head Script Injection
  if (seo.customHeadScript && !window.headScriptInjected) {
    const headContainer = document.createElement('div');
    headContainer.innerHTML = seo.customHeadScript;
    Array.from(headContainer.children).forEach(node => document.head.appendChild(node));
    window.headScriptInjected = true;
  }

  // 11. Custom Body Script Injection
  if (seo.customBodyScript && !window.bodyScriptInjected) {
    const bodyContainer = document.createElement('div');
    bodyContainer.innerHTML = seo.customBodyScript;
    Array.from(bodyContainer.children).forEach(node => document.body.appendChild(node));
    window.bodyScriptInjected = true;
  }
}

/* ==========================================================================
   1. Dynamic Multi-Industry Typewriter Effect
   ========================================================================== */
function initTypewriter() {
  const target = document.getElementById('typewriterText');
  if (!target) return;

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 65;

  function type() {
    const titles = currentTypewriterTitles;
    if (!titles || titles.length === 0) return;

    const currentTitle = titles[titleIndex % titles.length];

    if (isDeleting) {
      target.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 30;
    } else {
      target.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 70;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingSpeed = 350;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   2. Scroll Effects: Progress Bar, Parallax, Reveal Observer, Section Spy
   ========================================================================== */
function initScrollEffects() {
  const progressBar = document.getElementById('scrollProgressBar');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const navbar = document.getElementById('navbar');
  const glow1 = document.getElementById('glow1');
  const glow2 = document.getElementById('glow2');
  const glow3 = document.getElementById('glow3');

  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    if (navbar) {
      if (scrollTop > 40) {
        navbar.classList.add('shadow-2xl', 'bg-[#060A14]/95');
        navbar.classList.remove('bg-[#060A14]/80');
      } else {
        navbar.classList.remove('shadow-2xl', 'bg-[#060A14]/95');
        navbar.classList.add('bg-[#060A14]/80');
      }
    }

    if (backToTopBtn) {
      if (scrollTop > 400) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
        backToTopBtn.classList.add('opacity-100', 'translate-y-0');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
        backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
      }
    }

    // Parallax ambient glow drift
    if (glow1) glow1.style.transform = `translate(${Math.sin(scrollTop * 0.002) * 40}px, ${scrollTop * 0.08}px)`;
    if (glow2) glow2.style.transform = `translate(${Math.cos(scrollTop * 0.002) * -35}px, ${scrollTop * 0.05}px)`;
    if (glow3) glow3.style.transform = `translate(${Math.sin(scrollTop * 0.003) * 30}px, ${scrollTop * 0.04}px)`;

    // Active Navigation Spy
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('text-sky-400', 'font-semibold');
        link.classList.remove('text-slate-300');
      } else {
        link.classList.remove('text-sky-400', 'font-semibold');
        link.classList.add('text-slate-300');
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Reveal-on-scroll IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }
}

/* ==========================================================================
   3. Theme Switcher (Obsidian Dark / Executive Light)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggle') || document.getElementById('themeToggleBtn');
  const mobileToggleBtn = document.getElementById('mobileThemeToggle');

  function toggle() {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  }

  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
  }

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggle);
  if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', toggle);
}

/* ==========================================================================
   4. Mobile Menu Navigation
   ========================================================================== */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuToggle') || document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!mobileMenuBtn || !mobileMenu) return;

  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  document.querySelectorAll('.mobile-link, .mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

/* ==========================================================================
   5. Filterable Multi-Industry Portfolio
   ========================================================================== */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.case-card, .portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active', 'bg-blue-600', 'text-white', 'font-bold');
        b.classList.add('bg-slate-800', 'text-slate-300');
      });

      btn.classList.add('active', 'bg-blue-600', 'text-white', 'font-bold');
      btn.classList.remove('bg-slate-800', 'text-slate-300');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const itemCategories = item.getAttribute('data-category') || '';
        if (filterValue === 'all' || itemCategories.includes(filterValue)) {
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   6. Case Study Deep-Dive Campaign Blueprint Modal
   ========================================================================== */
const DEFAULT_CASE_STUDIES = {
  "1": {
    sector: "Hospitality & Fine Dining",
    badge: "5-Star Luxury Hospitality",
    client: "Hotel Sarina Dhaka",
    role: "Executive, Brand & Marketing",
    title: "5-Star Festive & Banquet Direct Revenue Engine",
    summary: "Full-funnel Meta Ads, culinary cinematography, and direct concierge inquiry routing driving banquet closures and F&B footfall for premier 5-star hotel in Banani/Gulshan.",
    challenge: "High reliance on aggregators, under-leveraged local corporate banquet demand during festive periods, and lack of direct conversion workflows.",
    solution: "Built hyper-targeted lookalike and high-income radius funnels (Gulshan, Banani, Baridhara), launched high-aesthetic culinary cinematography, and set up 1-click WhatsApp Concierge response protocol.",
    results: [
      "+42% increase in direct banquet and luxury room bookings within 90 days",
      "7.8x Meta Ads ROAS with BDT 8.4M attributed venue revenue",
      "350,000+ local targeted reach across diplomatic & upscale corporate zones",
      "Honored with 'Pillar of Trust' (Jan 2026) and 'Dedication Dynamo' (Dec 2025) awards"
    ],
    metrics: [
      { value: "7.8x", label: "Meta ROAS" },
      { value: "+42%", label: "Direct Bookings" },
      { value: "350K+", label: "Target Reach" }
    ],
    tags: ["Meta Ads", "Hospitality CRM", "WhatsApp Concierge", "Event Lead Gen", "GTM Tracking"]
  },
  "2": {
    sector: "Luxury Interior & Architecture",
    badge: "High-End Residential & Commercial",
    client: "Luxury Architectural Design Studio",
    role: "Growth Marketing Consultant",
    title: "High-Ticket Interior Fitout & Renovation Lead Engine",
    summary: "Generating qualified homeowner and commercial fitout consultation leads for duplex apartments, villas, and corporate headquarters in Gulshan, Banani, and Uttara.",
    challenge: "Extremely high project value (BDT 2.5M – 15M) meant generic ads generated unqualified inquiries with high CPA.",
    solution: "Created cinematic 4K video walkthroughs and a multi-step project cost calculator funnel that pre-qualified budget and property location before routing to design principals.",
    results: [
      "48 verified high-budget consultation bookings",
      "BDT 14.5M in closed interior contracts within 90 days",
      "8.4x return on marketing spend",
      "Zero wasted calls due to automated budget pre-qualification"
    ],
    metrics: [
      { value: "8.4x", label: "Pipeline ROAS" },
      { value: "BDT 14.5M", label: "Pipeline Value" },
      { value: "48 Leads", label: "Qualified Consults" }
    ],
    tags: ["3D Render Ads", "High-Ticket Funnel", "Multi-Step Form", "Geo-Radius Targeting"]
  },
  "3": {
    sector: "Private Club & Elite Memberships",
    badge: "VIP Social & Golf Associations",
    client: "Prestige City Club & VIP Lounge",
    role: "Membership Acquisition Strategist",
    title: "Exclusive Member Recruitment & VIP Brand Positioning",
    summary: "Confidential membership drive targeting C-suite executives, diplomats, and high-net-worth entrepreneurs.",
    challenge: "Maintaining prestige and exclusivity without appearing mass-market or diluting brand luxury.",
    solution: "Private invitation-only landing page with bespoke inquiry vetting, dark-luxury creative assets, and personalized concierge follow-up calls.",
    results: [
      "140+ qualified membership applications received",
      "88 new approved high-tier members enrolled",
      "6.2x campaign ROAS on initiation fee revenue",
      "+180% increase in social brand equity among target demographics"
    ],
    metrics: [
      { value: "6.2x", label: "Campaign ROAS" },
      { value: "88", label: "New VIP Members" },
      { value: "140+", label: "Qualified Inquiries" }
    ],
    tags: ["VIP Positioning", "Private Access Funnel", "HNW Targeting", "Concierge Sales"]
  },
  "4": {
    sector: "Education & Study Abroad",
    badge: "International Admissions & IELTS",
    client: "Global Education Pathways Agency",
    role: "Performance Marketing Lead",
    title: "International Student Intake & IELTS Enrollment Funnel",
    summary: "Driving student applications for UK, Canada, Australia, and USA university admissions and IELTS test prep.",
    challenge: "Saturated market with rising Meta advertising costs and low attendance at free counseling sessions.",
    solution: "Launched interactive 'Country Eligibility Quiz' funnels, geo-targeted university campus ads, and automated WhatsApp reminder sequences for seminar bookings.",
    results: [
      "420+ high-intent student leads generated in 45 days",
      "110 confirmed 1-on-1 visa counseling sessions",
      "-44% reduction in cost per lead compared to historical benchmarks",
      "72 enrolled students for upcoming Fall intake"
    ],
    metrics: [
      { value: "-44%", label: "CPL Reduction" },
      { value: "420+", label: "Student Inquiries" },
      { value: "110", label: "Consultations" }
    ],
    tags: ["Eligibility Quiz", "WhatsApp Automation", "Meta Lead Gen", "Student Intake"]
  },
  "5": {
    sector: "Recruiting & Staffing Agencies",
    badge: "Executive Search & B2B Manpower",
    client: "Apex Executive Search & Staffing",
    role: "B2B Growth Strategist",
    title: "Corporate Employer Acquisition & Executive Candidate Funnel",
    summary: "Acquiring enterprise hiring contracts and sourcing senior management talent in tech, finance, and engineering.",
    challenge: "Reaching busy HR directors and corporate CFOs who ignore cold outreach emails.",
    solution: "LinkedIn & Meta thought leadership campaigns showcasing proprietary candidate assessment models paired with instant candidate sourcing inquiry forms.",
    results: [
      "65 enterprise corporate client inquiries",
      "18 new retainer recruitment contracts signed",
      "340+ pre-vetted senior candidate profiles added to talent pool",
      "3.2x increase in qualified hiring pipeline value"
    ],
    metrics: [
      { value: "65", label: "B2B Clients" },
      { value: "18", label: "Retainers Signed" },
      { value: "340+", label: "Vetted Profiles" }
    ],
    tags: ["B2B Lead Gen", "LinkedIn Ads", "Corporate Outreach", "Executive Search"]
  },
  "6": {
    sector: "Travel Agencies & Tours",
    badge: "Outbound Holiday Packages & Visa",
    client: "Horizon Luxury Travel & Tours",
    role: "Digital Campaign Director",
    title: "Outbound Holiday Package & Visa Booking Surge",
    summary: "High-converting holiday package marketing for Dubai, Thailand, Maldives, and Turkey holiday destinations.",
    challenge: "Seasonal demand spikes and high price sensitivity among prospective vacationers.",
    solution: "Dynamic itinerary carousel ads with transparent inclusions, limited-time early bird pricing, and 1-click WhatsApp booking quotes.",
    results: [
      "210+ fully booked holiday packages within 60-day campaign",
      "BDT 6.2M in gross holiday package booking value",
      "9.1x ROAS on Meta and Google Search campaigns",
      "55% repeat inquiry rate for upcoming travel seasons"
    ],
    metrics: [
      { value: "9.1x", label: "Campaign ROAS" },
      { value: "BDT 6.2M", label: "Total GMV" },
      { value: "210+", label: "Booked Travelers" }
    ],
    tags: ["Dynamic Carousels", "Google Search", "WhatsApp Lead Gen", "Tourism Funnel"]
  },
  "7": {
    sector: "D2C E-Commerce & Retail",
    badge: "Apparel, Lifestyle & Cosmetics",
    client: "Aura Luxury Apparel & Lifestyle",
    role: "E-Commerce Growth Architect",
    title: "Full-Funnel ROAS Scaling & Cart Recovery Engine",
    summary: "Scaling monthly revenue for direct-to-consumer lifestyle brand using Meta Advantage+ and dynamic catalogs.",
    challenge: "High cart abandonment rates (78%) and plateaued revenue from broad targeting campaigns.",
    solution: "Restructured Meta ad account into Prospecting (Broad + Lookalikes) and Dynamic Product Retargeting (DPA); implemented instant SMS/WhatsApp cart recovery.",
    results: [
      "1,450+ paid orders delivered in single month",
      "12.4x peak ROAS on dynamic retargeting catalog ads",
      "-32% reduction in blended customer acquisition cost (CAC)",
      "+64% increase in customer lifetime value (LTV)"
    ],
    metrics: [
      { value: "12.4x", label: "Peak ROAS" },
      { value: "1,450+", label: "Paid Orders" },
      { value: "-32%", label: "CAC Reduction" }
    ],
    tags: ["Meta Advantage+", "Dynamic DPA", "Cart Recovery", "ROAS Scaling"]
  }
};

DEFAULT_CASE_STUDIES["sarina"] = DEFAULT_CASE_STUDIES["1"];
DEFAULT_CASE_STUDIES["interior"] = DEFAULT_CASE_STUDIES["2"];
DEFAULT_CASE_STUDIES["club"] = DEFAULT_CASE_STUDIES["3"];
DEFAULT_CASE_STUDIES["membership"] = DEFAULT_CASE_STUDIES["3"];
DEFAULT_CASE_STUDIES["education"] = DEFAULT_CASE_STUDIES["4"];
DEFAULT_CASE_STUDIES["recruiting"] = DEFAULT_CASE_STUDIES["5"];
DEFAULT_CASE_STUDIES["recruitment"] = DEFAULT_CASE_STUDIES["5"];
DEFAULT_CASE_STUDIES["travel"] = DEFAULT_CASE_STUDIES["6"];
DEFAULT_CASE_STUDIES["ecommerce"] = DEFAULT_CASE_STUDIES["7"];

function initCaseStudyModal() {
  const modal = document.getElementById('caseModal') || document.getElementById('caseStudyModal');
  const closeBtn = document.getElementById('closeCaseModal') || document.getElementById('closeModalBtn');
  const dynamicBody = document.getElementById('modalDynamicBody');

  if (!modal) return;

  function openModalForCase(caseIdentifier) {
    const data = CASE_STUDIES[caseIdentifier] || DEFAULT_CASE_STUDIES[caseIdentifier] || DEFAULT_CASE_STUDIES["1"];
    if (!data) return;

    if (dynamicBody) {
      renderDynamicBlueprint(dynamicBody, data);
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  // Bind click listener to all buttons and cards with case ids
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.open-case-modal, .open-case-btn');
    if (btn) {
      e.preventDefault();
      const id = btn.getAttribute('data-id') || btn.getAttribute('data-case') || '1';
      openModalForCase(id);
      return;
    }

    const caseCard = e.target.closest('.case-card');
    if (caseCard && !e.target.closest('button, a')) {
      const id = caseCard.getAttribute('data-id') || caseCard.getAttribute('data-category') || '1';
      openModalForCase(id);
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
  });
}

function renderDynamicBlueprint(container, data) {
  let metricsHtml = '';
  const metricsArr = data.metrics || [
    { value: data.roas || '7.8x', label: 'ROAS' },
    { value: data.leads || '500+', label: 'Volume' },
    { value: data.revenue || 'BDT 5M+', label: 'Revenue' }
  ];

  metricsArr.forEach(m => {
    metricsHtml += `
      <div class="p-3.5 rounded-2xl bg-slate-950/80 border border-sky-500/30 text-center">
        <div class="text-xl sm:text-2xl font-black text-sky-400 font-mono">${m.value}</div>
        <div class="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">${m.label}</div>
      </div>
    `;
  });

  let resultsHtml = '';
  const resultsList = Array.isArray(data.results) ? data.results : [data.results || 'Delivered significant revenue and market growth.'];
  resultsList.forEach(res => {
    resultsHtml += `
      <li class="flex items-start gap-2.5">
        <i class="fa-solid fa-circle-check text-emerald-400 mt-1 shrink-0 text-xs"></i>
        <span class="text-slate-200 text-xs sm:text-sm leading-relaxed">${res}</span>
      </li>
    `;
  });

  let tagsHtml = '';
  const tagsList = Array.isArray(data.techStack) ? data.techStack : (Array.isArray(data.tags) ? data.tags : ['Meta Ads', 'GA4', 'Conversion API']);
  tagsList.forEach(tag => {
    tagsHtml += `
      <span class="text-[11px] px-2.5 py-1 rounded-lg bg-blue-500/10 text-sky-300 border border-sky-500/30 font-medium">
        ${tag}
      </span>
    `;
  });

  const safeSector = (data.sector || data.sectorId || data.title || 'Marketing Growth').replace(/'/g, "\\'");

  container.innerHTML = `
    <div class="space-y-6">
      
      <!-- Top Badges -->
      <div class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div class="flex items-center gap-2">
          <span class="px-3 py-1 rounded-full bg-blue-500/20 text-sky-300 border border-sky-500/40 text-xs font-bold uppercase tracking-wider">
            ${data.badge || data.sector || data.sectorId || 'Executive Blueprint'}
          </span>
          <span class="text-xs text-slate-400 font-mono">Verified Campaign Blueprint</span>
        </div>
        <div class="text-xs text-[#D4AF37] font-semibold flex items-center gap-1.5">
          <i class="fa-solid fa-shield-halved text-sky-400"></i>
          <span>Attributed Track Record</span>
        </div>
      </div>

      <!-- Headline & Organization -->
      <div>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
          ${data.title}
        </h2>
        <div class="flex flex-wrap items-center gap-2 mt-2 text-xs sm:text-sm text-slate-400">
          <span class="text-white font-semibold flex items-center gap-1.5">
            <i class="fa-solid fa-building text-sky-400"></i> ${data.client || 'Enterprise Brand'}
          </span>
          <span>•</span>
          <span class="text-[#D4AF37] font-medium">${data.role || 'Brand & Growth Marketing Architect'}</span>
        </div>
      </div>

      <!-- Executive Summary -->
      <div class="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <strong class="text-white">Executive Summary:</strong> ${data.summary}
      </div>

      <!-- 3 Key Metric Highlights -->
      <div class="grid grid-cols-3 gap-3">
        ${metricsHtml}
      </div>

      <!-- Challenge & Strategic Architecture Solution -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-5 rounded-2xl bg-red-950/20 border border-red-500/30 space-y-2">
          <h4 class="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
            <i class="fa-solid fa-triangle-exclamation"></i> The Core Challenge & Obstacles
          </h4>
          <p class="text-xs text-slate-300 leading-relaxed">${data.problem || data.challenge}</p>
        </div>

        <div class="p-5 rounded-2xl bg-sky-950/20 border border-sky-500/30 space-y-2">
          <h4 class="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
            <i class="fa-solid fa-wand-magic-sparkles"></i> Strategic Blueprint & Execution
          </h4>
          <p class="text-xs text-slate-300 leading-relaxed">${data.strategy ? (data.strategy + ' ' + (data.execution || '')) : data.solution}</p>
        </div>
      </div>

      <!-- Verified Results & Deliverables -->
      <div class="space-y-3 pt-2">
        <h4 class="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
          <i class="fa-solid fa-trophy"></i> Verified Revenue & Campaign Deliverables
        </h4>
        <ul class="space-y-2 text-xs sm:text-sm">
          ${resultsHtml}
        </ul>
      </div>

      <!-- Tech Stack Tags & Interactive Action CTA -->
      <div class="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex flex-wrap gap-1.5">
          ${tagsHtml}
        </div>
        <button onclick="applyBlueprintToContact('${safeSector}')" class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-[#D4AF37] hover:from-blue-500 hover:to-amber-400 text-[#070C18] font-extrabold text-xs shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2">
          <i class="fa-solid fa-paper-plane"></i>
          <span>Deploy Similar Blueprint for My Brand</span>
        </button>
      </div>

    </div>
  `;
}

window.applyBlueprintToContact = function(sectorName) {
  const modal = document.getElementById('caseModal') || document.getElementById('caseStudyModal');
  if (modal) modal.classList.add('hidden');
  document.body.style.overflow = '';

  const messageInput = document.getElementById('contactMessage');
  const sectorSelect = document.getElementById('contactSubject') || document.getElementById('contactSector');

  if (sectorSelect) {
    Array.from(sectorSelect.options).forEach(opt => {
      if (opt.text.toLowerCase().includes(sectorName.toLowerCase()) || sectorName.toLowerCase().includes(opt.value)) {
        opt.selected = true;
      }
    });
  }

  if (messageInput) {
    messageInput.value = `Hi Shakibur,\n\nI inspected your campaign blueprint for ${sectorName} on your portfolio.\n\nI would like to schedule a strategy consultation to launch a similar high-ROI marketing architecture for our business.`;
  }

  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
    if (messageInput) messageInput.focus();
  }
};

/* ==========================================================================
   7. Contact Hub & Real-Time Leads Submission
   ========================================================================== */
function initContactComposer() {
  const form = document.getElementById('contactForm');
  const copyCardBtn = document.getElementById('copyContactCardBtn');
  const sendEmailBtn = document.getElementById('sendEmailBtn');
  const sendWhatsAppBtn = document.getElementById('sendWhatsAppBtn');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await submitLeadFromForm();
    });
  }

  if (sendEmailBtn) {
    sendEmailBtn.addEventListener('click', async () => {
      await submitLeadFromForm();
      const name = document.getElementById('contactName')?.value || '';
      const message = document.getElementById('contactMessage')?.value || '';
      const email = 'shakibur188@gmail.com';
      window.location.href = `mailto:${email}?subject=Strategy%20Inquiry%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(message)}`;
    });
  }

  if (sendWhatsAppBtn) {
    sendWhatsAppBtn.addEventListener('click', async () => {
      await submitLeadFromForm();
      const name = document.getElementById('contactName')?.value || '';
      const subject = document.getElementById('contactSubject')?.value || 'General';
      const message = document.getElementById('contactMessage')?.value || '';
      const text = `Hi Shakibur,\n\nName: ${name}\nSector: ${subject}\n\nMessage: ${message}`;
      window.open(`https://wa.me/8801838070468?text=${encodeURIComponent(text)}`, '_blank');
    });
  }

  async function submitLeadFromForm() {
    const name = document.getElementById('contactName')?.value || '';
    const email = document.getElementById('contactEmail')?.value || '';
    const phone = document.getElementById('contactCompany')?.value || '';
    const sector = document.getElementById('contactSubject')?.value || 'General';
    const message = document.getElementById('contactMessage')?.value || '';

    if (!name && !message) return;

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, sector, message })
      });
      showFrontendToast('✅ Campaign consultation inquiry received! Shakibur will contact you.');
      const alertBox = document.getElementById('formSuccessAlert');
      if (alertBox) alertBox.classList.remove('hidden');
    } catch (e) {
      showFrontendToast('📋 Inquiry noted.');
    }
  }

  if (copyCardBtn) {
    copyCardBtn.addEventListener('click', () => {
      const cardText = `Md. Shakibur Rahaman\nBrand & Performance Marketing Lead\nPhone: +880 1838-070468\nEmail: shakibur188@gmail.com\nPortfolio: http://localhost:3000`;
      navigator.clipboard.writeText(cardText).then(() => {
        showFrontendToast('📋 Contact card copied to clipboard!');
      });
    });
  }
}

function showFrontendToast(msg) {
  let toast = document.getElementById('toast');
  let msgSpan = document.getElementById('toastMessage');
  if (toast && msgSpan) {
    msgSpan.textContent = msg;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 4000);
    return;
  }

  let floatToast = document.getElementById('frontendToast');
  if (!floatToast) {
    floatToast = document.createElement('div');
    floatToast.id = 'frontendToast';
    floatToast.className = 'fixed bottom-6 right-6 bg-[#0B132B]/95 text-sky-200 border border-sky-500/50 px-5 py-3.5 rounded-xl shadow-2xl z-50 text-sm font-semibold flex items-center gap-3 backdrop-blur-lg';
    document.body.appendChild(floatToast);
  }
  floatToast.textContent = msg;
  floatToast.style.display = 'flex';
  setTimeout(() => {
    floatToast.style.display = 'none';
  }, 4000);
}



/* ==========================================================================
   10. Interactive Digital Marketing & Growth Analytics Animated Canvas
   ========================================================================== */
function initAnalyticsBackground() {
  const canvas = document.getElementById('analyticsHeroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let mouse = { x: -1000, y: -1000, radius: 150 };

  function resize() {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
    height = canvas.height = canvas.parentElement.offsetHeight || 600;
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  }, { passive: true });

  // 1. Data Network Nodes
  const nodeCount = Math.min(42, Math.floor((width * height) / 24000) || 28);
  const nodes = [];
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1.2,
      color: i % 3 === 0 ? '#D4AF37' : (i % 3 === 1 ? '#38BDF8' : '#2563EB'),
      alpha: Math.random() * 0.4 + 0.25
    });
  }

  // 2. Floating Marketing Attribution Chips
  const CHIP_TEXTS = [
    'ROAS: 12.4x Peak', 'Meta CAPI Synced', 'BDT 35M+ Attributed', 'GA4 Custom Events',
    '5,000+ Verified Leads', 'High-Intent Lookalikes', 'Banquet Funnel +42%', 'Interior Fitout BDT 14.5M',
    '98.4% CVR Optimized', 'VIP Geo-Fencing: Gulshan', 'Hotel Sarina Luxury', 'Aura Advantage+ Scale'
  ];

  const chips = [];
  const chipCount = Math.min(8, Math.max(4, Math.floor(width / 220)));
  for (let i = 0; i < chipCount; i++) {
    chips.push({
      text: CHIP_TEXTS[i % CHIP_TEXTS.length],
      x: Math.random() * (width - 160) + 80,
      y: Math.random() * height,
      vy: -0.3 - Math.random() * 0.35,
      vx: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.55 + 0.3,
      gold: i % 2 === 0
    });
  }

  let time = 0;

  function render() {
    time += 0.015;
    ctx.clearRect(0, 0, width, height);

    const isLight = document.body.classList.contains('light-theme');

    // A. Draw Upward Growth Trajectory Bezier Spline Curves
    ctx.lineWidth = 1.5;
    for (let w = 0; w < 3; w++) {
      ctx.beginPath();
      const waveOffset = w * 1.8;
      const grad = ctx.createLinearGradient(0, height, width, 0);
      if (w === 0) {
        grad.addColorStop(0, 'rgba(37, 99, 235, 0.0)');
        grad.addColorStop(0.5, isLight ? 'rgba(37, 99, 235, 0.2)' : 'rgba(56, 189, 248, 0.25)');
        grad.addColorStop(1, isLight ? 'rgba(180, 140, 28, 0.25)' : 'rgba(212, 175, 55, 0.3)');
      } else if (w === 1) {
        grad.addColorStop(0, 'rgba(212, 175, 55, 0.0)');
        grad.addColorStop(0.6, isLight ? 'rgba(180, 140, 28, 0.15)' : 'rgba(212, 175, 55, 0.2)');
        grad.addColorStop(1, 'rgba(56, 189, 248, 0.15)');
      } else {
        grad.addColorStop(0, 'rgba(30, 64, 175, 0.0)');
        grad.addColorStop(0.8, isLight ? 'rgba(37, 99, 235, 0.12)' : 'rgba(37, 99, 235, 0.18)');
        grad.addColorStop(1, 'rgba(212, 175, 55, 0.18)');
      }
      ctx.strokeStyle = grad;

      ctx.moveTo(0, height * (0.88 - w * 0.12));
      for (let x = 0; x <= width; x += 30) {
        const progress = x / width;
        const y = height * (0.88 - w * 0.12)
          - progress * (height * 0.6)
          + Math.sin(progress * 4 + time + waveOffset) * 22
          + Math.cos(progress * 2 + time * 0.8) * 15;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // B. Draw Network Nodes & Attribution Connections
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      // Mouse gentle repulsion
      const dx = n.x - mouse.x;
      const dy = n.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius) {
        const angle = Math.atan2(dy, dx);
        const force = (mouse.radius - dist) / mouse.radius;
        n.x += Math.cos(angle) * force * 1.5;
        n.y += Math.sin(angle) * force * 1.5;
      }

      // Draw Node
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fillStyle = n.color;
      ctx.globalAlpha = isLight ? n.alpha * 0.8 : n.alpha;
      ctx.fill();

      // Connect with nearby nodes
      for (let j = i + 1; j < nodes.length; j++) {
        const n2 = nodes[j];
        const ndx = n.x - n2.x;
        const ndy = n.y - n2.y;
        const nDist = Math.sqrt(ndx * ndx + ndy * ndy);

        if (nDist < 120) {
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(n2.x, n2.y);
          const linkAlpha = (1 - nDist / 120) * (isLight ? 0.15 : 0.22);
          ctx.strokeStyle = n.color === '#D4AF37' ? `rgba(212, 175, 55, ${linkAlpha})` : `rgba(56, 189, 248, ${linkAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // C. Draw Floating Holographic Marketing Data Chips
    ctx.font = '500 10.5px "Space Grotesk", monospace, sans-serif';
    for (let k = 0; k < chips.length; k++) {
      const c = chips[k];
      c.y += c.vy;
      c.x += c.vx;

      if (c.y < -30) {
        c.y = height + 20;
        c.x = Math.random() * (width - 160) + 80;
      }

      const textWidth = ctx.measureText(c.text).width;
      const padX = 9;
      const padY = 5;
      const boxW = textWidth + padX * 2;
      const boxH = 18 + padY;

      ctx.save();
      ctx.globalAlpha = isLight ? c.opacity * 0.75 : c.opacity;

      // Chip Background Glass Capsule
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(c.x - padX, c.y - 12, boxW, boxH, 8);
      } else {
        ctx.rect(c.x - padX, c.y - 12, boxW, boxH);
      }
      ctx.fillStyle = isLight ? 'rgba(241, 245, 249, 0.88)' : 'rgba(11, 19, 43, 0.78)';
      ctx.fill();
      ctx.strokeStyle = c.gold ? 'rgba(212, 175, 55, 0.45)' : 'rgba(56, 189, 248, 0.45)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Chip Text
      ctx.fillStyle = c.gold ? (isLight ? '#B48C1C' : '#F3E5AB') : (isLight ? '#0284C7' : '#38BDF8');
      ctx.fillText(c.text, c.x, c.y);
      ctx.restore();
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
