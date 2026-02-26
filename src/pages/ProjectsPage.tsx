import { useEffect, lazy, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import NetworkBackground from '@/components/NetworkBackground';
import { useStore } from '@/store/useStore';
import { SectionLoader } from '@/components/ui/loading-spinner';

// Lazy-load shared components to avoid mixed static/dynamic import warnings
const Footer = lazy(() => import('@/components/Footer'));
const Projects = lazy(() => import('@/components/Projects'));

const ProjectsPage = () => {
  const { setActiveSection } = useStore();

  useEffect(() => {
    setActiveSection('projects');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [setActiveSection]);

  return (
    <div className="min-h-screen relative bg-background">
      <NetworkBackground />
      <div className="relative z-10">
        <Navbar />
        <main className="pt-24 sm:pt-28 pb-16">
          <Suspense fallback={<SectionLoader />}>
            <Projects sectionId="projects" />
          </Suspense>
        </main>
        <Suspense fallback={<div className="py-4" />}>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
};

export default ProjectsPage;
