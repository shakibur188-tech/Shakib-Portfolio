import React from 'react';
import Navbar from '@/components/Navbar';
import CaseStudyView from '@/components/CaseStudyView';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import { getSiteContent } from '@/lib/content';

export const metadata = {
  title: 'UX Case Study Breakdown | Md. Shakibur Rahaman',
  description: 'In-depth UX Case Study breakdown covering user research, problem framing, strategic solutions, project duration, and the 5-stage design process by Md. Shakibur Rahaman.',
};

export default function SingleCaseStudyPage() {
  const content = getSiteContent();

  return (
    <main className="min-h-screen">
      <Navbar profile={content?.profile} headerMenu={content?.menu} />
      <CaseStudyView />
      <Footer profile={content?.profile} />
      <WhatsAppWidget />
    </main>
  );
}
