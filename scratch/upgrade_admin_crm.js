const fs = require('fs');
const path = require('path');

// 1. UPDATE admin.html
const adminHtmlPath = path.join(__dirname, '../admin.html');
let adminHtml = fs.readFileSync(adminHtmlPath, 'utf8');

const oldTabLeadsRegex = /<!-- TAB 9: LEADS INBOX -->[\s\S]*?<\/section>/;

const newTabLeadsHtml = `<!-- TAB 9: LEADS INBOX & CRM ENGINE -->
        <section id="tab-leads" class="tab-pane">
          
          <!-- CRM Summary Metric Cards -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div class="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-between">
              <div>
                <div class="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Total Inquiries</div>
                <div class="text-2xl font-black text-[#0B0F19] mt-0.5" id="crmTotalLeads">0</div>
              </div>
              <div class="w-10 h-10 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center text-base">📊</div>
            </div>
            <div class="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-between">
              <div>
                <div class="text-[11px] font-bold uppercase tracking-wider text-blue-600">New / Unread</div>
                <div class="text-2xl font-black text-blue-600 mt-0.5" id="crmNewLeads">0</div>
              </div>
              <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-base font-bold">✨</div>
            </div>
            <div class="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-between">
              <div>
                <div class="text-[11px] font-bold uppercase tracking-wider text-amber-600">In Discussion</div>
                <div class="text-2xl font-black text-amber-600 mt-0.5" id="crmProgressLeads">0</div>
              </div>
              <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-base font-bold">⏳</div>
            </div>
            <div class="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-between">
              <div>
                <div class="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Deals Won</div>
                <div class="text-2xl font-black text-emerald-600 mt-0.5" id="crmWonLeads">0</div>
              </div>
              <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-base font-bold">🏆</div>
            </div>
          </div>

          <!-- CRM Main Card -->
          <div class="card-form glass-panel">
            <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-xl">📬</span>
                  <h3 class="text-lg font-black text-[#0B0F19] mb-0">Client Inquiries & CRM Database</h3>
                </div>
                <p class="section-desc mt-1">Real-time customer bookings, inquiries from /offers & contact forms, status tracking, and notes.</p>
              </div>
              
              <!-- Filter Controls & Actions -->
              <div class="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
                <input type="text" id="leadsSearchInput" placeholder="🔍 Search name, phone, email, package..." class="admin-input text-xs py-2 px-3 w-full sm:w-64 rounded-xl">
                
                <select id="crmStatusFilter" class="admin-input text-xs py-2 px-3 rounded-xl w-auto font-semibold">
                  <option value="all">All Stages</option>
                  <option value="new">New / Unread</option>
                  <option value="contacted">Contacted</option>
                  <option value="in_discussion">In Discussion</option>
                  <option value="payment_pending">Payment Pending</option>
                  <option value="won">Closed / Won</option>
                  <option value="lost">Lost</option>
                </select>

                <button type="button" id="exportLeadsCsvBtn" class="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-xs">
                  <i class="fa-solid fa-file-excel"></i>
                  <span>Export to Excel</span>
                </button>

                <button type="button" onclick="openAddLeadModal()" class="px-3.5 py-2 rounded-xl bg-[#0066FF] hover:bg-[#0052FF] text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs">
                  <i class="fa-solid fa-plus"></i>
                  <span>Add Lead</span>
                </button>
              </div>
            </div>

            <!-- Leads Table Container -->
            <div id="leadsTableContainer" class="table-responsive"></div>
          </div>

          <!-- Add Manual Lead Modal -->
          <div id="addLeadModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div class="relative w-full max-w-lg p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-2xl space-y-4">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-black text-[#0B0F19]">➕ Add Manual Lead to CRM</h3>
                <button type="button" onclick="closeAddLeadModal()" class="w-8 h-8 rounded-full bg-[#F8FAFC] text-[#64748B] hover:text-[#0B0F19] flex items-center justify-center">✕</button>
              </div>
              <form id="addLeadForm" class="space-y-3">
                <div>
                  <label class="text-xs font-bold text-[#0B0F19]">Client Name *</label>
                  <input type="text" id="manualLeadName" required placeholder="e.g. Md. Rahim" class="admin-input text-xs py-2">
                </div>
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="text-xs font-bold text-[#0B0F19]">Phone / WhatsApp *</label>
                    <input type="tel" id="manualLeadPhone" required placeholder="017XXXXXXXX" class="admin-input text-xs py-2">
                  </div>
                  <div>
                    <label class="text-xs font-bold text-[#0B0F19]">Email Address</label>
                    <input type="email" id="manualLeadEmail" placeholder="client@brand.com" class="admin-input text-xs py-2">
                  </div>
                </div>
                <div>
                  <label class="text-xs font-bold text-[#0B0F19]">Package / Service Required</label>
                  <select id="manualLeadService" class="admin-input text-xs py-2 font-bold">
                    <option value="Startup Plan (12-Mo EMI)">Startup Plan (12-Mo EMI)</option>
                    <option value="Accelerate Plan (6-Mo EMI)">Accelerate Plan (6-Mo EMI)</option>
                    <option value="Momentum Plan (3-Mo EMI)">Momentum Plan (3-Mo EMI)</option>
                    <option value="Founder Plan (Pay In Full)">Founder Plan (Pay In Full)</option>
                    <option value="Custom E-Commerce Package">Custom E-Commerce Package</option>
                    <option value="Full-Stack Web Development">Full-Stack Web Development</option>
                    <option value="Brand Strategy & Corporate Identity">Brand Strategy & Corporate Identity</option>
                    <option value="Social Media & Meta Ads">Social Media & Meta Ads</option>
                    <option value="Other Service">Other Service</option>
                  </select>
                </div>
                <div>
                  <label class="text-xs font-bold text-[#0B0F19]">Business Details / Client Notes</label>
                  <textarea id="manualLeadMsg" rows="3" placeholder="Requirements, meeting notes, or budget..." class="admin-textarea text-xs"></textarea>
                </div>
                <div class="flex justify-end gap-2 pt-2">
                  <button type="button" onclick="closeAddLeadModal()" class="px-4 py-2 rounded-xl bg-slate-100 font-bold text-xs text-[#64748B]">Cancel</button>
                  <button type="submit" class="px-5 py-2 rounded-xl bg-[#0066FF] hover:bg-[#0052FF] font-bold text-xs text-white">Save Lead</button>
                </div>
              </form>
            </div>
          </div>

        </section>`;

if (oldTabLeadsRegex.test(adminHtml)) {
  adminHtml = adminHtml.replace(oldTabLeadsRegex, newTabLeadsHtml);
  console.log('Updated tab-leads HTML in admin.html');
}

fs.writeFileSync(adminHtmlPath, adminHtml, 'utf8');

// =========================================================================
// 2. UPDATE admin.js (CRM Controller Logic)
// =========================================================================
const adminJsPath = path.join(__dirname, '../admin.js');
let adminJs = fs.readFileSync(adminJsPath, 'utf8');

const oldLeadsJsRegex = /\/\/ =+[\s\n]*8\.\s*LEADS CONTROLLER[\s\S]*?\/\/ =+[\s\n]*9\.\s*SEO HELPERS/m;

const newLeadsJs = `// ==========================================
// 8. CRM & LEADS INBOX CONTROLLER
// ==========================================
function renderLeads(leads) {
  const container = document.getElementById('leadsTableContainer');
  if (!container) return;

  // Update CRM Counter Metrics
  updateCrmStats(currentLeads);

  if (!leads || leads.length === 0) {
    container.innerHTML = \`
      <div class="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-[#E2E8F0]">
        <div class="text-3xl mb-2">📭</div>
        <div class="text-sm font-bold text-[#0B0F19]">No inquiries found in CRM database</div>
        <p class="text-xs text-[#64748B] mt-1">New customer bookings from /offers/ecommerce or website contact forms will appear here live.</p>
      </div>
    \`;
    return;
  }

  const rows = leads.slice().reverse().map((lead, idx) => {
    const actualIdx = leads.length - 1 - idx;
    const dateStr = lead.date ? new Date(lead.date).toLocaleString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
    }) : 'Recent';

    const status = (lead.status || 'new').toLowerCase();
    
    // Status color options
    const statusMap = {
      new: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', label: 'New / Unread' },
      contacted: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', label: 'Contacted' },
      in_discussion: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', label: 'In Discussion' },
      payment_pending: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', label: 'Payment Pending' },
      won: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', label: 'Closed / Won' },
      lost: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', label: 'Lost' }
    };

    const curStatus = statusMap[status] || statusMap['new'];
    const cleanPhone = (lead.phone || '').replace(/[^0-9+]/g, '');
    const waUrl = cleanPhone ? \`https://wa.me/\${cleanPhone.startsWith('+') ? cleanPhone.slice(1) : (cleanPhone.startsWith('01') ? '88' + cleanPhone : cleanPhone)}\` : '#';

    return \`
      <tr class="hover:bg-slate-50/80 transition-colors border-b border-[#E2E8F0]">
        
        <!-- Date -->
        <td class="p-3 text-xs text-[#64748B] whitespace-nowrap align-top font-medium">
          \${escapeHtml(dateStr)}
          \${lead.source ? \`<br><span class="text-[10px] text-[#0066FF] font-bold font-mono">\${escapeHtml(lead.source)}</span>\` : ''}
        </td>

        <!-- Client Name -->
        <td class="p-3 text-xs text-[#0B0F19] align-top font-bold">
          <div class="text-sm font-black">\${escapeHtml(lead.name || 'Anonymous')}</div>
          \${lead.company ? \`<div class="text-[11px] text-[#64748B] font-semibold">🏢 \${escapeHtml(lead.company)}</div>\` : ''}
        </td>

        <!-- Contact Info & Quick Actions -->
        <td class="p-3 text-xs align-top">
          <div class="flex items-center gap-1.5 font-bold text-[#0B0F19]">
            <span>📞 \${escapeHtml(lead.phone || 'N/A')}</span>
            \${cleanPhone ? \`
              <a href="\${waUrl}" target="_blank" title="Chat on WhatsApp" class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#25D366] text-white text-[10px] hover:scale-110 transition-transform shadow-xs">
                <i class="fa-brands fa-whatsapp"></i>
              </a>
            \` : ''}
          </div>
          <div class="mt-1">
            <a href="mailto:\${escapeHtml(lead.email || '')}" class="text-[#0066FF] hover:underline text-xs font-semibold break-all">
              ✉️ \${escapeHtml(lead.email || 'N/A')}
            </a>
          </div>
        </td>

        <!-- Package / Service Chosen -->
        <td class="p-3 text-xs align-top">
          <span class="inline-block px-2.5 py-1 rounded-lg bg-[#0066FF]/10 text-[#0066FF] font-black text-xs border border-[#0066FF]/20">
            \${escapeHtml(lead.services || lead.service || lead.budget || 'E-Commerce Package')}
          </span>
        </td>

        <!-- Business Details & Project Brief -->
        <td class="p-3 text-xs text-[#334155] align-top max-w-xs leading-relaxed">
          <div class="p-2 rounded-xl bg-slate-50 border border-slate-200/80 text-[11.5px] max-h-24 overflow-y-auto whitespace-pre-wrap font-sans">
            \${escapeHtml(lead.message || 'No additional details provided.')}
          </div>
        </td>

        <!-- Interactive CRM Stage / Status Dropdown -->
        <td class="p-3 text-xs align-top whitespace-nowrap">
          <select onchange="updateLeadStatus(\${actualIdx}, this.value)" class="text-xs font-bold py-1.5 px-2.5 rounded-xl border \${curStatus.border} \${curStatus.bg} \${curStatus.text} focus:outline-none cursor-pointer">
            <option value="new" \${status === 'new' ? 'selected' : ''}>🔵 New / Unread</option>
            <option value="contacted" \${status === 'contacted' ? 'selected' : ''}>🟡 Contacted</option>
            <option value="in_discussion" \${status === 'in_discussion' ? 'selected' : ''}>🟣 In Discussion</option>
            <option value="payment_pending" \${status === 'payment_pending' ? 'selected' : ''}>🟠 Payment Pending</option>
            <option value="won" \${status === 'won' ? 'selected' : ''}>🟢 Closed / Won</option>
            <option value="lost" \${status === 'lost' ? 'selected' : ''}>🔴 Lost</option>
          </select>
        </td>

        <!-- Admin Internal Notes (CRM Memory) -->
        <td class="p-3 text-xs align-top min-w-[180px]">
          <div class="flex items-center gap-1.5">
            <input type="text" id="notes_input_\${actualIdx}" value="\${escapeHtml(lead.notes || '')}" placeholder="Add follow-up notes..." class="admin-input text-xs py-1 px-2 flex-1 rounded-lg">
            <button type="button" onclick="saveLeadNotes(\${actualIdx})" title="Save Notes" class="px-2 py-1 rounded-lg bg-[#0066FF] text-white hover:bg-[#0052FF] text-xs font-bold shrink-0">
              💾
            </button>
          </div>
        </td>

        <!-- Actions -->
        <td class="p-3 text-xs align-top whitespace-nowrap text-center">
          <button type="button" class="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors inline-flex items-center justify-center font-bold text-xs" title="Delete Lead" onclick="deleteLead(\${actualIdx})">
            🗑️
          </button>
        </td>

      </tr>
    \`;
  }).join('');

  container.innerHTML = \`
    <table class="w-full text-left border-collapse min-w-[900px]">
      <thead>
        <tr class="border-b border-[#E2E8F0] bg-[#F8FAFC] text-xs font-black text-[#0B0F19]">
          <th class="p-3">Date</th>
          <th class="p-3">Client</th>
          <th class="p-3">Contact</th>
          <th class="p-3">Package / Service</th>
          <th class="p-3">Business Details</th>
          <th class="p-3">CRM Status</th>
          <th class="p-3">Admin CRM Notes</th>
          <th class="p-3 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        \${rows}
      </tbody>
    </table>
  \`;
}

function updateCrmStats(leads) {
  const total = leads.length;
  let newCount = 0;
  let progressCount = 0;
  let wonCount = 0;

  leads.forEach(l => {
    const s = (l.status || 'new').toLowerCase();
    if (s === 'new') newCount++;
    else if (s === 'contacted' || s === 'in_discussion' || s === 'payment_pending') progressCount++;
    else if (s === 'won') wonCount++;
  });

  const elTotal = document.getElementById('crmTotalLeads');
  const elNew = document.getElementById('crmNewLeads');
  const elProg = document.getElementById('crmProgressLeads');
  const elWon = document.getElementById('crmWonLeads');
  const leadsBadge = document.getElementById('leadsBadge');

  if (elTotal) elTotal.textContent = total;
  if (elNew) elNew.textContent = newCount;
  if (elProg) elProg.textContent = progressCount;
  if (elWon) elWon.textContent = wonCount;
  if (leadsBadge) leadsBadge.textContent = newCount;
}

window.updateLeadStatus = async function(idx, newStatus) {
  if (!currentLeads[idx]) return;
  currentLeads[idx].status = newStatus;
  currentLeads[idx].updatedAt = new Date().toISOString();
  await persistLeadsDatabase();
  renderLeads(currentLeads);
  showToast(\`Lead status updated to '\${newStatus}'\`, 'success');
};

window.saveLeadNotes = async function(idx) {
  const input = document.getElementById(\`notes_input_\${idx}\`);
  if (!input || !currentLeads[idx]) return;
  currentLeads[idx].notes = input.value.trim();
  currentLeads[idx].updatedAt = new Date().toISOString();
  await persistLeadsDatabase();
  showToast('CRM follow-up notes saved!', 'success');
};

window.deleteLead = async function(idx) {
  if (confirm('Delete this client inquiry permanently from database?')) {
    currentLeads.splice(idx, 1);
    await persistLeadsDatabase();
    renderLeads(currentLeads);
    updateOverviewStats();
    showToast('Lead deleted.', 'info');
  }
};

async function persistLeadsDatabase() {
  try {
    await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${authToken}\`
      },
      body: JSON.stringify(currentLeads)
    });
  } catch (e) {
    console.error('Failed to persist leads:', e);
    showToast('Failed to update leads database on server.', 'error');
  }
}

// Add Manual Lead Modal Handlers
window.openAddLeadModal = function() {
  const modal = document.getElementById('addLeadModal');
  if (modal) modal.classList.remove('hidden');
};

window.closeAddLeadModal = function() {
  const modal = document.getElementById('addLeadModal');
  if (modal) modal.classList.add('hidden');
};

// Search & Filter
function filterLeads() {
  const q = (document.getElementById('leadsSearchInput')?.value || '').toLowerCase().trim();
  const statusFilter = (document.getElementById('crmStatusFilter')?.value || 'all').toLowerCase();

  let filtered = currentLeads;

  if (statusFilter !== 'all') {
    filtered = filtered.filter(l => (l.status || 'new').toLowerCase() === statusFilter);
  }

  if (q) {
    filtered = filtered.filter(l => 
      (l.name && l.name.toLowerCase().includes(q)) ||
      (l.email && l.email.toLowerCase().includes(q)) ||
      (l.phone && l.phone.toLowerCase().includes(q)) ||
      (l.company && l.company.toLowerCase().includes(q)) ||
      (l.services && l.services.toLowerCase().includes(q)) ||
      (l.message && l.message.toLowerCase().includes(q)) ||
      (l.notes && l.notes.toLowerCase().includes(q))
    );
  }

  renderLeads(filtered);
}

// Export to Microsoft Excel-compatible CSV (With UTF-8 BOM)
function exportLeadsCsv() {
  if (!currentLeads || currentLeads.length === 0) {
    alert('No inquiries available to export.');
    return;
  }
  const headers = ['Date', 'Client Name', 'Company/Shop', 'Phone', 'Email', 'Package / Service Requested', 'Business Details', 'CRM Status', 'Admin Notes'];
  
  const rows = currentLeads.map(l => [
    \`"\${l.date || ''}"\`,
    \`"\${(l.name || '').replace(/"/g, '""')}"\`,
    \`"\${(l.company || '').replace(/"/g, '""')}"\`,
    \`"\${(l.phone || '').replace(/"/g, '""')}"\`,
    \`"\${(l.email || '').replace(/"/g, '""')}"\`,
    \`"\${(l.services || l.service || l.budget || '').replace(/"/g, '""')}"\`,
    \`"\${(l.message || '').replace(/"/g, '""')}"\`,
    \`"\${(l.status || 'new').replace(/"/g, '""')}"\`,
    \`"\${(l.notes || '').replace(/"/g, '""')}"\`
  ]);

  // Prepend UTF-8 BOM (\\uFEFF) so Excel natively recognizes Bengali & special characters
  const csvContent = '\\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\\r\\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', \`shakibur_leads_crm_\${new Date().toISOString().slice(0,10)}.csv\`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

// ==========================================
// 9. SEO HELPERS`;

if (oldLeadsJsRegex.test(adminJs)) {
  adminJs = adminJs.replace(oldLeadsJsRegex, newLeadsJs);
  console.log('Updated Leads CRM controller in admin.js');
}

// Add event listener for addLeadForm and crmStatusFilter in admin.js
if (!adminJs.includes("addLeadForm")) {
  adminJs = adminJs.replace(
    "const exportLeadsCsvBtn = document.getElementById('exportLeadsCsvBtn');",
    `const exportLeadsCsvBtn = document.getElementById('exportLeadsCsvBtn');
  const crmStatusFilter = document.getElementById('crmStatusFilter');
  if (crmStatusFilter) crmStatusFilter.addEventListener('change', filterLeads);

  const addLeadForm = document.getElementById('addLeadForm');
  if (addLeadForm) {
    addLeadForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const newLead = {
        id: 'lead_' + Date.now(),
        name: document.getElementById('manualLeadName').value.trim(),
        phone: document.getElementById('manualLeadPhone').value.trim(),
        email: document.getElementById('manualLeadEmail').value.trim(),
        services: document.getElementById('manualLeadService').value,
        message: document.getElementById('manualLeadMsg').value.trim(),
        source: 'Admin Manual Entry',
        status: 'new',
        notes: '',
        date: new Date().toISOString()
      };
      currentLeads.unshift(newLead);
      await persistLeadsDatabase();
      renderLeads(currentLeads);
      closeAddLeadModal();
      addLeadForm.reset();
      showToast('New lead added to CRM!', 'success');
    });
  }`
  );
}

fs.writeFileSync(adminJsPath, adminJs, 'utf8');
console.log('Saved admin.js successfully');
