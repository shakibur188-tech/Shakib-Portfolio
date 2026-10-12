/**
 * Md. Shakibur Rahaman - Strategic Lead & Digital Architect
 * BOTANICAL FOREST & STEEL SLATE LIGHT THEME ENGINE
 * Palette: #06D6A0 (Olive), #0B0F19 (Forest), #64748B (Slate), #94A3B8 (Mist), #CBD5E1 (Stone)
 * Dynamic Scroll Progress Bar, Animated Counters, Ambient Canvas, Before/After Slider & Point Architecture
 */

let dynamicContent = null;
let currentTypewriterTitles = [
  'Social Media & Google Marketing',
  'Brand Strategy & Corporate Identity Architecture',
  'Graphics Design & Visual Systems',
  'High-Performance Web Design & Full-Stack Development',
  'Strategic Public Relations (PR) & Mainstream Media',
  'Experiential Event Activation & 3D Exhibitions'
];

let currentModalService = null;

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Initialize Mobile Menu IMMEDIATELY (0ms delay, no blocking by async fetches)
  initMobileMenu();

  // 2. Initialize Top Scroll Progress Bar & Timed Scroll Animations
  initScrollProgressBar();

  // 3. Initialize Full-Page Ambient Background Animation
  initAmbientBackground();

  // 4. Fetch dynamic CMS content & Hydrate SEO & All Sections
  await fetchAndHydrateContent();

  // 5. Initialize Interactive Features & Motion Engines
  initTypewriter();
  initOffersViewSwitcher();
  initSubpagePricingSwitcher();
  initProjectFilter();
  initServiceModal();
  initContactForm();
  initScrollEffects();
  initSpotlightCards();
  initScrollReveal();
  initAnimatedCounters();
  initBeforeAfterSliders();
  if (window.ShakibGSAP && typeof window.ShakibGSAP.refresh === 'function') {
    window.ShakibGSAP.refresh();
  }
});

/* ==========================================================================
   0. TOP SCROLL PROGRESS BAR (ANIMATION ON SCROLLING TIME)
   ========================================================================== */
function initScrollProgressBar() {
  let bar = document.getElementById('scrollProgressBar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'scrollProgressBar';
    document.body.prepend(bar);
  }

  function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();
}

/* ==========================================================================
   0.1 ANIMATED NUMERICAL STAT COUNTERS (ON SCROLLING TIME)
   ========================================================================== */
function initAnimatedCounters() {
  const counterElements = document.querySelectorAll('[data-counter-target]');
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSingleCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  counterElements.forEach(el => observer.observe(el));
}

function animateSingleCounter(el) {
  const targetStr = el.getAttribute('data-counter-target');
  const targetNum = parseFloat(targetStr);
  const suffix = el.getAttribute('data-counter-suffix') || '';
  const prefix = el.getAttribute('data-counter-prefix') || '';
  const isDecimal = targetStr.includes('.');
  const duration = 1600;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic formula
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const currentVal = easeOut * targetNum;

    if (isDecimal) {
      el.textContent = `${prefix}${currentVal.toFixed(1)}${suffix}`;
    } else {
      el.textContent = `${prefix}${Math.floor(currentVal)}${suffix}`;
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = `${prefix}${targetStr}${suffix}`;
    }
  }

  requestAnimationFrame(update);
}

/* ==========================================================================
   1. CONTINUOUS ANIMATED CLOUD BACKGROUND ENGINE (60FPS CANVAS & SKY)
   ========================================================================== */
function initAmbientBackground() {
  const canvas = document.getElementById('ambientCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initAuroraWaves();
  }, { passive: true });

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  }, { passive: true });

  // Velvety Deep Teal & Glowing Mint Aurora Waves
  let waves = [];
  function initAuroraWaves() {
    waves = [];
    const count = width > 768 ? 7 : 4;
    const colors = [
      { r: 32, g: 225, b: 178 },   // Electric Mint Aurora (#20E1B2)
      { r: 14, g: 165, b: 233 },   // Soft Azure (#0EA5E9)
      { r: 11, g: 56, b: 68 },     // Deep Petrol Teal (#0B3844)
      { r: 18, g: 87, b: 104 }     // Sea Wave (#125768)
    ];

    for (let i = 0; i < count; i++) {
      const col = colors[i % colors.length];
      waves.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 280 + 180,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        color: col,
        alpha: Math.random() * 0.3 + 0.18,
        phase: Math.random() * Math.PI * 2
      });
    }
  }
  initAuroraWaves();

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Smooth mouse parallax
    mouse.x += (mouse.targetX - mouse.x) * 0.04;
    mouse.y += (mouse.targetY - mouse.y) * 0.04;

    // 1. Fluid Base Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, width * 0.4, height);
    bgGrad.addColorStop(0, '#03151A');
    bgGrad.addColorStop(0.3, '#07252D');
    bgGrad.addColorStop(0.6, '#0B3844');
    bgGrad.addColorStop(1, '#020F13');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Render Velvet Aurora Glow Waves
    waves.forEach(w => {
      w.phase += 0.006;
      w.x += w.vx + Math.sin(w.phase) * 0.25;
      w.y += w.vy + Math.cos(w.phase) * 0.25;

      // Soft wrap
      if (w.x < -w.r) w.x = width + w.r;
      if (w.x > width + w.r) w.x = -w.r;
      if (w.y < -w.r) w.y = height + w.r;
      if (w.y > height + w.r) w.y = -w.r;

      const parallaxX = (mouse.x - width / 2) * 0.035;
      const parallaxY = (mouse.y - height / 2) * 0.035;
      const ox = w.x + parallaxX;
      const oy = w.y + parallaxY;

      const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, w.r);
      grad.addColorStop(0, `rgba(${w.color.r}, ${w.color.g}, ${w.color.b}, ${w.alpha})`);
      grad.addColorStop(0.55, `rgba(${w.color.r}, ${w.color.g}, ${w.color.b}, ${w.alpha * 0.45})`);
      grad.addColorStop(1, `rgba(${w.color.r}, ${w.color.g}, ${w.color.b}, 0)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(ox, oy, w.r, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

/* ==========================================================================
   2. Dynamic CMS Content Hydration & Global SEO Engine
   ========================================================================== */
async function fetchAndHydrateContent() {
  try {
    let res = null;
    try {
      res = await fetch('/api/content?t=' + Date.now(), { cache: 'no-store' });
    } catch (netErr) {
      console.warn('Backend API unavailable, using local static data', netErr);
    }

    if (res && res.ok) {
      dynamicContent = await res.json();
    } else {
      dynamicContent = await fetchFallbackData();
    }

    applyContentToDOM(dynamicContent);
  } catch (err) {
    console.error('Content hydration failed, using emergency fallback', err);
    dynamicContent = getEmergencyFallbackData();
    applyContentToDOM(dynamicContent);
  }
}

async function fetchFallbackData() {
  try {
    const fallbackRes = await fetch('./data/content.json');
    if (fallbackRes.ok) return await fallbackRes.json();
  } catch (e) {}
  return getEmergencyFallbackData();
}

function getEmergencyFallbackData() {
  return {
    meta: {
      siteTitle: "Md. Shakibur Rahaman | Strategic Lead & Digital Architect",
      brandName: "Md. Shakibur Rahaman",
      tagline: "Strategic Lead & Digital Architect",
      bio: "Strategic Lead & Full-Stack Digital Architect with the authority and vision to make decisive calls, architect high-converting branding systems, engineer modern web platforms, and drive commercial growth."
    },
    services: [
      { id: 'social-media-google-marketing', slug: 'social-media-google-marketing', title: 'Social Media & Google Marketing', badge: 'Core Pillar 01', subtitle: 'Omnichannel Ad Scaling & Meta/Google Ads', description: 'Unifying high-impact social media creative storytelling with high-intent Google Search, YouTube, and Performance Max advertising.', icon: 'fa-chart-line', deliverables: ['High-Intent Google Search & PMax Ad Scaling', 'Meta Advantage+ Creative & Retargeting Campaigns', 'Server-Side CAPI & Offline Conversion Tracking'], points: ['5.4x blended ROAS achieved', 'Server-side CAPI tracking architecture', 'Granular multi-touch attribution'], tools: ['Meta Ads Manager', 'Google Ads & PMax', 'Looker Studio'] },
      { id: 'branding-strategy', slug: 'branding-strategy', title: 'Branding & Strategy', badge: 'Core Pillar 02', subtitle: 'Strategic Brand Positioning & Architecture', description: 'Forging iconic corporate identities that command market prestige, enable pricing power, and foster enduring customer loyalty.', icon: 'fa-fingerprint', deliverables: ['Market Positioning & White-Space Mapping', 'Brand Architecture & Sub-Brand Portfolio', 'Corporate Identity Manual & Guidelines'], points: ['+340% lift in brand valuation & recall', '100% intellectual property ownership', 'Comprehensive brand system'], tools: ['Brand Matrix', 'Figma', 'Illustrator'] },
      { id: 'graphics-design-visuals', slug: 'graphics-design-visuals', title: 'Graphics Design & Visuals', badge: 'Core Pillar 03', subtitle: 'High-Impact Visual Systems & Luxury UI/UX', description: 'Crafting breathtaking visual systems that captivate attention across digital and physical touchpoints, packaging, and UI.', icon: 'fa-bezier-curve', deliverables: ['High-Converting Paid Social Ad Creatives', 'Luxury Product Packaging & Print Die-Lines', '3D Photorealistic Product Renders'], points: ['500+ high-impact assets produced', 'Publication-ready print die-lines', '3D photorealistic mockups'], tools: ['Photoshop', 'Illustrator', 'Blender 3D'] },
      { id: 'web-design-development', slug: 'web-design-development', title: 'Web Design & Development', badge: 'Core Pillar 04', subtitle: 'Ultra-Fast Jamstack & High-Conversion UX/UI', description: 'Engineering lightning-fast digital experiences that turn visitors into loyal clients with sub-second load times and clean code.', icon: 'fa-code', deliverables: ['Custom Responsive Corporate Websites', 'Headless & Full-Stack E-Commerce', 'Sub-Second Performance Optimization'], points: ['95+ Google PageSpeed score', '0.7s average page speed', 'Mobile-first fluid responsiveness'], tools: ['Tailwind CSS', 'JavaScript / Node.js', 'WordPress / Headless CMS'] },
      { id: 'pr-media-outreach', slug: 'pr-media-outreach', title: 'PR & Media Outreach', badge: 'Core Pillar 05', subtitle: 'Mainstream Press Coverage & Executive Authority', description: 'Positioning your brand at the forefront of national and industry conversations through tier-1 placements and strategic PR.', icon: 'fa-bullhorn', deliverables: ['Tier-1 National News & Press Releases', 'Strategic Influencer & Celebrity Campaigns', 'Executive Thought Leadership & CEO Features'], points: ['45M+ earned media reach delivered', 'National news media distribution', '24/7 reputation management'], tools: ['PR Distribution Wire', 'Media Contacts Matrix', 'Influencer CRM'] },
      { id: 'event-activation-exhibition', slug: 'event-activation-exhibition', title: 'Event Activation & Exhibition', badge: 'Core Pillar 06', subtitle: 'Turnkey Experiential Activations & 3D Stalls', description: 'Transforming physical spaces into unforgettable brand experiences with photorealistic 3D stalls and turnkey gala activations.', icon: 'fa-champagne-glasses', deliverables: ['3D Exhibition Booth Architectural Design', 'Experiential Pop-Ups & VIP Launch Galas', 'Interactive Brand Installations & Displays'], points: ['100k+ visitor footfall activated', 'Photorealistic 3D stall renders', 'Turnkey vendor management'], tools: ['Blender 3D', '3ds Max', 'AutoCAD'] }
    ],
    projects: [
      { id: 'proj-1', title: 'The Peninsula Chittagong', category: 'Hospitality', liveUrl: 'https://peninsulactg.com', previewImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', client: 'The Peninsula Hotels', highlights: 'Direct booking conversion portal with 3D room panoramas and VIP amenities manager.', points: ['320% surge in direct bookings', 'Integrated real-time reservation engine', 'Sub-second mobile checkout'], ctaText: 'Visit Live Website' },
      { id: 'proj-2', title: 'Hotel Agrabad', category: 'Hospitality', liveUrl: 'https://agrabadhotels.com', previewImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80', client: 'Agrabad Luxury Group', highlights: 'Heritage hospitality platform featuring multi-lingual reservations and real-time room availability.', points: ['Multi-currency international gateway', 'Bespoke event hall 3D previews', 'Automated guest concierge sync'], ctaText: 'Visit Live Website' },
      { id: 'proj-3', title: 'Well Park Residence', category: 'Hospitality', liveUrl: 'https://wellparkresidence.com', previewImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80', client: 'Well Park Group', highlights: 'Boutique hotel site with event hall reservations, dining menus, and corporate concierge booking.', points: ['Custom dining reservation flow', 'Dynamic room package builder', 'High-res gallery CDN'], ctaText: 'Visit Live Website' },
      { id: 'proj-4', title: 'Aarong E-Commerce Store', category: 'E-Commerce', liveUrl: 'https://aarong.com', previewImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80', client: 'BRAC Social Enterprise', highlights: 'High-traffic lifestyle flagship with multi-currency checkout, inventory sync, and fluid search.', points: ['Enterprise omnichannel architecture', 'Multi-warehouse inventory logic', 'Instant elastic search filtering'], ctaText: 'Visit Live Website' },
      { id: 'proj-5', title: 'Apex Footwear E-Store', category: 'E-Commerce', liveUrl: 'https://apex4u.com', previewImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80', client: 'Apex Footwear Ltd.', highlights: 'Omnichannel retail storefront with dynamic size fitting, courier API integration, and promo engine.', points: ['Intelligent size recommender', 'Automated logistics courier dispatch', 'Personalized loyalty engine'], ctaText: 'Visit Live Website' },
      { id: 'proj-6', title: 'Yellow Clothing Brand', category: 'E-Commerce', liveUrl: 'https://yellowclothing.net', previewImage: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80', client: 'Beximco Group', highlights: 'Youth fashion brand portal featuring seasonal lookbooks, micro-interactions, and instant checkout.', points: ['Editorial storytelling layout', '1-click quick-cart modal drawer', 'Dynamic social feed integration'], ctaText: 'Visit Live Website' },
      { id: 'proj-7', title: 'Beximco Corporate Hub', category: 'Corporate', liveUrl: 'https://beximco.com', previewImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', client: 'Beximco Group', highlights: 'Enterprise corporate presence with investor relations portal, financial disclosures, and ESG metrics.', points: ['Public investor disclosure repository', 'Automated stock ticker integration', 'Multi-divisional group structure'], ctaText: 'Visit Live Website' },
      { id: 'proj-8', title: 'Square Pharmaceuticals', category: 'Corporate', liveUrl: 'https://squarepharma.com.bd', previewImage: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80', client: 'Square Group', highlights: 'Clinical pharmaceutical indexing system with 1,200+ product monographs and regulatory archives.', points: ['Verified clinical search system', 'Physician portal download archives', 'Global regulatory compliance'], ctaText: 'Visit Live Website' },
      { id: 'proj-9', title: 'ACI Limited Corporate', category: 'Corporate', liveUrl: 'https://aci-bd.com', previewImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', client: 'Advanced Chemical Industries', highlights: 'Conglomerate business division portal coordinating agribusiness, consumer goods, and logistics.', points: ['Enterprise multi-site synchronization', 'Supply chain partner portal', 'CSR impact metrics reporting'], ctaText: 'Visit Live Website' },
      { id: 'proj-10', title: 'Chaldal Grocery SaaS', category: 'Web Apps', liveUrl: 'https://chaldal.com', previewImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80', client: 'Chaldal Inc.', highlights: 'Real-time hyper-local grocery routing platform with dispatch engine and predictive inventory.', points: ['Hyper-local GPS routing engine', 'Live delivery tracking map', '1-hour dispatch logistics queue'], ctaText: 'Visit Live Website' },
      { id: 'proj-11', title: 'Pathao Super-App Web', category: 'Web Apps', liveUrl: 'https://pathao.com', previewImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80', client: 'Pathao Rides & Logistics', highlights: 'Interactive developer portal, corporate delivery dashboard, and consumer app onboarding.', points: ['High-volume ride & delivery dashboard', 'Corporate parcel booking portal', 'Live chat customer resolution'], ctaText: 'Visit Live Website' },
      { id: 'proj-12', title: 'Shohoz Travel & Tickets', category: 'Web Apps', liveUrl: 'https://shohoz.com', previewImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80', client: 'Shohoz Limited', highlights: 'High-availability bus, train, and launch ticketing engine processing millions of queries during peak seasons.', points: ['Fault-tolerant ticket locking logic', 'Interactive seat layout pickers', 'Instant SMS gateway confirmations'], ctaText: 'Visit Live Website' },
      { id: 'proj-13', title: 'Drik Picture Library', category: 'Creative', liveUrl: 'https://drik.net', previewImage: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=800&q=80', client: 'Drik Gallery & Media', highlights: 'High-resolution photojournalism gallery, international print sales, and exhibition archives.', points: ['Rights-managed image licensing', 'Curated exhibition retrospectives', 'High-bitrate archival zooming'], ctaText: 'Visit Live Website' },
      { id: 'proj-14', title: 'Bengal Foundation Arts', category: 'Creative', liveUrl: 'https://bengalfoundation.org', previewImage: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=800&q=80', client: 'Bengal Foundation', highlights: 'Editorial arts publication, classical music audio streaming archive, and festival registration portal.', points: ['Continuous audio festival stream', 'Bilingual cultural essays repository', 'Digital festival pass generation'], ctaText: 'Visit Live Website' },
      { id: 'proj-15', title: 'Chobi Mela Photo Biennale', category: 'Creative', liveUrl: 'https://chobimela.org', previewImage: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80', client: 'Chobi Mela International', highlights: 'Asia’s premier photography festival platform with artist dossiers, venue maps, and virtual tours.', points: ['3D virtual gallery walkthroughs', 'International artist dossiers', 'Interactive festival venue maps'], ctaText: 'Visit Live Website' }
    ],
    testimonials: [
      { id: 'test-1', quote: "WorkNook makes finding a coworking space so easy! I can book a desk in minutes and get straight to work. Highly recommend!", author: "Joao M.", role: "Startup Founder", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80" },
      { id: 'test-2', quote: "Our team needed a flexible meeting space, and WorkNook delivered. The process was smooth, and the space was exactly what we needed!", author: "Bruno K.", role: "UX Designer", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&h=120&q=80" },
      { id: 'test-3', quote: "I love the variety of spaces available! Whether I need a quiet spot or a collaborative space, WorkNook always has the perfect option.", author: "Lais A.", role: "Digital Marketer", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80" }
    ]
  };
}

/* ==========================================================================
   3. DOM Hydration Engine
   ========================================================================== */
function applyContentToDOM(content) {
  if (!content) return;

  // 1. Meta & Hero Section
  const profile = content.profile || content.meta || {};
  if (profile.siteTitle || content.seo?.pageTitle) {
    document.title = profile.siteTitle || content.seo?.pageTitle;
  }
  const brandName = document.getElementById('navBrandName');
  if (brandName) {
    brandName.textContent = profile.name || profile.brandName || 'Md. Shakibur Rahaman';
  }

  const heroBio = document.getElementById('heroBio');
  if (heroBio && (profile.bio || profile.headline)) {
    heroBio.textContent = profile.bio || profile.headline;
  }

  // 2. Hydrate 9 Services Grid (with Points & Single-Page Link)
  if (content.services && content.services.length) {
    renderServices(content.services);
    currentTypewriterTitles = content.services.map(s => s.title);
  }

  // 3. Hydrate 15 Web Projects Grid (with Key Points)
  const projectsList = content.webProjects || content.projects;
  if (projectsList && projectsList.length) {
    renderWebProjects(projectsList);
  }

  // 4. Hydrate Tech Arsenal Row
  renderTechArsenal();

  // 5. Hydrate Experience Roadmap
  renderRoadmap();

  // 6. Hydrate Testimonials
  if (content.testimonials && content.testimonials.length) {
    renderTestimonials(content.testimonials);
  }

  // 7. Re-initialize dynamic card mouse events, counters, sliders & scroll reveals
  initSpotlightCards();
  initScrollReveal();
  initAnimatedCounters();
  initBeforeAfterSliders();
}

/* ==========================================================================
   4. Render 6 Core Services (Ultra-Clean Morphy Bento Card Theme)
   ========================================================================== */
function renderServices(servicesData) {
  const container = document.getElementById('servicesContainer');
  if (!container) return;

  const defaultServices = [
    {
      id: 'social-media-google-marketing',
      slug: 'social-media-google-marketing',
      pillar: 'Pillar 01',
      rating: '4.9',
      tags: ['Meta & Google Ads', 'CAPI Tracking'],
      title: 'Social Media & Google Marketing',
      subtitle: 'Omnichannel Ad Scaling, Meta Ads, Google Ads (PPC/PMax) & Performance Funnels',
      description: 'Unifying high-impact social media creative storytelling with high-intent Google Search, YouTube, and Performance Max advertising.',
      deliverables: ['High-Intent Google Search & PMax Ad Scaling', 'Meta Advantage+ Creative & Retargeting Campaigns', 'Server-Side CAPI & Offline Conversion Tracking'],
      metricValue: '5.4x',
      metricLabel: 'Blended ROAS',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'branding-strategy',
      slug: 'branding-strategy',
      pillar: 'Pillar 02',
      rating: '5.0',
      tags: ['Brand Strategy', 'Identity Systems'],
      title: 'Branding & Strategy',
      subtitle: 'Strategic Brand Positioning, Identity Architecture & Market Authority',
      description: 'Forging iconic corporate identities that command market prestige, enable pricing power, and foster enduring customer loyalty.',
      deliverables: ['Market Positioning & White-Space Mapping', 'Brand Architecture & Sub-Brand Portfolio Strategy', 'Comprehensive Corporate Identity Manual & Guidelines'],
      metricValue: '+340%',
      metricLabel: 'Brand Value Lift',
      image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'graphics-design-visuals',
      slug: 'graphics-design-visuals',
      pillar: 'Pillar 03',
      rating: '4.9',
      tags: ['Visual Direction', 'Packaging & 3D'],
      title: 'Graphics Design & Visuals',
      subtitle: 'High-End Visual Assets, Advertising Creatives, Print & 3D Renders',
      description: 'Crafting breathtaking visual systems that captivate attention across digital and physical touchpoints, packaging, and UI.',
      deliverables: ['High-Converting Paid Social Ad Creative Suites', 'Luxury Product Packaging & Print Die-Line Engineering', '3D Photorealistic Product Renders & Spatial Mockups'],
      metricValue: '500+',
      metricLabel: 'Visual Assets',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'web-design-development',
      slug: 'web-design-development',
      pillar: 'Pillar 04',
      rating: '5.0',
      tags: ['Full-Stack', 'Next.js Jamstack'],
      title: 'Web Design & Development',
      subtitle: 'Ultra-Fast Custom Websites, Modern Web Apps & High-Converting UX/UI',
      description: 'Engineering lightning-fast digital experiences that turn visitors into loyal clients with sub-second load times and clean code.',
      deliverables: ['Custom Responsive Corporate Websites', 'Headless & Full-Stack E-Commerce', 'Sub-Second Performance Optimization (95+ Lighthouse Score)'],
      metricValue: '0.7s',
      metricLabel: 'Speed • 95+ PageSpeed',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'pr-media-outreach',
      slug: 'pr-media-outreach',
      pillar: 'Pillar 05',
      rating: '5.0',
      tags: ['Tier-1 Press', 'Executive PR'],
      title: 'PR & Media Outreach',
      subtitle: 'National Press Coverage, Influencer Relations & Crisis Communications',
      description: 'Positioning your brand at the forefront of national and industry conversations through tier-1 placements and strategic PR.',
      deliverables: ['Tier-1 National News & Digital Press Releases', 'Strategic Influencer & Celebrity Collaboration Campaigns', 'Executive Thought Leadership & CEO Feature Articles'],
      metricValue: '45M+',
      metricLabel: 'Media Reach',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'event-activation-exhibition',
      slug: 'event-activation-exhibition',
      pillar: 'Pillar 06',
      rating: '4.9',
      tags: ['3D Booths', 'Trade Expos'],
      title: 'Event Activation & Exhibition',
      subtitle: 'Turnkey Experiential Activations, 3D Exhibition Stalls & Launch Galas',
      description: 'Transforming physical spaces into unforgettable brand experiences with photorealistic 3D stalls and turnkey gala activations.',
      deliverables: ['3D Exhibition Booth Architectural Design & Fabrication', 'Experiential Consumer Pop-Ups & VIP Launch Galas', 'Interactive Brand Installations & Sensory Displays'],
      metricValue: '100k+',
      metricLabel: 'Visitor Footfall',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const sourceList = (Array.isArray(servicesData) && servicesData.length > 0) ? servicesData.slice(0, 6) : defaultServices;

  const dataList = sourceList.map((s, idx) => {
    const fallback = defaultServices.find(d => d.slug === s.slug || d.id === s.id) || defaultServices[idx] || defaultServices[0];
    return {
      id: s.id || fallback.id,
      slug: s.slug || fallback.slug,
      pillar: s.badge ? s.badge.split('•')[0].trim() : fallback.pillar,
      rating: fallback.rating || '5.0',
      tags: s.tools ? s.tools.slice(0, 2) : fallback.tags,
      title: s.title || fallback.title,
      subtitle: s.subtitle || fallback.subtitle,
      description: s.description || fallback.description,
      deliverables: (Array.isArray(s.deliverables) && s.deliverables.length > 0) ? s.deliverables.slice(0, 3) : fallback.deliverables,
      metricValue: s.stats ? (s.stats.split(' ')[0] || fallback.metricValue) : fallback.metricValue,
      metricLabel: s.stats ? (s.stats.split(' ').slice(1).join(' ') || fallback.metricLabel) : fallback.metricLabel,
      image: s.image || fallback.image
    };
  });

  const html = dataList.map(s => {
    const tagsHtml = s.tags.map(t => `
      <span class="px-3 py-1 rounded-full bg-[#041B21]/80 backdrop-blur-md border border-[#D1F5EE]/20 text-white text-[11px] font-semibold">${t}</span>
    `).join('');

    const deliverablesHtml = s.deliverables.map(d => `
      <li class="flex items-start gap-2.5 text-xs text-[#DDF6F0] font-medium leading-relaxed">
        <i class="fa-solid fa-circle-check text-[#20E1B2] text-xs shrink-0 mt-0.5"></i>
        <span>${escapeHtml(d)}</span>
      </li>
    `).join('');

    return `
      <a href="/services/${s.slug}" class="morphy-card group relative flex flex-col justify-between p-5 sm:p-6 rounded-[32px] bg-[#06232B]/95 border border-[#D1F5EE]/20 shadow-xl hover:shadow-2xl hover:shadow-[#20E1B2]/20 hover:border-[#20E1B2] transition-all duration-300 hover:-translate-y-2 cursor-pointer no-underline block">
        
        <!-- Inset Image Frame with Rounded Corners -->
        <div class="relative h-56 sm:h-60 w-full rounded-[24px] overflow-hidden bg-[#041B21] mb-5 border border-[#D1F5EE]/10">
          <img src="${escapeHtml(s.image)}" alt="${escapeHtml(s.title)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'">
          <div class="absolute inset-0 bg-gradient-to-t from-[#041B21]/80 via-transparent to-black/30"></div>
          
          <!-- Top Floating Glass Tags & Rating -->
          <div class="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
            <div class="flex items-center gap-1.5 flex-wrap">
              ${tagsHtml}
            </div>
            <div class="px-2.5 py-1 rounded-full bg-[#041B21]/80 backdrop-blur-md border border-[#D1F5EE]/20 text-white text-[11px] font-bold flex items-center gap-1">
              <i class="fa-solid fa-star text-amber-400 text-[10px]"></i>
              <span>${s.rating}</span>
            </div>
          </div>

          <!-- Carousel Indicator Dots -->
          <div class="absolute bottom-3.5 left-0 right-0 flex items-center justify-center gap-1.5 pointer-events-none">
            <span class="w-2 h-2 rounded-full bg-[#20E1B2] shadow-xs"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-white/50"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-white/50"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-white/50"></span>
          </div>
        </div>

        <!-- Card Body Content -->
        <div class="px-1 pb-1 flex-1 flex flex-col justify-between space-y-4">
          
          <div>
            <!-- Title & Pillar Tag -->
            <div class="flex items-start justify-between gap-3">
              <h3 class="text-xl font-black text-white group-hover:text-[#20E1B2] transition-colors leading-tight">
                ${escapeHtml(s.title)}
              </h3>
              <span class="px-3 py-1 rounded-full border border-[#D1F5EE]/20 text-[11px] font-black text-[#20E1B2] bg-[#041B21] shrink-0 group-hover:border-[#20E1B2]/40 transition-colors">
                ${s.pillar}
              </span>
            </div>

            <!-- Subheadline -->
            <p class="text-xs font-bold text-[#20E1B2] mt-1.5">
              ${escapeHtml(s.subtitle)}
            </p>

            <!-- Description -->
            <p class="text-xs text-[#A3CEC5] font-normal leading-relaxed mt-2.5">
              ${escapeHtml(s.description)}
            </p>

            <!-- Key Deliverable Points -->
            <div class="pt-4 mt-4 border-t border-[#D1F5EE]/15">
              <div class="text-[10px] font-black tracking-wider text-[#20E1B2] uppercase flex items-center gap-1.5 mb-2.5">
                <i class="fa-solid fa-list-check text-[10px]"></i>
                <span>KEY DELIVERABLES:</span>
              </div>
              <ul class="space-y-2">
                ${deliverablesHtml}
              </ul>
            </div>
          </div>

          <!-- Bottom Row: Metric & Morphy Pill Button -->
          <div class="pt-4 border-t border-[#D1F5EE]/15 flex items-center justify-between">
            <div class="flex items-baseline gap-1.5">
              <span class="text-base font-black text-[#20E1B2]">${s.metricValue}</span>
              <span class="text-xs font-semibold text-[#7EADA3]">${s.metricLabel}</span>
            </div>

            <div class="inline-flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full bg-[#041B21] border border-[#D1F5EE]/20 group-hover:bg-[#20E1B2] group-hover:border-[#20E1B2] text-white group-hover:text-[#041B21] text-xs font-extrabold transition-all duration-300 shadow-sm">
              <span class="font-eng font-bold">Explore Hub</span>
              <span class="w-6 h-6 rounded-full bg-white/10 group-hover:bg-[#041B21] text-[#20E1B2] group-hover:text-white flex items-center justify-center text-[10px] transition-colors">
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
              </span>
            </div>
          </div>

        </div>

      </a>
    `;
  }).join('');

  container.innerHTML = html;
}

/* ==========================================================================
   5. Render 15 Web Projects Showcase Grid (Modern Morphy Browser Theme)
   ========================================================================== */
function renderWebProjects(projects) {
  const container = document.getElementById('projectsGrid');
  if (!container) return;

  const html = projects.map(proj => {
    const displayUrl = proj.liveUrl.replace(/^https?:\/\//i, '').replace(/\/$/, '');
    const pointsHtml = (proj.points || ['High-speed cloud deployment', 'Core Web Vitals optimized', 'Mobile-first responsive architecture']).slice(0, 3).map(pt => `
      <li class="flex items-start gap-2 text-xs text-[#DDF6F0] font-medium leading-relaxed">
        <i class="fa-solid fa-check text-[10px] text-[#20E1B2] mt-0.5 shrink-0"></i>
        <span>${escapeHtml(pt)}</span>
      </li>
    `).join('');

    return `
      <div class="morphy-card p-0 overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:-translate-y-2 hover:border-[#20E1B2]/60 hover:shadow-2xl hover:shadow-[#20E1B2]/20 bg-[#06232B]/95 border border-[#D1F5EE]/20 project-item" data-category="${escapeHtml(proj.category || 'General')}">
        
        <!-- Browser Window Mockup Header -->
        <div class="px-4 py-3 bg-[#041B21] border-b border-[#D1F5EE]/15 flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-[#EF4444]/80"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/80"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-[#10B981]/80"></span>
          </div>
          <div class="px-3 py-1 rounded-lg bg-[#0B3844]/40 border border-[#D1F5EE]/15 text-[10.5px] font-bold text-[#A3CEC5] tracking-tight max-w-[200px] truncate">
            ${escapeHtml(displayUrl)}
          </div>
          <span class="px-2.5 py-0.5 rounded-full text-[9.5px] font-black bg-[#20E1B2]/15 text-[#20E1B2] uppercase border border-[#20E1B2]/30">
            ${escapeHtml(proj.category)}
          </span>
        </div>

        <!-- Project Screenshot / Preview -->
        <div class="relative h-48 w-full overflow-hidden bg-[#041B21]">
          <img src="${escapeHtml(proj.previewImage)}" alt="${escapeHtml(proj.title)}" class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'">
          <div class="absolute inset-0 bg-gradient-to-t from-[#041B21]/80 via-transparent to-transparent"></div>
          
          <!-- Bottom Client Tag -->
          <div class="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
            <span class="text-xs font-bold text-white drop-shadow-sm">${escapeHtml(proj.client || 'Enterprise Client')}</span>
            <span class="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#20E1B2]/20 border border-[#20E1B2]/30 text-[#20E1B2]">Production Live</span>
          </div>
        </div>

        <!-- Content Area -->
        <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <h3 class="text-lg font-black text-white group-hover:text-[#20E1B2] transition-colors leading-snug">
              ${escapeHtml(proj.title)}
            </h3>
            <p class="text-xs text-[#A3CEC5] mt-1 mb-3 leading-relaxed">
              ${escapeHtml(proj.highlights || '')}
            </p>

            <ul class="space-y-1.5 pt-3 border-t border-[#D1F5EE]/15">
              ${pointsHtml}
            </ul>
          </div>

          <!-- Bottom Live Platform CTA Button -->
          <div class="pt-4 border-t border-[#D1F5EE]/15">
            <a href="${escapeHtml(proj.liveUrl)}" target="_blank" rel="noopener noreferrer" class="btn-morphy-primary w-full justify-between text-xs py-2.5">
              <span>Visit Live Platform</span>
              <i class="fa-solid fa-arrow-up-right-from-square text-[11px]"></i>
            </a>
          </div>

        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = html;
}

/* ==========================================================================
   6. Render Technologies & Tools Arsenal
   ========================================================================== */
function renderTechArsenal() {
  const container = document.getElementById('techArsenalGrid');
  if (!container) return;

  const stack = [
    { name: 'HTML5', icon: 'fa-brands fa-html5', color: '#E34F26' },
    { name: 'CSS3', icon: 'fa-brands fa-css3-alt', color: '#1572B6' },
    { name: 'JavaScript', icon: 'fa-brands fa-js', color: '#B39200' },
    { name: 'TypeScript', icon: 'fa-solid fa-code', color: '#3178C6' },
    { name: 'React', icon: 'fa-brands fa-react', color: '#0088A9' },
    { name: 'Next.js', icon: 'fa-solid fa-n', color: '#0B0F19' },
    { name: 'Node.js', icon: 'fa-brands fa-node-js', color: '#43853D' },
    { name: 'Express.js', icon: 'fa-solid fa-server', color: '#64748B' },
    { name: 'MongoDB', icon: 'fa-solid fa-database', color: '#3F8A43' },
    { name: 'Tailwind CSS', icon: 'fa-solid fa-wind', color: '#38BDF8' },
    { name: 'Git', icon: 'fa-brands fa-git-alt', color: '#F05032' },
    { name: 'Docker', icon: 'fa-brands fa-docker', color: '#0db7ed' },
    { name: 'Figma', icon: 'fa-brands fa-figma', color: '#A259FF' },
    { name: 'Adobe Suite', icon: 'fa-solid fa-palette', color: '#FF0000' },
    { name: 'Google Ads', icon: 'fa-solid fa-chart-line', color: '#4285F4' },
    { name: 'GA4 / SEO', icon: 'fa-solid fa-magnifying-glass-chart', color: '#06D6A0' }
  ];

  container.innerHTML = stack.map(tech => `
    <div class="tech-tile reveal-on-scroll">
      <i class="${tech.icon} tech-tile-icon" style="color: ${tech.color}"></i>
      <span class="tech-tile-name">${escapeHtml(tech.name)}</span>
    </div>
  `).join('');
}

/* ==========================================================================
   7. Render Experience & Roadmap Timeline
   ========================================================================== */
function renderRoadmap() {
  const container = document.getElementById('roadmapContainer');
  if (!container) return;

  const milestones = [
    { year: '2019', title: 'Agency Genesis', desc: 'Initiated independent design and front-end engineering for enterprise and retail brands.', icon: 'fa-rocket' },
    { year: '2021', title: 'Creative Direction', desc: 'Scaled into 360° creative direction, comprehensive brand guidelines, and high-conversion e-commerce.', icon: 'fa-laptop-code' },
    { year: '2023', title: 'Enterprise Omnichannel', desc: 'Directed large-scale expo booth fabrication, national commercial video shoots, and performance marketing.', icon: 'fa-chart-pie' },
    { year: '2024 - Now', title: 'AI & AEO Architecture', desc: 'Spearheading modern web engineering, generative search engine optimization (AEO), and executive PR.', icon: 'fa-bullseye' }
  ];

  container.innerHTML = milestones.map(m => `
    <div class="roadmap-step text-center px-4 relative z-10 reveal-on-scroll">
      <div class="roadmap-node-circle">
        <i class="fa-solid ${m.icon}"></i>
      </div>
      <div class="inline-block px-3.5 py-1 rounded-full bg-[#20E1B2]/15 border border-[#20E1B2]/30 text-[#20E1B2] text-xs font-bold mb-2">
        ${escapeHtml(m.year)}
      </div>
      <h4 class="text-base font-black text-white mb-1.5 uppercase tracking-wider">${escapeHtml(m.title)}</h4>
      <p class="text-xs text-[#A3CEC5] leading-relaxed max-w-xs mx-auto">${escapeHtml(m.desc)}</p>
    </div>
  `).join('');
}

/* ==========================================================================
   8. Render Testimonials (WorkNook Style)
   ========================================================================== */
function renderTestimonials(testimonials) {
  const container = document.getElementById('testimonialsContainer');
  if (!container) return;

  const html = testimonials.map(t => {
    const avatarImg = t.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80';
    return `
      <div class="testimonial-card-new reveal-on-scroll">
        <div>
          <!-- Star Rating -->
          <div class="tc-stars">★★★★★</div>
          
          <!-- Quote Text -->
          <p class="tc-quote">
            "${escapeHtml(t.quote)}"
          </p>
        </div>

        <!-- Author Footer -->
        <div class="tc-author">
          <img src="${escapeHtml(avatarImg)}" alt="${escapeHtml(t.author)}" class="tc-avatar" loading="lazy">
          <div>
            <div class="tc-name">${escapeHtml(t.author)}</div>
            <div class="tc-role">${escapeHtml(t.role || '')}</div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = html;
}

/* ==========================================================================
   9. Project Category Filter Bar Logic
   ========================================================================== */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('#projectFilterBar .filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetCategory = btn.getAttribute('data-category') || 'all';
      filterProjectsByCategory(targetCategory);
    });
  });
}

function filterProjectsByCategory(category) {
  const projectCards = document.querySelectorAll('#projectsGrid .project-card, #fullProjectsGrid .project-card, .project-card');

  projectCards.forEach(card => {
    const cardCat = (card.getAttribute('data-category') || '').toLowerCase();
    const filterCat = category.toLowerCase();

    if (filterCat === 'all' || cardCat.includes(filterCat)) {
      card.style.display = 'flex';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      }, 10);
    } else {
      card.style.opacity = '0';
      card.style.transform = 'scale(0.96)';
      setTimeout(() => {
        card.style.display = 'none';
      }, 200);
    }
  });
}

/* ==========================================================================
   10. Mouse Spotlight Sheen Effect on Cards
   ========================================================================== */
function initSpotlightCards() {
  const cards = document.querySelectorAll('.spotlight-card');

  cards.forEach(card => {
    card.removeEventListener('mousemove', handleCardMouseMove);
    card.addEventListener('mousemove', handleCardMouseMove, { passive: true });
  });
}

function handleCardMouseMove(e) {
  const rect = this.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  this.style.setProperty('--mouse-x', `${x}px`);
  this.style.setProperty('--mouse-y', `${y}px`);
}

/* ==========================================================================
   11. IntersectionObserver Scroll Reveal Engine
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal-on-scroll, .reveal-fade-left, .reveal-fade-right, .reveal-zoom');
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ==========================================================================
   11.1 Interactive Before & After Image Comparison Slider Logic
   ========================================================================== */
function initBeforeAfterSliders() {
  const containers = document.querySelectorAll('.before-after-container');
  containers.forEach(container => {
    const range = container.querySelector('.ba-range-input');
    const updatePosition = (val) => {
      container.style.setProperty('--ba-position', val + '%');
    };

    if (range) {
      range.addEventListener('input', (e) => {
        updatePosition(e.target.value);
      });
    }

    let isDragging = false;
    const handleMove = (clientX) => {
      const rect = container.getBoundingClientRect();
      let x = clientX - rect.left;
      let pct = (x / rect.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      updatePosition(pct.toFixed(2));
      if (range) range.value = pct;
    };

    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      handleMove(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    container.addEventListener('touchstart', (e) => {
      isDragging = true;
      handleMove(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });
  });
}

/* ==========================================================================
   12. Service Detail Modal Interactions
   ========================================================================== */
function initServiceModal() {
  const modal = document.getElementById('serviceModal');
  const closeBtn = document.getElementById('closeModalBtn');
  const requestQuoteBtn = document.getElementById('modalRequestQuoteBtn');

  if (!modal) return;

  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  if (requestQuoteBtn) {
    requestQuoteBtn.addEventListener('click', () => {
      closeModal();
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        if (currentModalService) {
          const serviceSelect = document.getElementById('leadService');
          if (serviceSelect) {
            serviceSelect.value = currentModalService.title;
          }
        }
      }
    });
  }

  window.openServiceModal = function(serviceId) {
    if (!dynamicContent || !dynamicContent.services) return;
    const svc = dynamicContent.services.find(s => s.id === serviceId);
    if (!svc) return;

    currentModalService = svc;

    const modalIcon = document.getElementById('modalIcon');
    const modalBadge = document.getElementById('modalBadge');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const modalStats = document.getElementById('modalStats');
    const modalDesc = document.getElementById('modalDesc');
    const modalDeliverables = document.getElementById('modalDeliverables');
    const modalTools = document.getElementById('modalTools');
    const modalPageLink = document.getElementById('modalPageLink');

    if (modalIcon) modalIcon.className = `fa-solid ${svc.icon || 'fa-layer-group'} text-2xl text-[#06D6A0]`;
    if (modalBadge) modalBadge.textContent = svc.badge || 'Core Vertical';
    if (modalTitle) modalTitle.textContent = svc.title;
    if (modalSubtitle) modalSubtitle.textContent = svc.subtitle || '';
    if (modalStats) modalStats.textContent = svc.stats || 'Verified Enterprise Impact';
    if (modalDesc) modalDesc.textContent = svc.description;

    if (modalDeliverables) {
      modalDeliverables.innerHTML = (svc.deliverables || []).map(d => `
        <li class="flex items-start gap-2.5 text-xs text-[#0B0F19]">
          <i class="fa-solid fa-check text-[#06D6A0] mt-0.5 shrink-0"></i>
          <span>${escapeHtml(d)}</span>
        </li>
      `).join('');
    }

    if (modalTools) {
      modalTools.innerHTML = (svc.tools || []).map(t => `
        <span class="px-2.5 py-1 rounded-md bg-[#FAFCFF] text-xs text-[#0B0F19] border border-[#06D6A0]/25 font-bold">${escapeHtml(t)}</span>
      `).join('');
    }

    if (modalPageLink) {
      modalPageLink.href = `//services/${svc.slug || svc.id}`;
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };
}

/* ==========================================================================
   13. Contact Form Submission (Direct to /api/leads)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('submitLeadBtn');
    const statusDiv = document.getElementById('formStatusAlert');
    const name = document.getElementById('leadName')?.value.trim();
    const email = document.getElementById('leadEmail')?.value.trim();
    const phone = document.getElementById('leadPhone')?.value.trim();
    const service = document.getElementById('leadService')?.value;
    const message = document.getElementById('leadMessage')?.value.trim();

    if (!name || !email || !message) {
      showFormStatus('Please complete all required fields.', 'error');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending Brief...</span><i class="fa-solid fa-spinner fa-spin text-xs"></i>`;

    const leadPayload = {
      name,
      email,
      phone: phone || 'N/A',
      services: service || 'General Consultation',
      message,
      date: new Date().toISOString()
    };

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showFormStatus(`✅ Thank you, ${name}! Your inquiry has been received. Shakibur will respond within 24 business hours.`, 'success');
        form.reset();
      } else {
        showFormStatus('Inquiry recorded. You may also connect directly via WhatsApp.', 'info');
      }
    } catch (err) {
      showFormStatus('Brief received. You can also connect via WhatsApp for immediate response.', 'info');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span>Send Message</span><i class="fa-solid fa-paper-plane text-xs"></i>`;
    }
  });

  function showFormStatus(msg, type) {
    const statusDiv = document.getElementById('formStatusAlert');
    if (!statusDiv) return;
    statusDiv.classList.remove('hidden');

    if (type === 'success') {
      statusDiv.className = 'p-4 rounded-xl text-xs font-semibold bg-[#06D6A0]/15 text-[#0B0F19] border border-[#06D6A0]/35 block';
    } else {
      statusDiv.className = 'p-4 rounded-xl text-xs font-semibold bg-gray-100 text-[#0B0F19] border border-gray-300 block';
    }
    statusDiv.textContent = msg;
  }
}

/* ==========================================================================
   14. Dynamic Rotating Typewriter Effect
   ========================================================================== */
function initTypewriter() {
  const target = document.getElementById('typewriterText');
  if (!target) return;

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 50;

  function type() {
    const titles = currentTypewriterTitles;
    if (!titles || titles.length === 0) return;

    const currentTitle = titles[titleIndex % titles.length];

    if (isDeleting) {
      target.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 20;
    } else {
      target.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 55;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      typingSpeed = 2400;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingSpeed = 300;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   15. Mobile Menu Navigation (Enhanced Glassmorphic Drawer)
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle') || document.getElementById('svcMobileToggle');
  const menu = document.getElementById('mobileMenu') || document.getElementById('svcMobileMenu');
  const icon = document.getElementById('mobileMenuIcon') || (toggleBtn ? toggleBtn.querySelector('i') : null);
  if (!toggleBtn || !menu) return;

  if (toggleBtn.dataset.menuInitialized === 'true') return;
  toggleBtn.dataset.menuInitialized = 'true';

  function openMenu() {
    menu.classList.remove('hidden');
    if (icon) {
      icon.classList.remove('fa-bars-staggered', 'fa-bars');
      icon.classList.add('fa-xmark');
    }
  }

  function closeMenu() {
    menu.classList.add('hidden');
    if (icon) {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars-staggered');
    }
  }

  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (menu.classList.contains('hidden')) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!menu.classList.contains('hidden') && !menu.contains(e.target) && !toggleBtn.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.classList.contains('hidden')) {
      closeMenu();
    }
  });
}

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
}


/* ==========================================================================
   Offers Dual View Switcher (Card Grid vs Comparison Table)
   ========================================================================== */
function initOffersViewSwitcher() {
  const gridBtn = document.getElementById('viewGridModeBtn');
  const tableBtn = document.getElementById('viewTableModeBtn');
  const gridView = document.getElementById('offersGrid');
  const tableView = document.getElementById('offersTableView');

  if (!gridBtn || !tableBtn || !gridView || !tableView) return;

  function setView(mode) {
    if (mode === 'table') {
      gridView.classList.add('hidden');
      tableView.classList.remove('hidden');

      tableBtn.classList.remove('bg-transparent', 'text-[#64748B]');
      tableBtn.classList.add('bg-[#06D6A0]', 'text-white', 'shadow-xs');

      gridBtn.classList.remove('bg-[#06D6A0]', 'text-white', 'shadow-xs');
      gridBtn.classList.add('bg-transparent', 'text-[#64748B]');
    } else {
      tableView.classList.add('hidden');
      gridView.classList.remove('hidden');

      gridBtn.classList.remove('bg-transparent', 'text-[#64748B]');
      gridBtn.classList.add('bg-[#06D6A0]', 'text-white', 'shadow-xs');

      tableBtn.classList.remove('bg-[#06D6A0]', 'text-white', 'shadow-xs');
      tableBtn.classList.add('bg-transparent', 'text-[#64748B]');
    }
  }

  gridBtn.addEventListener('click', () => setView('grid'));
  tableBtn.addEventListener('click', () => setView('table'));
}


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
      Array.from(cardsView.children).forEach(c => {
        c.style.opacity = '1';
        c.style.transform = 'none';
        c.style.visibility = 'visible';
      });

      cardsBtn.classList.remove('bg-transparent', 'text-[#64748B]');
      cardsBtn.classList.add('bg-[#06D6A0]', 'text-white', 'shadow-xs');

      tableBtn.classList.remove('bg-[#06D6A0]', 'text-white', 'shadow-xs');
      tableBtn.classList.add('bg-transparent', 'text-[#64748B]');
    } else {
      cardsView.classList.add('hidden');
      tableView.classList.remove('hidden');

      tableBtn.classList.remove('bg-transparent', 'text-[#64748B]');
      tableBtn.classList.add('bg-[#06D6A0]', 'text-white', 'shadow-xs');

      cardsBtn.classList.remove('bg-[#06D6A0]', 'text-white', 'shadow-xs');
      cardsBtn.classList.add('bg-transparent', 'text-[#64748B]');
    }
  }

  // Device-smart initial default: Phone (<768px) shows Cards, PC (>=768px) shows Table
  const isMobile = window.innerWidth < 768;
  renderView(isMobile ? 'cards' : 'table');

  tableBtn.addEventListener('click', () => renderView('table'));
  cardsBtn.addEventListener('click', () => renderView('cards'));
}
