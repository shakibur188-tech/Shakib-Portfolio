/**
 * Synchronized Social Proof & Real-Time Active Viewer Counter Engine
 * Md. Shakibur Rahaman Website & Offers
 * 
 * Features:
 * 1. Synchronized Viewer Count (Upper Right Corner):
 *    - Mathematical cross-device synchronization (every device sees the EXACT SAME number at the same second)
 *    - Baseline: 277 (realistic deterministic oscillation around 270 - 286)
 *    - Position: Upper Right Corner (top-right fixed badge)
 * 
 * 2. Synchronized Social Proof Booking Toasts:
 *    - Every device sees the EXACT SAME client name and plan at the exact same moment
 *    - Balanced pool of Male & Female names from across Bangladesh
 *    - Plans: Founder প্ল্যান, Startup প্ল্যান, Accelerate প্ল্যান, Momentum প্ল্যান
 *    - Cycles every 40 seconds, displayed for 10 seconds
 *    - Real-time instant trigger for actual users submitting forms
 */

(function () {
  'use strict';

  // --- 1. SYNCHRONIZED NAMES & PLANS POOL ---
  const packagePlans = [
    'Founder প্ল্যান',
    'Startup প্ল্যান',
    'Accelerate প্ল্যান',
    'Momentum প্ল্যান'
  ];

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

  // Helper to normalize plan names
  function cleanPlanName(rawPlan) {
    if (!rawPlan) return 'Founder প্ল্যান';
    if (rawPlan.includes('Startup')) return 'Startup প্ল্যান';
    if (rawPlan.includes('Accelerate')) return 'Accelerate প্ল্যান';
    if (rawPlan.includes('Momentum')) return 'Momentum প্ল্যান';
    if (rawPlan.includes('Founder')) return 'Founder প্ল্যান';
    return rawPlan;
  }

  // --- 2. DETERMINISTIC CROSS-DEVICE TIME SYNCHRONIZATION ---
  
  // Computes the exact same visitor count on all devices based on universal UTC time
  function getSynchronizedVisitorCount() {
    const timeSlot = Math.floor(Date.now() / 6000); // changes every 6s in unison
    const base = 277;
    // Smooth deterministic sinusoidal wave
    const wave = Math.sin(timeSlot * 0.45) * 5.5;
    // Pseudo-random offset based on timestamp hash
    const hash = ((timeSlot * 9301 + 49297) % 233280) / 233280;
    const offset = Math.floor((hash - 0.5) * 6);
    
    return Math.round(base + wave + offset);
  }

  // Computes the exact same active booking notification on all devices
  function getSynchronizedBookingSlot() {
    const slotDuration = 40000; // 40 seconds cycle
    const displayDuration = 10000; // 10 seconds display
    
    const now = Date.now();
    const currentSlot = Math.floor(now / slotDuration);
    const elapsedInSlot = now % slotDuration;
    
    // Deterministic selection using slot index
    const nameIndex = ((currentSlot * 7) + 3) % mockNames.length;
    const planIndex = ((currentSlot * 11) + 1) % packagePlans.length;
    
    return {
      slot: currentSlot,
      name: mockNames[nameIndex],
      plan: packagePlans[planIndex],
      shouldShow: elapsedInSlot < displayDuration,
      remainingDisplayTime: displayDuration - elapsedInSlot,
      timeUntilNextSlot: slotDuration - elapsedInSlot
    };
  }

  // Update all counter elements on the page
  function updateAllCounterElements(count) {
    const floatingCountSpan = document.getElementById('floatingLiveViewersSpan');
    if (floatingCountSpan) {
      floatingCountSpan.textContent = count;
    }

    const heroLiveViewersCount = document.getElementById('heroLiveViewersCount');
    if (heroLiveViewersCount) {
      heroLiveViewersCount.textContent = count;
    }

    document.querySelectorAll('[data-live-counter]').forEach(el => {
      el.textContent = count;
    });
  }

  // --- 3. INJECT CSS STYLES (Upper Right Fixed Badge + Bottom Left Toast) ---
  function injectStyles() {
    if (document.getElementById('social-proof-synchronized-styles')) return;
    const style = document.createElement('style');
    style.id = 'social-proof-synchronized-styles';
    style.textContent = `
      /* Fixed Live Viewers Badge in UPPER RIGHT CORNER */
      #floatingLiveViewersBadge {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9980;
        pointer-events: auto;
        user-select: none;
        background: rgba(8, 40, 48, 0.95);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border: 1.5px solid rgba(32, 225, 178, 0.7);
        border-radius: 9999px;
        box-shadow: 0 12px 36px rgba(0, 0, 0, 0.75), 0 0 28px rgba(32, 225, 178, 0.4);
        padding: 10px 18px;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        font-size: 13px;
        font-weight: 800;
        color: #FFFFFF;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        animation: subtlePulseTop 3.5s ease-in-out infinite alternate;
      }
      #floatingLiveViewersBadge:hover {
        transform: translateY(-2px) scale(1.03);
        border-color: #20E1B2;
        box-shadow: 0 16px 44px rgba(0, 0, 0, 0.85), 0 0 36px rgba(32, 225, 178, 0.6);
      }
      @keyframes subtlePulseTop {
        0% { box-shadow: 0 10px 30px rgba(0, 0, 0, 0.75), 0 0 20px rgba(32, 225, 178, 0.3); }
        100% { box-shadow: 0 14px 40px rgba(0, 0, 0, 0.85), 0 0 32px rgba(32, 225, 178, 0.55); }
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

      /* Mobile responsiveness */
      @media (max-width: 768px) {
        #floatingLiveViewersBadge {
          top: 14px;
          right: 12px;
          padding: 8px 13px;
          font-size: 11.5px;
          gap: 7px;
        }
        #socialProofToastContainer {
          bottom: 16px;
          left: 12px;
          right: 12px;
          width: auto;
          max-width: none;
        }
      }

      /* Toast Card Structure */
      .social-proof-toast {
        pointer-events: auto;
        background: rgba(8, 40, 48, 0.96);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border: 1.5px solid rgba(32, 225, 178, 0.55);
        border-radius: 20px;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.85), 0 0 32px rgba(32, 225, 178, 0.32);
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
        box-shadow: 0 24px 56px rgba(0, 0, 0, 0.9), 0 0 40px rgba(32, 225, 178, 0.45);
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

  // --- 4. RENDER UPPER RIGHT LIVE VIEWERS BADGE ---
  function renderUpperRightLiveViewerBadge() {
    let badge = document.getElementById('floatingLiveViewersBadge');
    const initialCount = getSynchronizedVisitorCount();

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
        <span>🔥 বর্তমানে <strong id="floatingLiveViewersSpan" class="text-[#20E1B2] font-black text-sm font-eng">${initialCount}</strong> জন এই অফারটি দেখছেন</span>
      `;
      document.body.appendChild(badge);
    } else {
      badge.innerHTML = `
        <span class="relative flex h-2.5 w-2.5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#20E1B2] opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#20E1B2]"></span>
        </span>
        <span>🔥 বর্তমানে <strong id="floatingLiveViewersSpan" class="text-[#20E1B2] font-black text-sm font-eng">${initialCount}</strong> জন এই অফারটি দেখছেন</span>
      `;
    }
  }

  // --- 5. RENDER SYNCHRONIZED SOCIAL PROOF TOAST ---
  function createToastContainer() {
    let container = document.getElementById('socialProofToastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'socialProofToastContainer';
      document.body.appendChild(container);
    }
    return container;
  }

  let autoHideTimer = null;
  let isHoverPaused = false;

  function displayBookingToast(personName, planName, durationMs = 10000) {
    const container = createToastContainer();
    const formattedPlan = cleanPlanName(planName);

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
        <div class="social-proof-progress-bar" style="animation-duration: ${durationMs}ms;"></div>
      </div>
    `;

    // Pause on hover
    toast.addEventListener('mouseenter', () => {
      isHoverPaused = true;
      const bar = toast.querySelector('.social-proof-progress-bar');
      if (bar) bar.style.animationPlayState = 'paused';
    });
    toast.addEventListener('mouseleave', () => {
      isHoverPaused = false;
      const bar = toast.querySelector('.social-proof-progress-bar');
      if (bar) bar.style.animationPlayState = 'running';
    });

    container.innerHTML = '';
    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    clearTimeout(autoHideTimer);
    autoHideTimer = setTimeout(() => {
      if (toast && toast.parentNode && !isHoverPaused) {
        toast.classList.remove('show');
        setTimeout(() => {
          if (toast && toast.parentNode) toast.remove();
        }, 450);
      }
    }, durationMs);
  }

  // Synchronized Cycle Loop
  let lastHandledSlot = -1;

  function runSynchronizedCycle() {
    const slotInfo = getSynchronizedBookingSlot();
    
    // If we've entered a new slot, display the synchronized toast
    if (slotInfo.slot !== lastHandledSlot) {
      lastHandledSlot = slotInfo.slot;
      displayBookingToast(slotInfo.name, slotInfo.plan, 10000);
    }

    // Schedule next check aligned with slot transition
    const nextCheckMs = slotInfo.timeUntilNextSlot + 50;
    setTimeout(runSynchronizedCycle, Math.max(1000, nextCheckMs));
  }

  // --- 6. REAL-TIME INSTANT TRIGGER FOR ACTUAL USERS ---
  function triggerRealBooking(name, planName) {
    const finalName = name && name.trim() ? name.trim() : 'সম্মানিত ক্লায়েন্ট';
    const finalPlan = cleanPlanName(planName);

    // Instantly show the real user's booking toast for 10 seconds
    displayBookingToast(finalName, finalPlan, 10000);
  }

  // --- 7. INITIALIZATION ---
  function init() {
    injectStyles();
    renderUpperRightLiveViewerBadge();

    // 1. Initial count & cross-device synchronized counter ticker (every 3 seconds)
    const initialCount = getSynchronizedVisitorCount();
    updateAllCounterElements(initialCount);

    setInterval(() => {
      const syncCount = getSynchronizedVisitorCount();
      updateAllCounterElements(syncCount);
    }, 3000);

    // 2. Start cross-device synchronized social proof cycle
    runSynchronizedCycle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose API
  window.ShakibSocialProof = {
    getCount: getSynchronizedVisitorCount,
    triggerRealBooking: triggerRealBooking,
    displayToast: displayBookingToast
  };

})();
