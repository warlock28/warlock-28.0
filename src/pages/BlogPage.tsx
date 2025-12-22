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
          <section className="text-center px-4 py-8 space-y-3">
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-primary/70">
              Journal
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text">
              Blog Library
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Long-form write-ups, tactical guides, and security insights across the stack.
            </p>
          </section>
          <Blog sectionId="blog" />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default BlogPage;
