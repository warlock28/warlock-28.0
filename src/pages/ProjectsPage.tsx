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
        
          <Projects sectionId="projects" />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default ProjectsPage;
