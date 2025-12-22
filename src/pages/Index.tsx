
import { useEffect, lazy, Suspense, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import Navbar from '@/components/Navbar';
import NetworkBackground from '@/components/NetworkBackground';
import Hero from '@/components/Hero';

// Lazy load below-the-fold components
const About = lazy(() => import('@/components/About'));
const SkillsNew = lazy(() => import('@/components/SkillsNew'));
const Projects = lazy(() => import('@/components/Projects'));
const Certifications = lazy(() => import('@/components/Certifications'));
const Blog = lazy(() => import('@/components/Blog'));
const Contact = lazy(() => import('@/components/Contact'));
const Footer = lazy(() => import('@/components/Footer'));

// Loading fallback component
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
  </div>
);

const Index = () => {
  const { setActiveSection } = useStore();
  const location = useLocation<{ scrollTo?: string }>();
  const navigate = useNavigate();

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'certifications', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection]);

  useEffect(() => {
    if (location.state?.scrollTo) {
      scrollToSection(location.state.scrollTo);
      navigate('.', { replace: true, state: null });
    }
  }, [location, navigate, scrollToSection]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
      style={{ background: 'transparent' }}
    >
      <NetworkBackground />
      <Navbar />
      
      <main>
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <SkillsNew />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Projects
            variant="featured"
            featuredLimit={3}
            ctaHref="/projects"
            ctaLabel="Explore all projects"
          />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Certifications
            variant="featured"
            featuredLimit={3}
            ctaHref="/certifications"
            ctaLabel="See all certifications"
          />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Blog
            variant="featured"
            ctaHref="/blog"
            ctaLabel="Read the full blog"
          />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>
      
      <Suspense fallback={<div className="py-4"></div>}>
        <Footer />
      </Suspense>
    </motion.div>
  );
};

export default Index;
