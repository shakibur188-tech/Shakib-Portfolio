/**
 * Synchronized Social Proof & Real-Time Active Viewer Counter Engine
 * Md. Shakibur Rahaman Website & Offers
 * 
 * Features:
 * 1. Synchronized Viewer Count (Offers Ecommerce Page Only):
 *    - Mathematical cross-device synchronization (every device sees the EXACT SAME number at the same second)
 *    - Baseline: 17 (realistic deterministic oscillation around 14 - 23)
 *    - Target: Dedicated hero badge on https://www.shakibur.info/offers/ecommerce
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
    'তানভীর আহমেদ',
    'রাকিবুল হাসান',
    'ফারহান চৌধুরী',
    'মাহমুদুল হক',
    'আরিফুল ইসলাম',
    'সাইফুর রহমান',
    'জাহিদ হাসান',
    'আসিফ ইকবাল',
    'নাজমুল হুদা',
    'শাকিল আহমেদ',
    'রিয়াদ মাহমুদ',
    'Shakibur Rahaman',
    'সজিব খান',
    'ইমরান হোসেন',

    // Female Clients
    'সাবরিনা আক্তার',
    'নুসরাত জাহান',
    'ফারহানা ইসলাম',
    'সাদিয়া আফরিন',
    'তাসফিয়া রহমান',
    'রুবাইয়া তাসনিম',
    'সুমাইয়া আক্তার',
    'মেহজাবিন আলম',
    'আনিকা তাহসিন',
    'জান্নাতুল ফেরদৌস',
    'মায়িশা চৌধুরী',
    'তানিয়া সুলতানা',
    'ফারজানা হক',
    'শারমিন সুলতানা'
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
  
  // Computes synchronized visitor count for offers/ecommerce page (starting at 17)
  function getSynchronizedVisitorCount() {
    const timeSlot = Math.floor(Date.now() / 6000); // changes every 6s in unison
    const base = 17;
    // Smooth deterministic sinusoidal wave (-2 to +3)
    const wave = Math.sin(timeSlot * 0.45) * 2.2;
    // Pseudo-random offset based on timestamp hash
    const hash = ((timeSlot * 9301 + 49297) % 233280) / 233280;
    const offset = Math.floor((hash - 0.5) * 2.5);
    
    return Math.max(14, Math.min(23, Math.round(base + wave + offset)));
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

  // Update counter element ONLY on the designated ecommerce offer page
  function updateAllCounterElements(count) {
    const isEcommercePage = window.location.pathname.includes('/ecommerce') || 
      window.location.pathname.endsWith('ecommerce.html') ||
      (document.getElementById('heroLiveViewersCount') && document.getElementById('heroLiveViewersCount').closest('div') && document.getElementById('heroLiveViewersCount').closest('div').textContent.includes('অফারটি দেখছেন'));

    if (isEcommercePage) {
      const heroLiveViewersCount = document.getElementById('heroLiveViewersCount');
      if (heroLiveViewersCount) {
        heroLiveViewersCount.textContent = count;
      }
    }

    // Ensure NO upper-right floating badge exists anywhere
    const floatingBadge = document.getElementById('floatingLiveViewersBadge');
    if (floatingBadge) {
      floatingBadge.remove();
    }
  }

  // --- 3. INJECT CSS STYLES (Bottom Left Booking Toast Only) ---
  function injectStyles() {
    if (document.getElementById('social-proof-synchronized-styles')) return;
    const style = document.createElement('style');
    style.id = 'social-proof-synchronized-styles';
    style.textContent = `
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

    // Ensure any legacy floating badge is removed immediately
    const existingBadge = document.getElementById('floatingLiveViewersBadge');
    if (existingBadge) existingBadge.remove();

    // 1. Initial count & synchronized counter ticker (only active on ecommerce offer page)
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
