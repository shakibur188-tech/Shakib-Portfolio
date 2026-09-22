const fs = require('fs');

const initialOffers = [
  {
    id: 'offer-ads-scaling',
    title: 'Full-Funnel Meta & Google Ads Scaling',
    category: 'ads',
    categoryLabel: 'Paid Ads & ROAS',
    badge: '🔥 Most Popular',
    timeline: '30-Day Sprint',
    description: 'Complete acquisition architecture across Facebook, Instagram, and Google Performance Max. Tested for rapid ROAS optimization.',
    price: '$499',
    originalPrice: '$850',
    period: '/ First Month Sprint',
    subtext: 'Includes Full Setup + Active Ad Management',
    deliverables: [
      'Meta Pixel & CAPI Server-side precision tracking',
      'Google Performance Max & High-intent Search funnels',
      '8 Custom Ad Creatives & high-converting copy angles',
      'Weekly Live ROAS Reports & Looker Studio dashboard',
      'FREE BONUS: Competitor Ad Intelligence Teardown'
    ],
    active: true
  },
  {
    id: 'offer-jamstack-web',
    title: 'Jamstack Web Architecture & SEO Engine',
    category: 'web',
    categoryLabel: 'Web & SEO',
    badge: '⚡ Turnkey Platform',
    timeline: '2-3 Weeks Build',
    description: 'Ultra-fast, mobile-first web platforms built for speed, SEO domination, and seamless conversion funnel routing.',
    price: '$799',
    originalPrice: '$1,400',
    period: '/ Milestone Build',
    subtext: '50% Upfront, 50% on Final Verified Handover',
    deliverables: [
      'Custom Responsive UI/UX crafted in Figma & HTML5/Tailwind',
      '100/100 Google Lighthouse speed & core web vitals',
      'Schema.org SEO/AEO semantic rich snippet markup',
      'Interactive Lead Capture & WhatsApp instant triggers',
      'FREE BONUS: 1-Year Hosting & SSL Configuration'
    ],
    active: true
  },
  {
    id: 'offer-brand-identity',
    title: 'Brand Visual Identity & Tier-1 PR Suite',
    category: 'brand',
    categoryLabel: 'Brand & PR',
    badge: '🏆 Brand Authority',
    timeline: '14-Day Delivery',
    description: 'Elevate your market perception. Full brand system design paired with executive press release syndication and media pitching.',
    price: '$650',
    originalPrice: '$1,100',
    period: '/ Complete Suite',
    subtext: 'Complete Vector Source Files + Media Kit',
    deliverables: [
      'Comprehensive Brand Book typography, palette & logo system',
      'Packaging / Pitch Deck print-ready vector templates',
      'Executive Press Release professionally drafted & vetted',
      'Media Outreach Strategy targeted to high-authority outlets',
      'FREE BONUS: 30 Editable Social Media Brand Templates'
    ],
    active: true
  },
  {
    id: 'offer-funnel-audit',
    title: '7-Day Conversion & Ad Spend Teardown Audit',
    category: 'ads',
    categoryLabel: 'Paid Ads & ROAS',
    badge: '⚡ Limited 4 Slots/Mo',
    timeline: '7-Day Sprint',
    description: 'Stop leaking marketing dollars. Identify wasted ad spend, tracking inaccuracies, and UX conversion bottlenecks with actionable fixes.',
    price: '$199',
    originalPrice: '$450',
    period: '/ One-Time Audit',
    subtext: '100% Value Guarantee or Free Re-Audit',
    deliverables: [
      'Full Ad Spend Review (Meta, Google, TikTok campaigns)',
      'Pixel & Analytics Audit finding attribution leakages',
      '20-Page Executive PDF with prioritized ROI recommendations',
      '45-Minute Zoom Debrief with Shakibur Directly',
      'SPECIAL PERK: Audit cost credited 100% toward any sprint'
    ],
    active: true
  },
  {
    id: 'offer-fractional-director',
    title: 'Fractional Marketing Director & Growth Partner',
    category: 'retainer',
    categoryLabel: 'Fractional Retainers',
    badge: '💼 Executive Level',
    timeline: 'Monthly Retainer',
    description: 'Dedicated senior strategic leadership for your marketing team without full-time executive overhead.',
    price: '$1,200',
    originalPrice: '',
    period: '/ Month',
    subtext: 'Direct Strategic Direction & Team Oversight',
    deliverables: [
      'Weekly Strategic Growth Sprints & prioritization roadmaps',
      'Ad Budget & Media Buying Supervision (Meta & Google)',
      'Creative Quality Control for design, video & copywriting',
      'Monthly C-Suite Board Briefings & KPI analytics',
      'VIP ACCESS: Direct WhatsApp & Slack async channel'
    ],
    active: true
  },
  {
    id: 'offer-hospitality-event',
    title: 'Hospitality & Experiential Event Activation',
    category: 'brand',
    categoryLabel: 'Brand & PR',
    badge: '🎪 High-Impact Launch',
    timeline: 'Event Campaign',
    description: 'Designed for luxury hotels, food festivals, corporate product reveals, and experiential brand takeovers.',
    price: '$850',
    originalPrice: '$1,500',
    period: '/ Campaign',
    subtext: 'Complete Concept-to-Execution Blueprint',
    deliverables: [
      'Event Theming & Spatial Branding floor plans & signage',
      'Influencer & Media VIP Outreach management',
      'Live Social Media Coverage real-time stories & broadcast',
      'Post-Event PR & Media Recap distribution',
      'FREE BONUS: Highlight Reel Video Direction Plan'
    ],
    active: true
  }
];

function updateFile(p) {
  if (!fs.existsSync(p)) return;
  const d = JSON.parse(fs.readFileSync(p, 'utf8'));
  d.offers = initialOffers;
  fs.writeFileSync(p, JSON.stringify(d, null, 2), 'utf8');
  console.log('Saved offers to', p);
}

updateFile('./data/content.json');
updateFile('./content.json');
