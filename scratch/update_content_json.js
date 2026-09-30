const fs = require('fs');
const path = require('path');

const contentPath = path.join(__dirname, '../data/content.json');
const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));

content.webProjects = [
  {
    id: "proj-1",
    title: "ASAP Interior Solutions - Commercial & Residential Interior Flagship",
    client: "ASAP Solutions Limited",
    category: "Architecture & Interior",
    liveUrl: "https://interior.asapsl.com",
    previewImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "REST Booking API"],
    highlights: "Corporate interior architecture portal with interactive 3D spatial galleries, quotation calculator, and automated consultation scheduling.",
    metrics: "+310% Inbound Inquiries",
    ctaText: "Visit Live Website ↗"
  },
  {
    id: "proj-2",
    title: "Luxora Furniture - Bespoke Luxury Furniture D2C E-Store",
    client: "Luxora Luxury Furnishings",
    category: "E-Commerce & Retail",
    liveUrl: "https://luxorafurniture.com",
    previewImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    techStack: ["Shopify Headless", "Tailwind CSS", "Custom Variant Engine", "Stripe"],
    highlights: "Luxury headless e-commerce store with dynamic product finish selectors, room visualization guides, and accelerated 1-click checkout.",
    metrics: "+45% Conversion Lift",
    ctaText: "Visit Live Website ↗"
  },
  {
    id: "proj-3",
    title: "UDC (Unity Design Consultancy) - Architectural Design Hub",
    client: "Unity Design Consultancy",
    category: "Architecture & Interior",
    liveUrl: "https://interior3.shakibur.info",
    previewImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    techStack: ["Next.js 14", "Tailwind CSS", "Blueprint Viewer", "Node.js"],
    highlights: "Architectural consultancy platform with interactive blueprint case studies, client testimonial carousels, and multi-step RFP intake flow.",
    metrics: "99/100 PageSpeed",
    ctaText: "Visit Live Website ↗"
  },
  {
    id: "proj-4",
    title: "Gram Banglar Poth e Poth e - Cultural Documentary Publication",
    client: "Gram Banglar Poth e Poth e Media",
    category: "Media & Publications",
    liveUrl: "https://news.shakibur.info",
    previewImage: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80",
    techStack: ["Next.js", "Tailwind CSS", "Headless CMS", "Cloudflare CDN"],
    highlights: "High-traffic digital news publication with lightning-fast AMP reader experience, documentary archives, and newsletter dispatch.",
    metrics: "0.5s Reader TTFB",
    ctaText: "Visit Live Website ↗"
  },
  {
    id: "proj-5",
    title: "Hotel Booking Platform - 5-Star Direct Reservation Engine",
    client: "Shakib Hospitality Flagship",
    category: "Hospitality & Booking",
    liveUrl: "https://hotel.shakibur.info",
    previewImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    techStack: ["Next.js 14", "Tailwind CSS", "Availability Engine API", "Stripe"],
    highlights: "Ultra-modern direct luxury booking engine with real-time date room availability, dining package add-ons, and instant SMS ticketing.",
    metrics: "+340% Direct Bookings",
    ctaText: "Visit Live Website ↗"
  }
];

fs.writeFileSync(contentPath, JSON.stringify(content, null, 2), 'utf8');
console.log('content.json webProjects updated!');
