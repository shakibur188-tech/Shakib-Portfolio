/**
 * Social Proof & Real-Time Active Viewer Counter Engine
 * Md. Shakibur Rahaman Website & Offers
 * 
 * Requirements:
 * 1. Toast Notification:
 *    - Format: "[Name] এই মাত্র [Plan Name] বুক করেছেন।"
 *    - Random selection of diverse Male & Female names from various regions
 *    - Plans: Founder প্ল্যান, Startup প্ল্যান, Accelerate প্ল্যান, Momentum প্ল্যান
 *    - Frequency: Appears every 30-50 seconds
 *    - Duration: Stays visible for 10 seconds
 *    - Real-time trigger: If someone submits a form / booking, instantly shows their name & plan
 * 2. Fixed Floating Live Active Viewers Badge:
 *    - Position: Fixed at bottom-right corner
 *    - Text: "🔥 বর্তমানে 269 জন এই অফারটি দেখছেন" (starts ~269, fluctuates dynamically above 200+)
 */

(function () {
  'use strict';

  // --- 1. STATE & BASELINE ---
  let baseCounter = 269; // Starting from 269 as requested
  let currentCount = baseCounter;
  let isPaused = false;
  let nextToastTimer = null;
  let autoHideTimer = null;
  let counterTimer = null;
  let lastPickedName = '';
  let lastPickedPlan = '';

  // 4 Core E-Commerce Package Names
  const packagePlans = [
    'Founder প্ল্যান',
    'Startup প্ল্যান',
    'Accelerate প্ল্যান',
    'Momentum প্ল্যান'
  ];

  // Rich pool of diverse Male & Female client names from different cities
  const mockNames = [
    // Male Clients
    'তানভীর আহমেদ (উত্তরা)',
    'রাকিবুল হাসান (ধানমন্ডি)',
    'ফারহান চৌধুরী (গুলশান)',
    'মাহমুদুল হক (চট্টগ্রাম)',
    'আরিফুল ইসলাম (সিলেট)',
    'সাইফুর রহমান (বনানী)',
    'জাহিদ হাসান (রাজশাহী)',
    'আসিফ ইকবাল (খুলনা)',
    'নাজমুল হুদা (কুমিল্লা)',
    'শাকিল আহমেদ (মিরপুর)',
    'রিয়াদ মাহমুদ (বসুন্ধরা)',
    'Shakibur Rahaman (ঢাকা)',
    'সজিব খান (নারায়ণগঞ্জ)',
    'ইমরান হোসেন (গাজীপুর)',

    // Female Clients
    'সাবরিনা আক্তার (বনানী)',
    'নুসরাত জাহান (ধানমন্ডি)',
    'ফারহানা ইসলাম (উত্তরা)',
    'সাদিয়া আফরিন (চট্টগ্রাম)',
    'তাসফিয়া রহমান (গুলশান)',
    'রুবাইয়া তাসনিম (সিলেট)',
    'সুমাইয়া আক্তার (মিরপুর)',
    'মেহজাবিন আলম (রাজশাহী)',
    'আনিকা তাহসিন (বসুন্ধরা)',
    'জান্নাতুল ফেরদৌস (খুলনা)',
    'মায়িশা চৌধুরী (মোহাম্মদপুর)',
    'তানিয়া সুলতানা (কুমিল্লা)',
    'ফারজানা হক (বারিধারা)',
    'শারমিন সুলতানা (উত্তরা)'
  ];

  // Clean plan name helper
  function cleanPlanName(rawPlan) {
    if (!rawPlan) return 'Founder প্ল্যান';
    if (rawPlan.includes('Startup')) return 'Startup প্ল্যান';
    if (rawPlan.includes('Accelerate')) return 'Accelerate প্ল্যান';
    if (rawPlan.includes('Momentum')) return 'Momentum প্ল্যান';
    if (rawPlan.includes('Founder')) return 'Founder প্ল্যান';
    return rawPlan;
  }

  // Pick a random item ensuring no consecutive duplicates
  function getRandomItem(array, lastItem) {
    let available = array.filter(item => item !== lastItem);
    if (available.length === 0) available = array;
    return available[Math.floor(Math.random() * available.length)];
  }

  // --- 2. DYNAMIC COUNTER FLUCTUATION (Starting from 269, realistic ups & downs) ---
  function getNextVisitorCount(current) {
    const deltas = [-3, -2, -1, 1, 2, 3, 4, -2, 2, 3, -1, 4, -3, 2];
    const change = deltas[Math.floor(Math.random() * deltas.length)];
    let next = current + change;
    
    // Strict boundaries (never drop below 225, stay realistic up to 295)
    if (next < 225) next = 248 + Math.floor(Math.random() * 15);
    if (next > 295) next = 276 - Math.floor(Math.random() * 12);
    
    return next;
  }

  function updateAllCounterElements(count) {
    // Update floating badge at bottom-right
    const floatingCountSpan = document.getElementById('floatingLiveViewersSpan');
    if (floatingCountSpan) {
      floatingCountSpan.textContent = count;
    }

    // Update hero counters if present
    const heroLiveViewersCount = document.getElementById('heroLiveViewersCount');
    if (heroLiveViewersCount) {
      heroLiveViewersCount.textContent = count;
    }

    // Update generic attribute selectors
    document.querySelectorAll('[data-live-counter]').forEach(el => {
      el.textContent = count;
    });
  }

  // --- 3. INJECT STYLES ---
  function injectStyles() {
    if (document.getElementById('social-proof-dynamic-styles')) return;
    const style = document.createElement('style');
    style.id = 'social-proof-dynamic-styles';
    style.textContent = `
      /* Fixed Floating Live Viewers Badge (Bottom-Right Corner) */
      #floatingLiveViewersBadge {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 9980;
        pointer-events: auto;
        user-select: none;
        background: rgba(8, 40, 48, 0.94);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border: 1.5px solid rgba(32, 225, 178, 0.65);
        border-radius: 9999px;
        box-shadow: 0 12px 36px rgba(0, 0, 0, 0.75), 0 0 28px rgba(32, 225, 178, 0.35);
        padding: 10px 18px;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        font-size: 13px;
        font-weight: 800;
        color: #FFFFFF;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        animation: subtleFloat 4s ease-in-out infinite alternate;
      }
      #floatingLiveViewersBadge:hover {
        transform: translateY(-3px) scale(1.03);
        border-color: #20E1B2;
        box-shadow: 0 16px 44px rgba(0, 0, 0, 0.85), 0 0 36px rgba(32, 225, 178, 0.55);
      }
      @keyframes subtleFloat {
        0% { transform: translateY(0); }
        100% { transform: translateY(-4px); }
      }

      /* Fixed Social Proof Toast Container (Bottom-Left Corner) */
      #socialProofToastContainer {
        position: fixed;
        bottom: 24px;
        left: 24px;
        z-index: 9990;
        pointer-events: none;
        max-width: 380px;
        width: calc(100vw - 48px);
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      }

      /* Mobile responsiveness for corner items */
      @media (max-width: 768px) {
        #floatingLiveViewersBadge {
          bottom: 16px;
          right: 12px;
          padding: 8px 14px;
          font-size: 11.5px;
        }
        #socialProofToastContainer {
          bottom: 74px; /* Stack above floating badge on mobile */
          left: 12px;
          right: 12px;
          width: auto;
          max-width: none;
        }
      }

      /* Toast Notification Card */
      .social-proof-toast {
        pointer-events: auto;
        background: rgba(8, 40, 48, 0.95);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border: 1.5px solid rgba(32, 225, 178, 0.5);
        border-radius: 20px;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), 0 0 32px rgba(32, 225, 178, 0.28);
        padding: 14px 16px;
        display: flex;
        align-items: flex-start;
        gap: 12px;
        transform: translateY(35px) scale(0.95);
        opacity: 0;
        transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        position: relative;
        overflow: hidden;
      }
      .social-proof-toast.show {
        transform: translateY(0) scale(1);
        opacity: 1;
      }
      .social-proof-toast:hover {
        border-color: #20E1B2;
        box-shadow: 0 24px 56px rgba(0, 0, 0, 0.9), 0 0 40px rgba(32, 225, 178, 0.4);
      }
      .social-proof-progress {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: rgba(32, 225, 178, 0.15);
      }
      .social-proof-progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #20E1B2, #5EEAD4);
        width: 100%;
        transform-origin: left;
        animation: progressCountdown10s 10s linear forwards;
      }
      @keyframes progressCountdown10s {
        0% { transform: scaleX(1); }
        100% { transform: scaleX(0); }
      }
    `;
    document.head.appendChild(style);
  }

  // --- 4. RENDER FIXED BOTTOM-RIGHT LIVE VIEWERS BADGE ---
  function renderFloatingLiveViewerBadge() {
    let badge = document.getElementById('floatingLiveViewersBadge');
    if (!badge) {
      badge = document.createElement('div');
      badge.id = 'floatingLiveViewersBadge';
      badge.setAttribute('role', 'status');
      badge.setAttribute('aria-live', 'polite');
      badge.innerHTML = `
        <span class="relative flex h-2.5 w-2.5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#20E1B2] opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#20E1B2]"></span>
        </span>
        <span>🔥 বর্তমানে <strong id="floatingLiveViewersSpan" class="text-[#20E1B2] font-black text-sm font-eng">${currentCount}</strong> জন এই অফারটি দেখছেন</span>
      `;
      document.body.appendChild(badge);
    }
  }

  // --- 5. RENDER & SCHEDULE SOCIAL PROOF TOASTS (10s duration, 30-50s interval) ---
  function createToastContainer() {
    let container = document.getElementById('socialProofToastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'socialProofToastContainer';
      document.body.appendChild(container);
    }
    return container;
  }

  function displayBookingToast(personName, planName, isInstantReal = false) {
    const container = createToastContainer();
    const formattedPlan = cleanPlanName(planName);

    lastPickedName = personName;
    lastPickedPlan = formattedPlan;

    // Create Toast Element
    const toast = document.createElement('div');
    toast.className = 'social-proof-toast';
    toast.innerHTML = `
      <div class="w-10 h-10 rounded-xl bg-[#06232B] border border-[#20E1B2]/40 flex items-center justify-center text-base shrink-0 shadow-md text-[#20E1B2] mt-0.5">
        <i class="fa-solid fa-cart-shopping"></i>
      </div>
      <div class="flex-1 min-w-0 pr-2">
        <div class="flex items-center justify-between gap-1 mb-1">
          <span class="text-[10px] font-black uppercase text-[#20E1B2] bg-[#20E1B2]/15 px-2.5 py-0.5 rounded-full border border-[#20E1B2]/30 font-bengali">
            বুকিং
          </span>
          <span class="text-[11px] font-medium text-[#7EADA3] flex items-center gap-1 font-bengali">
            <i class="fa-regular fa-clock text-[9.5px]"></i> এইমাত্র
          </span>
        </div>
        <p class="text-[13px] font-extrabold text-white leading-snug">
          <span class="text-white">${personName}</span> এই মাত্র <strong class="text-[#20E1B2]">"${formattedPlan}"</strong> বুক করেছেন।
        </p>
      </div>
      <button type="button" aria-label="Dismiss" class="text-[#7EADA3] hover:text-white transition-colors p-1 -mr-1 -mt-1 text-xs shrink-0 cursor-pointer" onclick="this.closest('.social-proof-toast').classList.remove('show'); setTimeout(() => this.closest('.social-proof-toast')?.remove(), 300);">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <div class="social-proof-progress">
        <div class="social-proof-progress-bar"></div>
      </div>
    `;

    // Pause countdown timer on hover
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

    // Clear existing toast smoothly
    container.innerHTML = '';
    container.appendChild(toast);

    // Animate In
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Keep visible for exactly 10 seconds (10000ms)
    clearTimeout(autoHideTimer);
    autoHideTimer = setTimeout(() => {
      if (toast && toast.parentNode) {
        toast.classList.remove('show');
        setTimeout(() => {
          if (toast && toast.parentNode) toast.remove();
        }, 450);
      }
    }, 10000);
  }

  function scheduleNextMockToast() {
    // Random interval between 30 and 50 seconds (30000 - 50000 ms)
    const delay = Math.floor(Math.random() * 20000) + 30000;
    
    clearTimeout(nextToastTimer);
    nextToastTimer = setTimeout(() => {
      const name = getRandomItem(mockNames, lastPickedName);
      const plan = getRandomItem(packagePlans, lastPickedPlan);

      displayBookingToast(name, plan);
      scheduleNextMockToast();
    }, delay);
  }

  // --- 6. REAL-TIME INSTANT TRIGGER FOR ACTUAL USERS ---
  function triggerRealBooking(name, planName) {
    const finalName = name && name.trim() ? name.trim() : 'সম্মানিত ক্লায়েন্ট';
    const finalPlan = cleanPlanName(planName);

    // Cancel next scheduled mock timer to show real user instantly
    clearTimeout(nextToastTimer);

    // Instantly show the real user's booking toast for 10 seconds
    displayBookingToast(finalName, finalPlan, true);

    // Resume mock schedule after 35 seconds
    scheduleNextMockToast();
  }

  // --- 7. INITIALIZATION ---
  function init() {
    injectStyles();
    renderFloatingLiveViewerBadge();
    updateAllCounterElements(currentCount);

    // 1. Dynamic fluctuating live counter interval (every 4 to 6 seconds)
    counterTimer = setInterval(() => {
      currentCount = getNextVisitorCount(currentCount);
      updateAllCounterElements(currentCount);
    }, 4500);

    // 2. First random male/female notification after 6 seconds, then every 30-50s
    setTimeout(() => {
      const initialName = getRandomItem(mockNames, '');
      const initialPlan = getRandomItem(packagePlans, '');
      displayBookingToast(initialName, initialPlan);
      scheduleNextMockToast();
    }, 6000);
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Global API exposed for instant real-time triggers
  window.ShakibSocialProof = {
    getCount: () => currentCount,
    setCount: (c) => { currentCount = c; updateAllCounterElements(c); },
    triggerRealBooking: triggerRealBooking,
    displayToast: displayBookingToast
  };

})();
