import dynamic from 'next/dynamic';
import Header from '../components/landing/Header';
import Hero from '../components/landing/Hero';
import Problem from '../components/landing/Problem';
import Features from '../components/landing/Features';
import CTA from '../components/landing/CTA';
import FAQ from '../components/landing/FAQ';
import Footer from '../components/landing/Footer';

export const metadata = {
  title: 'QuickLaunch - Create Beautiful Landing Pages in Minutes',
  description: 'Build professional landing pages quickly with our easy-to-use templates and customization tools.',
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Problem />
        <Features />
        <CTA />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
