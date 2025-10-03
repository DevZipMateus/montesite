
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/sections/HeroSection';
import ShowcaseSection from '@/components/sections/ShowcaseSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/Footer';
import { useHash } from '@/hooks/useHash';

const Index = () => {
  const { hash } = useHash();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    // Log hash status for debugging
    if (hash) {
      console.log('Page loaded with partner hash:', hash);
    }

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [hash]);

  const scrollToShowcase = (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.querySelector('#showcase');
    if (section) {
      window.scrollTo({
        top: section.getBoundingClientRect().top + window.scrollY - 60,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <HeroSection scrollToShowcase={scrollToShowcase} />
        <div id="showcase">
          <ShowcaseSection />
        </div>
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
