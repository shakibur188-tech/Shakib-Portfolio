/**
 * Shakibur CMS - Admin Controller Logic
 * Full dynamic CRUD & Real-Time Hydration for All 16 Modules + Global & Content SEO
 */

let currentContent = null;
let initialContent = null;
let currentLeads = [];
let isDirty = false;
let authToken = localStorage.getItem('shakibur_admin_token') || '';

// ==========================================
// 1. INITIALIZATION & AUTHENTICATION
// ==========================================
document.addEventListener('DOMContentLoaded', async () => {
  setupEventListeners();
  
  if (authToken) {
    const isValid = await verifyAuthToken();
    if (isValid) {
      showAdminApp();
      await loadDashboardData();
    } else {
      showLoginOverlay();
    }
  } else {
    showLoginOverlay();
  }
});

function showLoginOverlay() {
  document.getElementById('loginOverlay').classList.remove('hidden');
  document.getElementById('adminApp').classList.add('hidden');
}

function showAdminApp() {
  document.getElementById('loginOverlay').classList.add('hidden');
  document.getElementById('adminApp').classList.remove('hidden');
}

async function verifyAuthToken() {
  try {
    const res = await fetch('/api/auth/verify', {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    const data = await res.json();
    return data.valid === true;
  } catch (err) {
    console.error('Auth verification error:', err);
    return false;
  }
}

// ==========================================
// 2. EVENT LISTENERS SETUP
// ==========================================
function setupEventListeners() {
  // Login Form
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  // Logout Button
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }

  // Tab Navigation
  document.querySelectorAll('.sidebar-nav .nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  // Top Save and Discard
  const topSaveBtn = document.getElementById('topSaveBtn');
  if (topSaveBtn) topSaveBtn.addEventListener('click', saveAndPublish);

  const floatingSaveBtn = document.getElementById('floatingSaveBtn');
  if (floatingSaveBtn) floatingSaveBtn.addEventListener('click', saveAndPublish);

  const discardChangesBtn = document.getElementById('discardChangesBtn');
  if (discardChangesBtn) discardChangesBtn.addEventListener('click', discardChanges);

  const floatingDiscardBtn = document.getElementById('floatingDiscardBtn');
  if (floatingDiscardBtn) floatingDiscardBtn.addEventListener('click', discardChanges);

  // Dynamic Add Buttons
  const addTypewriterBtn = document.getElementById('addTypewriterBtn');
  if (addTypewriterBtn) addTypewriterBtn.addEventListener('click', addTypewriterPhrase);

  const addNewCaseBtn = document.getElementById('addNewCaseBtn');
  if (addNewCaseBtn) addNewCaseBtn.addEventListener('click', addNewCaseStudy);

  const addPillarBtn = document.getElementById('addPillarBtn');
  if (addPillarBtn) addPillarBtn.addEventListener('click', addPillarItem);

  const addSkillBtn = document.getElementById('addSkillBtn');
  if (addSkillBtn) addSkillBtn.addEventListener('click', addSkillItem);

  const addExperienceBtn = document.getElementById('addExperienceBtn');
  if (addExperienceBtn) addExperienceBtn.addEventListener('click', addExperienceItem);

  const addHonorBtn = document.getElementById('addHonorBtn');
  if (addHonorBtn) addHonorBtn.addEventListener('click', addHonorItem);

  const addCertBtn = document.getElementById('addCertBtn');
  if (addCertBtn) addCertBtn.addEventListener('click', addCertItem);

  const addRefBtn = document.getElementById('addRefBtn');
  if (addRefBtn) addRefBtn.addEventListener('click', addRefItem);

  // Leads Actions
  const leadsSearchInput = document.getElementById('leadsSearchInput');
  if (leadsSearchInput) {
    leadsSearchInput.addEventListener('input', (e) => filterLeads(e.target.value));
  }

  const exportLeadsCsvBtn = document.getElementById('exportLeadsCsvBtn');
  if (exportLeadsCsvBtn) exportLeadsCsvBtn.addEventListener('click', exportLeadsCsv);

  // Settings & Security
  const changePasswordForm = document.getElementById('changePasswordForm');
  if (changePasswordForm) changePasswordForm.addEventListener('submit', handleChangePassword);

  const downloadBackupBtn = document.getElementById('downloadBackupBtn');
  if (downloadBackupBtn) downloadBackupBtn.addEventListener('click', downloadSiteBackup);

  const restoreFileInput = document.getElementById('restoreFileInput');
  if (restoreFileInput) restoreFileInput.addEventListener('change', handleRestoreBackup);

  const factoryResetBtn = document.getElementById('factoryResetBtn');
  if (factoryResetBtn) factoryResetBtn.addEventListener('click', handleFactoryReset);

  // Live Google SERP Simulator input bindings
  ['seo_pageTitle', 'seo_metaDescription', 'seo_canonicalUrl'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', updateGoogleSerpPreview);
    }
  });

  // Track global changes
  document.querySelector('.admin-main')?.addEventListener('input', () => {
    markDirty();
  });
}

// ==========================================
// 3. TAB SWITCHING
// ==========================================
window.switchTab = function(tabId) {
  document.querySelectorAll('.sidebar-nav .nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });

  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.classList.toggle('active', pane.id === tabId);
  });

  // Update Page Title Header
  const titleMap = {
    'tab-overview': { title: 'Dashboard Overview', sub: 'Real-time performance metrics and inquiries.' },
    'tab-seo': { title: 'Global & Content SEO Center', sub: 'Meta tags, Google SERP simulator, GA4, Meta Pixel & JSON-LD Schema.' },
    'tab-hero': { title: 'Hero & Identity Profile', sub: 'Configure headline, bio, contact links, and animated typewriter phrases.' },
    'tab-trust': { title: 'Trust & Credibility Strip', sub: 'Manage institutional trust guarantees and 4 executive assurance pillars.' },
    'tab-stats': { title: 'Top Stats & Key Impact Metrics', sub: 'Audited numbers for ROAS, leads generated, and attributed revenue.' },
    'tab-sectors': { title: '7 Core Industry Practice Areas', sub: 'Positioning, badges, and metrics across hospitality, interior, e-com, etc.' },
    'tab-casestudies': { title: 'Case Studies & Campaign Blueprints', sub: 'Full problem-solution-result blueprints with ROAS & tech stack tags.' },
    'tab-pillars': { title: '4 Marketing Framework Pillars', sub: 'Core methodology: Audience Architecture, Creative Psychology, Funnels & Attribution.' },
    'tab-skills': { title: 'Skills & Capabilities Matrix', sub: 'Quantified skill levels, percentage bars, and tool stacks.' },
    'tab-experience': { title: 'Career Timeline & Experience', sub: 'Hotel Sarina, ASAP Solutions, and executive marketing positions.' },
    'tab-education': { title: 'Education & Academic Degrees', sub: 'BBA in Marketing, university details, and graduation credentials.' },
    'tab-credentials': { title: 'Awards, Certifications & References', sub: 'Executive leadership awards, verified credentials, and references.' },
    'tab-leads': { title: 'Client Inquiries & Leads Inbox', sub: 'Direct inquiries from contact forms and ROI calculator submissions.' },
    'tab-scripts': { title: 'Custom Scripts & Header Injection', sub: 'Google Tag Manager, custom CSS/JS, and chat widget scripts.' },
    'tab-settings': { title: 'Security & Backup Settings', sub: 'Change admin password, download JSON snapshot, or restore.' }
  };

  const meta = titleMap[tabId] || { title: 'Admin CMS', sub: 'Manage portfolio settings.' };
  document.getElementById('pageTitle').textContent = meta.title;
  document.getElementById('pageSubtitle').textContent = meta.sub;

  // Scroll to top of content
  document.querySelector('.admin-content-container')?.scrollTo({ top: 0, behavior: 'smooth' });
};

// ==========================================
// 4. AUTH HANDLERS
// ==========================================
async function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value;
  const errorDiv = document.getElementById('loginError');
  const submitBtn = document.getElementById('loginSubmitBtn');

  errorDiv.classList.add('hidden');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>Verifying credentials...</span>';

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (res.ok && data.token) {
      authToken = data.token;
      localStorage.setItem('shakibur_admin_token', authToken);
      showAdminApp();
      await loadDashboardData();
      showToast('Authenticated successfully! Welcome back.', 'success');
    } else {
      errorDiv.textContent = data.error || 'Invalid username or password.';
      errorDiv.classList.remove('hidden');
    }
  } catch (err) {
    errorDiv.textContent = 'Server connection failed. Please ensure the backend is running.';
    errorDiv.classList.remove('hidden');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<span>Authenticate & Enter CMS</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
  }
}

function handleLogout() {
  authToken = '';
  localStorage.removeItem('shakibur_admin_token');
  showLoginOverlay();
  showToast('Logged out securely.', 'info');
}

async function handleChangePassword(e) {
  e.preventDefault();
  const currentPass = document.getElementById('currentPass').value;
  const newPass = document.getElementById('newPass').value;

  try {
    const res = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ currentPassword: currentPass, newPassword: newPass })
    });

    const data = await res.json();
    if (res.ok && data.success) {
      showToast('Admin password updated successfully!', 'success');
      document.getElementById('changePasswordForm').reset();
    } else {
      showToast(data.error || 'Failed to update password.', 'error');
    }
  } catch (err) {
    showToast('Failed to connect to server.', 'error');
  }
}

// ==========================================
// 5. DATA LOADING & HYDRATION
// ==========================================
async function loadDashboardData() {
  try {
    // Load Content
    const contentRes = await fetch('/api/content');
    if (contentRes.ok) {
      currentContent = await contentRes.json();
      initialContent = JSON.parse(JSON.stringify(currentContent));
      populateAdminForms(currentContent);
    }

    // Load Leads
    await loadLeads();

    resetDirty();
  } catch (err) {
    console.error('Failed to load dashboard data:', err);
    showToast('Failed to load content from server.', 'error');
  }
}

async function loadLeads() {
  try {
    const res = await fetch('/api/leads', {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    if (res.ok) {
      currentLeads = await res.json();
      renderLeads(currentLeads);
      updateOverviewStats();
    }
  } catch (err) {
    console.error('Failed to load leads:', err);
  }
}

function updateOverviewStats() {
  const leadsCount = currentLeads ? currentLeads.length : 0;
  const casesCount = currentContent && currentContent.caseStudies ? currentContent.caseStudies.length : 7;

  document.getElementById('overviewLeadsCount').textContent = leadsCount;
  document.getElementById('leadsBadge').textContent = leadsCount;
  document.getElementById('overviewCasesCount').textContent = casesCount;

  const recentContainer = document.getElementById('overviewRecentLeads');
  if (recentContainer) {
    if (!currentLeads || currentLeads.length === 0) {
      recentContainer.innerHTML = '<div class="empty-state-sm">No new inquiries yet. Submissions from contact forms and ROI calculator appear here.</div>';
    } else {
      const recents = currentLeads.slice(-3).reverse();
      recentContainer.innerHTML = recents.map(l => `
        <div class="recent-lead-item">
          <div>
            <strong>${escapeHtml(l.name || 'Anonymous')}</strong>
            <small class="text-dim"> • ${escapeHtml(l.service || l.type || 'General')}</small>
            <div class="lead-email-preview">${escapeHtml(l.email || l.phone || 'No contact')}</div>
          </div>
          <span class="lead-time">${new Date(l.date || Date.now()).toLocaleDateString()}</span>
        </div>
      `).join('');
    }
  }
}

// ==========================================
// 6. FORM POPULATION
// ==========================================
function populateAdminForms(c) {
  if (!c) return;

  // 1. SEO Tab
  const seo = c.seo || {};
  setValue('seo_pageTitle', seo.pageTitle || '');
  setValue('seo_metaDescription', seo.metaDescription || '');
  setValue('seo_metaKeywords', seo.metaKeywords || '');
  setValue('seo_canonicalUrl', seo.canonicalUrl || '');
  setValue('seo_author', seo.author || '');
  setValue('seo_googleSiteVerification', seo.googleSiteVerification || '');
  setValue('seo_ogTitle', seo.ogTitle || '');
  setValue('seo_twitterCard', seo.twitterCard || 'summary_large_image');
  setValue('seo_ogDescription', seo.ogDescription || '');
  setValue('seo_ogImage', seo.ogImage || '');
  setValue('seo_googleAnalyticsId', seo.googleAnalyticsId || '');
  setValue('seo_metaPixelId', seo.metaPixelId || '');
  setValue('seo_schemaJson', typeof seo.schemaJson === 'object' ? JSON.stringify(seo.schemaJson, null, 2) : (seo.schemaJson || ''));
  setValue('seo_customHeadScript', seo.customHeadScript || '');
  setValue('seo_customBodyScript', seo.customBodyScript || '');
  updateGoogleSerpPreview();

  // 2. Hero & Profile
  const p = c.profile || {};
  setValue('prof_name', p.name || '');
  setValue('prof_eyebrow', p.eyebrow || '');
  setValue('prof_headline', p.headline || '');
  setValue('prof_bio', p.bio || '');
  setValue('prof_statusBadge', p.statusBadge || '');
  setValue('prof_location', p.location || '');
  setValue('prof_email', p.email || '');
  setValue('prof_phone', p.phone || '');
  setValue('prof_whatsapp', p.whatsapp || '');
  setValue('prof_linkedin', p.linkedin || '');
  setValue('prof_resumePdfUrl', p.resumePdfUrl || '');
  renderTypewriterList(c.typewriter || []);

  // 3. Trust & Credibility Strip
  const t = c.trustAssurance || {};
  setValue('trust_headline', t.headline || '');
  setValue('trust_badgeText', t.badgeText || '');
  setValue('trust_subheadline', t.subheadline || '');
  renderTrustItems(t.items || []);

  // 4. Stats
  renderStatsEditor(c.stats || []);

  // 5. 7 Sectors
  renderSectorsEditor(c.sectors || []);

  // 6. Case Studies
  renderCaseStudiesEditor(c.caseStudies || []);

  // 7. 4 Marketing Pillars
  renderPillarsEditor(c.pillars || []);

  // 8. Skills Matrix
  renderSkillsEditor(c.skills || []);

  // 9. Experience Timeline
  renderExperienceEditor(c.experience || []);

  // 11. Education
  const edu = c.education || {};
  setValue('edu_degree', edu.degree || '');
  setValue('edu_institution', edu.institution || '');
  setValue('edu_period', edu.period || '');
  setValue('edu_result', edu.result || '');
  setValue('edu_location', edu.location || '');

  // 12. Credentials, Honors & References
  renderHonorsEditor(c.honors || []);
  renderCertsEditor(c.certifications || []);
  renderRefsEditor(c.references || []);
}

function updateGoogleSerpPreview() {
  const title = document.getElementById('seo_pageTitle')?.value || 'Md. Shakibur Rahaman | Brand & Performance Marketing Architect';
  const desc = document.getElementById('seo_metaDescription')?.value || 'Senior Brand & Performance Marketing Strategist delivering 4.8x–12.4x ROAS across 7 core growth industries.';
  const url = document.getElementById('seo_canonicalUrl')?.value || 'http://localhost:3000/';

  const previewTitle = document.getElementById('previewSeoTitle');
  const previewDesc = document.getElementById('previewSeoDesc');
  const previewUrl = document.getElementById('previewSeoUrl');

  if (previewTitle) previewTitle.textContent = title;
  if (previewDesc) previewDesc.textContent = desc;
  if (previewUrl) previewUrl.textContent = url + ' › md-shakibur-rahaman';
}

function setValue(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val;
}

// ==========================================
// 7. DYNAMIC LIST RENDERERS
// ==========================================

// TYPEWRITER
function renderTypewriterList(phrases) {
  const container = document.getElementById('typewriterList');
  if (!container) return;
  container.innerHTML = phrases.map((phrase, idx) => `
    <div class="dynamic-list-row" data-index="${idx}">
      <span class="row-handle">☰</span>
      <input type="text" class="admin-input typewriter-input" value="${escapeHtml(phrase)}">
      <button type="button" class="btn-icon-danger" onclick="removeTypewriterPhrase(${idx})">✕</button>
    </div>
  `).join('');
}

function addTypewriterPhrase() {
  const list = getTypewriterPhrases();
  list.push('New High-Growth Performance Campaign');
  renderTypewriterList(list);
  markDirty();
}

window.removeTypewriterPhrase = function(idx) {
  const list = getTypewriterPhrases();
  list.splice(idx, 1);
  renderTypewriterList(list);
  markDirty();
};

function getTypewriterPhrases() {
  return Array.from(document.querySelectorAll('.typewriter-input')).map(i => i.value.trim()).filter(Boolean);
}

// TRUST ITEMS
function renderTrustItems(items) {
  const container = document.getElementById('trustItemsContainer');
  if (!container) return;
  container.innerHTML = items.map((item, idx) => `
    <div class="trust-item-card glass-panel" data-index="${idx}">
      <div class="form-row-2">
        <div class="form-group">
          <label>Icon Class (FontAwesome / SVG)</label>
          <input type="text" class="admin-input trust-item-icon" value="${escapeHtml(item.icon || '')}">
        </div>
        <div class="form-group">
          <label>Pillar Title</label>
          <input type="text" class="admin-input trust-item-title" value="${escapeHtml(item.title || '')}">
        </div>
      </div>
      <div class="form-group mb-0">
        <label>Description</label>
        <input type="text" class="admin-input trust-item-desc" value="${escapeHtml(item.description || '')}">
      </div>
    </div>
  `).join('');
}

// STATS EDITOR
function renderStatsEditor(stats) {
  const container = document.getElementById('statsEditorContainer');
  if (!container) return;
  container.innerHTML = stats.map((stat, idx) => `
    <div class="stat-card-editor glass-panel" data-index="${idx}">
      <div class="stat-card-header">
        <span class="stat-badge-id">#${stat.id || (idx + 1)}</span>
        <input type="hidden" class="stat-item-id" value="${escapeHtml(stat.id || '')}">
      </div>
      <div class="form-group">
        <label>Impact Metric Value (e.g. 4.8x – 12.4x)</label>
        <input type="text" class="admin-input stat-item-value" value="${escapeHtml(stat.value || '')}">
      </div>
      <div class="form-group">
        <label>Metric Label</label>
        <input type="text" class="admin-input stat-item-label" value="${escapeHtml(stat.label || '')}">
      </div>
      <div class="form-group mb-0">
        <label>Sub-Label / Footnote</label>
        <input type="text" class="admin-input stat-item-sublabel" value="${escapeHtml(stat.sublabel || '')}">
      </div>
    </div>
  `).join('');
}

// SECTORS EDITOR
function renderSectorsEditor(sectors) {
  const container = document.getElementById('sectorsEditorContainer');
  if (!container) return;
  container.innerHTML = sectors.map((sec, idx) => `
    <div class="sector-editor-card glass-panel mb-4" data-index="${idx}">
      <div class="flex-between mb-2">
        <div class="sector-tag-badge">Sector 0${idx + 1} • ${escapeHtml(sec.id || '')}</div>
        <input type="hidden" class="sec-item-id" value="${escapeHtml(sec.id || '')}">
      </div>
      <div class="form-row-3">
        <div class="form-group">
          <label>Industry Title</label>
          <input type="text" class="admin-input sec-item-title" value="${escapeHtml(sec.title || '')}">
        </div>
        <div class="form-group">
          <label>Emoji / Icon</label>
          <input type="text" class="admin-input sec-item-icon" value="${escapeHtml(sec.icon || '')}">
        </div>
        <div class="form-group">
          <label>Category Subtitle</label>
          <input type="text" class="admin-input sec-item-subtitle" value="${escapeHtml(sec.subtitle || '')}">
        </div>
      </div>
      <div class="form-group">
        <label>Sector Description & Value Proposition</label>
        <textarea class="admin-textarea sec-item-desc" rows="2">${escapeHtml(sec.description || '')}</textarea>
      </div>
      <div class="form-row-2">
        <div class="form-group">
          <label>Performance Tag Badge</label>
          <input type="text" class="admin-input sec-item-tag" value="${escapeHtml(sec.tag || '')}">
        </div>
        <div class="form-group">
          <label>Key Metrics (comma separated)</label>
          <input type="text" class="admin-input sec-item-metrics" value="${escapeHtml((sec.metrics || []).join(', '))}">
        </div>
      </div>
    </div>
  `).join('');
}

// CASE STUDIES CMS
function renderCaseStudiesEditor(cases) {
  const container = document.getElementById('casesListContainer');
  if (!container) return;

  container.innerHTML = cases.map((cs, idx) => `
    <div class="case-study-editor-card glass-panel mb-6" data-index="${idx}">
      <div class="case-header-bar flex-between">
        <div class="flex-gap align-center">
          <span class="case-number-badge">#0${idx + 1}</span>
          <h4 class="case-title-preview">${escapeHtml(cs.title || 'Untitled Case Study')}</h4>
          <span class="badge-sector">${escapeHtml(cs.sectorId || 'Sector')}</span>
        </div>
        <div class="flex-gap">
          <button type="button" class="btn-icon-danger" onclick="removeCaseStudy(${idx})">Delete</button>
        </div>
      </div>

      <div class="case-body-fields mt-4">
        <div class="form-row-3">
          <div class="form-group">
            <label>Case Study Unique ID (e.g. hospitality, interior)</label>
            <input type="text" class="admin-input cs-id" value="${escapeHtml(cs.id || '')}">
          </div>
          <div class="form-group">
            <label>Sector ID</label>
            <input type="text" class="admin-input cs-sectorId" value="${escapeHtml(cs.sectorId || '')}">
          </div>
          <div class="form-group">
            <label>Client / Brand Name</label>
            <input type="text" class="admin-input cs-client" value="${escapeHtml(cs.client || '')}">
          </div>
        </div>

        <div class="form-group">
          <label>Campaign Title</label>
          <input type="text" class="admin-input cs-title" value="${escapeHtml(cs.title || '')}">
        </div>

        <div class="form-row-4">
          <div class="form-group">
            <label>ROAS (e.g. 12.4x)</label>
            <input type="text" class="admin-input cs-roas" value="${escapeHtml(cs.roas || '')}">
          </div>
          <div class="form-group">
            <label>Attributed Revenue</label>
            <input type="text" class="admin-input cs-revenue" value="${escapeHtml(cs.revenue || '')}">
          </div>
          <div class="form-group">
            <label>CPA / Cost per Lead</label>
            <input type="text" class="admin-input cs-cpa" value="${escapeHtml(cs.cpa || '')}">
          </div>
          <div class="form-group">
            <label>Leads / Volume</label>
            <input type="text" class="admin-input cs-leads" value="${escapeHtml(cs.leads || '')}">
          </div>
        </div>

        <div class="form-group">
          <label>Executive Summary</label>
          <textarea class="admin-textarea cs-summary" rows="2">${escapeHtml(cs.summary || '')}</textarea>
        </div>

        <div class="form-row-3">
          <div class="form-group">
            <label>1. Challenge / Problem</label>
            <textarea class="admin-textarea cs-problem" rows="3">${escapeHtml(cs.problem || '')}</textarea>
          </div>
          <div class="form-group">
            <label>2. Strategy & Architecture</label>
            <textarea class="admin-textarea cs-strategy" rows="3">${escapeHtml(cs.strategy || '')}</textarea>
          </div>
          <div class="form-group">
            <label>3. Execution & Tactics</label>
            <textarea class="admin-textarea cs-execution" rows="3">${escapeHtml(cs.execution || '')}</textarea>
          </div>
        </div>

        <div class="form-group">
          <label>4. Quantified Business Results</label>
          <textarea class="admin-textarea cs-results" rows="2">${escapeHtml(cs.results || '')}</textarea>
        </div>

        <div class="form-group mb-0">
          <label>Tech & Tool Stack Tags (comma separated)</label>
          <input type="text" class="admin-input cs-techStack" value="${escapeHtml((cs.techStack || []).join(', '))}">
        </div>
      </div>
    </div>
  `).join('');
}

function addNewCaseStudy() {
  const cases = getCaseStudiesFromForms();
  cases.push({
    id: `case_${Date.now()}`,
    sectorId: 'hospitality',
    title: 'New High-ROAS Client Growth Campaign',
    client: 'Confidential Client',
    roas: '6.5x',
    revenue: 'BDT 5,000,000+',
    cpa: '-42%',
    leads: '850+ Leads',
    summary: 'Strategic multi-channel acquisition funnel scaling customer lifetime value.',
    problem: 'High customer acquisition cost and stagnant conversion rates.',
    strategy: 'Full-funnel segmentation, custom lookalikes, and dynamic creative testing.',
    execution: 'Deployed Meta CAPI, Google Search high-intent keywords, and dedicated landing pages.',
    results: 'Delivered 6.5x ROAS and exceeded monthly acquisition targets by 140%.',
    techStack: ['Meta Ads Manager', 'GA4', 'Google Tag Manager', 'Looker Studio']
  });
  renderCaseStudiesEditor(cases);
  markDirty();
}

window.removeCaseStudy = function(idx) {
  if (confirm('Are you sure you want to delete this case study?')) {
    const cases = getCaseStudiesFromForms();
    cases.splice(idx, 1);
    renderCaseStudiesEditor(cases);
    markDirty();
  }
};

function getCaseStudiesFromForms() {
  const cards = document.querySelectorAll('.case-study-editor-card');
  return Array.from(cards).map(card => {
    return {
      id: card.querySelector('.cs-id')?.value.trim() || '',
      sectorId: card.querySelector('.cs-sectorId')?.value.trim() || '',
      client: card.querySelector('.cs-client')?.value.trim() || '',
      title: card.querySelector('.cs-title')?.value.trim() || '',
      roas: card.querySelector('.cs-roas')?.value.trim() || '',
      revenue: card.querySelector('.cs-revenue')?.value.trim() || '',
      cpa: card.querySelector('.cs-cpa')?.value.trim() || '',
      leads: card.querySelector('.cs-leads')?.value.trim() || '',
      summary: card.querySelector('.cs-summary')?.value.trim() || '',
      problem: card.querySelector('.cs-problem')?.value.trim() || '',
      strategy: card.querySelector('.cs-strategy')?.value.trim() || '',
      execution: card.querySelector('.cs-execution')?.value.trim() || '',
      results: card.querySelector('.cs-results')?.value.trim() || '',
      techStack: (card.querySelector('.cs-techStack')?.value || '').split(',').map(s => s.trim()).filter(Boolean)
    };
  });
}

// 4 MARKETING PILLARS
function renderPillarsEditor(pillars) {
  const container = document.getElementById('pillarsListContainer');
  if (!container) return;
  container.innerHTML = pillars.map((pil, idx) => `
    <div class="pillar-editor-card glass-panel mb-4" data-index="${idx}">
      <div class="flex-between mb-2">
        <span class="pillar-num">Pillar 0${idx + 1}</span>
        <button type="button" class="btn-icon-danger" onclick="removePillarItem(${idx})">✕</button>
      </div>
      <div class="form-row-2">
        <div class="form-group">
          <label>Pillar Title</label>
          <input type="text" class="admin-input pil-title" value="${escapeHtml(pil.title || '')}">
        </div>
        <div class="form-group">
          <label>Icon (Emoji)</label>
          <input type="text" class="admin-input pil-icon" value="${escapeHtml(pil.icon || '')}">
        </div>
      </div>
      <div class="form-group mb-0">
        <label>Description</label>
        <textarea class="admin-textarea pil-desc" rows="2">${escapeHtml(pil.description || '')}</textarea>
      </div>
    </div>
  `).join('');
}

function addPillarItem() {
  const pillars = getPillarsFromForms();
  pillars.push({
    title: 'New Strategic Framework Pillar',
    icon: '⚡',
    description: 'Detailed description of growth methodology and attribution workflows.'
  });
  renderPillarsEditor(pillars);
  markDirty();
}

window.removePillarItem = function(idx) {
  const pillars = getPillarsFromForms();
  pillars.splice(idx, 1);
  renderPillarsEditor(pillars);
  markDirty();
};

function getPillarsFromForms() {
  const cards = document.querySelectorAll('.pillar-editor-card');
  return Array.from(cards).map(c => ({
    title: c.querySelector('.pil-title')?.value.trim() || '',
    icon: c.querySelector('.pil-icon')?.value.trim() || '🎯',
    description: c.querySelector('.pil-desc')?.value.trim() || ''
  }));
}

// SKILLS MATRIX
function renderSkillsEditor(skills) {
  const container = document.getElementById('skillsListContainer');
  if (!container) return;
  container.innerHTML = skills.map((sk, idx) => `
    <div class="skill-editor-card glass-panel mb-4" data-index="${idx}">
      <div class="flex-between mb-2">
        <strong>${escapeHtml(sk.category || 'Skill Domain')}</strong>
        <button type="button" class="btn-icon-danger" onclick="removeSkillItem(${idx})">✕</button>
      </div>
      <div class="form-row-3">
        <div class="form-group">
          <label>Capability Domain</label>
          <input type="text" class="admin-input sk-category" value="${escapeHtml(sk.category || '')}">
        </div>
        <div class="form-group">
          <label>Proficiency Percentage (e.g. 98%)</label>
          <input type="text" class="admin-input sk-level" value="${escapeHtml(sk.level || '')}">
        </div>
        <div class="form-group">
          <label>Sub-Capability Summary</label>
          <input type="text" class="admin-input sk-sub" value="${escapeHtml(sk.sub || '')}">
        </div>
      </div>
      <div class="form-group mb-0">
        <label>Tool Stack Items (comma separated)</label>
        <input type="text" class="admin-input sk-tools" value="${escapeHtml((sk.tools || []).join(', '))}">
      </div>
    </div>
  `).join('');
}

function addSkillItem() {
  const skills = getSkillsFromForms();
  skills.push({
    category: 'Advanced Analytics & AI Modeling',
    level: '95%',
    sub: 'Predictive ROI & Custom Attribution Scripts',
    tools: ['Python', 'BigQuery', 'Looker Studio', 'GA4']
  });
  renderSkillsEditor(skills);
  markDirty();
}

window.removeSkillItem = function(idx) {
  const skills = getSkillsFromForms();
  skills.splice(idx, 1);
  renderSkillsEditor(skills);
  markDirty();
};

function getSkillsFromForms() {
  const cards = document.querySelectorAll('.skill-editor-card');
  return Array.from(cards).map(c => ({
    category: c.querySelector('.sk-category')?.value.trim() || '',
    level: c.querySelector('.sk-level')?.value.trim() || '90%',
    sub: c.querySelector('.sk-sub')?.value.trim() || '',
    tools: (c.querySelector('.sk-tools')?.value || '').split(',').map(s => s.trim()).filter(Boolean)
  }));
}

// CAREER EXPERIENCE
function renderExperienceEditor(expList) {
  const container = document.getElementById('experienceListContainer');
  if (!container) return;
  container.innerHTML = expList.map((exp, idx) => `
    <div class="exp-editor-card glass-panel mb-4" data-index="${idx}">
      <div class="flex-between mb-2">
        <span class="badge-role">#0${idx + 1} Experience</span>
        <button type="button" class="btn-icon-danger" onclick="removeExperienceItem(${idx})">✕</button>
      </div>
      <div class="form-row-3">
        <div class="form-group">
          <label>Job Title / Role</label>
          <input type="text" class="admin-input exp-role" value="${escapeHtml(exp.role || '')}">
        </div>
        <div class="form-group">
          <label>Company / Organization</label>
          <input type="text" class="admin-input exp-company" value="${escapeHtml(exp.company || '')}">
        </div>
        <div class="form-group">
          <label>Timeframe / Period</label>
          <input type="text" class="admin-input exp-period" value="${escapeHtml(exp.period || '')}">
        </div>
      </div>
      <div class="form-group">
        <label>Role Summary</label>
        <textarea class="admin-textarea exp-desc" rows="2">${escapeHtml(exp.desc || '')}</textarea>
      </div>
      <div class="form-group mb-0">
        <label>Key Accomplishments (1 per line)</label>
        <textarea class="admin-textarea exp-achievements font-mono" rows="3">${escapeHtml((exp.achievements || []).join('\n'))}</textarea>
      </div>
    </div>
  `).join('');
}

function addExperienceItem() {
  const exp = getExperienceFromForms();
  exp.push({
    role: 'Senior Growth & Brand Consultant',
    company: 'Strategic Advisory',
    period: '2024 - Present',
    desc: 'Consulting high-growth brands on multi-channel attribution and revenue scaling.',
    achievements: ['Delivered average 6.8x ROAS across portfolio clients.', 'Standardized CAPI tracking across Shopify and WooCommerce stores.']
  });
  renderExperienceEditor(exp);
  markDirty();
}

window.removeExperienceItem = function(idx) {
  const exp = getExperienceFromForms();
  exp.splice(idx, 1);
  renderExperienceEditor(exp);
  markDirty();
};

function getExperienceFromForms() {
  const cards = document.querySelectorAll('.exp-editor-card');
  return Array.from(cards).map(c => ({
    role: c.querySelector('.exp-role')?.value.trim() || '',
    company: c.querySelector('.exp-company')?.value.trim() || '',
    period: c.querySelector('.exp-period')?.value.trim() || '',
    desc: c.querySelector('.exp-desc')?.value.trim() || '',
    achievements: (c.querySelector('.exp-achievements')?.value || '').split('\n').map(s => s.trim()).filter(Boolean)
  }));
}

// HONORS, CERTS, REFS
function renderHonorsEditor(honors) {
  const container = document.getElementById('honorsListContainer');
  if (!container) return;
  container.innerHTML = honors.map((h, idx) => `
    <div class="cred-row glass-panel mb-3" data-index="${idx}">
      <div class="form-row-3">
        <div class="form-group mb-0">
          <label>Award Title</label>
          <input type="text" class="admin-input honor-title" value="${escapeHtml(h.title || '')}">
        </div>
        <div class="form-group mb-0">
          <label>Issuing Organization</label>
          <input type="text" class="admin-input honor-org" value="${escapeHtml(h.org || '')}">
        </div>
        <div class="form-group mb-0">
          <label>Year / Badge</label>
          <input type="text" class="admin-input honor-year" value="${escapeHtml(h.year || '')}">
        </div>
      </div>
      <button type="button" class="btn-icon-danger ml-2" onclick="removeHonorItem(${idx})">✕</button>
    </div>
  `).join('');
}

function addHonorItem() {
  const list = getHonorsFromForms();
  list.push({ title: 'Growth Marketer of the Year', org: 'Industry Honors', year: '2024' });
  renderHonorsEditor(list);
  markDirty();
}

window.removeHonorItem = function(idx) {
  const list = getHonorsFromForms();
  list.splice(idx, 1);
  renderHonorsEditor(list);
  markDirty();
};

function getHonorsFromForms() {
  return Array.from(document.querySelectorAll('#honorsListContainer .cred-row')).map(c => ({
    title: c.querySelector('.honor-title')?.value.trim() || '',
    org: c.querySelector('.honor-org')?.value.trim() || '',
    year: c.querySelector('.honor-year')?.value.trim() || ''
  }));
}

function renderCertsEditor(certs) {
  const container = document.getElementById('certsListContainer');
  if (!container) return;
  container.innerHTML = certs.map((c, idx) => `
    <div class="cred-row glass-panel mb-3" data-index="${idx}">
      <div class="form-row-3">
        <div class="form-group mb-0">
          <label>Certification Title</label>
          <input type="text" class="admin-input cert-title" value="${escapeHtml(c.title || '')}">
        </div>
        <div class="form-group mb-0">
          <label>Issuer (e.g. Google, Meta)</label>
          <input type="text" class="admin-input cert-issuer" value="${escapeHtml(c.issuer || '')}">
        </div>
        <div class="form-group mb-0">
          <label>Year / Status</label>
          <input type="text" class="admin-input cert-year" value="${escapeHtml(c.year || '')}">
        </div>
      </div>
      <button type="button" class="btn-icon-danger ml-2" onclick="removeCertItem(${idx})">✕</button>
    </div>
  `).join('');
}

function addCertItem() {
  const list = getCertsFromForms();
  list.push({ title: 'Google Analytics 4 Certification', issuer: 'Google Skillshop', year: '2024' });
  renderCertsEditor(list);
  markDirty();
}

window.removeCertItem = function(idx) {
  const list = getCertsFromForms();
  list.splice(idx, 1);
  renderCertsEditor(list);
  markDirty();
};

function getCertsFromForms() {
  return Array.from(document.querySelectorAll('#certsListContainer .cred-row')).map(c => ({
    title: c.querySelector('.cert-title')?.value.trim() || '',
    issuer: c.querySelector('.cert-issuer')?.value.trim() || '',
    year: c.querySelector('.cert-year')?.value.trim() || ''
  }));
}

function renderRefsEditor(refs) {
  const container = document.getElementById('refsListContainer');
  if (!container) return;
  container.innerHTML = refs.map((r, idx) => `
    <div class="cred-row glass-panel mb-3" data-index="${idx}">
      <div class="form-row-3">
        <div class="form-group mb-0">
          <label>Referee Name</label>
          <input type="text" class="admin-input ref-name" value="${escapeHtml(r.name || '')}">
        </div>
        <div class="form-group mb-0">
          <label>Designation / Role</label>
          <input type="text" class="admin-input ref-title" value="${escapeHtml(r.title || '')}">
        </div>
        <div class="form-group mb-0">
          <label>Organization & Contact</label>
          <input type="text" class="admin-input ref-org" value="${escapeHtml(r.org || '')}">
        </div>
      </div>
      <button type="button" class="btn-icon-danger ml-2" onclick="removeRefItem(${idx})">✕</button>
    </div>
  `).join('');
}

function addRefItem() {
  const list = getRefsFromForms();
  list.push({ name: 'Executive Leader', title: 'Managing Director', org: 'Enterprise Firm' });
  renderRefsEditor(list);
  markDirty();
}

window.removeRefItem = function(idx) {
  const list = getRefsFromForms();
  list.splice(idx, 1);
  renderRefsEditor(list);
  markDirty();
};

function getRefsFromForms() {
  return Array.from(document.querySelectorAll('#refsListContainer .cred-row')).map(c => ({
    name: c.querySelector('.ref-name')?.value.trim() || '',
    title: c.querySelector('.ref-title')?.value.trim() || '',
    org: c.querySelector('.ref-org')?.value.trim() || ''
  }));
}

// ==========================================
// 8. LEADS INBOX & CSV EXPORT
// ==========================================
function renderLeads(leads) {
  const container = document.getElementById('leadsTableContainer');
  if (!container) return;

  if (!leads || leads.length === 0) {
    container.innerHTML = '<div class="empty-state">No client inquiries received yet. Inquiries from the website contact forms and ROI estimator will be collected here.</div>';
    return;
  }

  container.innerHTML = `
    <table class="leads-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Contact Name</th>
          <th>Email & Phone</th>
          <th>Service / Industry</th>
          <th>Budget</th>
          <th>Project Message</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${leads.map((l, idx) => `
          <tr>
            <td><small>${new Date(l.date || Date.now()).toLocaleString()}</small></td>
            <td><strong>${escapeHtml(l.name || 'Anonymous')}</strong></td>
            <td>
              <div><a href="mailto:${escapeHtml(l.email || '')}" class="lead-link">${escapeHtml(l.email || '—')}</a></div>
              <small class="text-dim">${escapeHtml(l.phone || '')}</small>
            </td>
            <td><span class="badge-tag">${escapeHtml(l.service || l.type || 'General')}</span></td>
            <td><strong>${escapeHtml(l.budget ? 'BDT ' + l.budget : '—')}</strong></td>
            <td class="lead-message-cell" title="${escapeHtml(l.message || '')}">${escapeHtml(l.message || '—')}</td>
            <td>
              <button class="btn-icon-danger" onclick="deleteLead(${idx})">✕</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function filterLeads(query) {
  if (!currentLeads) return;
  const q = query.toLowerCase();
  const filtered = currentLeads.filter(l => {
    return (l.name && l.name.toLowerCase().includes(q)) ||
           (l.email && l.email.toLowerCase().includes(q)) ||
           (l.service && l.service.toLowerCase().includes(q)) ||
           (l.message && l.message.toLowerCase().includes(q));
  });
  renderLeads(filtered);
}

window.deleteLead = async function(idx) {
  if (confirm('Delete this inquiry from the inbox?')) {
    currentLeads.splice(idx, 1);
    renderLeads(currentLeads);
    updateOverviewStats();
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(currentLeads)
      });
      showToast('Lead deleted.', 'info');
    } catch (err) {
      console.error('Failed to sync leads delete:', err);
    }
  }
};

function exportLeadsCsv() {
  if (!currentLeads || currentLeads.length === 0) {
    showToast('No leads available to export.', 'info');
    return;
  }

  const headers = ['Date', 'Name', 'Email', 'Phone', 'Service', 'Budget', 'Message'];
  const rows = currentLeads.map(l => [
    `"${l.date || ''}"`,
    `"${(l.name || '').replace(/"/g, '""')}"`,
    `"${(l.email || '').replace(/"/g, '""')}"`,
    `"${(l.phone || '').replace(/"/g, '""')}"`,
    `"${(l.service || l.type || '').replace(/"/g, '""')}"`,
    `"${(l.budget || '').replace(/"/g, '""')}"`,
    `"${(l.message || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `shakibur_leads_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('Leads CSV exported successfully!', 'success');
}

// ==========================================
// 9. CONTENT COMPILATION & SAVING
// ==========================================
function gatherContentFromForms() {
  let schemaParsed = {};
  const schemaStr = document.getElementById('seo_schemaJson')?.value || '{}';
  try {
    schemaParsed = JSON.parse(schemaStr);
  } catch (e) {
    schemaParsed = schemaStr;
  }

  // Sectors gathering
  const sectorCards = document.querySelectorAll('.sector-editor-card');
  const sectors = Array.from(sectorCards).map(sc => ({
    id: sc.querySelector('.sec-item-id')?.value.trim() || '',
    title: sc.querySelector('.sec-item-title')?.value.trim() || '',
    icon: sc.querySelector('.sec-item-icon')?.value.trim() || '',
    subtitle: sc.querySelector('.sec-item-subtitle')?.value.trim() || '',
    description: sc.querySelector('.sec-item-desc')?.value.trim() || '',
    tag: sc.querySelector('.sec-item-tag')?.value.trim() || '',
    metrics: (sc.querySelector('.sec-item-metrics')?.value || '').split(',').map(s => s.trim()).filter(Boolean)
  }));

  // Stats gathering
  const statCards = document.querySelectorAll('.stat-card-editor');
  const stats = Array.from(statCards).map(st => ({
    id: st.querySelector('.stat-item-id')?.value.trim() || '',
    value: st.querySelector('.stat-item-value')?.value.trim() || '',
    label: st.querySelector('.stat-item-label')?.value.trim() || '',
    sublabel: st.querySelector('.stat-item-sublabel')?.value.trim() || ''
  }));

  // Trust items gathering
  const trustCards = document.querySelectorAll('.trust-item-card');
  const trustItems = Array.from(trustCards).map(tc => ({
    icon: tc.querySelector('.trust-item-icon')?.value.trim() || '',
    title: tc.querySelector('.trust-item-title')?.value.trim() || '',
    description: tc.querySelector('.trust-item-desc')?.value.trim() || ''
  }));

  return {
    seo: {
      pageTitle: document.getElementById('seo_pageTitle')?.value.trim() || '',
      metaDescription: document.getElementById('seo_metaDescription')?.value.trim() || '',
      metaKeywords: document.getElementById('seo_metaKeywords')?.value.trim() || '',
      author: document.getElementById('seo_author')?.value.trim() || '',
      canonicalUrl: document.getElementById('seo_canonicalUrl')?.value.trim() || '',
      ogTitle: document.getElementById('seo_ogTitle')?.value.trim() || '',
      ogDescription: document.getElementById('seo_ogDescription')?.value.trim() || '',
      ogImage: document.getElementById('seo_ogImage')?.value.trim() || '',
      twitterCard: document.getElementById('seo_twitterCard')?.value || 'summary_large_image',
      googleSiteVerification: document.getElementById('seo_googleSiteVerification')?.value.trim() || '',
      googleAnalyticsId: document.getElementById('seo_googleAnalyticsId')?.value.trim() || '',
      metaPixelId: document.getElementById('seo_metaPixelId')?.value.trim() || '',
      customHeadScript: document.getElementById('seo_customHeadScript')?.value || '',
      customBodyScript: document.getElementById('seo_customBodyScript')?.value || '',
      schemaJson: schemaParsed
    },
    profile: {
      name: document.getElementById('prof_name')?.value.trim() || '',
      eyebrow: document.getElementById('prof_eyebrow')?.value.trim() || '',
      headline: document.getElementById('prof_headline')?.value.trim() || '',
      bio: document.getElementById('prof_bio')?.value.trim() || '',
      statusBadge: document.getElementById('prof_statusBadge')?.value.trim() || '',
      location: document.getElementById('prof_location')?.value.trim() || '',
      email: document.getElementById('prof_email')?.value.trim() || '',
      phone: document.getElementById('prof_phone')?.value.trim() || '',
      whatsapp: document.getElementById('prof_whatsapp')?.value.trim() || '',
      linkedin: document.getElementById('prof_linkedin')?.value.trim() || '',
      github: currentContent?.profile?.github || 'https://github.com',
      resumePdfUrl: document.getElementById('prof_resumePdfUrl')?.value.trim() || '#'
    },
    trustAssurance: {
      headline: document.getElementById('trust_headline')?.value.trim() || '',
      subheadline: document.getElementById('trust_subheadline')?.value.trim() || '',
      badgeText: document.getElementById('trust_badgeText')?.value.trim() || '',
      items: trustItems
    },
    typewriter: getTypewriterPhrases(),
    stats: stats,
    pillars: getPillarsFromForms(),
    skills: getSkillsFromForms(),
    sectors: sectors,
    caseStudies: getCaseStudiesFromForms(),
    experience: getExperienceFromForms(),
    education: {
      degree: document.getElementById('edu_degree')?.value.trim() || '',
      institution: document.getElementById('edu_institution')?.value.trim() || '',
      period: document.getElementById('edu_period')?.value.trim() || '',
      result: document.getElementById('edu_result')?.value.trim() || '',
      location: document.getElementById('edu_location')?.value.trim() || ''
    },
    certifications: getCertsFromForms(),
    honors: getHonorsFromForms(),
    references: getRefsFromForms()
  };
}

async function saveAndPublish() {
  const saveBtn = document.getElementById('topSaveBtn');
  const floatingBtn = document.getElementById('floatingSaveBtn');

  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<span>Saving & Publishing...</span>';
  }
  if (floatingBtn) {
    floatingBtn.disabled = true;
    floatingBtn.textContent = 'Saving...';
  }

  const updatedContent = gatherContentFromForms();

  try {
    const res = await fetch('/api/content', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(updatedContent, null, 2)
    });

    const data = await res.json();
    if (res.ok && data.success) {
      currentContent = JSON.parse(JSON.stringify(updatedContent));
      initialContent = JSON.parse(JSON.stringify(updatedContent));
      resetDirty();
      showToast('🚀 Changes saved and published live to website!', 'success');
    } else {
      showToast(data.error || 'Failed to save changes.', 'error');
    }
  } catch (err) {
    console.error('Save error:', err);
    showToast('Failed to connect to backend server.', 'error');
  } finally {
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2zM17 21v-8H7v8M7 3v5h8"/></svg><span>Save & Publish Live</span>`;
    }
    if (floatingBtn) {
      floatingBtn.disabled = false;
      floatingBtn.textContent = 'Save & Publish';
    }
  }
}

function discardChanges() {
  if (confirm('Discard all unsaved edits and reload current live content?')) {
    populateAdminForms(initialContent);
    resetDirty();
    showToast('Unsaved edits discarded.', 'info');
  }
}

function markDirty() {
  isDirty = true;
  document.getElementById('unsavedBar')?.classList.remove('hidden');
  document.getElementById('discardChangesBtn')?.classList.remove('hidden');
}

function resetDirty() {
  isDirty = false;
  document.getElementById('unsavedBar')?.classList.add('hidden');
  document.getElementById('discardChangesBtn')?.classList.add('hidden');
}

// ==========================================
// 10. BACKUP & RESTORE
// ==========================================
function downloadSiteBackup() {
  const content = gatherContentFromForms();
  const snapshot = {
    version: '2.0.0',
    exportDate: new Date().toISOString(),
    content: content,
    leads: currentLeads
  };

  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(snapshot, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `shakibur_portfolio_backup_${new Date().toISOString().slice(0,10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast('Full site JSON backup downloaded successfully.', 'success');
}

function handleRestoreBackup(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (event) => {
    try {
      const parsed = JSON.parse(event.target.result);
      if (parsed.content) {
        populateAdminForms(parsed.content);
        markDirty();
        showToast('Backup parsed successfully. Click Save & Publish to apply.', 'success');
      } else {
        showToast('Invalid backup file format.', 'error');
      }
    } catch (err) {
      showToast('Failed to parse JSON file.', 'error');
    }
  };
  reader.readAsText(file);
}

async function handleFactoryReset() {
  if (confirm('WARNING: Are you sure you want to reset all website content back to factory defaults? All custom edits will be lost!')) {
    try {
      const res = await fetch('/api/reset', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      if (res.ok) {
        showToast('Content successfully reset to default!', 'success');
        await loadDashboardData();
      }
    } catch (err) {
      showToast('Reset failed.', 'error');
    }
  }
}

// ==========================================
// 11. TOAST NOTIFICATIONS & UTILITIES
// ==========================================
function showToast(message, type = 'info') {
  const toast = document.getElementById('adminToast');
  if (!toast) return;

  toast.textContent = message;
  toast.className = `admin-toast show toast-${type}`;

  setTimeout(() => {
    toast.className = 'admin-toast hidden';
  }, 4000);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
