async function test() {
  const r = await fetch('https://medium-greatest-paragraph-hours.trycloudflare.com');
  const html = await r.text();
  console.log('Live HTTP status:', r.status);
  console.log('Includes Testimonials in desktop nav:', html.includes('desktop-nav-link">Testimonials'));
  console.log('Includes View Projects in hero:', html.includes('View Projects'));
  console.log('Includes 15 Web Projects in body:', html.includes('15 Web Projects'));

  const apiR = await fetch('https://medium-greatest-paragraph-hours.trycloudflare.com/api/content');
  const content = await apiR.json();
  console.log('Live API Menu labels:', (content.menu.items || []).map(i => i.label));
}
test().catch(console.error);
