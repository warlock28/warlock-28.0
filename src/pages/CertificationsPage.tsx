import { useEffect, lazy, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import NetworkBackground from '@/components/NetworkBackground';
import { useStore } from '@/store/useStore';
import { SectionLoader } from '@/components/ui/loading-spinner';

// Lazy-load shared components to avoid mixed static/dynamic import warnings
const Footer = lazy(() => import('@/components/Footer'));
const Certifications = lazy(() => import('@/components/Certifications'));

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
          <Suspense fallback={<SectionLoader />}>
            <Certifications sectionId="certifications" />
          </Suspense>
        </main>
        <Suspense fallback={<div className="py-4" />}>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
};

export default CertificationsPage;
