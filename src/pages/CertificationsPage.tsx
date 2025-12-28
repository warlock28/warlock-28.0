import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import NetworkBackground from '@/components/NetworkBackground';
import Footer from '@/components/Footer';
import Certifications from '@/components/Certifications';
import { useStore } from '@/store/useStore';

const CertificationsPage = () => {
  const { setActiveSection } = useStore();

  useEffect(() => {
    setActiveSection('certifications');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [setActiveSection]);

  return (
    <div className="min-h-screen relative bg-background">
      <NetworkBackground />
      <div className="relative z-10">
        <Navbar />
        <main className="pt-24 sm:pt-28 pb-16">
          
          <Certifications sectionId="certifications" />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default CertificationsPage;
