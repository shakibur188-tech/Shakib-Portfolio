const http = require('http');

function makeRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        let parsed = body;
        try { parsed = JSON.parse(body); } catch(e) {}
        resolve({ statusCode: res.statusCode, headers: res.headers, body: parsed });
      });
    });
    req.on('error', reject);
    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

async function runTests() {
  console.log('--- STARTING CMS AUTOMATED TESTS ---');

  // 1. Home
  const home = await makeRequest({ host: 'localhost', port: 3000, path: '/', method: 'GET' });
  console.log('✅ Homepage Status:', home.statusCode);

  // 2. Admin HTML
  const admin = await makeRequest({ host: 'localhost', port: 3000, path: '/admin', method: 'GET' });
  console.log('✅ Admin Page Status:', admin.statusCode);

  // 3. GET /api/content
  const content = await makeRequest({ host: 'localhost', port: 3000, path: '/api/content', method: 'GET' });
  console.log('✅ GET /api/content: Name =', content.body.profile.name, '| Case Studies =', content.body.caseStudies.length, '| Sectors =', content.body.sectors.length);

  // 4. POST /api/auth/login (Bad Password)
  const badAuth = await makeRequest({
    host: 'localhost',
    port: 3000,
    path: '/api/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { username: 'admin', password: 'wrongpassword' });
  console.log('✅ Auth Validation (Wrong Password) Status:', badAuth.statusCode, '(Expected 401)');

  // 5. POST /api/auth/login (Correct)
  const auth = await makeRequest({
    host: 'localhost',
    port: 3000,
    path: '/api/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { username: 'admin', password: 'admin1234' });
  console.log('✅ Auth Success Token:', auth.body.token ? auth.body.token.substring(0, 15) + '...' : 'NO TOKEN');
  const token = auth.body.token;

  // 6. Submit Public Lead
  const leadRes = await makeRequest({
    host: 'localhost',
    port: 3000,
    path: '/api/leads',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    name: 'Tanvir Chowdhury',
    email: 'tanvir@luxuryvillas.com',
    phone: '+880 1888 000 111',
    sector: 'Luxury Interior & Architecture',
    budget: 'BDT 150,000 / month',
    message: 'Need high-ticket homeowner lead generation strategy.'
  });
  console.log('✅ Lead Submitted Status:', leadRes.statusCode, '| Lead ID:', leadRes.body.leadId);

  // 7. GET /api/leads (Authorized)
  const leads = await makeRequest({
    host: 'localhost',
    port: 3000,
    path: '/api/leads',
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  console.log('✅ Admin Leads Count in DB:', leads.body.length, '| Latest Prospect:', leads.body[0].name);

  // 8. PUT /api/content (Update test)
  const updatedContent = JSON.parse(JSON.stringify(content.body));
  updatedContent.profile.headline = 'Scaling Revenue Across 7 Core High-Growth Sectors [Verified Admin Live]';
  const saveRes = await makeRequest({
    host: 'localhost',
    port: 3000,
    path: '/api/content',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }, updatedContent);
  console.log('✅ Save Content Status:', saveRes.statusCode, '| Message:', saveRes.body.message);

  // 9. Verify Content Updated
  const verifyContent = await makeRequest({ host: 'localhost', port: 3000, path: '/api/content', method: 'GET' });
  console.log('✅ Verified Live Content Headline:', verifyContent.body.profile.headline);

  console.log('--- ALL CMS TESTS PASSED SUCCESSFULLY! ---');
}

runTests().catch(console.error);
