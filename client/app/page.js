'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import Hero from './components/hero';
import Features from './components/features';
import HowItWorks from './components/how-it-works';
import Testimonials from './components/testimonials';
import Team from './components/team';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import FAQ from './components/faq';
import Stats from './components/stats';

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 scroll-smooth">
      <Header />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Team />
      <FAQ />
      <Footer />
    </div>
  );
}
