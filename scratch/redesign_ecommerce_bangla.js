const fs = require('fs');
const path = require('path');

const ecomBanglaHtml = `<!DOCTYPE html>
<html lang="bn" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>জিরো-রিস্ক ই-কমার্স প্যাকেজ (সহজ EMI সুবিধাসহ) | Md. Shakibur Rahaman</title>
  <meta name="description" content="আপনার বিজনেসের জন্য ফুল কাস্টমাইজড হাই-স্পিড ই-কমার্স ওয়েবসাইট। ৩ মাস, ৬ মাস ও ১২ মাসের সহজ EMI কিস্তিতে অথবা এককালীন পেমেন্টে ৫৮% পর্যন্ত ডিসকাউন্ট।">
  <link rel="canonical" href="https://www.shakibur.info/offers/ecommerce">
  
  <!-- Google Fonts: Hind Siliguri (Bengali) + Plus Jakarta Sans -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  
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
            sans: ['"Hind Siliguri"', '"Plus Jakarta Sans"', 'sans-serif'],
            bengali: ['"Hind Siliguri"', 'sans-serif'],
            display: ['"Hind Siliguri"', '"Plus Jakarta Sans"', 'sans-serif'],
            mono: ['"Plus Jakarta Sans"', 'monospace']
          }
        }
      }
    }
  </script>

  <!-- Custom Unified Morphy Stylesheet -->
  <link rel="stylesheet" href="/styles.css">
  <style>
    body {
      font-family: 'Hind Siliguri', 'Plus Jakarta Sans', sans-serif;
    }
    .font-eng {
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
  </style>
</head>
<body class="bg-[#FAFCFF] text-[#0B0F19] font-sans antialiased selection:bg-[#0066FF] selection:text-white relative overflow-x-hidden">

  <!-- 0. Top Scroll Progress Bar -->
  <div id="scrollProgressBar"></div>

  <!-- 1. Ambient Background Canvas & Glow -->
  <div class="ambient-mesh-glow"></div>
  <canvas id="ambientCanvas"></canvas>
  <div class="ambient-vignette"></div>

  <!-- 2. FIXED NAVBAR -->
  <header id="navbar" class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-2xl border-b border-[#E2E8F0] transition-all duration-300 shadow-2xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
      
      <!-- Brand Logo -->
      <a href="/" class="flex items-center gap-3 group min-w-0">
        <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#0040C1] flex items-center justify-center font-black text-white text-sm tracking-tight group-hover:scale-105 transition-transform shadow-md shadow-[#0066FF]/25 border border-white/20 shrink-0">
          ✦
        </div>
        <div class="flex flex-col min-w-0">
          <span class="font-extrabold text-[#0B0F19] tracking-tight text-base sm:text-lg group-hover:text-[#0066FF] transition-colors truncate">Md. Shakibur Rahaman</span>
          <span class="text-[10px] text-[#0066FF] font-extrabold tracking-wider uppercase truncate">Strategic Lead &amp; Digital Architect</span>
        </div>
      </a>

      <!-- Centered Floating Pill Navigation Menu (Desktop Only) -->
      <nav class="hidden lg:flex items-center gap-7 px-8 py-3 rounded-full bg-white/95 border border-[#E2E8F0] text-sm font-semibold text-[#334155] backdrop-blur-md shadow-xs shrink-0">
        <a href="/" class="hover:text-[#0066FF] transition-colors">Home</a>
        <a href="/about" class="hover:text-[#0066FF] transition-colors">About</a>
        
        <!-- Services with dropdown -->
        <div class="relative group">
          <a href="/services" class="flex items-center gap-1.5 hover:text-[#0066FF] transition-colors py-1">
            <span>Services</span>
            <i class="fa-solid fa-chevron-down text-[10px] text-[#64748B] group-hover:text-[#0066FF] group-hover:rotate-180 transition-transform duration-200"></i>
          </a>
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

        <a href="/projects" class="hover:text-[#0066FF] transition-colors">Projects</a>
        <a href="/experience" class="hover:text-[#0066FF] transition-colors">Experience</a>
        <a href="/offers" class="text-[#0066FF] font-bold transition-colors">Offers</a>
        <a href="/consultation" class="hover:text-[#0066FF] transition-colors">Consultation</a>
      </nav>

      <!-- Right Header Actions (Mobile Hamburger Toggle) -->
      <div class="flex items-center gap-3 shrink-0">
        <a href="https://wa.me/8801880907080" target="_blank" rel="noopener noreferrer" class="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366] hover:text-white transition-all text-xs font-bold">
          <i class="fa-brands fa-whatsapp text-sm"></i>
          <span>WhatsApp</span>
        </a>
        <button id="mobileMenuToggle" type="button" aria-label="Toggle Navigation" class="lg:hidden w-11 h-11 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#0066FF]/30 hover:bg-[#0066FF]/5 text-[#0B0F19] hover:text-[#0066FF] flex items-center justify-center transition-all duration-200 shadow-xs active:scale-95 shrink-0 z-50">
          <i id="mobileMenuIcon" class="fa-solid fa-bars-staggered text-base"></i>
        </button>
      </div>
    </div>

    <!-- Mobile Dropdown Menu -->
    <div id="mobileMenu" class="hidden lg:hidden bg-white/98 backdrop-blur-2xl border-b border-x border-[#E2E8F0] rounded-b-3xl mx-3 sm:mx-6 px-5 py-6 space-y-2.5 shadow-2xl transition-all duration-300">
      <div class="space-y-1.5 pb-3 border-b border-[#F1F5F9]">
        <a href="/" class="mobile-nav-link mobile-link flex items-center justify-between">
          <span class="flex items-center gap-3">
            <i class="fa-solid fa-house-chimney text-xs text-[#64748B] w-4"></i>
            <span>Home</span>
          </span>
          <i class="fa-solid fa-chevron-right text-[10px] text-[#94A3B8]"></i>
        </a>
        <a href="/about" class="mobile-nav-link mobile-link flex items-center justify-between">
          <span class="flex items-center gap-3">
            <i class="fa-solid fa-user text-xs text-[#64748B] w-4"></i>
            <span>About</span>
          </span>
          <i class="fa-solid fa-chevron-right text-[10px] text-[#94A3B8]"></i>
        </a>
        <a href="/services" class="mobile-nav-link mobile-link flex items-center justify-between">
          <span class="flex items-center gap-3">
            <i class="fa-solid fa-layer-group text-xs text-[#64748B] w-4"></i>
            <span>Services</span>
          </span>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0066FF]/10 text-[#0066FF]">9 Pillars</span>
        </a>
        <a href="/projects" class="mobile-nav-link mobile-link flex items-center justify-between">
          <span class="flex items-center gap-3">
            <i class="fa-solid fa-briefcase text-xs text-[#64748B] w-4"></i>
            <span>Projects</span>
          </span>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#10B981]/10 text-[#10B981]">Featured</span>
        </a>
        <a href="/experience" class="mobile-nav-link mobile-link flex items-center justify-between">
          <span class="flex items-center gap-3">
            <i class="fa-solid fa-chart-line text-xs text-[#64748B] w-4"></i>
            <span>Experience</span>
          </span>
          <i class="fa-solid fa-chevron-right text-[10px] text-[#94A3B8]"></i>
        </a>
        <a href="/offers" class="mobile-nav-link mobile-link flex items-center justify-between active">
          <span class="flex items-center gap-3">
            <i class="fa-solid fa-tags text-xs text-[#0066FF] w-4"></i>
            <span class="font-bold text-[#0066FF]">Special Offers</span>
          </span>
          <span class="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0052FF] text-white shadow-xs">EMI 🔥</span>
        </a>
      </div>

      <div class="pt-2 flex items-center gap-2">
        <a href="/contact" class="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0052FF] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-[#0066FF]/25 hover:shadow-lg transition-all active:scale-98">
          <i class="fa-solid fa-paper-plane text-xs"></i>
          <span>যোগাযোগ করুন</span>
        </a>
        <a href="https://wa.me/8801880907080" target="_blank" rel="noopener noreferrer" class="w-11 h-11 rounded-xl bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/25 flex items-center justify-center text-lg hover:bg-[#25D366] hover:text-white transition-all shrink-0 active:scale-95" aria-label="WhatsApp Contact">
          <i class="fa-brands fa-whatsapp"></i>
        </a>
      </div>
    </div>
  </header>

  <!-- 1. HERO SECTION (বাংলা) -->
  <section class="relative pt-32 pb-10 md:pt-40 md:pb-14 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
      
      <div class="morphy-tag-primary justify-center mb-2">
        <i class="fa-solid fa-cart-shopping text-[#0066FF]"></i>
        <span>জিরো-রিস্ক ফুল কাস্টমাইজড ই-কমার্স প্যাকেজ (EMI সুবিধাসহ)</span>
      </div>

      <h1 class="text-3xl sm:text-5xl md:text-6xl font-black text-[#0B0F19] tracking-tight leading-[1.25] max-w-4xl mx-auto">
        আপনার বিজনেসের জন্য <span class="bg-gradient-to-r from-[#0066FF] to-[#0052FF] bg-clip-text text-transparent">হাই-কনভার্টিং ই-কমার্স প্ল্যাটফর্ম</span>
      </h1>

      <p class="text-base sm:text-lg text-[#475569] max-w-3xl mx-auto leading-relaxed font-medium">
        রেগুলার প্রাইস <span class="line-through text-[#94A3B8]">৳ ৬০,০০০ টাকা</span> — স্পেশাল অফারে <strong class="text-[#0066FF]">৩ মাস, ৬ মাস ও ১২ মাসের সহজ কিস্তিতে (EMI)</strong> অথবা এককালীন পেমেন্টে ৫৮% পর্যন্ত ডিসকাউন্ট!
      </p>

      <!-- Quick Benefit Badges -->
      <div class="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-bold text-[#334155]">
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
      </div>

    </div>
  </section>


  <!-- =========================================================================
       2. SCREENSHOT DESCRIPTIONS AT FIRST (সবগুলো স্ক্রিনশট ও ড্যাশবোর্ড বিবরণ)
       ========================================================================= -->
  <section class="py-12 md:py-16 bg-white border-y border-[#E2E8F0] relative z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto space-y-2">
        <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0066FF]/10 text-[#0066FF] text-xs font-bold uppercase tracking-wider">
          <i class="fa-solid fa-laptop-code"></i>
          <span>লাইভ স্টোর অ্যাডমিন ও অ্যানালিটিক্স প্রিভিউ</span>
        </div>
        <h2 class="text-2xl sm:text-4xl font-black text-[#0B0F19] tracking-tight">
          ওয়েবসাইটের সাথে আপনি যেসব <span class="text-[#0066FF]">লাইভ সিস্টেম ও কন্ট্রোল প্যানেল</span> পাবেন
        </h2>
        <p class="text-sm sm:text-base text-[#64748B]">
          নিচের প্রতিটি স্ক্রিনশট ও মডিউলের ওপর ক্লিক করে লাইভ ড্যাশবোর্ডের পূর্ণাঙ্গ ফিচারগুলো বিস্তারিত দেখুন:
        </p>
      </div>

      <!-- Interactive Tabbed Browser Showcase -->
      <div class="max-w-5xl mx-auto space-y-4">
        
        <!-- Showcase Navigation Tabs -->
        <div class="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none px-1">
          <button type="button" onclick="switchEcomScreen('analytics')" id="tab-analytics" class="ecom-tab-btn active px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all duration-200 shrink-0 bg-[#0066FF] text-white shadow-md shadow-[#0066FF]/20">
            <i class="fa-solid fa-chart-pie text-xs"></i>
            <span>১. রেভিনিউ ও সেলস</span>
          </button>
          <button type="button" onclick="switchEcomScreen('traffic')" id="tab-traffic" class="ecom-tab-btn px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all duration-200 shrink-0 bg-white hover:bg-[#F8FAFC] text-[#64748B] hover:text-[#0B0F19] border border-[#E2E8F0]">
            <i class="fa-solid fa-bolt text-xs text-amber-500"></i>
            <span>২. লাইভ ট্রাফিক ও ফানেল</span>
          </button>
          <button type="button" onclick="switchEcomScreen('orders')" id="tab-orders" class="ecom-tab-btn px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all duration-200 shrink-0 bg-white hover:bg-[#F8FAFC] text-[#64748B] hover:text-[#0B0F19] border border-[#E2E8F0]">
            <i class="fa-solid fa-box text-xs text-blue-500"></i>
            <span>৩. অর্ডার ও কুরিয়ার</span>
          </button>
          <button type="button" onclick="switchEcomScreen('payments')" id="tab-payments" class="ecom-tab-btn px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all duration-200 shrink-0 bg-white hover:bg-[#F8FAFC] text-[#64748B] hover:text-[#0B0F19] border border-[#E2E8F0]">
            <i class="fa-solid fa-credit-card text-xs text-emerald-500"></i>
            <span>৪. পেমেন্ট গেটওয়ে</span>
          </button>
          <button type="button" onclick="switchEcomScreen('customers')" id="tab-customers" class="ecom-tab-btn px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all duration-200 shrink-0 bg-white hover:bg-[#F8FAFC] text-[#64748B] hover:text-[#0B0F19] border border-[#E2E8F0]">
            <i class="fa-solid fa-users text-xs text-indigo-500"></i>
            <span>৫. কাস্টমার LTV</span>
          </button>
          <button type="button" onclick="switchEcomScreen('billing')" id="tab-billing" class="ecom-tab-btn px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all duration-200 shrink-0 bg-white hover:bg-[#F8FAFC] text-[#64748B] hover:text-[#0B0F19] border border-[#E2E8F0]">
            <i class="fa-solid fa-file-invoice-dollar text-xs text-purple-500"></i>
            <span>৬. EMI লেজার</span>
          </button>
        </div>

        <!-- Glassmorphic Mac Browser Window Frame -->
        <div class="morphy-card p-2.5 sm:p-4 bg-white border border-[#E2E8F0] rounded-3xl shadow-2xl overflow-hidden group">
          
          <!-- Browser Frame Top Bar -->
          <div class="flex items-center justify-between px-3 py-2 border-b border-[#F1F5F9] mb-2.5 bg-[#FAFCFF] rounded-t-2xl">
            <div class="flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            </div>
            <div class="flex items-center gap-2 px-3 py-1 rounded-lg bg-white border border-[#E2E8F0] text-[11px] font-semibold text-[#64748B] shadow-2xs">
              <i class="fa-solid fa-lock text-[10px] text-emerald-600"></i>
              <span id="screenUrl" class="font-eng truncate max-w-[200px] sm:max-w-none">luxora-furniture.com/admin/analytics</span>
            </div>
            <button type="button" onclick="openImageLightbox()" class="text-[11px] font-bold text-[#0066FF] hover:text-[#0052FF] bg-[#0066FF]/10 hover:bg-[#0066FF]/15 px-3 py-1 rounded-md transition-all flex items-center gap-1.5">
              <i class="fa-solid fa-expand text-[10px]"></i>
              <span class="hidden sm:inline">বড় করে দেখুন</span>
            </button>
          </div>

          <!-- Dynamic Active Image Container (Clickable for Fullscreen) -->
          <div class="relative rounded-2xl overflow-hidden border border-[#E2E8F0]/80 shadow-xs bg-[#F8FAFC] cursor-zoom-in" onclick="openImageLightbox()">
            <img id="activeScreenImg" src="/assets/offers/ecom-admin.png" alt="Luxora Furniture E-Commerce Admin Module" class="w-full h-auto object-contain transition-all duration-300 group-hover:scale-[1.008]" loading="lazy">
            <div class="absolute bottom-3 right-3 bg-black/70 hover:bg-black/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg pointer-events-none">
              <i class="fa-solid fa-magnifying-glass-plus text-xs"></i>
              <span>জুম করতে ক্লিক করুন</span>
            </div>
          </div>

          <!-- Screenshot Context Info Bar (বাংলা) -->
          <div class="mt-3.5 p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left">
            <div>
              <div id="screenTitle" class="text-sm sm:text-base font-black text-[#0B0F19]">
                ১. এক্সিকিউটিভ রেভিনিউ ও সেলস অ্যানালিটিক্স
              </div>
              <div id="screenDesc" class="text-xs sm:text-[13px] text-[#475569] font-medium mt-1 leading-relaxed">
                রিয়েল-টাইম লাইভ সেলস ট্র্যাকিং (যেমন: ৳ ১,২৬,৫৯৯), অর্ডার ভলিউম, গড় অর্ডার ভ্যালু (AOV ৳ ৯,৭৩৮) এবং ক্যাটাগরিভিত্তিক সেলস ব্রেকডাউন।
              </div>
            </div>
            <div class="shrink-0">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>প্রোডাকশন রেডি</span>
              </span>
            </div>
          </div>

        </div>

      </div>


      <!-- 6 Screenshot Detailed Breakdown Cards (নিচে প্রতিটি স্ক্রিনশটের সম্পূর্ণ বিবরণ) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        
        <!-- Module Card 1: Revenue & Analytics -->
        <div class="p-6 bg-[#FAFCFF] border border-[#E2E8F0] rounded-3xl space-y-3 hover:border-[#0066FF]/40 hover:shadow-lg transition-all">
          <div class="w-10 h-10 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center text-lg font-bold">
            <i class="fa-solid fa-chart-pie"></i>
          </div>
          <h3 class="text-lg font-black text-[#0B0F19]">১. রিয়েল-টাইম সেলস অ্যানালিটিক্স</h3>
          <p class="text-xs text-[#64748B] leading-relaxed">
            দৈনিক, সাপ্তাহিক ও মাসিক সেলস গ্রাফ, মোট রেভিনিউ, ক্যাটাগরি অনুযায়ী বিক্রির পার্সেন্টেজ এবং পেমেন্ট মেথড ব্রেকডাউন (SSLCommerz, bKash, COD)।
          </p>
          <ul class="text-xs text-[#334155] space-y-1.5 pt-2 border-t border-[#E2E8F0]">
            <li>✓ টোটাল সেলস ও রেভিনিউ মিটার</li>
            <li>✓ ক্যাটাগরি ওয়াইজ সেলস ট্র্যাকিং</li>
            <li>✓ লাইভ অর্ডার কাউন্ট ও AOV ট্র্যাকার</li>
          </ul>
        </div>

        <!-- Module Card 2: Live Traffic & Funnel -->
        <div class="p-6 bg-[#FAFCFF] border border-[#E2E8F0] rounded-3xl space-y-3 hover:border-[#0066FF]/40 hover:shadow-lg transition-all">
          <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg font-bold">
            <i class="fa-solid fa-bolt"></i>
          </div>
          <h3 class="text-lg font-black text-[#0B0F19]">২. লাইভ ট্রাফিক ও ফানেল অ্যানালিটিক্স</h3>
          <p class="text-xs text-[#64748B] leading-relaxed">
            এই মুহূর্তে ওয়েবসাইটে কতজন লাইভ ভিজিটর ব্রাউজ করছেন, ২৪ ঘণ্টার প্রতি ঘণ্টার ডেটা (ভিজিটর, Add to Cart, Order Now ও কমপ্লিট পারচেজ)।
          </p>
          <ul class="text-xs text-[#334155] space-y-1.5 pt-2 border-t border-[#E2E8F0]">
            <li>✓ লাইভ একটিভ ভিজিটর ট্র্যাকিং</li>
            <li>✓ পিক আওয়ার (Peak Hours) ডিটেকশন</li>
            <li>✓ ফানেল ড্রপ-অফ ও কনভার্শন রেট</li>
          </ul>
        </div>

        <!-- Module Card 3: Orders & Courier Dispatch -->
        <div class="p-6 bg-[#FAFCFF] border border-[#E2E8F0] rounded-3xl space-y-3 hover:border-[#0066FF]/40 hover:shadow-lg transition-all">
          <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg font-bold">
            <i class="fa-solid fa-box"></i>
          </div>
          <h3 class="text-lg font-black text-[#0B0F19]">৩. অর্ডার ও কুরিয়ার ডিসপ্যাচ</h3>
          <p class="text-xs text-[#64748B] leading-relaxed">
            ইনকমপ্লিট অর্ডার, পেন্ডিং ও কনফার্মড অর্ডার স্ট্যাটাস ফিল্টার এবং Steadfast ও Pathao কুরিয়ারে ১-ক্লিকে অটোমেটেড পার্সেল তৈরি।
          </p>
          <ul class="text-xs text-[#334155] space-y-1.5 pt-2 border-t border-[#E2E8F0]">
            <li>✓ ড্রপড ও ইনকমপ্লিট কার্ট রিকভারি</li>
            <li>✓ ১-ক্লিক স্টেডফাস্ট ও পাঠাও এপিআই</li>
            <li>✓ কাস্টমার কল ও ট্র্যাকিং হিস্ট্রি</li>
          </ul>
        </div>

        <!-- Module Card 4: Payment Gateways -->
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
            <li>✓ নগদ, রকেট, উপায় ও ভিসা/মাস্টারকার্ড</li>
            <li>✓ অ্যাডভান্স ডিপোজিট সহ ক্যাশ অন ডেলিভারি</li>
          </ul>
        </div>

        <!-- Module Card 5: Customer Intelligence -->
        <div class="p-6 bg-[#FAFCFF] border border-[#E2E8F0] rounded-3xl space-y-3 hover:border-[#0066FF]/40 hover:shadow-lg transition-all">
          <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg font-bold">
            <i class="fa-solid fa-users"></i>
          </div>
          <h3 class="text-lg font-black text-[#0B0F19]">৫. কাস্টমার ইন্টেলিজেন্স ও LTV</h3>
          <p class="text-xs text-[#64748B] leading-relaxed">
            কাস্টমার প্রোফাইল, মোট লাইফটাইম স্পেন্ড রেকর্ড (৳ ৪২,৬২০+), গড় কেনাকাটার পরিমাণ, রিপিট বায়ার রেট এবং VIP কাস্টমারদের বিস্তারিত তালিকা।
          </p>
          <ul class="text-xs text-[#334155] space-y-1.5 pt-2 border-t border-[#E2E8F0]">
            <li>✓ কাস্টমার লাইফটাইম ভ্যালু (LTV)</li>
            <li>✓ রিপিট বায়ার ট্র্যাকিং ও হিস্ট্রি</li>
            <li>✓ ডিস্ট্রিক্ট ও লোকেশন অ্যানালাইসিস</li>
          </ul>
        </div>

        <!-- Module Card 6: EMI Ledger & Billing -->
        <div class="p-6 bg-[#FAFCFF] border border-[#E2E8F0] rounded-3xl space-y-3 hover:border-[#0066FF]/40 hover:shadow-lg transition-all">
          <div class="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-lg font-bold">
            <i class="fa-solid fa-file-invoice-dollar"></i>
          </div>
          <h3 class="text-lg font-black text-[#0B0F19]">৬. স্বচ্ছ EMI বিলিং লেজার</h3>
          <p class="text-xs text-[#64748B] leading-relaxed">
            আপনার ৩, ৬ বা ১২ মাসের কিস্তি পেমেন্ট শিডিউল, মাসিক চালান ও রসিদ, ভেরিফাইড লেজার এবং ১০০% স্বচ্ছ ট্র্যাকিং কন্ট্রোল।
          </p>
          <ul class="text-xs text-[#334155] space-y-1.5 pt-2 border-t border-[#E2E8F0]">
            <li>✓ মাসিক কিস্তি ও ডিউ ট্র্যাকার</li>
            <li>✓ ভেরিফাইড পেমেন্ট রিসিট হিস্ট্রি</li>
            <li>✓ কোনো হিডেন চার্জ ছাড়া ক্লিয়ার চুক্তি</li>
          </ul>
        </div>

      </div>

    </div>
  </section>


  <!-- =========================================================================
       3. WHAT YOU WILL GET IN YOUR WEBSITE (ওয়েবসাইটে আপনি যা যা পাবেন)
       ========================================================================= -->
  <section class="py-16 md:py-20 bg-[#FAFCFF] relative z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto space-y-3">
        <div class="morphy-tag-primary justify-center mb-1">
          <i class="fa-solid fa-circle-check text-[#0066FF]"></i>
          <span>কমপ্লিট ডেলিভারেবলস ও ফিচার লিস্ট</span>
        </div>
        <h2 class="text-2xl sm:text-4xl md:text-5xl font-black text-[#0B0F19] tracking-tight">
          একটি পূর্ণাঙ্গ ই-কমার্স ওয়েবসাইটে <span class="text-[#0066FF]">আপনি যা যা পাচ্ছেন</span>
        </h2>
        <p class="text-sm sm:text-base text-[#64748B] leading-relaxed">
          কোনো সাধারণ থিম নয় — সম্পূর্ণ কাস্টমাইজড, সুপারফাস্ট এবং সর্বাধিক সেলস নিশ্চিত করার জন্য হাই-কনভার্টিং আর্কিটেকচার।
        </p>
      </div>

      <!-- Feature Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div class="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-xs space-y-3">
          <div class="w-12 h-12 rounded-2xl bg-[#0066FF]/10 text-[#0066FF] flex items-center justify-center text-xl font-black">
            <i class="fa-solid fa-gauge-high"></i>
          </div>
          <h3 class="text-lg font-black text-[#0B0F19]">১ সেকেন্ডের কম লোডিং স্পিড</h3>
          <p class="text-xs text-[#64748B] leading-relaxed">
            আল্ট্রা-অপ্টিমাইজড কোডিং এবং নেক্সট-জেন ক্যাশিং যা আপনার ওয়েবসাইটকে ইনস্ট্যান্ট লোড করাবে এবং স্লো লোডিংয়ের কারণে কাস্টমার ড্রপ আটকাবে।
          </p>
        </div>

        <div class="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-xs space-y-3">
          <div class="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-xl font-black">
            <i class="fa-solid fa-mobile-screen-button"></i>
          </div>
          <h3 class="text-lg font-black text-[#0B0F19]">১০০% মোবাইল রেসপন্সিভ ও UI/UX</h3>
          <p class="text-xs text-[#64748B] leading-relaxed">
            মোবাইল ব্যবহারকারীদের জন্য সুপার ইজি ওয়ান-ক্লিক চেকআউট এবং ক্লিন আধুনিক ইন্টারফেস যা সেলস কনভার্শন দ্বিগুণ বাড়াতে সাহায্য করে।
          </p>
        </div>

        <div class="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-xs space-y-3">
          <div class="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center text-xl font-black">
            <i class="fa-solid fa-server"></i>
          </div>
          <h3 class="text-lg font-black text-[#0B0F19]">১০ GB NVMe হোস্টিং + ফ্রি ডোমেইন</h3>
          <p class="text-xs text-[#64748B] leading-relaxed">
            ১ম বছরের জন্য হাই-স্পিড NVMe ক্লাউড হোস্টিং, ফ্রি .com/.net ডোমেইন এবং লাইফটাইম ফ্রি SSL সিকিউরিটি সার্টিফিকেট অন্তর্ভুক্ত।
          </p>
        </div>

        <div class="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-xs space-y-3">
          <div class="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center text-xl font-black">
            <i class="fa-solid fa-cart-arrow-down"></i>
          </div>
          <h3 class="text-lg font-black text-[#0B0F19]">ইনকমপ্লিট কার্ট রিকভারি সিস্টেম</h3>
          <p class="text-xs text-[#64748B] leading-relaxed">
            যেসব কাস্টমার কার্টে প্রোডাক্ট রেখে অর্ডার সম্পূর্ণ করেননি, তাদের ডেটা অটোমেটিক ক্যাপচার হবে যেন আপনি কল বা এসএমএস দিয়ে সেল কনফার্ম করতে পারেন।
          </p>
        </div>

        <div class="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-xs space-y-3">
          <div class="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-xl font-black">
            <i class="fa-solid fa-truck-fast"></i>
          </div>
          <h3 class="text-lg font-black text-[#0B0F19]">স্টেডফাস্ট ও পাঠাও কুরিয়ার ইন্টিগ্রেশন</h3>
          <p class="text-xs text-[#64748B] leading-relaxed">
            অর্ডার আসার সাথে সাথে কোনো বাড়তি ঝামেলা ছাড়াই অ্যাডমিন প্যানেল থেকে ১-ক্লিকে কুরিয়ারে পার্সেল পাঠিয়ে ট্র্যাকিং কোড পেয়ে যাবেন।
          </p>
        </div>

        <div class="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-xs space-y-3">
          <div class="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center text-xl font-black">
            <i class="fa-solid fa-bullseye"></i>
          </div>
          <h3 class="text-lg font-black text-[#0B0F19]">ফেসবুক পিক্সেল ও কনভার্শন CAPI রেডি</h3>
          <p class="text-xs text-[#64748B] leading-relaxed">
            Meta Pixel, Server-side Conversion API (CAPI) এবং Google Analytics 4 সঠিকভাবে সেটআপ করা থাকবে যাতে আপনার বিজ্ঞাপনের আরও বেশি ROI আসে।
          </p>
        </div>

      </div>

    </div>
  </section>


  <!-- =========================================================================
       4. PRICING & EMI PACKAGES (3 MONTH, 6 MONTH & 12 MONTH EMI + PAY IN FULL)
       ========================================================================= -->
  <section class="py-14 md:py-20 border-t border-[#E2E8F0] bg-white relative z-10" id="packages">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      <!-- Section Header with Switcher -->
      <div class="text-center max-w-3xl mx-auto space-y-4">
        <div class="morphy-tag-primary justify-center">
          <i class="fa-solid fa-tags text-[#0066FF]"></i>
          <span>সহজ কিস্তি (EMI) ও এককালীন প্রাইসিং প্যাকেজ</span>
        </div>
        
        <h2 class="text-2xl sm:text-4xl md:text-5xl font-black text-[#0B0F19] tracking-tight">
          আপনার সুবিধা অনুযায়ী <span class="text-[#0066FF]">প্যাকেজ নির্বাচন করুন</span>
        </h2>
        
        <p class="text-sm sm:text-base text-[#64748B] leading-relaxed">
          ৩ মাস, ৬ মাস ও ১২ মাসের সহজ কিস্তি সুবিধা অথবা এককালীন পেমেন্টে ৫৮% পর্যন্ত আকর্ষণীয় ডিসকাউন্ট:
        </p>

        <!-- View Switcher -->
        <div class="pt-2 flex items-center justify-center">
          <div class="p-1 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-xs inline-flex items-center gap-1">
            <button id="viewCardsBtn" type="button" class="px-4 sm:px-5 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all duration-200">
              <i class="fa-solid fa-table-cells-large text-[11px]"></i>
              <span>কার্ড ভিউ (Card View)</span>
            </button>
            <button id="viewTableBtn" type="button" class="px-4 sm:px-5 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all duration-200">
              <i class="fa-solid fa-table-list text-[11px]"></i>
              <span>তুলনামূলক টেবিল (Table View)</span>
            </button>
          </div>
        </div>

      </div>


      <!-- 1. CARD GRID VIEW (Default on Mobile) -->
      <div id="pricingCardsView" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        
        <!-- Plan 1: 12-Month EMI -->
        <div class="morphy-card p-6 bg-[#FAFCFF] border border-[#E2E8F0] rounded-3xl flex flex-col justify-between space-y-5 hover:border-[#0066FF]/40 hover:shadow-xl transition-all">
          <div>
            <div class="flex items-center justify-between">
              <span class="text-[10.5px] font-black uppercase text-[#64748B] bg-white px-2.5 py-1 rounded-md border border-[#E2E8F0]">১২ মাসের কিস্তি</span>
              <span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">সেভ ৪০%</span>
            </div>
            <h3 class="text-xl font-black text-[#0B0F19] mt-3">Startup প্ল্যান</h3>
            <div class="text-2xl font-black text-[#0B0F19] mt-1">৳ ৩,০০০ <span class="text-xs text-[#64748B] font-normal font-bengali">/ মাস</span></div>
            <p class="text-xs font-bold text-[#0066FF] mt-1 font-eng">Total ৳ 36,000 (12 Installments)</p>
            
            <ul class="space-y-2 pt-4 border-t border-[#E2E8F0] text-xs text-[#475569] font-medium">
              <li>✓ সম্পূর্ণ কাস্টম ই-কমার্স সাইট</li>
              <li>✓ ১০ GB NVMe হোস্টিং (১ম বছর ফ্রি)</li>
              <li>✓ ফ্রি ডোমেইন (.com/.net) ও SSL</li>
              <li>✓ ইনকমপ্লিট কার্ট রিকভারি</li>
              <li>✓ Steadfast ও Pathao কুরিয়ার এপিআই</li>
              <li>✓ পেমেন্ট গেটওয়ে ইন্টিগ্রেশন</li>
              <li>✓ ১২তম মাসে cPanel হ্যান্ডওভার</li>
            </ul>
          </div>
          <button onclick="openOfferModal('Startup Plan (12-Mo EMI)', '৳৩,০০০/মাস (মোট ৳৩৬,০০০)')" class="w-full py-3 rounded-xl bg-white hover:bg-[#0066FF] hover:text-white font-bold text-xs text-[#0B0F19] transition-all border border-[#E2E8F0] shadow-2xs">
            প্যাকেজটি বেছে নিন
          </button>
        </div>

        <!-- Plan 2: 6-Month EMI -->
        <div class="morphy-card p-6 bg-[#FAFCFF] border border-[#E2E8F0] rounded-3xl flex flex-col justify-between space-y-5 hover:border-[#0066FF]/40 hover:shadow-xl transition-all">
          <div>
            <div class="flex items-center justify-between">
              <span class="text-[10.5px] font-black uppercase text-[#64748B] bg-white px-2.5 py-1 rounded-md border border-[#E2E8F0]">৬ মাসের কিস্তি</span>
              <span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">সেভ ৪৬%</span>
            </div>
            <h3 class="text-xl font-black text-[#0B0F19] mt-3">Accelerate প্ল্যান</h3>
            <div class="text-2xl font-black text-[#0B0F19] mt-1">৳ ৫,৪০০ <span class="text-xs text-[#64748B] font-normal font-bengali">/ মাস</span></div>
            <p class="text-xs font-bold text-[#0066FF] mt-1 font-eng">Total ৳ 32,400 (6 Installments)</p>
            
            <ul class="space-y-2 pt-4 border-t border-[#E2E8F0] text-xs text-[#475569] font-medium">
              <li>✓ সম্পূর্ণ কাস্টম ই-কমার্স সাইট</li>
              <li>✓ ১০ GB NVMe হোস্টিং (১ম বছর ফ্রি)</li>
              <li>✓ ফ্রি ডোমেইন (.com/.net) ও SSL</li>
              <li>✓ ইনকমপ্লিট কার্ট রিকভারি</li>
              <li>✓ Steadfast ও Pathao কুরিয়ার এপিআই</li>
              <li>✓ পেমেন্ট গেটওয়ে ইন্টিগ্রেশন</li>
              <li>✓ ৬ষ্ঠ মাসে cPanel হ্যান্ডওভার</li>
            </ul>
          </div>
          <button onclick="openOfferModal('Accelerate Plan (6-Mo EMI)', '৳৫,৪০০/মাস (মোট ৳৩২,৪০০)')" class="w-full py-3 rounded-xl bg-white hover:bg-[#0066FF] hover:text-white font-bold text-xs text-[#0B0F19] transition-all border border-[#E2E8F0] shadow-2xs">
            প্যাকেজটি বেছে নিন
          </button>
        </div>

        <!-- Plan 3: 3-Month EMI -->
        <div class="morphy-card p-6 bg-[#FAFCFF] border border-[#E2E8F0] rounded-3xl flex flex-col justify-between space-y-5 hover:border-[#0066FF]/40 hover:shadow-xl transition-all">
          <div>
            <div class="flex items-center justify-between">
              <span class="text-[10.5px] font-black uppercase text-[#64748B] bg-white px-2.5 py-1 rounded-md border border-[#E2E8F0]">৩ মাসের কিস্তি</span>
              <span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">সেভ ৫০%</span>
            </div>
            <h3 class="text-xl font-black text-[#0B0F19] mt-3">Momentum প্ল্যান</h3>
            <div class="text-2xl font-black text-[#0B0F19] mt-1">৳ ১০,০০০ <span class="text-xs text-[#64748B] font-normal font-bengali">/ মাস</span></div>
            <p class="text-xs font-bold text-[#0066FF] mt-1 font-eng">Total ৳ 30,000 (3 Installments)</p>
            
            <ul class="space-y-2 pt-4 border-t border-[#E2E8F0] text-xs text-[#475569] font-medium">
              <li>✓ সম্পূর্ণ কাস্টম ই-কমার্স সাইট</li>
              <li>✓ ১০ GB NVMe হোস্টিং (১ম বছর ফ্রি)</li>
              <li>✓ ফ্রি ডোমেইন (.com/.net) ও SSL</li>
              <li>✓ ইনকমপ্লিট কার্ট রিকভারি</li>
              <li>✓ Steadfast ও Pathao কুরিয়ার এপিআই</li>
              <li>✓ পেমেন্ট গেটওয়ে ইন্টিগ্রেশন</li>
              <li>✓ ৩য় মাসে cPanel হ্যান্ডওভার</li>
            </ul>
          </div>
          <button onclick="openOfferModal('Momentum Plan (3-Mo EMI)', '৳১০,০০০/মাস (মোট ৳৩০,০০০)')" class="w-full py-3 rounded-xl bg-white hover:bg-[#0066FF] hover:text-white font-bold text-xs text-[#0B0F19] transition-all border border-[#E2E8F0] shadow-2xs">
            প্যাকেজটি বেছে নিন
          </button>
        </div>

        <!-- Plan 4: Pay In Full (Best Value Deal) -->
        <div class="morphy-card p-6 bg-white border-2 border-[#0066FF] rounded-3xl flex flex-col justify-between space-y-5 shadow-xl shadow-[#0066FF]/15 relative hover:-translate-y-1 transition-all">
          <div class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#0066FF] text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
            সর্বোচ্চ ডিসকাউন্ট 🔥
          </div>
          <div>
            <div class="flex items-center justify-between">
              <span class="text-[10.5px] font-black uppercase text-[#0066FF] bg-[#0066FF]/10 px-2.5 py-1 rounded-md border border-[#0066FF]/20">এককালীন পেমেন্ট</span>
              <span class="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Save 58%</span>
            </div>
            <h3 class="text-xl font-black text-[#0B0F19] mt-3">Founder প্ল্যান</h3>
            <div class="text-2xl font-black text-[#0B0F19] mt-1">৳ ২৫,০০০ <span class="text-xs text-[#64748B] font-normal font-bengali">এককালীন</span></div>
            <p class="text-xs font-black text-emerald-600 mt-1 font-eng">One-Time (Save 58% Discount)</p>
            
            <ul class="space-y-2 pt-4 border-t border-[#F1F5F9] text-xs text-[#334155] font-medium">
              <li>✓ <strong>১ম দিনেই ফুল মাস্টার অ্যাক্সেস</strong></li>
              <li>✓ <strong>তাত্ক্ষণিক cPanel ও কোড হ্যান্ডওভার</strong></li>
              <li>✓ <strong>আনলিমিটেড অফিশিয়াল বিজনেস ইমেইল</strong></li>
              <li>✓ ১০ GB NVMe হোস্টিং ও ফ্রি ডোমেইন</li>
              <li>✓ ইনকমপ্লিট কার্ট ও কুরিয়ার অটোমেশন</li>
              <li>✓ সর্বোচ্চ প্রায়োরিটি লঞ্চ সাপোর্ট</li>
            </ul>
          </div>
          <button onclick="openOfferModal('Founder Plan (Pay In Full)', '৳২৫,০০০ এককালীন (Save 58%)')" class="w-full py-3.5 rounded-xl bg-[#0066FF] hover:bg-[#0052FF] font-black text-xs text-white transition-all shadow-md shadow-[#0066FF]/30 active:scale-98">
            অফারটি ক্লেইম করুন ➔
          </button>
        </div>

      </div>


      <!-- 2. COMPARISON TABLE VIEW (Default on Desktop) -->
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
                  <div class="text-lg font-black text-[#0B0F19] mt-2">৳ ৩,০০০ <span class="text-[10px] font-normal text-[#64748B]">/ মাস</span></div>
                  <div class="text-[10px] font-bold text-[#0066FF] bg-[#0066FF]/10 py-1 px-2 rounded-lg mt-1 inline-block">মোট ৳ ৩৬,০০০</div>
                </th>

                <th class="p-5 sm:p-6 text-center border-l border-[#E2E8F0] w-[19%]">
                  <div class="text-xs font-black uppercase text-[#64748B]">Accelerate</div>
                  <div class="text-xs font-bold text-[#0066FF] mt-0.5">৬ মাসের কিস্তি</div>
                  <div class="text-lg font-black text-[#0B0F19] mt-2">৳ ৫,৪০০ <span class="text-[10px] font-normal text-[#64748B]">/ মাস</span></div>
                  <div class="text-[10px] font-bold text-[#0066FF] bg-[#0066FF]/10 py-1 px-2 rounded-lg mt-1 inline-block">মোট ৳ ৩২,৪০০</div>
                </th>

                <th class="p-5 sm:p-6 text-center border-l border-[#E2E8F0] w-[19%]">
                  <div class="text-xs font-black uppercase text-[#64748B]">Momentum</div>
                  <div class="text-xs font-bold text-[#0066FF] mt-0.5">৩ মাসের কিস্তি</div>
                  <div class="text-lg font-black text-[#0B0F19] mt-2">৳ ১০,০০০ <span class="text-[10px] font-normal text-[#64748B]">/ মাস</span></div>
                  <div class="text-[10px] font-bold text-[#0066FF] bg-[#0066FF]/10 py-1 px-2 rounded-lg mt-1 inline-block">মোট ৳ ৩০,০০০</div>
                </th>

                <th class="p-5 sm:p-6 text-center border-l-2 border-[#0066FF] bg-[#0066FF]/5 w-[19%] relative">
                  <div class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#0066FF] text-white text-[9px] font-black uppercase tracking-wider">বেস্ট ভ্যালু</div>
                  <div class="text-xs font-black uppercase text-[#0066FF]">Founder</div>
                  <div class="text-xs font-bold text-[#0B0F19] mt-0.5">এককালীন পেমেন্ট</div>
                  <div class="text-xl font-black text-[#0B0F19] mt-2">৳ ২৫,০০০ <span class="text-[10px] font-normal text-[#64748B]">এককালীন</span></div>
                  <div class="text-[10px] font-black text-white bg-[#0066FF] py-1 px-2 rounded-lg mt-1 inline-block shadow-xs">সেভ ৫৮% ডিসকাউন্ট</div>
                </th>
              </tr>
            </thead>
            
            <tbody class="divide-y divide-[#F1F5F9] text-xs font-medium text-[#475569]">
              <tr class="hover:bg-[#F8FAFC]">
                <td class="p-4 sm:p-5 font-bold text-[#0B0F19]">ওয়েবসাইট পারফরম্যান্স</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">&lt; ১ সেকেন্ড লোড</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">&lt; ১ সেকেন্ড লোড</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">&lt; ১ সেকেন্ড লোড</td>
                <td class="p-4 sm:p-5 text-center border-l-2 border-[#0066FF] bg-[#0066FF]/5 font-bold text-[#0B0F19]">&lt; ১ সেকেন্ড লোড</td>
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
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">১ম বছর অন্তর্ভুক্ত</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">১ম বছর অন্তর্ভুক্ত</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">১ম বছর অন্তর্ভুক্ত</td>
                <td class="p-4 sm:p-5 text-center border-l-2 border-[#0066FF] bg-[#0066FF]/5 font-bold">১ম বছর অন্তর্ভুক্ত</td>
              </tr>
              <tr class="hover:bg-[#F8FAFC]">
                <td class="p-4 sm:p-5 font-bold text-[#0B0F19]">হোস্টিং ব্যান্ডউইথ ও স্টোরেজ</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">10 GB NVMe (১ম বছর)</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">10 GB NVMe (১ম বছর)</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">10 GB NVMe (১ম বছর)</td>
                <td class="p-4 sm:p-5 text-center border-l-2 border-[#0066FF] bg-[#0066FF]/5 font-bold">10 GB NVMe (১ম বছর)</td>
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
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">২ টি অ্যাকাউন্ট</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">৫ টি অ্যাকাউন্ট</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">১০ টি অ্যাকাউন্ট</td>
                <td class="p-4 sm:p-5 text-center border-l-2 border-[#0066FF] bg-[#0066FF]/5 font-black text-[#0066FF]">আনলিমিটেড</td>
              </tr>
              <tr class="hover:bg-[#F8FAFC]">
                <td class="p-4 sm:p-5 font-bold text-[#0B0F19]">cPanel ও কোড হ্যান্ডওভার</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">১২তম মাসে</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">৬ষ্ঠ মাসে</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">৩য় মাসে</td>
                <td class="p-4 sm:p-5 text-center border-l-2 border-[#0066FF] bg-[#0066FF]/5 font-black text-emerald-600">তাত্ক্ষণিক (১ম দিনে)</td>
              </tr>
              <tr class="bg-[#F8FAFC]">
                <td class="p-4 sm:p-5 font-bold text-[#0B0F19]">অ্যাকশন</td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">
                  <button onclick="openOfferModal('Startup Plan (12-Mo EMI)', '৳৩,০০০/মাস (মোট ৳৩৬,০০০)')" class="w-full py-2.5 rounded-xl bg-white hover:bg-[#0066FF] hover:text-white font-bold text-xs text-[#0B0F19] transition-all border border-[#E2E8F0]">
                    সিলেক্ট করুন
                  </button>
                </td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">
                  <button onclick="openOfferModal('Accelerate Plan (6-Mo EMI)', '৳৫,৪০০/মাস (মোট ৳৩২,৪০০)')" class="w-full py-2.5 rounded-xl bg-white hover:bg-[#0066FF] hover:text-white font-bold text-xs text-[#0B0F19] transition-all border border-[#E2E8F0]">
                    সিলেক্ট করুন
                  </button>
                </td>
                <td class="p-4 sm:p-5 text-center border-l border-[#E2E8F0]">
                  <button onclick="openOfferModal('Momentum Plan (3-Mo EMI)', '৳১০,০০০/মাস (মোট ৳৩০,০০০)')" class="w-full py-2.5 rounded-xl bg-white hover:bg-[#0066FF] hover:text-white font-bold text-xs text-[#0B0F19] transition-all border border-[#E2E8F0]">
                    সিলেক্ট করুন
                  </button>
                </td>
                <td class="p-4 sm:p-5 text-center border-l-2 border-[#0066FF] bg-[#0066FF]/5">
                  <button onclick="openOfferModal('Founder Plan (Pay In Full)', '৳২৫,০০০ এককালীন (Save 58%)')" class="w-full py-2.5 rounded-xl bg-[#0066FF] hover:bg-[#0052FF] font-black text-xs text-white transition-all shadow-md shadow-[#0066FF]/25">
                    ক্লেইম করুন ➔
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

    </div>
  </section>


  <!-- =========================================================================
       5. CUSTOM CONSULTATION BANNER
       ========================================================================= -->
  <section class="py-16 bg-[#FAFCFF] border-t border-[#E2E8F0] relative z-10">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
      <div class="morphy-tag-primary justify-center">
        <i class="fa-solid fa-comments"></i>
        <span>কাস্টম প্রপোজাল ও পরামর্শ</span>
      </div>
      <h2 class="text-2xl sm:text-4xl font-black text-[#0B0F19] tracking-tight">
        আপনার কি কোনো <span class="text-[#0066FF]">বিশেষ রিকোয়ারমেন্ট বা কাস্টম ফিচার</span> লাগবে?
      </h2>
      <p class="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto leading-relaxed">
        আপনার বিজনেস মডেল অনুযায়ী কাস্টম সলিউশন ও টাইমলাইন নিয়ে কথা বলতে সরাসরি হোয়াটসঅ্যাপে নক দিন অথবা স্ট্র্যাটেজিক কনসালটেশন বুক করুন।
      </p>
      <div class="pt-2 flex flex-wrap items-center justify-center gap-3">
        <a href="https://wa.me/8801880907080" target="_blank" rel="noopener noreferrer" class="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5B] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-[#25D366]/25 transition-all active:scale-98">
          <i class="fa-brands fa-whatsapp text-base"></i>
          <span>সরাসরি WhatsApp-এ কথা বলুন</span>
        </a>
        <a href="/consultation" class="btn-morphy-outline text-xs sm:text-sm px-6 py-3.5">
          <span>স্ট্র্যাটেজিক কনসালটেশন বুক করুন</span>
          <i class="fa-solid fa-calendar-check text-xs"></i>
        </a>
      </div>
    </div>
  </section>


  <!-- =========================================================================
       6. FOOTER
       ========================================================================= -->
  <footer class="py-16 border-t border-[#E2E8F0] bg-white relative z-10 text-xs text-[#64748B]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-xl bg-[#0066FF] text-white flex items-center justify-center font-black text-xs shadow-sm">
              ✦
            </div>
            <span class="font-bold text-[#0B0F19] tracking-tight text-base font-eng">Md. Shakibur Rahaman</span>
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
            <div><a href="/projects" class="hover:text-[#0066FF] transition-colors">15 Web Projects</a></div>
            <div><a href="/experience" class="hover:text-[#0066FF] transition-colors">Experience Roadmap</a></div>
            <div><a href="/offers" class="hover:text-[#0066FF] text-[#0066FF] font-bold transition-colors">Special Offers &amp; Sprints</a></div>
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
            <div><a href="mailto:shakibur188@gmail.com" class="hover:text-[#0066FF] font-bold transition-colors font-eng">shakibur188@gmail.com</a></div>
            <div><a href="https://wa.me/8801838070468" target="_blank" class="hover:text-[#0066FF] font-bold transition-colors font-eng">+880 1838-070468</a></div>
            <div class="pt-2"><a href="/admin" target="_blank" class="text-[11px] text-[#64748B] hover:text-[#0066FF] font-bold transition-colors">Admin CMS Portal 🔐</a></div>
          </div>
        </div>
      </div>
      <div class="pt-8 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
        <div>&copy; 2026 Md. Shakibur Rahaman. All rights reserved.</div>
        <div class="flex items-center gap-4 font-eng">
          <a href="https://github.com/shakibur188-tech/Shakib-Portfolio" target="_blank" class="hover:text-[#0066FF] transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/md-shakibur-rahaman" target="_blank" class="hover:text-[#0066FF] transition-colors">LinkedIn</a>
        </div>
      </div>
    </div>
  </footer>


  <!-- =========================================================================
       7. FULLSCREEN IMAGE LIGHTBOX MODAL
       ========================================================================= -->
  <div id="imageLightboxModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md transition-all duration-300" onclick="closeImageLightbox()">
    <div class="relative max-w-7xl max-h-[92vh] w-full flex flex-col items-center justify-center" onclick="event.stopPropagation()">
      <button type="button" onclick="closeImageLightbox()" aria-label="Close Lightbox" class="absolute -top-12 right-0 sm:top-4 sm:right-4 z-50 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-md transition-all">
        <i class="fa-solid fa-xmark text-lg"></i>
      </button>
      <img id="lightboxImg" src="/assets/offers/ecom-admin.png" alt="Fullscreen Screenshot Preview" class="w-full h-auto max-h-[88vh] object-contain rounded-2xl shadow-2xl border border-white/10">
      <div id="lightboxCaption" class="mt-3 text-center text-xs font-bold text-white/80">
        Executive Analytics &amp; Sales Velocity (Luxora Furniture Admin)
      </div>
    </div>
  </div>


  <!-- =========================================================================
       8. INTERACTIVE CLAIM MODAL (বাংলা)
       ========================================================================= -->
  <div id="offerModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
    <div class="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
      
      <!-- Close Button -->
      <button onclick="closeOfferModal()" aria-label="Close Modal" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#0B0F19] flex items-center justify-center hover:bg-[#0066FF] hover:text-white transition-colors">
        <i class="fa-solid fa-xmark"></i>
      </button>

      <!-- Modal Header -->
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0066FF]/10 text-[#0066FF] text-[10.5px] font-bold uppercase tracking-wider">
          <i class="fa-solid fa-tag text-[#0066FF]"></i>
          <span>ই-কমার্স প্যাকেজ বুকিং</span>
        </div>
        <h3 class="text-xl sm:text-2xl font-black text-[#0B0F19] mt-2" id="modalOfferTitle">
          প্যাকেজ ক্লেইম করুন
        </h3>
        <p class="text-xs font-semibold text-[#64748B] mt-1" id="modalOfferSub">
          স্পেশাল কিস্তি (EMI) অথবা এককালীন ডিসকাউন্ট প্যাকেজ
        </p>
      </div>

      <!-- Form -->
      <form id="offerBookingForm" class="space-y-4">
        <input type="hidden" id="modalSelectedOfferName" value="">

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="space-y-1">
            <label class="text-xs font-bold text-[#0B0F19]">আপনার নাম *</label>
            <input type="text" id="modalName" required placeholder="মোঃ রহিম" class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0B0F19] focus:outline-none focus:border-[#0066FF]">
          </div>
          <div class="space-y-1">
            <label class="text-xs font-bold text-[#0B0F19]">ইমেইল এড্রেস *</label>
            <input type="email" id="modalEmail" required placeholder="rahim@brand.com" class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0B0F19] focus:outline-none focus:border-[#0066FF]">
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="space-y-1">
            <label class="text-xs font-bold text-[#0B0F19]">মোবাইল / WhatsApp *</label>
            <input type="tel" id="modalPhone" required placeholder="+880 18..." class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0B0F19] focus:outline-none focus:border-[#0066FF]">
          </div>
          <div class="space-y-1">
            <label class="text-xs font-bold text-[#0B0F19]">কোম্পানি / ব্র্যান্ডের নাম</label>
            <input type="text" id="modalCompany" placeholder="আপনার শপ / পেইজ নাম" class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0B0F19] focus:outline-none focus:border-[#0066FF]">
          </div>
        </div>

        <div class="space-y-1">
          <label class="text-xs font-bold text-[#0B0F19]">বিজনেসের বিবরণ বা কোনো বিশেষ রিকোয়ারমেন্ট</label>
          <textarea id="modalMessage" rows="3" placeholder="আপনার প্রডাক্টের ধরন, টার্গেট লঞ্চ টাইম বা অন্য কোনো তথ্য..." class="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0B0F19] focus:outline-none focus:border-[#0066FF]"></textarea>
        </div>

        <!-- Alert Box -->
        <div id="modalAlertBox" class="hidden p-3.5 rounded-xl text-xs font-semibold"></div>

        <!-- Action Buttons -->
        <div class="pt-2 flex flex-col sm:flex-row gap-2.5">
          <button type="submit" id="modalSubmitBtn" class="btn-morphy-primary flex-1 justify-center text-xs py-3.5">
            <span>প্যাকেজ বুকিং সাবমিট করুন</span>
            <i class="fa-solid fa-paper-plane text-xs"></i>
          </button>
          <button type="button" onclick="directWhatsAppClaim()" class="px-4 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5B] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all">
            <i class="fa-brands fa-whatsapp text-sm"></i>
            <span>WhatsApp-এ পাঠান</span>
          </button>
        </div>

      </form>

    </div>
  </div>


  <!-- Core Scripts -->
  <script src="/app.js"></script>
  <script src="/site-hydration.js"></script>
  
  <script>
    // 6-Screenshots Interactive Database
    const ecomScreens = {
      analytics: {
        title: "১. এক্সিকিউটিভ রেভিনিউ ও সেলস অ্যানালিটিক্স",
        desc: "রিয়েল-টাইম লাইভ সেলস ট্র্যাকিং (যেমন: ৳ ১,২৬,৫৯৯), অর্ডার ভলিউম, গড় অর্ডার ভ্যালু (AOV ৳ ৯,৭৩৮) এবং ক্যাটাগরিভিত্তিক সেলস ব্রেকডাউন।",
        url: "luxora-furniture.com/admin/analytics",
        img: "/assets/offers/ecom-admin.png"
      },
      traffic: {
        title: "২. লাইভ ভিজিটর ট্রাফিক ও কনভার্শন ফানেল",
        desc: "লাইভ ভিজিটর ব্রাউজিং ট্র্যাকার, ২৪ ঘণ্টার প্রতি ঘণ্টার ডেটা (ভিজিটর, Add to Cart, Order Now, চেকআউট) এবং ড্রপ-অফ অ্যানালাইসিস।",
        url: "luxora-furniture.com/admin/visitor-analytics",
        img: "/assets/offers/ecom-traffic.jpg"
      },
      orders: {
        title: "৩. ক্লায়েন্ট অর্ডার ও কুরিয়ার ডিসপ্যাচ কনসোল",
        desc: "ইনকমপ্লিট/ড্রপড কার্ট অর্ডার রিকভারি, পেন্ডিং ও কনফার্মড অর্ডার স্ট্যাটাস ফিল্টার এবং Steadfast ও Pathao কুরিয়ারে ১-ক্লিক অটোমেটেড পার্সেল বুকিং।",
        url: "luxora-furniture.com/admin/orders",
        img: "/assets/offers/ecom-orders.png"
      },
      payments: {
        title: "৪. মাল্টিপল পেমেন্ট গেটওয়ে ইন্টিগ্রেশন",
        desc: "বিকাশ মার্চেন্ট, বিকাশ পার্সোনাল সেন্ড মানি (TrxID ভেরিফিকেশনসহ), নগদ ডিরেক্ট, SSLCommerz, PayStation ও aamarPay গেটওয়ে রেডি।",
        url: "luxora-furniture.com/admin/payment-gateways",
        img: "/assets/offers/ecom-payments.png"
      },
      customers: {
        title: "৫. কাস্টমার ইন্টেলিজেন্স ও লাইফটাইম ভ্যালু (LTV)",
        desc: "কাস্টমার পারচেজ ডিরেক্টরি, লাইফটাইম স্পেন্ড হিস্ট্রি (৳ ৪২,৬২০+), গড় অর্ডার ভ্যালু, রিপিট বায়ার রেট এবং VIP বায়ারদের সম্পূর্ণ ডেটা।",
        url: "luxora-furniture.com/admin/customers",
        img: "/assets/offers/ecom-customers.png"
      },
      billing: {
        title: "৬. স্বচ্ছ EMI বিলিং লেজার ও ইনস্টলমেন্ট ট্র্যাকিং",
        desc: "মাসিক কিস্তি শিডিউল (৩, ৬ ও ১২ মাস), রিসিপ্ট ট্র্যাকিং, ভেরিফাইড লেজার এবং কোনো হিডেন চার্জ ছাড়া ১০০% স্বচ্ছ ট্র্যাকিং।",
        url: "luxora-furniture.com/admin/agency-billing",
        img: "/assets/offers/ecom-billing.png"
      }
    };

    function switchEcomScreen(key) {
      const data = ecomScreens[key];
      if (!data) return;

      const imgEl = document.getElementById('activeScreenImg');
      const titleEl = document.getElementById('screenTitle');
      const descEl = document.getElementById('screenDesc');
      const urlEl = document.getElementById('screenUrl');

      if (imgEl) {
        imgEl.style.opacity = '0.3';
        imgEl.src = data.img;
        imgEl.onload = () => { imgEl.style.opacity = '1'; };
      }
      if (titleEl) titleEl.textContent = data.title;
      if (descEl) descEl.textContent = data.desc;
      if (urlEl) urlEl.textContent = data.url;

      // Update Tab Active Styles
      document.querySelectorAll('.ecom-tab-btn').forEach(btn => {
        btn.classList.remove('bg-[#0066FF]', 'text-white', 'shadow-md', 'shadow-[#0066FF]/20', 'active');
        btn.classList.add('bg-white', 'hover:bg-[#F8FAFC]', 'text-[#64748B]', 'hover:text-[#0B0F19]', 'border', 'border-[#E2E8F0]');
      });

      const activeBtn = document.getElementById('tab-' + key);
      if (activeBtn) {
        activeBtn.classList.remove('bg-white', 'hover:bg-[#F8FAFC]', 'text-[#64748B]', 'hover:text-[#0B0F19]', 'border', 'border-[#E2E8F0]');
        activeBtn.classList.add('bg-[#0066FF]', 'text-white', 'shadow-md', 'shadow-[#0066FF]/20', 'active');
      }
    }

    function openImageLightbox() {
      const modal = document.getElementById('imageLightboxModal');
      const lightboxImg = document.getElementById('lightboxImg');
      const activeImg = document.getElementById('activeScreenImg');
      const titleEl = document.getElementById('screenTitle');
      const captionEl = document.getElementById('lightboxCaption');

      if (modal && lightboxImg && activeImg) {
        lightboxImg.src = activeImg.src;
        if (captionEl && titleEl) captionEl.textContent = titleEl.textContent + ' (Luxora Furniture Live Admin)';
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeImageLightbox() {
      const modal = document.getElementById('imageLightboxModal');
      if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      }
    }

    // Modal Controller
    function openOfferModal(title, sub) {
      document.getElementById('modalOfferTitle').textContent = title;
      document.getElementById('modalOfferSub').textContent = sub || 'স্পেশাল কিস্তি (EMI) অথবা এককালীন ডিসকাউন্ট প্যাকেজ';
      document.getElementById('modalSelectedOfferName').value = title;
      document.getElementById('offerModal').classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }

    function closeOfferModal() {
      document.getElementById('offerModal').classList.add('hidden');
      document.body.style.overflow = 'auto';
    }

    function directWhatsAppClaim() {
      const offer = document.getElementById('modalSelectedOfferName').value || 'E-Commerce Website Package';
      const name = document.getElementById('modalName').value.trim() || 'Client';
      const company = document.getElementById('modalCompany').value.trim() || 'Business';
      const msg = encodeURIComponent('Hello Shakib, I want to claim the ' + offer + ' for ' + company + ' (Name: ' + name + '). Please send details.');
      window.open('https://wa.me/8801880907080?text=' + msg, '_blank');
    }

    // Interactive View Switcher (Mobile: Cards First, PC: Table First)
    function initPricingViewToggle() {
      const cardsBtn = document.getElementById('viewCardsBtn');
      const tableBtn = document.getElementById('viewTableBtn');
      const cardsView = document.getElementById('pricingCardsView');
      const tableView = document.getElementById('pricingTableView');

      if (!cardsBtn || !tableBtn || !cardsView || !tableView) return;

      function setView(mode) {
        if (mode === 'cards') {
          tableView.classList.add('hidden');
          cardsView.classList.remove('hidden');
          cardsBtn.classList.add('bg-[#0066FF]', 'text-white', 'shadow-xs');
          cardsBtn.classList.remove('bg-transparent', 'text-[#64748B]');
          tableBtn.classList.remove('bg-[#0066FF]', 'text-white', 'shadow-xs');
          tableBtn.classList.add('bg-transparent', 'text-[#64748B]');
        } else {
          cardsView.classList.add('hidden');
          tableView.classList.remove('hidden');
          tableBtn.classList.add('bg-[#0066FF]', 'text-white', 'shadow-xs');
          tableBtn.classList.remove('bg-transparent', 'text-[#64748B]');
          cardsBtn.classList.remove('bg-[#0066FF]', 'text-white', 'shadow-xs');
          cardsBtn.classList.add('bg-transparent', 'text-[#64748B]');
        }
      }

      // Default smart check based on device width
      const isMobile = window.innerWidth < 768;
      setView(isMobile ? 'cards' : 'table');

      cardsBtn.addEventListener('click', () => setView('cards'));
      tableBtn.addEventListener('click', () => setView('table'));
    }

    document.addEventListener('DOMContentLoaded', () => {
      initPricingViewToggle();

      const bookingForm = document.getElementById('offerBookingForm');
      if (bookingForm) {
        bookingForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          const btn = document.getElementById('modalSubmitBtn');
          const alertBox = document.getElementById('modalAlertBox');
          
          btn.disabled = true;
          btn.innerHTML = '<span>বুকিং প্রসেস হচ্ছে...</span><i class="fa-solid fa-spinner fa-spin text-xs"></i>';
          
          const payload = {
            name: document.getElementById('modalName').value.trim(),
            email: document.getElementById('modalEmail').value.trim(),
            phone: document.getElementById('modalPhone').value.trim(),
            company: document.getElementById('modalCompany').value.trim(),
            service: document.getElementById('modalSelectedOfferName').value,
            message: document.getElementById('modalMessage').value.trim(),
            date: new Date().toISOString()
          };

          try {
            const res = await fetch('/api/leads', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });

            alertBox.classList.remove('hidden', 'bg-rose-50', 'text-rose-700', 'border-rose-200');
            alertBox.classList.add('bg-emerald-50', 'text-emerald-700', 'border', 'border-emerald-200');
            alertBox.innerHTML = '<i class="fa-solid fa-check-circle mr-1"></i> ধন্যবাদ! আপনার প্যাকেজ বুকিং গ্রহণ করা হয়েছে। শীঘ্রই যোগাযোগ করা হবে।';
            bookingForm.reset();
            setTimeout(() => { closeOfferModal(); }, 2500);
          } catch (err) {
            alertBox.classList.remove('hidden', 'bg-emerald-50', 'text-emerald-700');
            alertBox.classList.add('bg-rose-50', 'text-rose-700', 'border', 'border-rose-200');
            alertBox.textContent = 'ত্রুটি ঘটেছে, অনুগ্রহ করে সরাসরি WhatsApp-এ যোগাযোগ করুন।';
          } finally {
            btn.disabled = false;
            btn.innerHTML = '<span>প্যাকেজ বুকিং সাবমিট করুন</span><i class="fa-solid fa-paper-plane text-xs"></i>';
          }
        });
      }
    });
  </script>
</body>
</html>`;

const targetFile = path.resolve(__dirname, '..', 'offers', 'ecommerce.html');
fs.writeFileSync(targetFile, ecomBanglaHtml, 'utf8');
console.log('Successfully redesigned offers/ecommerce.html in Bengali with Screenshots first, deliverables, and 3-mo, 6-mo, 12-mo EMI packages!');
