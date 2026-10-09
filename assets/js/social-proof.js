/**
 * Social Proof & Real-Time Active Viewer Counter Engine
 * Md. Shakibur Rahaman Website & Offers
 * 
 * Features:
 * - Dynamic fluctuating active visitor counter starting from 200+ (realistic fluctuation 200-280)
 * - Real-time popup toasts showing visitors currently viewing this offer / service and booking packages
 * - Tailored message streams for Ecommerce Offer, Service Platforms, Portfolio, and Services
 * - Dark Teal / Mint Frosted Glass design with smooth slide animations & pause-on-hover
 */

(function () {
  'use strict';

  // --- 1. CONFIGURATION & STATE ---
  let baseCounter = 214; // Starting baseline ~200+
  let currentCount = baseCounter;
  let isPaused = false;
  let toastTimer = null;
  let counterTimer = null;
  let currentIndex = 0;

  // Detect page type
  const path = window.location.pathname.toLowerCase();
  const isEcommerceOffer = path.includes('ecommerce') || path.includes('ecom');
  const isServiceOffer = path.includes('service-platform') || path.includes('service');
  const isPortfolio = path.includes('portfolio');
  const isGeneralOffer = path.includes('offers');

  // --- 2. SOCIAL PROOF DATA STREAMS (Bengali + English context) ---
  const ecommerceProofs = [
    {
      icon: 'fa-solid fa-eye text-[#20E1B2]',
      title: 'নতুন ভিজিটর অফার দেখছেন',
      desc: 'ঢাকা (মিরপুর) থেকে একজন ভিজিটর এইমাত্র এই ই-কমার্স অফারটি দেখছেন',
      time: 'এইমাত্র',
      badge: 'লাইভ অ্যাক্টিভ'
    },
    {
      icon: 'fa-solid fa-cart-shopping text-emerald-400',
      title: 'নতুন প্যাকেজ বুকিং',
      desc: 'তানভীর আহমেদ (উত্তরা) — এইমাত্র "Founder প্ল্যান" নির্বাচন করেছেন',
      time: '১ মিনিট আগে',
      badge: 'বুকিং'
    },
    {
      icon: 'fa-solid fa-eye text-[#20E1B2]',
      title: 'নতুন ভিজিটর অফার দেখছেন',
      desc: 'চট্টগ্রাম (জিইসি) থেকে একজন ভিজিটর EMI কিস্তি সুবিধা চেক করছেন',
      time: 'কয়েক সেকেন্ড আগে',
      badge: 'লাইভ অ্যাক্টিভ'
    },
    {
      icon: 'fa-solid fa-bolt text-amber-400',
      title: 'প্যাকেজ চয়েস',
      desc: 'রাকিব হাসান (ধানমন্ডি) — "Startup প্ল্যান (12-Mo EMI)" বেছে নিয়েছেন',
      time: '২ মিনিট আগে',
      badge: 'ভেরিফাইড'
    },
    {
      icon: 'fa-solid fa-eye text-[#20E1B2]',
      title: 'নতুন ভিজিটর অফার দেখছেন',
      desc: 'সিলেট (উপশহর) থেকে একজন ভিজিটর লাইভ ড্যাশবোর্ড প্রিভিউ দেখছেন',
      time: 'এইমাত্র',
      badge: 'লাইভ অ্যাক্টিভ'
    },
    {
      icon: 'fa-solid fa-circle-check text-emerald-400',
      title: 'কনসালটেশন রিকোয়েস্ট',
      desc: 'ফারহান চৌধুরী (গুলশান) — ফ্রি ই-কমার্স অডিট শিডিউল করেছেন',
      time: '৩ মিনিট আগে',
      badge: 'বুকিং'
    },
    {
      icon: 'fa-solid fa-eye text-[#20E1B2]',
      title: 'নতুন ভিজিটর অফার দেখছেন',
      desc: 'রাজশাহী থেকে একজন উদ্যোক্তা পেমেন্ট গেটওয়ে ফিচারসমূহ যাচাই করছেন',
      time: 'কয়েক সেকেন্ড আগে',
      badge: 'লাইভ অ্যাক্টিভ'
    },
    {
      icon: 'fa-solid fa-fire text-rose-400',
      title: 'নতুন প্যাকেজ বুকিং',
      desc: 'সাবরিনা আক্তার (বনানী) — "Accelerate প্ল্যান" নির্বাচন করেছেন',
      time: '৪ মিনিট আগে',
      badge: 'বুকিং'
    }
  ];

  const serviceProofs = [
    {
      icon: 'fa-solid fa-eye text-[#20E1B2]',
      title: 'সার্ভিস ভিজিটর',
      desc: 'ঢাকা থেকে একজন ক্লায়েন্ট ফুল-স্ট্যাক ডিজিটাল সার্ভিসসমূহ দেখছেন',
      time: 'এইমাত্র',
      badge: 'লাইভ ভিউ'
    },
    {
      icon: 'fa-solid fa-paper-plane text-emerald-400',
      title: 'নতুন ইনকোয়ারি সাবমিশন',
      desc: 'আরিফুল ইসলাম (মিরপুর) — কাস্টম ওয়েব ডেভেলপমেন্ট প্রজেক্ট ইনকোয়ারি পাঠিয়েছেন',
      time: '২ মিনিট আগে',
      badge: 'ইনকোয়ারি'
    },
    {
      icon: 'fa-solid fa-eye text-[#20E1B2]',
      title: 'সার্ভিস ভিজিটর',
      desc: 'চট্টগ্রাম থেকে একজন ভিজিটর Google Ads ও SEO অপ্টিমাইজেশন প্যাকেজ দেখছেন',
      time: 'কয়েক সেকেন্ড আগে',
      badge: 'লাইভ ভিউ'
    },
    {
      icon: 'fa-solid fa-briefcase text-indigo-400',
      title: 'প্রজেক্ট কনসালটেশন',
      desc: 'নাসিম আহমেদ (উত্তরা) — ব্র্যান্ডিং ও সোশ্যাল মিডিয়া মার্কেটিং অডিট চেয়েছেন',
      time: '৩ মিনিট আগে',
      badge: 'কনসালটেশন'
    },
    {
      icon: 'fa-solid fa-eye text-[#20E1B2]',
      title: 'সার্ভিস ভিজিটর',
      desc: 'সিলেট থেকে একজন উদ্যোক্তা B2B সার্ভিস প্ল্যাটফর্ম কেস-স্টাডি পড়ছেন',
      time: 'এইমাত্র',
      badge: 'লাইভ ভিউ'
    }
  ];

  const activeStream = (isEcommerceOffer || isGeneralOffer) ? ecommerceProofs : serviceProofs;

  // --- 3. NUMERICAL FLUCTUATION LOGIC (200 - 280 range) ---
  function getNextVisitorCount(current) {
    // Starting around 200, small random ups and downs (+3, -2, +4, -1, +2, -3)
    const deltas = [-3, -2, -1, 1, 2, 3, 4, -2, 2, 3, -1, 5, -4];
    const change = deltas[Math.floor(Math.random() * deltas.length)];
    let next = current + change;
    
    // Keep strictly above 200 and realistically below 285
    if (next < 201) next = 204 + Math.floor(Math.random() * 6);
    if (next > 285) next = 278 - Math.floor(Math.random() * 8);
    
    return next;
  }

  // Convert English numbers to Bengali digits
  function toBengaliNumerals(num) {
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(num).replace(/\d/g, d => banglaDigits[parseInt(d, 10)]);
  }

  function updateAllCounterElements(count) {
    const bnCount = toBengaliNumerals(count);
    
    // Update elements by specific ID
    const liveViewersCount = document.getElementById('heroLiveViewersCount');
    if (liveViewersCount) {
      liveViewersCount.textContent = count; // or bnCount based on preference
    }
    const liveViewersCountBn = document.getElementById('heroLiveViewersCountBn');
    if (liveViewersCountBn) {
      liveViewersCountBn.textContent = bnCount;
    }

    // Update floating counter pill if present
    const floatingCounter = document.getElementById('floatingViewersCount');
    if (floatingCounter) {
      floatingCounter.textContent = bnCount;
    }

    // Update all elements with [data-live-counter]
    document.querySelectorAll('[data-live-counter]').forEach(el => {
      if (el.getAttribute('data-format') === 'en') {
        el.textContent = count;
      } else {
        el.textContent = bnCount;
      }
    });
  }

  // --- 4. INJECT SOCIAL PROOF TOAST & FLOATING BADGE CSS ---
  function injectStyles() {
    if (document.getElementById('social-proof-styles')) return;
    const style = document.createElement('style');
    style.id = 'social-proof-styles';
    style.textContent = `
      #socialProofToastContainer {
        position: fixed;
        bottom: 20px;
        left: 20px;
        z-index: 9990;
        pointer-events: none;
        max-width: calc(100vw - 40px);
        width: 360px;
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      }
      @media (max-width: 640px) {
        #socialProofToastContainer {
          bottom: 16px;
          left: 12px;
          right: 12px;
          width: auto;
          max-width: none;
        }
      }
      .social-proof-toast {
        pointer-events: auto;
        background: rgba(8, 40, 48, 0.92);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(32, 225, 178, 0.35);
        border-radius: 20px;
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.65), 0 0 25px rgba(32, 225, 178, 0.18);
        padding: 14px 16px;
        display: flex;
        align-items: flex-start;
        gap: 12px;
        transform: translateY(30px) scale(0.96);
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .social-proof-toast.show {
        transform: translateY(0) scale(1);
        opacity: 1;
      }
      .social-proof-toast:hover {
        border-color: rgba(32, 225, 178, 0.65);
        box-shadow: 0 20px 48px rgba(0, 0, 0, 0.75), 0 0 32px rgba(32, 225, 178, 0.28);
      }
      .social-proof-progress {
        position: absolute;
        bottom: 0;
        left: 16px;
        right: 16px;
        height: 2px;
        background: rgba(32, 225, 178, 0.2);
        border-radius: 2px;
        overflow: hidden;
      }
      .social-proof-progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #20E1B2, #5EEAD4);
        width: 100%;
        transform-origin: left;
        animation: progressCountdown 6s linear forwards;
      }
      @keyframes progressCountdown {
        0% { transform: scaleX(1); }
        100% { transform: scaleX(0); }
      }
      .live-pulse-dot {
        position: relative;
        display: inline-flex;
        width: 10px;
        height: 10px;
      }
      .live-pulse-dot span.ping {
        position: absolute;
        display: inline-flex;
        width: 100%;
        height: 100%;
        border-radius: 9999px;
        background-color: #20E1B2;
        opacity: 0.75;
        animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
      }
      .live-pulse-dot span.core {
        position: relative;
        display: inline-flex;
        border-radius: 9999px;
        width: 10px;
        height: 10px;
        background-color: #20E1B2;
      }
    `;
    document.head.appendChild(style);
  }

  // --- 5. RENDER SOCIAL PROOF TOAST HTML ---
  function createToastContainer() {
    let container = document.getElementById('socialProofToastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'socialProofToastContainer';
      document.body.appendChild(container);
    }
    return container;
  }

  function showNextProof() {
    if (isPaused) return;

    const container = createToastContainer();
    const item = activeStream[currentIndex % activeStream.length];
    currentIndex++;

    const toast = document.createElement('div');
    toast.className = 'social-proof-toast relative overflow-hidden';
    toast.innerHTML = `
      <div class="w-10 h-10 rounded-xl bg-[#06232B] border border-[#D1F5EE]/20 flex items-center justify-center text-base shrink-0 shadow-sm mt-0.5">
        <i class="${item.icon}"></i>
      </div>
      <div class="flex-1 min-w-0 pr-4">
        <div class="flex items-center justify-between gap-1 mb-0.5">
          <span class="text-[10px] font-black uppercase text-[#20E1B2] bg-[#20E1B2]/10 px-2 py-0.5 rounded-full border border-[#20E1B2]/20 font-eng">
            ${item.badge}
          </span>
          <span class="text-[10.5px] font-medium text-[#7EADA3] flex items-center gap-1">
            <i class="fa-regular fa-clock text-[9px]"></i> ${item.time}
          </span>
        </div>
        <p class="text-xs font-bold text-white leading-snug mt-1">
          ${item.desc}
        </p>
      </div>
      <button type="button" aria-label="Dismiss" class="text-[#7EADA3] hover:text-white transition-colors p-1 -mr-1 -mt-1 text-xs shrink-0 cursor-pointer" onclick="this.closest('.social-proof-toast').classList.remove('show'); setTimeout(() => this.closest('.social-proof-toast')?.remove(), 300);">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <div class="social-proof-progress">
        <div class="social-proof-progress-bar"></div>
      </div>
    `;

    // Pause on hover
    toast.addEventListener('mouseenter', () => {
      isPaused = true;
      const bar = toast.querySelector('.social-proof-progress-bar');
      if (bar) bar.style.animationPlayState = 'paused';
    });
    toast.addEventListener('mouseleave', () => {
      isPaused = false;
      const bar = toast.querySelector('.social-proof-progress-bar');
      if (bar) bar.style.animationPlayState = 'running';
    });

    // Clear existing toasts smoothly
    container.innerHTML = '';
    container.appendChild(toast);

    // Trigger animation in next frame
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto hide after 5.5s
    setTimeout(() => {
      if (toast && toast.parentNode) {
        toast.classList.remove('show');
        setTimeout(() => {
          if (toast && toast.parentNode) toast.remove();
        }, 400);
      }
    }, 5500);
  }

  // --- 6. INITIALIZATION & TIMERS ---
  function init() {
    injectStyles();

    // Start with a randomized initial visitor count around 210-245
    currentCount = 214 + Math.floor(Math.random() * 25);
    updateAllCounterElements(currentCount);

    // 1. Dynamic fluctuating live counter interval (every 4 to 6 seconds)
    counterTimer = setInterval(() => {
      currentCount = getNextVisitorCount(currentCount);
      updateAllCounterElements(currentCount);
    }, 4500);

    // 2. Initial Social Proof Toast delay (after 3 seconds)
    setTimeout(() => {
      showNextProof();
      // Repeating toast every 10 to 14 seconds
      toastTimer = setInterval(() => {
        showNextProof();
      }, 11000);
    }, 3200);
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose API for custom triggers
  window.ShakibSocialProof = {
    getCount: () => currentCount,
    setCount: (c) => { currentCount = c; updateAllCounterElements(c); },
    triggerToast: showNextProof
  };

})();
