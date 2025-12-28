import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import NetworkBackground from '@/components/NetworkBackground';
import Footer from '@/components/Footer';
import Blog from '@/components/Blog';
import { useStore } from '@/store/useStore';

const BlogPage = () => {
  const { setActiveSection } = useStore();

  useEffect(() => {
    setActiveSection('blog');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [setActiveSection]);

  return (
    <div className="min-h-screen relative bg-background">
      <NetworkBackground />
      <div className="relative z-10">
        <Navbar />
        <main className="pt-24 sm:pt-28 pb-16">
          
          <Blog sectionId="blog" />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default BlogPage;
