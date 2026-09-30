const fs = require('fs');
const path = require('path');

const projects = [
  // 1. ASAP Interior Solutions (First)
  {
    name: "ASAP Interior Solutions",
    url: "interior.asapsl.com",
    liveUrl: "https://interior.asapsl.com",
    category: "Architecture & Interior",
    filterCategory: "Architecture",
    client: "ASAP Solutions Limited",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    headline: "Commercial & Residential Interior Architecture Flagship",
    challenge: "Consultation inquiries were scattered across unstructured channels without a centralized 3D project showcase or instant quotation calculator.",
    solution: "Engineered a high-converting corporate interior architecture platform featuring interactive spatial project galleries, service tier breakdowns, and an automated consultation booking engine.",
    deliverables: [
      "Interactive 3D spatial project portfolio with before/after views",
      "Smart quotation intake form with budget & area calculator",
      "Direct WhatsApp and calendar consultation scheduling integration"
    ],
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "REST Booking API"],
    metric: "+310% Inbound Inquiries",
    speed: "0.7s Fast Load"
  },

  // 2. Luxora Furniture (Second)
  {
    name: "Luxora Furniture",
    url: "luxorafurniture.com",
    liveUrl: "https://luxorafurniture.com",
    category: "E-Commerce & Retail",
    filterCategory: "E-Commerce",
    client: "Luxora Luxury Furnishings",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    headline: "Bespoke Luxury Furniture D2C E-Commerce Storefront",
    challenge: "Complex custom furniture variants (fabrics, wood finishes, dimensions) caused high user drop-off during online checkout.",
    solution: "Designed a luxury headless e-commerce store with dynamic product finish selectors, room visualization guides, and an accelerated 1-click checkout.",
    deliverables: [
      "Dynamic finish & fabric visual customizer with live pricing",
      "Frictionless checkout with multi-currency & COD payment support",
      "Real-time nationwide inventory & courier dispatch tracking"
    ],
    tech: ["Shopify Headless", "Tailwind CSS", "Custom Variant Engine", "Stripe"],
    metric: "+45% Conversion Lift",
    speed: "11.8x Peak ROAS"
  },

  // 3. UDC (Unity Design Consultancy) (Third)
  {
    name: "UDC (Unity Design Consultancy)",
    url: "interior3.shakibur.info",
    liveUrl: "https://interior3.shakibur.info",
    category: "Architecture & Interior",
    filterCategory: "Architecture",
    client: "Unity Design Consultancy",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    headline: "Architectural Design & Structural Engineering Consultation Hub",
    challenge: "Communicating complex structural engineering, BIM modeling, and master-planning scopes to high-value institutional developers.",
    solution: "Architected an authoritative architectural consultancy hub featuring interactive blueprint case studies, client testimonial carousels, and a multi-step RFP intake flow.",
    deliverables: [
      "Interactive architectural blueprint & 3D render case study explorer",
      "Enterprise Request for Proposal (RFP/RFQ) multi-step intake flow",
      "Fast edge-rendered portfolio with sub-second asset delivery"
    ],
    tech: ["Next.js 14", "Tailwind CSS", "Blueprint Viewer", "Node.js"],
    metric: "99/100 PageSpeed",
    speed: "+260% RFP Submissions"
  },

  // 4. Gram Banglar Poth e Poth e (Fourth)
  {
    name: "Gram Banglar Poth e Poth e",
    url: "news.shakibur.info",
    liveUrl: "https://news.shakibur.info",
    category: "Media & Publications",
    filterCategory: "Media",
    client: "Gram Banglar Poth e Poth e Media",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80",
    headline: "High-Traffic Cultural Documentary & Digital News Publication",
    challenge: "Massive traffic surges during breaking cultural stories causing server bottlenecks, high mobile bounce rates, and layout shifts.",
    solution: "Engineered an ultra-lightweight, AMP-compatible digital news publication with automated newsletter subscription, video embeds, and category filtering.",
    deliverables: [
      "Lightning-fast reader experience with zero cumulative layout shift (CLS: 0.00)",
      "Categorized cultural video documentaries & investigative essays repository",
      "Automated newsletter dispatch and push notification subscription"
    ],
    tech: ["Next.js", "Tailwind CSS", "Headless CMS", "Cloudflare CDN"],
    metric: "0.5s Reader TTFB",
    speed: "50k+ Daily Readers"
  },

  // 5. Hotel Booking Platform (Fifth)
  {
    name: "Hotel Booking Platform",
    url: "hotel.shakibur.info",
    liveUrl: "https://hotel.shakibur.info",
    category: "Hospitality & Booking",
    filterCategory: "Hospitality",
    client: "Shakib Hospitality Flagship",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    headline: "5-Star Direct Hotel Reservation & Dining Concierge Engine",
    challenge: "Traditional hotel booking templates are bloated, slow, and lose up to 70% of potential guests before checkout confirmation.",
    solution: "Built an ultra-modern luxury booking engine featuring instant date-range room availability, add-on dining packages, and multi-currency instant checkout.",
    deliverables: [
      "Direct reservation workflow with real-time room availability matrix",
      "Dining table reservation & spa package add-on bundling",
      "Instant booking confirmation with automated email & SMS ticketing"
    ],
    tech: ["Next.js 14", "Tailwind CSS", "Availability Engine API", "Stripe"],
    metric: "+340% Direct Bookings",
    speed: "0.6s Checkout Flow"
  },

  // 6. The Peninsula Chittagong
  {
    name: "The Peninsula Chittagong",
    url: "peninsulactg.com",
    liveUrl: "https://peninsulactg.com",
    category: "Hospitality & Booking",
    filterCategory: "Hospitality",
    client: "The Peninsula Hotels Group",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
    headline: "5-Star Direct Booking Portal & VIP Amenities Engine",
    challenge: "Heavy dependence on 3rd-party OTAs with high commission fees, sluggish mobile reservations, and lack of real-time dining sync.",
    solution: "Engineered a headless direct reservation architecture with instant payment processing, interactive 3D suite previews, and automated concierge workflows.",
    deliverables: [
      "Direct reservation engine with zero OTA commissions",
      "Interactive 3D luxury suite & amenities previews",
      "Sub-second mobile checkout with multi-gateway payments"
    ],
    tech: ["Next.js 14", "Tailwind CSS", "Direct Booking API", "Stripe"],
    metric: "+320% Direct Bookings",
    speed: "0.7s TTFB"
  },

  // 7. Hotel Agrabad Luxury
  {
    name: "Hotel Agrabad Luxury",
    url: "agrabadhotels.com",
    liveUrl: "https://agrabadhotels.com",
    category: "Hospitality & Booking",
    filterCategory: "Hospitality",
    client: "Agrabad Luxury Group",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    headline: "Heritage Luxury Hotel Portal & Banquet Event Engine",
    challenge: "Outdated legacy site with poor mobile conversion, no international currency support, and manual event inquiry processing.",
    solution: "Architected a bespoke digital flagship with dynamic multi-currency payments, 3D banquet hall walkthroughs, and automated VIP reservation pipelines.",
    deliverables: [
      "Multi-currency international gateway for global travelers",
      "Interactive banquet & corporate event booking system",
      "Real-time room inventory sync with property management system"
    ],
    tech: ["Next.js", "Tailwind CSS", "Multi-Currency Gateway", "Framer Motion"],
    metric: "+280% Event Inquiries",
    speed: "99/100 Speed"
  },

  // 8. Aarong Lifestyle Flagship
  {
    name: "Aarong Lifestyle Flagship",
    url: "aarong.com",
    liveUrl: "https://aarong.com",
    category: "E-Commerce & Retail",
    filterCategory: "E-Commerce",
    client: "BRAC Social Enterprise",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    headline: "High-Traffic Omnichannel D2C Lifestyle Flagship Store",
    challenge: "High cart abandonment during festive sales spikes, complex multi-warehouse inventory desync, and sluggish product filtering.",
    solution: "Engineered an enterprise headless e-commerce storefront with Algolia instant search, real-time stock sync across 20+ hubs, and 1-click checkout.",
    deliverables: [
      "Enterprise headless architecture handling 2.4M monthly visits",
      "Multi-warehouse inventory logic with zero overselling",
      "Instant elastic search filtering with sub-50ms query response"
    ],
    tech: ["Shopify Plus", "Tailwind CSS", "Algolia Search", "Klaviyo CRM"],
    metric: "+48% Cart Completion",
    speed: "12.4x Peak ROAS"
  },

  // 9. Apex Footwear E-Store
  {
    name: "Apex Footwear E-Store",
    url: "apex4u.com",
    liveUrl: "https://apex4u.com",
    category: "E-Commerce & Retail",
    filterCategory: "E-Commerce",
    client: "Apex Footwear Ltd.",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
    headline: "Enterprise Footwear Storefront with Automated Logistics Dispatch",
    challenge: "High return rates due to shoe sizing ambiguity, manual courier dispatch bottlenecks, and lack of personalized buyer incentives.",
    solution: "Created an intelligent digital size recommender, automated courier API dispatch pipeline, and personalized customer loyalty points engine.",
    deliverables: [
      "AI-assisted size & fit recommender reducing return rates",
      "Automated logistics courier API dispatch pipeline",
      "Personalized dynamic discount & loyalty reward tiers"
    ],
    tech: ["React.js", "Node.js / Express", "PostgreSQL", "Logistics API"],
    metric: "-34% Return Rate",
    speed: "+210% Mobile Orders"
  },

  // 10. LuxeHaven Interiors
  {
    name: "LuxeHaven Interiors",
    url: "luxehaven-interior.com",
    liveUrl: "https://luxehaven-interior.example.com",
    category: "Architecture & Interior",
    filterCategory: "Architecture",
    client: "LuxeHaven Architectural Studio",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    headline: "Architectural Design Studio with 3D Spatial Virtual Showcase",
    challenge: "Inability to effectively present high-end 3D residential and commercial interior projects to high-net-worth clients digitally.",
    solution: "Designed an ultra-clean architectural showcase with interactive 3D spatial tours, custom project moodboards, and consultation booking.",
    deliverables: [
      "Interactive 3D room tour engine with real-time lighting previews",
      "High-ticket consultation intake funnel with calendar sync",
      "Full case study retrospective library with high-res galleries"
    ],
    tech: ["React", "Three.js Canvas", "Tailwind CSS", "Calendly API"],
    metric: "+310% Inbound Leads",
    speed: "99/100 Speed"
  },

  // 11. NovaPulse SaaS Dashboard
  {
    name: "NovaPulse SaaS Dashboard",
    url: "novapulse-saas.com",
    liveUrl: "https://novapulse-saas.example.com",
    category: "Web Apps & SaaS",
    filterCategory: "Web Apps",
    client: "NovaPulse Technologies",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    headline: "AI-Powered Omnichannel Social Analytics & Attribution Suite",
    challenge: "Growth marketers struggling to unify cross-platform ad attribution and social engagement metrics into a single real-time dashboard.",
    solution: "Engineered a high-performance web app aggregating Meta, Google Ads, and TikTok analytics with integrated AI copywriting recommendations.",
    deliverables: [
      "Real-time multi-platform ad attribution and ROAS tracking",
      "Interactive data visualization with custom date range comparisons",
      "AI caption and ad hook generator powered by LLM API"
    ],
    tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "Recharts", "OpenAI API"],
    metric: "10k+ Events / Min",
    speed: "Sub-100ms Query"
  },

  // 12. Prestige VIP Concierge
  {
    name: "Prestige VIP Concierge",
    url: "prestige-club.com",
    liveUrl: "https://prestige-club.example.com",
    category: "Web Apps & SaaS",
    filterCategory: "Web Apps",
    client: "Prestige Global Club",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80",
    headline: "Gated Ultra-HNW Membership Verification & Concierge Portal",
    challenge: "Strict requirement for ironclad zero-trust authentication, private jet booking confidentiality, and VIP member privacy.",
    solution: "Engineered a gated member portal featuring biometric 2FA authentication, encrypted concierge messaging, and private lounge reservations.",
    deliverables: [
      "Gated membership verification with biometric 2FA security",
      "Private jet charter & luxury suite reservation portal",
      "End-to-end encrypted direct concierge messaging pipeline"
    ],
    tech: ["React", "Tailwind CSS", "Supabase Auth", "WebSockets", "Stripe"],
    metric: "100% Zero-Trust",
    speed: "500+ HNW Members"
  },

  // 13. Zenith Health Clinics
  {
    name: "Zenith Health Clinics",
    url: "zenith-health.com",
    liveUrl: "https://zenith-health.example.com",
    category: "Web Apps & SaaS",
    filterCategory: "Web Apps",
    client: "Zenith Medical Network",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    headline: "HIPAA-Compliant Telehealth & Digital Prescription Suite",
    challenge: "Phone-based doctor appointment bottlenecks, delayed lab result delivery, and fragmented telehealth video consultations.",
    solution: "Created a modern healthcare portal featuring live doctor schedule booking, integrated WebRTC video calls, and encrypted digital EMR access.",
    deliverables: [
      "Real-time doctor appointment booking with automated reminders",
      "HD WebRTC video consultation room with in-call chat",
      "Encrypted patient EMR portal and digital prescription generator"
    ],
    tech: ["Next.js", "WebRTC Video Engine", "Tailwind CSS", "Node.js"],
    metric: "+350% Telehealth Visits",
    speed: "99.98% Uptime"
  },

  // 14. EchoSound Music Festival
  {
    name: "EchoSound Music Festival",
    url: "echosoundfestival.com",
    liveUrl: "https://echosoundfestival.example.com",
    category: "Media & Publications",
    filterCategory: "Media",
    client: "EchoSound Live Entertainment",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    headline: "Serverless Concert Ticket Engine & Interactive Venue Seating",
    challenge: "Website crashing under 50,000 concurrent fans during flash ticket drops and rampant ticket scalping fraud.",
    solution: "Architected a serverless ticket queueing architecture with interactive zone maps, dynamic encrypted QR entry passes, and anti-scalping token limits.",
    deliverables: [
      "Serverless queue system handling 50k+ concurrent fans",
      "Interactive 2D stage zone & seating selection interface",
      "Dynamic anti-counterfeit QR entry passes with wallet integration"
    ],
    tech: ["Next.js", "AWS Lambda", "Redis Queue", "Tailwind CSS", "Stripe"],
    metric: "50k+ Concurrent Fans",
    speed: "Zero Downtime"
  },

  // 15. Prism Creative Collective
  {
    name: "Prism Creative Collective",
    url: "prismcreative.com",
    liveUrl: "https://prismcreative.example.com",
    category: "Media & Publications",
    filterCategory: "Media",
    client: "Prism Studios International",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
    headline: "Cinema Director Portfolio with Adaptive 4K Video Streaming",
    challenge: "Heavy 4K commercial showreels causing slow initial page loads, stuttering playback on mobile, and loss of prospective client interest.",
    solution: "Constructed an ultra-sleek cinema director portfolio with adaptive HLS video streaming, dark-mode theater view, and project inquiry forms.",
    deliverables: [
      "Adaptive HLS video streaming delivering bufferless 4K playback",
      "Custom cinema theater modal with director audio commentary",
      "Interactive creative inquiry intake form with budget filter"
    ],
    tech: ["React", "Mux Video API", "HLS Streaming", "Tailwind CSS"],
    metric: "Zero Video Buffering",
    speed: "+240% Inbound Leads"
  }
];

function generateProjectCards(list) {
  return list.map((p, idx) => `
    <div class="morphy-card p-0 rounded-[32px] overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:-translate-y-2 hover:border-[#0066FF] hover:shadow-2xl hover:shadow-[#0066FF]/15 bg-white border border-[#E2E8F0] project-card" data-category="${p.filterCategory}">
      
      <!-- Modern Browser Mockup Top Bar -->
      <div class="px-5 py-3.5 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between">
        <div class="flex items-center gap-1.5">
          <span class="w-2.5 h-2.5 rounded-full bg-[#EF4444]/90"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/90"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-[#10B981]/90"></span>
        </div>
        <div class="px-3 py-1 rounded-full bg-white border border-[#E2E8F0] text-[10.5px] font-bold text-[#64748B] tracking-tight max-w-[190px] truncate shadow-xs">
          ${p.url}
        </div>
        <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#0066FF]/10 text-[#0066FF] uppercase tracking-wider">
          ${p.category}
        </span>
      </div>

      <!-- High-Resolution Project Screenshot Preview -->
      <div class="relative h-52 w-full overflow-hidden bg-[#0B0F19]">
        <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100" loading="lazy">
        <div class="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/85 via-[#0B0F19]/25 to-transparent"></div>
        
        <!-- Top Project Index Badge (for top flagships) -->
        ${idx < 5 ? `<div class="absolute top-3.5 left-4 px-2.5 py-0.5 rounded-full bg-[#0066FF] text-white text-[10px] font-black tracking-wider uppercase shadow-md">Flagship #${idx + 1}</div>` : ''}

        <!-- Bottom Floating Client Tag -->
        <div class="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-white">
          <span class="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-black text-[#0B0F19] shadow-sm truncate max-w-[200px]">${p.client}</span>
          <span class="px-2.5 py-1 rounded-full bg-[#10B981]/25 backdrop-blur-md text-[10px] font-black text-[#10B981] border border-[#10B981]/30 shrink-0">● Live Production</span>
        </div>
      </div>

      <!-- Card Content Area -->
      <div class="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <!-- Title & Value Headline -->
          <h3 class="text-xl font-black text-[#0B0F19] group-hover:text-[#0066FF] transition-colors leading-snug">
            ${p.name}
          </h3>
          <p class="text-xs font-bold text-[#0066FF] mt-0.5 mb-2.5">
            ${p.headline}
          </p>

          <!-- Problem & Solution Narrative -->
          <div class="space-y-2 p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#F1F5F9] mb-4">
            <div class="text-[11px] text-[#475569] leading-relaxed">
              <span class="font-extrabold text-[#0B0F19]">Challenge:</span> ${p.challenge}
            </div>
            <div class="text-[11px] text-[#475569] leading-relaxed">
              <span class="font-extrabold text-[#0066FF]">Solution:</span> ${p.solution}
            </div>
          </div>

          <!-- Key Deliverables List -->
          <ul class="space-y-2 pt-2 border-t border-[#F1F5F9]">
            ${p.deliverables.map(d => `
              <li class="flex items-start gap-2.5 text-xs text-[#475569] font-medium">
                <div class="w-4 h-4 rounded-full bg-[#0066FF]/10 text-[#0066FF] flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-black">✓</div>
                <span>${d}</span>
              </li>
            `).join('')}
          </ul>

          <!-- Tech Stack Badges -->
          <div class="flex flex-wrap gap-1.5 pt-3 mt-3 border-t border-[#F1F5F9]">
            ${p.tech.map(t => `<span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white text-[#334155] border border-[#E2E8F0]">${t}</span>`).join('')}
          </div>
        </div>

        <!-- Metric & Action Bar -->
        <div class="pt-4 border-t border-[#F1F5F9] space-y-3">
          <div class="flex items-center justify-between px-3 py-2 rounded-xl bg-[#0066FF]/5 border border-[#0066FF]/15">
            <span class="text-[11px] font-extrabold text-[#0066FF]">${p.metric}</span>
            <span class="text-[10.5px] font-bold text-[#64748B]">${p.speed}</span>
          </div>

          <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="w-full py-3 px-5 rounded-full bg-[#F8FAFC] group-hover:bg-gradient-to-r group-hover:from-[#0066FF] group-hover:to-[#0052FF] text-[#0B0F19] group-hover:text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-between border border-[#E2E8F0] group-hover:border-transparent shadow-xs group-hover:shadow-lg group-hover:shadow-[#0066FF]/30">
            <span>Visit Live Platform</span>
            <i class="fa-solid fa-arrow-up-right-from-square text-[11px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"></i>
          </a>
        </div>

      </div>
    </div>
  `).join('\n');
}

const html = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>15 Production Web Platforms | Md. Shakibur Rahaman</title>
  <meta name="description" content="Explore live production web platforms engineered by Md. Shakibur Rahaman including ASAP Interior Solutions, Luxora Furniture, UDC Design, Gram Banglar Poth e Poth e, and Hotel Booking engines.">
  <link rel="canonical" href="https://www.shakibur.info/projects">
  
  <!-- Plus Jakarta Sans Font -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  
  <!-- Font Awesome 6.5.1 CDN -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            palette: {
              olive: '#0066FF',
              forest: '#0B0F19',
              slate: '#0066FF',
              mist: '#94A3B8',
              stone: '#CBD5E1'
            },
            canvas: '#FAFCFF'
          },
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            display: ['"Plus Jakarta Sans"', 'sans-serif'],
            mono: ['"Plus Jakarta Sans"', 'monospace']
          }
        }
      }
    }
  </script>

  <!-- Custom Unified Morphy Stylesheet -->
  <link rel="stylesheet" href="/styles.css">
</head>
<body class="bg-[#FAFCFF] text-[#0B0F19] font-sans antialiased selection:bg-[#0066FF] selection:text-white relative overflow-x-hidden">

  <!-- 0. Top Scroll Progress Bar -->
  <div id="scrollProgressBar"></div>

  <!-- 1. Ambient Background Canvas, Animated Mesh & Vignette -->
  <div class="ambient-mesh-glow"></div>
  <canvas id="ambientCanvas"></canvas>
  <div class="ambient-vignette"></div>

  <!-- 2. FIXED NAVBAR -->
  <header id="navbar" class="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-2xl border-b border-[#E2E8F0] transition-all duration-300 shadow-2xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      
      <!-- Brand Logo -->
      <a href="/" class="flex items-center gap-3 group">
        <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#0040C1] flex items-center justify-center font-black text-white text-sm tracking-tight group-hover:scale-105 transition-transform shadow-md shadow-[#0066FF]/25 border border-white/20">
          ✦
        </div>
        <div class="flex flex-col">
          <span class="font-extrabold text-[#0B0F19] tracking-tight text-base sm:text-lg group-hover:text-[#0066FF] transition-colors" id="navBrandName">Md. Shakibur Rahaman</span>
          <span class="text-[10px] text-[#0066FF] font-extrabold tracking-wider uppercase">Strategic Lead &amp; Digital Architect</span>
        </div>
      </a>

      <!-- Centered Floating Pill Navigation Menu -->
      <nav class="hidden lg:flex items-center gap-7 px-8 py-3 rounded-full bg-white/95 border border-[#E2E8F0] text-sm font-semibold text-[#334155] backdrop-blur-md shadow-xs">
        <a href="/" class="hover:text-[#0066FF] transition-colors">Home</a>
        <a href="/about" class="hover:text-[#0066FF] transition-colors">About</a>
        
        <!-- Services with dropdown arrow -->
        <div class="relative group">
          <a href="/services" class="flex items-center gap-1.5 hover:text-[#0066FF] transition-colors py-1">
            <span>Services</span>
            <i class="fa-solid fa-chevron-down text-[10px] text-[#64748B] group-hover:text-[#0066FF] group-hover:rotate-180 transition-transform duration-200"></i>
          </a>
          <!-- Dropdown card -->
          <div class="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 bg-white/98 rounded-2xl border border-[#E2E8F0] shadow-xl p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <a href="/services/social-media-marketing" class="block px-3 py-2 rounded-xl text-xs font-semibold text-[#0B0F19] hover:bg-[#0066FF]/5 hover:text-[#0066FF] transition-colors">Social Media &amp; Meta Ads</a>
            <a href="/services/google-ads" class="block px-3 py-2 rounded-xl text-xs font-semibold text-[#0B0F19] hover:bg-[#0066FF]/5 hover:text-[#0066FF] transition-colors">Google Ads &amp; Search</a>
            <a href="/services/web-development" class="block px-3 py-2 rounded-xl text-xs font-semibold text-[#0B0F19] hover:bg-[#0066FF]/5 hover:text-[#0066FF] transition-colors">Full-Stack Web Development</a>
            <a href="/services/seo-aeo" class="block px-3 py-2 rounded-xl text-xs font-semibold text-[#0B0F19] hover:bg-[#0066FF]/5 hover:text-[#0066FF] transition-colors">SEO &amp; AI Engine Optimization</a>
            <a href="/services/graphics-design" class="block px-3 py-2 rounded-xl text-xs font-semibold text-[#0B0F19] hover:bg-[#0066FF]/5 hover:text-[#0066FF] transition-colors">Graphics &amp; Visual Assets</a>
            <div class="my-1.5 border-t border-[#E2E8F0]"></div>
            <a href="/services" class="block px-3 py-1.5 rounded-xl text-[11px] font-bold text-[#0066FF] hover:bg-[#0066FF]/10 text-center">View All 9 Services &rarr;</a>
          </div>
        </div>

        <a href="/projects" class="text-[#0066FF] font-bold transition-colors">Projects</a>
        <a href="/experience" class="hover:text-[#0066FF] transition-colors">Experience</a>
        <a href="/consultation" class="hover:text-[#0066FF] transition-colors">Consultation</a>
      </nav>

      <!-- Right Header Actions -->
      <div class="flex items-center gap-3">
        <a href="/consultation" class="btn-morphy-primary text-xs hidden md:inline-flex">
          <span>Book Consultation</span>
          <i class="fa-solid fa-arrow-right text-[10px]"></i>
        </a>
        <button id="mobileMenuToggle" aria-label="Toggle Navigation" class="lg:hidden w-10 h-10 rounded-2xl bg-white border border-[#E2E8F0] flex items-center justify-center text-[#0B0F19] shadow-xs">
          <i class="fa-solid fa-bars-staggered"></i>
        </button>
      </div>
    </div>

    <!-- Mobile Dropdown Menu -->
    <div id="mobileMenu" class="hidden lg:hidden bg-white/98 backdrop-blur-2xl border-b border-[#E2E8F0] px-5 py-6 space-y-3 shadow-2xl">
      <a href="/" class="mobile-link block text-sm font-semibold text-[#334155]">Home</a>
      <a href="/about" class="mobile-link block text-sm font-semibold text-[#334155]">About</a>
      <a href="/services" class="mobile-link block text-sm font-semibold text-[#334155]">Services</a>
      <a href="/projects" class="mobile-link block text-sm font-semibold text-[#334155] text-[#0066FF] font-bold">Projects</a>
      <a href="/experience" class="mobile-link block text-sm font-semibold text-[#334155]">Experience</a>
      <a href="/consultation" class="mobile-link block text-sm font-semibold text-[#334155]">Consultation</a>
    </div>
  </header>

  <!-- 3. PROJECTS HERO SECTION -->
  <section class="relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6 reveal-fade-up">
      
      <div class="morphy-tag-primary justify-center mb-6">
        <i class="fa-solid fa-code-branch"></i>
        <span>15 PRODUCTION PLATFORMS DEPLOYED</span>
      </div>

      <h1 class="text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#0B0F19] tracking-tight leading-[1.08] max-w-5xl mx-auto">
        High-Performance Web Platforms &amp; <br>
        <span class="bg-gradient-to-r from-[#0066FF] to-[#0052FF] bg-clip-text text-transparent">Commercial Flagships.</span>
      </h1>

      <p class="text-sm sm:text-base text-[#64748B] max-w-3xl mx-auto leading-relaxed">
        Explore 15 live production web applications engineered for luxury hospitality, high-conversion architecture, headless e-commerce, and media publishing. Built for sub-second speed, zero bloat, and verified commercial conversion.
      </p>

      <!-- Key Stat Counters Strip -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6">
        <div class="morphy-card p-5 text-center bg-white shadow-xs">
          <div class="text-2xl sm:text-3xl font-extrabold text-[#0B0F19]" data-counter-target="15" data-counter-suffix="+">15+</div>
          <div class="text-[11px] text-[#0066FF] uppercase mt-1 font-bold">Live Portals</div>
        </div>
        <div class="morphy-card p-5 text-center bg-white shadow-xs">
          <div class="text-2xl sm:text-3xl font-extrabold text-[#0B0F19]" data-counter-target="0.6" data-counter-suffix="s">0.6s</div>
          <div class="text-[11px] text-[#0066FF] uppercase mt-1 font-bold">TTFB Latency</div>
        </div>
        <div class="morphy-card p-5 text-center bg-white shadow-xs">
          <div class="text-2xl sm:text-3xl font-extrabold text-[#0B0F19]" data-counter-target="99" data-counter-suffix="/100">99/100</div>
          <div class="text-[11px] text-[#0066FF] uppercase mt-1 font-bold">PageSpeed Score</div>
        </div>
        <div class="morphy-card p-5 text-center bg-white shadow-xs">
          <div class="text-2xl sm:text-3xl font-extrabold text-[#0B0F19]" data-counter-target="100" data-counter-suffix="%">100%</div>
          <div class="text-[11px] text-[#0066FF] uppercase mt-1 font-bold">Clean Code &amp; IP</div>
        </div>
      </div>

    </div>
  </section>

  <!-- 4. ENGINEERING PHILOSOPHY BENTO STRIP -->
  <section class="py-12 border-t border-[#E2E8F0] bg-white relative z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="morphy-card p-7 bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
          <div class="w-10 h-10 rounded-2xl bg-[#0066FF]/10 text-[#0066FF] flex items-center justify-center text-base">
            <i class="fa-solid fa-gauge-high"></i>
          </div>
          <h3 class="text-lg font-black text-[#0B0F19]">Sub-Second Speed &amp; Core Web Vitals</h3>
          <p class="text-xs text-[#64748B] leading-relaxed">
            Every platform is optimized for 95+ Google PageSpeed with zero render-blocking bloat, optimized WebP assets, and edge CDN routing.
          </p>
        </div>

        <div class="morphy-card p-7 bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
          <div class="w-10 h-10 rounded-2xl bg-[#0066FF]/10 text-[#0066FF] flex items-center justify-center text-base">
            <i class="fa-solid fa-cart-shopping"></i>
          </div>
          <h3 class="text-lg font-black text-[#0B0F19]">Conversion-Obsessed Architecture</h3>
          <p class="text-xs text-[#64748B] leading-relaxed">
            Strategic checkout funnels, direct booking engines, and friction-free intake workflows designed to maximize client revenue.
          </p>
        </div>

        <div class="morphy-card p-7 bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
          <div class="w-10 h-10 rounded-2xl bg-[#0066FF]/10 text-[#0066FF] flex items-center justify-center text-base">
            <i class="fa-solid fa-shield-halved"></i>
          </div>
          <h3 class="text-lg font-black text-[#0B0F19]">100% Client IP &amp; Clean Code</h3>
          <p class="text-xs text-[#64748B] leading-relaxed">
            Zero vendor lock-in. Full ownership of semantic codebase, custom design systems, documentation, and database architecture.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- 5. FILTER BAR & 15 DETAILED PROJECTS GRID -->
  <section class="py-16 md:py-24 border-t border-[#E2E8F0] bg-[#FAFCFF] relative z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Category Filter Pills -->
      <div id="projectFilterBar" class="flex flex-wrap items-center justify-center gap-3 mb-14 overflow-x-auto pb-2 no-scrollbar">
        <button class="filter-btn active" data-category="all">All Projects (15)</button>
        <button class="filter-btn" data-category="Architecture">Architecture &amp; Interior (3)</button>
        <button class="filter-btn" data-category="E-Commerce">E-Commerce &amp; Retail (3)</button>
        <button class="filter-btn" data-category="Hospitality">Hospitality &amp; Booking (3)</button>
        <button class="filter-btn" data-category="Media">Media &amp; Publications (3)</button>
        <button class="filter-btn" data-category="Web Apps">Web Apps &amp; SaaS (3)</button>
      </div>

      <!-- Projects Grid: Strictly 3 cards per row on desktop -->
      <div id="fullProjectsGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
${generateProjectCards(projects)}
      </div>

    </div>
  </section>

  <!-- 6. COMMISSION A PLATFORM BANNER -->
  <section class="py-20 bg-white border-t border-[#E2E8F0] relative z-10">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
      <div class="morphy-tag-primary justify-center">
        <i class="fa-solid fa-rocket"></i>
        <span>NEXT-GEN ARCHITECTURE</span>
      </div>
      <h2 class="text-3xl sm:text-5xl font-black text-[#0B0F19] tracking-tight">
        Ready to Engineer Your Next <span class="text-[#0066FF]">Flagship Platform?</span>
      </h2>
      <p class="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto leading-relaxed">
        Let's discuss your project scope, custom architecture, conversion funnel, and timeline in a private strategic consultation.
      </p>
      <div class="pt-4 flex flex-wrap items-center justify-center gap-4">
        <a href="/consultation" class="btn-morphy-primary text-sm px-8 py-4">
          <span>Book Strategic Consultation</span>
          <i class="fa-solid fa-arrow-right text-xs"></i>
        </a>
        <a href="/services/web-development" class="btn-morphy-outline text-sm px-8 py-4">
          <span>Explore Web Architecture Hub</span>
          <i class="fa-solid fa-code text-xs"></i>
        </a>
      </div>
    </div>
  </section>

  <!-- 7. FOOTER -->
  <footer class="py-16 border-t border-[#E2E8F0] bg-white relative z-10 text-xs text-[#64748B]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-xl bg-[#0066FF] text-white flex items-center justify-center font-black text-xs shadow-sm">
              ✦
            </div>
            <span class="font-bold text-[#0B0F19] tracking-tight text-base">Md. Shakibur Rahaman</span>
          </div>
          <p class="text-xs text-[#64748B] leading-relaxed">
            Strategic Lead &amp; Digital Architect directing integrated branding, modern web engineering, and commercial media.
          </p>
        </div>
        <div>
          <div class="text-[#0B0F19] font-bold uppercase tracking-wider text-[11px] mb-3">Explore Hubs</div>
          <div class="space-y-2">
            <div><a href="/" class="hover:text-[#0066FF] transition-colors">Home</a></div>
            <div><a href="/about" class="hover:text-[#0066FF] transition-colors">About</a></div>
            <div><a href="/services" class="hover:text-[#0066FF] transition-colors">9 Strategic Services</a></div>
            <div><a href="/projects" class="hover:text-[#0066FF] text-[#0066FF] font-bold transition-colors">15 Web Projects</a></div>
            <div><a href="/experience" class="hover:text-[#0066FF] transition-colors">Experience Roadmap</a></div>
            <div><a href="/consultation" class="hover:text-[#0066FF] transition-colors">Consultation Booking</a></div>
          </div>
        </div>
        <div>
          <div class="text-[#0B0F19] font-bold uppercase tracking-wider text-[11px] mb-3">Core Disciplines</div>
          <div class="space-y-2">
            <div><a href="/services/branding" class="hover:text-[#0066FF] transition-colors">01 Branding &amp; Strategy</a></div>
            <div><a href="/services/graphics-design" class="hover:text-[#0066FF] transition-colors">02 Graphics &amp; UI/UX</a></div>
            <div><a href="/services/web-development" class="hover:text-[#0066FF] transition-colors">03 Full-Stack Web Dev</a></div>
            <div><a href="/services/social-media-marketing" class="hover:text-[#0066FF] transition-colors">04 Social Media &amp; Meta</a></div>
            <div><a href="/services/google-ads" class="hover:text-[#0066FF] transition-colors">07 Google Ads Scaling</a></div>
          </div>
        </div>
        <div>
          <div class="text-[#0B0F19] font-bold uppercase tracking-wider text-[11px] mb-3">Direct Contact</div>
          <div class="space-y-2">
            <div><a href="mailto:shakibur188@gmail.com" class="hover:text-[#0066FF] font-bold transition-colors">shakibur188@gmail.com</a></div>
            <div><a href="https://wa.me/8801838070468" target="_blank" class="hover:text-[#0066FF] font-bold transition-colors">+880 1838-070468</a></div>
            <div class="pt-2"><a href="/admin" target="_blank" class="text-[11px] text-[#64748B] hover:text-[#0066FF] font-bold transition-colors">Admin CMS Portal 🔐</a></div>
          </div>
        </div>
      </div>
      <div class="pt-8 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
        <div>&copy; 2026 Md. Shakibur Rahaman. All rights reserved.</div>
        <div class="flex items-center gap-4">
          <a href="https://github.com/shakibur188-tech/Shakib-Portfolio" target="_blank" class="hover:text-[#0066FF] transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/md-shakibur-rahaman" target="_blank" class="hover:text-[#0066FF] transition-colors">LinkedIn</a>
        </div>
      </div>
    </div>
  </footer>

  <script src="/app.js"></script>
  <script src="/site-hydration.js"></script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, '../projects.html'), html, 'utf8');
console.log('projects.html successfully updated with ordered flagship projects!');
