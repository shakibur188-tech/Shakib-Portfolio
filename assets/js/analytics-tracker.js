/**
 * Real-Time Telemetry & Visitor Analytics Tracker
 * Md. Shakibur Rahaman Website & Offers
 * 
 * Automatically tracks:
 * - Real Page Views & Unique Visitors
 * - Real Stay Duration (Timer on page)
 * - Real Scroll Depth (25%, 50%, 75%, 80%+, 100%)
 * - Real Device, Browser, OS, Screen Resolution
 * - Real Form Interactions & Lead Submissions
 * - Stores sessions locally in localStorage ('shakib_analytics_sessions')
 */

(function () {
  'use strict';

  // --- 1. SESSION INITIALIZATION ---
  const STORAGE_KEY = 'shakib_analytics_sessions';
  const EVENTS_KEY = 'shakib_analytics_events';

  let sessionId = sessionStorage.getItem('shakib_session_id');
  if (!sessionId) {
    sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
    sessionStorage.setItem('shakib_session_id', sessionId);
  }

  const pagePath = window.location.pathname;
  const startTime = Date.now();
  let maxScrollDepth = 0;
  let hasPassed80Percent = false;
  let currentSection = 'Hero Section';

  // Detect Device
  function getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'Tablet';
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(ua)) {
      return 'Mobile';
    }
    return 'Desktop';
  }

  function getBrowserName() {
    const ua = navigator.userAgent;
    if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
    if (ua.includes('Edg')) return 'Edge';
    if (ua.includes('Firefox')) return 'Firefox';
    return 'Browser';
  }

  function getOSName() {
    const ua = navigator.userAgent;
    if (ua.includes('Win')) return 'Windows';
    if (ua.includes('Mac') && !ua.includes('iPhone')) return 'macOS';
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
    if (ua.includes('Linux')) return 'Linux';
    return 'Unknown OS';
  }

  const deviceInfo = {
    type: getDeviceType(),
    browser: getBrowserName(),
    os: getOSName(),
    screen: `${window.innerWidth}x${window.innerHeight}`
  };

  // --- 2. GET OR INITIALIZE STORED SESSIONS ---
  function getStoredSessions() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveSessions(sessions) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions.slice(0, 500))); // Keep last 500 sessions
    } catch (e) {}
  }

  // --- 3. RECORD / UPDATE CURRENT SESSION ---
  function updateSessionRecord(extraData = {}) {
    const durationSec = Math.round((Date.now() - startTime) / 1000);
    const sessions = getStoredSessions();
    
    let current = sessions.find(s => s.id === sessionId);
    if (!current) {
      current = {
        id: sessionId,
        path: pagePath,
        timestamp: new Date().toISOString(),
        device: deviceInfo.type,
        browser: deviceInfo.browser,
        os: deviceInfo.os,
        stayDuration: durationSec,
        maxScrollDepth: maxScrollDepth,
        reached80Percent: hasPassed80Percent,
        currentSection: currentSection,
        status: 'Viewing Offer',
        actions: ['Page Visit']
      };
      sessions.unshift(current);
    } else {
      current.stayDuration = durationSec;
      current.maxScrollDepth = Math.max(current.maxScrollDepth || 0, maxScrollDepth);
      current.reached80Percent = current.reached80Percent || hasPassed80Percent;
      current.currentSection = currentSection;
      Object.assign(current, extraData);
    }

    saveSessions(sessions);
  }

  // --- 4. SCROLL DEPTH & SECTION TRACKING ---
  function calculateScrollDepth() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const depth = Math.min(100, Math.round((scrollTop / docHeight) * 100));
    
    if (depth > maxScrollDepth) {
      maxScrollDepth = depth;
    }

    if (maxScrollDepth >= 80 && !hasPassed80Percent) {
      hasPassed80Percent = true;
      updateSessionRecord({ reached80Percent: true });
    }

    // Determine current active section
    if (scrollTop < 400) {
      currentSection = 'হিরো সেকশন ও ভ্যালু হুক';
    } else if (scrollTop < 1200) {
      currentSection = 'লাইভ ড্যাশবোর্ড প্রিভিউ';
    } else if (scrollTop < 2400) {
      currentSection = 'প্যাকেজ কার্ড ও EMI টেবিল';
    } else {
      currentSection = 'ইন-পেজ বুকিং ফর্ম ও FAQ';
    }

    updateSessionRecord();
  }

  // --- 5. EVENT LISTENERS ---
  window.addEventListener('scroll', () => {
    calculateScrollDepth();
  }, { passive: true });

  // Update session every 5 seconds while active
  setInterval(() => {
    updateSessionRecord();
  }, 5000);

  // Save on exit / tab close
  window.addEventListener('beforeunload', () => {
    updateSessionRecord();
  });

  // Track Form Submissions & Package Clicks
  window.ShakibTracker = {
    trackAction: function (actionName, details = {}) {
      const durationSec = Math.round((Date.now() - startTime) / 1000);
      updateSessionRecord({
        status: actionName,
        actions: details.actions || [actionName]
      });
    },
    trackPackageSelect: function (packageName) {
      updateSessionRecord({
        status: `Selected: ${packageName}`,
        selectedPackage: packageName
      });
    },
    trackFormSubmit: function (leadData) {
      updateSessionRecord({
        status: `Booked: ${leadData.package || 'E-Commerce Package'}`,
        leadName: leadData.name,
        hasConverted: true
      });
    }
  };

  // Initial session write
  updateSessionRecord();

})();
