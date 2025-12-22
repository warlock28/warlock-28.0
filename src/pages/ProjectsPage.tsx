import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import NetworkBackground from '@/components/NetworkBackground';
import Footer from '@/components/Footer';
import Projects from '@/components/Projects';
import { useStore } from '@/store/useStore';

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
          <section className="text-center px-4 py-8 space-y-3">
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-primary/70">
              Case Studies
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text">
              All Projects
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse client launches, experiments, and internal tools in one place.
            </p>
          </section>
          <Projects sectionId="projects" />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default ProjectsPage;
