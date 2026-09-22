/**
 * Md. Shakibur Rahaman - Strategic Lead & Digital Architect
 * BOTANICAL FOREST & STEEL SLATE LIGHT THEME ENGINE
 * Palette: #70805D (Olive), #2A3B27 (Forest), #55738D (Slate), #96A7B6 (Mist), #CBC8C4 (Stone)
 * Dynamic Scroll Progress Bar, Animated Counters, Ambient Canvas, Before/After Slider & Point Architecture
 */

let dynamicContent = null;
let currentTypewriterTitles = [
  'Brand Strategy & Corporate Identity Architecture',
  'Graphics Design & Visual Systems',
  'High-Performance Web Design & Full-Stack Development',
  'Data-Driven Social Media Marketing (SMM)',
  'Commercial Photoshoot & Cinematic Videography',
  'Experiential Event Activation & 3D Exhibitions',
  'High-Conversion Google Ads & Performance Max',
  'SEO & Generative AI Engine Optimization (AEO)',
  'Strategic Public Relations (PR) & Mainstream Media'
];

let currentModalService = null;

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Initialize Top Scroll Progress Bar & Timed Scroll Animations
  initScrollProgressBar();

  // 2. Initialize Full-Page Ambient Background Animation
  initAmbientBackground();

  // 3. Fetch dynamic CMS content & Hydrate SEO & All Sections
  await fetchAndHydrateContent();

  // 4. Initialize Interactive Features & Motion Engines
  initTypewriter();
  initMobileMenu();
  initProjectFilter();
  initServiceModal();
  initContactForm();
  initScrollEffects();
  initSpotlightCards();
  initScrollReveal();
  initAnimatedCounters();
  initBeforeAfterSliders();
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
   1. FULL-PAGE AMBIENT LIGHT BACKGROUND ANIMATION
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
  }, { passive: true });

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  }, { passive: true });

  // Floating Soft Gradient Orbs tuned for light theme canvas
  const orbs = [
    { x: width * 0.2, y: height * 0.25, r: 330, color: 'rgba(112, 128, 93, 0.08)', vx: 0.18, vy: 0.14, phase: 0 },
    { x: width * 0.8, y: height * 0.35, r: 360, color: 'rgba(85, 115, 141, 0.07)', vx: -0.16, vy: 0.12, phase: 2 },
    { x: width * 0.45, y: height * 0.75, r: 310, color: 'rgba(150, 167, 182, 0.10)', vx: 0.14, vy: -0.15, phase: 4 },
    { x: width * 0.85, y: height * 0.85, r: 280, color: 'rgba(203, 200, 196, 0.14)', vx: -0.12, vy: -0.12, phase: 1 },
    { x: width * 0.15, y: height * 0.85, r: 260, color: 'rgba(112, 128, 93, 0.06)', vx: 0.12, vy: -0.10, phase: 3 }
  ];

  // Subtle Light Dust Particles
  const particleCount = Math.min(width > 768 ? 42 : 20, 50);
  const particles = [];
  for (let i = 0; i < particleCount; i++) {
    const isOlive = Math.random() > 0.5;
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25 - 0.08,
      alpha: Math.random() * 0.35 + 0.15,
      color: isOlive ? '112, 128, 93' : '85, 115, 141'
    });
  }

  let isRunning = true;
  document.addEventListener('visibilitychange', () => {
    isRunning = !document.hidden;
    if (isRunning) requestAnimationFrame(render);
  });

  function render() {
    if (!isRunning) return;

    // Smooth mouse interpolation
    mouse.x += (mouse.targetX - mouse.x) * 0.04;
    mouse.y += (mouse.targetY - mouse.y) * 0.04;

    ctx.clearRect(0, 0, width, height);

    // 1. Draw Nebula Orbs with soft radial blur
    orbs.forEach(orb => {
      orb.phase += 0.008;
      orb.x += orb.vx + Math.sin(orb.phase) * 0.2;
      orb.y += orb.vy + Math.cos(orb.phase) * 0.2;

      // Wrap around bounds
      if (orb.x < -orb.r) orb.x = width + orb.r;
      if (orb.x > width + orb.r) orb.x = -orb.r;
      if (orb.y < -orb.r) orb.y = height + orb.r;
      if (orb.y > height + orb.r) orb.y = -orb.r;

      // Parallax shift toward mouse
      const parallaxX = (mouse.x - width / 2) * 0.025;
      const parallaxY = (mouse.y - height / 2) * 0.025;

      const grad = ctx.createRadialGradient(
        orb.x + parallaxX, orb.y + parallaxY, 0,
        orb.x + parallaxX, orb.y + parallaxY, orb.r
      );
      grad.addColorStop(0, orb.color);
      grad.addColorStop(1, 'transparent');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(orb.x + parallaxX, orb.y + parallaxY, orb.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // 2. Draw & Update Particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
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
      {
            "id": "graphics-design",
            "slug": "graphics-design",
            "title": "Graphics & Visual Identity",
            "badge": "Core Pillar 01",
            "subtitle": "Ultra-High Fidelity Visual Communication",
            "description": "Pixel-perfect digital assets, packaging architecture, advertising design, and corporate editorial decks.",
            "icon": "fa-bezier-curve",
            "deliverables": [
                  "Luxury Packaging & Print Specs",
                  "Investor Pitch Decks & Keynotes",
                  "Multi-Channel Digital Ad Creatives",
                  "Vector Scalable Typography Systems"
            ],
            "points": [
                  "Publication-ready print & vector master assets",
                  "100% intellectual property ownership",
                  "Multi-channel social & digital design templates"
            ],
            "tools": [
                  "Photoshop",
                  "Illustrator",
                  "InDesign",
                  "Figma"
            ]
      },
      {
            "id": "web-development",
            "slug": "web-development",
            "title": "Web design & Development",
            "badge": "Core Pillar 02",
            "subtitle": "Blazing-Fast High-Conversion Platforms",
            "description": "Custom responsive web portals, robust backend integrations, Jamstack architectures, and fluid interactive animations.",
            "icon": "fa-code",
            "deliverables": [
                  "Full-Stack Web Architecture",
                  "Custom Headless CMS Engine",
                  "Mobile-First Fluid Interface",
                  "Core Web Vitals 95+ Performance"
            ],
            "points": [
                  "95+ Google PageSpeed score guaranteed",
                  "Sub-second load latencies worldwide",
                  "Zero monthly plugin bloat & clean codebase"
            ],
            "tools": [
                  "JavaScript / Node.js",
                  "Tailwind CSS",
                  "HTML5/CSS3",
                  "REST APIs"
            ]
      },
      {
            "id": "social-media-marketing",
            "slug": "social-media-marketing",
            "title": "Social Media marketing",
            "badge": "Core Pillar 03",
            "subtitle": "Viral Reach & Community Engagement Systems",
            "description": "Omnichannel content engines, organic community architecture, paid ad amplification, and conversion funnel optimization.",
            "icon": "fa-hashtag",
            "deliverables": [
                  "Omnichannel Content Calendar Strategy",
                  "High-Retention Short-Form Reels & Stories",
                  "Meta Advantage+ Paid Ad Campaigns",
                  "Weekly Data & Retention KPI Reviews"
            ],
            "points": [
                  "5x organic impressions multiplier",
                  "Systematic audience retention funnels",
                  "Data-driven weekly creative iterations"
            ],
            "tools": [
                  "Meta Ads Manager",
                  "CapCut",
                  "Hootsuite",
                  "Canva Pro"
            ]
      },
      {
            "id": "public-relations",
            "slug": "public-relations",
            "title": "Public relation & Media outreach",
            "badge": "Core Pillar 04",
            "subtitle": "National & Global Media Authority Outreach",
            "description": "Strategic press releases, executive positioning, broadcast interviews, and digital editorial placements.",
            "icon": "fa-newspaper",
            "deliverables": [
                  "Strategic Press Release Syndication",
                  "Tier-1 National & Global Media Coverage",
                  "Executive Thought-Leadership Op-Eds",
                  "24/7 Crisis Communications Blueprint"
            ],
            "points": [
                  "Direct Tier-1 national media journalist network",
                  "Executive reputation & authority placement",
                  "Comprehensive media tracking & sentiment audit"
            ],
            "tools": [
                  "Direct Journalist Network",
                  "PR Newswire",
                  "Media Wire",
                  "Cision"
            ]
      },
      {
            "id": "google-ads",
            "slug": "google-ads",
            "title": "Google ads & Intent Scaling",
            "badge": "Core Pillar 05",
            "subtitle": "High-Intent Customer Acquisition Engines",
            "description": "Laser-targeted Google Search, Display, Performance Max, and YouTube ad campaigns with precision ROI tracking.",
            "icon": "fa-chart-line",
            "deliverables": [
                  "High-Intent Google Search & P-Max Campaigns",
                  "Server-Side Conversion API & GA4 Attribution",
                  "Ad Copy Testing & Click-Through Optimization",
                  "Negative Keyword Mining & Waste Elimination"
            ],
            "points": [
                  "Sub-20% target CPA acquisition economics",
                  "Granular GA4 multi-touch attribution modeling",
                  "Real-time Looker Studio executive dashboards"
            ],
            "tools": [
                  "Google Ads",
                  "GA4 Analytics",
                  "Google Tag Manager",
                  "Looker Studio"
            ]
      },
      {
            "id": "event-activation",
            "slug": "event-activation",
            "title": "Event activation & Exhibition",
            "badge": "Core Pillar 06",
            "subtitle": "Immersive Real-World Brand Experiences",
            "description": "3D exhibition booth design, corporate symposium production, experiential marketing roadshows, and interactive display technology.",
            "icon": "fa-cubes",
            "deliverables": [
                  "Photorealistic 3D Booth & Stall Architecture",
                  "Turnkey Fabrication & On-Site Production",
                  "Interactive Digital Signage & Visitor Flow",
                  "Post-Event Lead Capture & Attribution"
            ],
            "points": [
                  "Turnkey vendor management & build oversight",
                  "Visitor dwell-time & experiential optimization",
                  "100% on-schedule handover before expo doors open"
            ],
            "tools": [
                  "Blender 3D",
                  "3ds Max",
                  "AutoCAD",
                  "SketchUp"
            ]
      }
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

  // 2. Hydrate 6 Services Grid (with Points & Single-Page Link)
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

  // 5.1 Hydrate 4 Featured Case Studies (2x2 Grid)
  if (content.caseStudies && content.caseStudies.length) {
    renderHomeCaseStudies(content.caseStudies);
  }

  // 6. Hydrate Testimonials
  if (content.testimonials && content.testimonials.length) {
    renderTestimonials(content.testimonials);
  }

  // 7. Dynamic Site & Header Navigation Hydration
  if (window.applySiteHydration) {
    window.applySiteHydration(content);
  }

  // 8. Re-initialize dynamic card mouse events, counters, sliders & scroll reveals
  initSpotlightCards();
  initScrollReveal();
  initAnimatedCounters();
  initBeforeAfterSliders();
}

/* ==========================================================================
   4. Render 6 Core Services (Structured with Key Strategic Points - Light Theme)
   ========================================================================== */
function renderServices(services) {
  const container = document.getElementById('servicesContainer');
  if (!container) return;

  const defaultImages = {
    'graphics-design': 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
    'web-development': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    'social-media-marketing': 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
    'event-activation': 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    'google-ads': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    'public-relations': 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80'
  };

  const html = services.map((svc) => {
    // 3 Deliverables Points
    const deliverablesPreview = (svc.deliverables || []).slice(0, 3).map(item => `
      <li class="bullet-point-item text-xs text-[#2A3B27]">
        <i class="fa-solid fa-circle-check bullet-icon text-[#70805D]"></i>
        <span>${escapeHtml(item)}</span>
      </li>
    `).join('');

    const slug = svc.slug || svc.id;
    // Link to dedicated individual service page with fallback to services directory
    const pageUrl = `/services/${slug}.html`;
    const cardImg = svc.image || defaultImages[slug] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80';

    return `
      <a href="${pageUrl}" class="spotlight-card p-0 overflow-hidden flex flex-col justify-between group reveal-on-scroll cursor-pointer text-left no-underline block bg-white border border-[#70805D]/20">
        <!-- Visual Picture Header -->
        <div class="relative h-48 w-full overflow-hidden bg-[#F1F3ED]">
          <img src="${escapeHtml(cardImg)}" alt="${escapeHtml(svc.title)}" class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" loading="lazy">
          <div class="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
          
          <!-- Top Floating Icon & Category Badge -->
          <div class="absolute top-3.5 left-3.5 w-10 h-10 rounded-xl bg-white/95 border border-[#70805D]/30 backdrop-blur-md flex items-center justify-center text-[#70805D] text-base shadow-sm">
            <i class="fa-solid ${svc.icon || 'fa-layer-group'}"></i>
          </div>
          <div class="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#70805D]/30 text-[10.5px] font-bold text-[#2A3B27] shadow-sm">
            ${escapeHtml(svc.badge || 'Core Pillar')}
          </div>
        </div>

        <div class="p-6 sm:p-7 flex-1 flex flex-col justify-between">
          <div>
            <!-- Title & Subtitle -->
            <h3 class="text-xl font-extrabold text-[#1C2B1B] group-hover:text-[#70805D] transition-colors tracking-tight leading-snug">
              ${escapeHtml(svc.title)}
            </h3>
            <p class="text-xs text-[#55738D] font-bold mt-1 mb-3">
              ${escapeHtml(svc.subtitle || '')}
            </p>

            <!-- Description -->
            <p class="text-xs text-[#4D614A] leading-relaxed mb-4 line-clamp-2">
              ${escapeHtml(svc.description)}
            </p>

            <!-- Strategic Deliverables Points -->
            <div class="pt-3 border-t border-gray-100 mb-4">
              <div class="text-[10px] font-extrabold text-[#70805D] uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <i class="fa-solid fa-list-check text-[9px]"></i>
                <span>Key Deliverable Points:</span>
              </div>
              <ul class="space-y-1.5">
                ${deliverablesPreview}
              </ul>
            </div>
          </div>

          <!-- Card Footer -->
          <div class="pt-3 border-t border-gray-100">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-[#2A3B27] group-hover:text-[#70805D] flex items-center gap-2 transition-colors">
                <span>View Dedicated Service Page</span>
                <i class="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform text-[#70805D]"></i>
              </span>
              <span class="w-8 h-8 rounded-full bg-[#70805D]/10 border border-[#70805D]/25 flex items-center justify-center text-[#70805D] text-xs group-hover:bg-[#70805D] group-hover:text-white transition-all">
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
   5. Render 15 Web Projects Showcase Grid (Light Theme)
   ========================================================================== */
function renderWebProjects(projects) {
  const container = document.getElementById('projectsGrid');
  if (!container) return;

  // On home page, display only the first 6 featured projects
  const displayProjects = projects.slice(0, 6);

  const html = displayProjects.map(proj => {
    const displayUrl = proj.liveUrl.replace(/^https?:\/\//i, '').replace(/\/$/, '');
    const pointsHtml = (proj.points || ['High-speed cloud deployment', 'Core Web Vitals optimized', 'Mobile-first responsive architecture']).slice(0, 3).map(pt => `
      <li class="bullet-point-item text-xs text-[#4D614A] flex items-start gap-1.5">
        <i class="fa-solid fa-check text-[9px] text-[#70805D] mt-1 shrink-0"></i>
        <span class="line-clamp-1">${escapeHtml(pt)}</span>
      </li>
    `).join('');

    return `
      <a href="${escapeHtml(proj.liveUrl)}" target="_blank" rel="noopener noreferrer" class="spotlight-card project-card flex flex-col justify-between h-full group reveal-on-scroll cursor-pointer text-left no-underline block bg-white border border-[#70805D]/20 rounded-3xl overflow-hidden shadow-sm hover:border-[#70805D] hover:shadow-xl hover:-translate-y-1 transition-all duration-300" data-category="${escapeHtml(proj.category || 'General')}">
        <!-- Browser Mockup Header -->
        <div class="browser-header shrink-0 flex items-center justify-between px-4 py-2.5 bg-[#F1F3ED]/80 border-b border-[#70805D]/15">
          <div class="flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-red-400/80 inline-block"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-amber-400/80 inline-block"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400/80 inline-block"></span>
          </div>
          <div class="text-[11px] font-mono text-[#55738D] truncate max-w-[180px] bg-white/80 px-2.5 py-0.5 rounded-md border border-[#70805D]/15">${escapeHtml(displayUrl)}</div>
        </div>

        <!-- Image Preview Thumbnail (Strict Equal Height & Width) -->
        <div class="relative h-52 w-full shrink-0 overflow-hidden bg-[#F1F3ED]">
          <img src="${escapeHtml(proj.previewImage)}" alt="${escapeHtml(proj.title)}" class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'">
          <div class="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"></div>
          <div class="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#70805D]/30 text-[10px] font-extrabold text-[#2A3B27] shadow-sm">
            ${escapeHtml(proj.category)}
          </div>
        </div>

        <!-- Project Details Body (Equal Height & Flex Pinned) -->
        <div class="p-5 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between gap-2 mb-1.5">
              <span class="text-[11px] text-[#70805D] font-bold uppercase tracking-wider">${escapeHtml(proj.client || 'Enterprise Web')}</span>
            </div>

            <h3 class="text-base sm:text-lg font-bold text-[#1C2B1B] mb-2 leading-snug group-hover:text-[#70805D] transition-colors line-clamp-1 h-6">
              ${escapeHtml(proj.title)}
            </h3>

            <p class="text-xs text-[#55738D] leading-relaxed mb-3 line-clamp-2 min-h-[36px]">
              ${escapeHtml(proj.highlights || '')}
            </p>

            <!-- Project Execution Points -->
            <div class="pt-2.5 pb-2 border-t border-gray-100 min-h-[76px] flex flex-col justify-center">
              <ul class="space-y-1.5">
                ${pointsHtml}
              </ul>
            </div>
          </div>

          <!-- Direct Live Website Button with Circular Arrow -->
          <div class="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
            <span class="text-xs font-bold text-[#2A3B27] group-hover:text-[#70805D] flex items-center gap-2 transition-colors">
              <span>${escapeHtml(proj.ctaText || 'Visit Live Website')}</span>
              <i class="fa-solid fa-arrow-up-right-from-square text-[10px] text-[#70805D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"></i>
            </span>
            <span class="w-8 h-8 rounded-full bg-[#70805D]/10 border border-[#70805D]/25 flex items-center justify-center text-[#70805D] text-xs group-hover:bg-[#70805D] group-hover:text-white transition-all" title="Visit Live Portal">
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </span>
          </div>
        </div>
      </a>
    `;
  }).join('');

  container.innerHTML = html;
}

/* ==========================================================================
   6. Render Technologies & Tools Arsenal (Preserved for safe no-op)
   ========================================================================== */
function renderTechArsenal() {
  const container = document.getElementById('techArsenalGrid');
  if (!container) return;
}

/* ==========================================================================
   6.1 Render Featured Case Studies (2x2 Grid on Home Page with Equal Height & Width)
   ========================================================================== */
function renderHomeCaseStudies(caseStudies) {
  const container = document.getElementById('homeCaseStudiesContainer');
  if (!container) return;

  const featured = caseStudies.filter(c => c.featuredOnHome !== false).slice(0, 4);
  if (!featured.length) return;

  container.innerHTML = featured.map(cs => {
    const metricsHtml = (cs.metrics || []).slice(0, 2).map(m => `
      <span class="px-2.5 py-1 rounded-md bg-[#F1F3ED] text-[11px] font-extrabold text-[#2A3B27] border border-[#70805D]/20 flex items-center gap-1.5 shadow-2xs">
        <i class="fa-solid fa-arrow-trend-up text-[#70805D] text-[10px]"></i>
        <span>${escapeHtml(m)}</span>
      </span>
    `).join('');

    return `
      <div onclick="window.location.href='/case-study.html?id=${encodeURIComponent(cs.id)}'" class="spotlight-card rounded-3xl bg-white border border-[#70805D]/20 overflow-hidden flex flex-col justify-between shadow-sm hover:border-[#70805D] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group reveal-on-scroll h-full">
        <!-- Cover Visual with Badges (Strict Equal Height & Width) -->
        <div class="relative h-56 sm:h-64 w-full shrink-0 overflow-hidden bg-[#F1F3ED]">
          <img src="${escapeHtml(cs.coverImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80')}" alt="${escapeHtml(cs.title)}" class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" loading="lazy">
          <div class="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent"></div>

          <!-- Top Pill Badges -->
          <div class="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
            <span class="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#70805D]/30 text-[11px] font-extrabold text-[#2A3B27] shadow-sm flex items-center gap-1.5">
              <i class="fa-solid fa-building text-[#70805D] text-[10px]"></i>
              <span>${escapeHtml(cs.client || '')}</span>
            </span>
            <span class="px-2.5 py-1 rounded-full bg-[#2A3B27]/85 backdrop-blur-md border border-white/20 text-[10.5px] font-bold text-white shadow-sm">
              ${escapeHtml(cs.year || '2026')}
            </span>
          </div>

          <!-- Bottom Category Tag on Image -->
          <div class="absolute bottom-3.5 left-4">
            <span class="px-3 py-1 rounded-lg bg-[#70805D] text-white font-extrabold text-[11px] shadow-sm tracking-wide">
              ${escapeHtml(cs.category || 'Strategic Growth')}
            </span>
          </div>
        </div>

        <div class="p-6 sm:p-7 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="text-lg sm:text-xl font-bold text-[#1C2B1B] group-hover:text-[#70805D] transition-colors mb-2 leading-snug line-clamp-2 min-h-[56px]">${escapeHtml(cs.title)}</h3>
            <p class="text-xs sm:text-sm text-[#4D614A] leading-relaxed mb-4 line-clamp-2 min-h-[40px]">${escapeHtml(cs.tagline || cs.challenge || '')}</p>
            <div class="flex flex-wrap gap-2 mb-2 min-h-[32px]">${metricsHtml}</div>
          </div>
          <div class="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
            <span class="btn-aesthetic-primary text-xs py-2 px-4 justify-center pointer-events-none">
              <span>Read UX Case Study</span>
              <i class="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
            </span>
            <span class="text-xs font-bold text-[#55738D]">${escapeHtml(cs.client || '')}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
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
      <div class="inline-block px-3.5 py-1 rounded-full bg-[#70805D]/15 border border-[#70805D]/30 text-[#2A3B27] text-xs font-bold mb-2">
        ${escapeHtml(m.year)}
      </div>
      <h4 class="text-base font-extrabold text-[#1C2B1B] mb-1.5 uppercase tracking-wider">${escapeHtml(m.title)}</h4>
      <p class="text-xs text-[#4D614A] leading-relaxed max-w-xs mx-auto">${escapeHtml(m.desc)}</p>
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
  const projectCards = document.querySelectorAll('#projectsGrid .project-card');

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

    if (modalIcon) modalIcon.className = `fa-solid ${svc.icon || 'fa-layer-group'} text-2xl text-[#70805D]`;
    if (modalBadge) modalBadge.textContent = svc.badge || 'Core Vertical';
    if (modalTitle) modalTitle.textContent = svc.title;
    if (modalSubtitle) modalSubtitle.textContent = svc.subtitle || '';
    if (modalStats) modalStats.textContent = svc.stats || 'Verified Enterprise Impact';
    if (modalDesc) modalDesc.textContent = svc.description;

    if (modalDeliverables) {
      modalDeliverables.innerHTML = (svc.deliverables || []).map(d => `
        <li class="flex items-start gap-2.5 text-xs text-[#2A3B27]">
          <i class="fa-solid fa-check text-[#70805D] mt-0.5 shrink-0"></i>
          <span>${escapeHtml(d)}</span>
        </li>
      `).join('');
    }

    if (modalTools) {
      modalTools.innerHTML = (svc.tools || []).map(t => `
        <span class="px-2.5 py-1 rounded-md bg-[#F1F3ED] text-xs text-[#2A3B27] border border-[#70805D]/25 font-bold">${escapeHtml(t)}</span>
      `).join('');
    }

    if (modalPageLink) {
      modalPageLink.href = `/services/${svc.slug || svc.id}.html`;
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
      statusDiv.className = 'p-4 rounded-xl text-xs font-semibold bg-[#70805D]/15 text-[#2A3B27] border border-[#70805D]/35 block';
    } else {
      statusDiv.className = 'p-4 rounded-xl text-xs font-semibold bg-gray-100 text-[#1C2B1B] border border-gray-300 block';
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
   15. Mobile Menu Navigation
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('mobileBackdrop');
  const menu = document.getElementById('mobileMenu');

  if (toggleBtn && drawer && backdrop) {
    // Handled globally by site-hydration.js
    return;
  }

  if (!toggleBtn || !menu) return;

  toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}

/* ==========================================================================
   16. Scroll Effects: Active Navbar Item Tracking (Light Theme)
   ========================================================================== */
function initScrollEffects() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav-link');

  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (navbar) {
      if (scrollTop > 40) {
        navbar.classList.add('shadow-md', 'bg-white/95');
        navbar.classList.remove('bg-[#F8F9F6]/90');
      } else {
        navbar.classList.remove('shadow-md', 'bg-white/95');
        navbar.classList.add('bg-[#F8F9F6]/90');
      }
    }

    let current = '';
    sections.forEach(sec => {
      const secTop = sec.offsetTop - 120;
      if (scrollTop >= secTop) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-[#70805D]', 'font-bold');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-[#70805D]', 'font-bold');
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
}
