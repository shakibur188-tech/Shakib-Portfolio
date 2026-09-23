import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { getSiteContent } from '@/lib/content';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

export async function generateMetadata() {
  const content = getSiteContent();
  const seo = content?.seo || {};

  return {
    metadataBase: new URL('https://www.shakibur.info'),
    title: seo.pageTitle || 'Md. Shakibur Rahaman | Strategic Lead & Digital Architect',
    description: seo.metaDescription || 'Strategic Lead & Full-Stack Digital Architect engineering high-converting branding systems, modern web platforms, commercial media, and data-driven marketing.',
    keywords: seo.metaKeywords || 'Branding Strategy, Graphics Design, Web Design & Development, Social Media Marketing, Commercial Videography, Event Activation, Google Ads Specialist, SEO & AEO, PR Agency Bangladesh',
    authors: [{ name: 'Md. Shakibur Rahaman' }],
    openGraph: {
      title: seo.ogTitle || 'Md. Shakibur Rahaman | Strategic Lead & Digital Architect',
      description: seo.ogDescription || 'Forging distinctive brand identities, high-performing web platforms, cinematic visual productions, and omnichannel growth marketing engines.',
      type: 'website',
      images: [
        {
          url: '/assets/shakibur.jpg',
          width: 800,
          height: 800,
          alt: 'Md. Shakibur Rahaman',
        },
      ],
    },
    icons: {
      icon: '/assets/shakibur.jpg',
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth ${plusJakartaSans.variable}`}>
      <head>
        {/* FontAwesome 6.5.1 CDN */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body className="bg-[#F8F9F6] text-[#1C2B1B] font-sans antialiased selection:bg-[#70805D] selection:text-white relative overflow-x-hidden">
        {/* Animated Background Mesh */}
        <div className="ambient-mesh-glow" />
        {children}
      </body>
    </html>
  );
}
