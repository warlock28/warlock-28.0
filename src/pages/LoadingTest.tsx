/**
 * Loading Test Page
 * This page is for development/testing purposes only
 * Displays all loading spinner variants for visual verification
 */

import { useState } from 'react';
import { LoadingSpinner, SectionLoader, ButtonLoader } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import NetworkBackground from '@/components/NetworkBackground';

const LoadingTest = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  return (
    <div className="min-h-screen relative bg-background">
      <NetworkBackground />
      <div className="relative z-10">
        <Navbar />
        
        <main className="container mx-auto px-4 pt-32 pb-20">
          <h1 className="text-4xl font-bold mb-8 gradient-text text-center">
            Loading Spinner Test Page
          </h1>
          
          <div className="space-y-12 max-w-4xl mx-auto">
            
            {/* Small Spinner */}
            <section className="glassmorphism rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Small Spinner (sm)</h2>
              <p className="text-muted-foreground mb-6">
                Used for inline/button loading states. Size: 16x16px, Border: 2px
              </p>
              <div className="flex items-center gap-4">
                <LoadingSpinner size="sm" />
                <span className="text-sm">Loading...</span>
              </div>
            </section>

            {/* Medium Spinner */}
            <section className="glassmorphism rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Medium Spinner (md)</h2>
              <p className="text-muted-foreground mb-6">
                Default size for sections and modals. Size: 48x48px, Border: 4px
              </p>
              <div className="flex justify-center">
                <LoadingSpinner size="md" />
              </div>
            </section>

            {/* Large Spinner */}
            <section className="glassmorphism rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Large Spinner (lg)</h2>
              <p className="text-muted-foreground mb-6">
                Used for full-page loading states. Size: 64x64px, Border: 4px
              </p>
              <div className="flex justify-center">
                <LoadingSpinner size="lg" />
              </div>
            </section>

            {/* SectionLoader */}
            <section className="glassmorphism rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">SectionLoader Component</h2>
              <p className="text-muted-foreground mb-6">
                Pre-configured for Suspense fallbacks with centered layout and padding
              </p>
              <div className="border border-border/40 rounded-xl overflow-hidden">
                <SectionLoader />
              </div>
            </section>

            {/* ButtonLoader */}
            <section className="glassmorphism rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">ButtonLoader Component</h2>
              <p className="text-muted-foreground mb-6">
                Pre-configured for button loading states with proper spacing
              </p>
              <div className="space-y-4">
                <Button
                  onClick={handleButtonClick}
                  disabled={isLoading}
                  className="bg-gradient-primary hover:bg-gradient-primary/90"
                >
                  {isLoading ? (
                    <>
                      <ButtonLoader />
                      Processing...
                    </>
                  ) : (
                    'Click to Test'
                  )}
                </Button>
                <p className="text-sm text-muted-foreground">
                  {isLoading ? 'Loading for 3 seconds...' : 'Click the button to see ButtonLoader in action'}
                </p>
              </div>
            </section>

            {/* Color Variants */}
            <section className="glassmorphism rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Custom Styling</h2>
              <p className="text-muted-foreground mb-6">
                Spinners can be customized with className prop
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <LoadingSpinner size="md" />
                  <p className="text-sm mt-2">Default</p>
                </div>
                <div className="text-center">
                  <LoadingSpinner size="md" className="opacity-50" />
                  <p className="text-sm mt-2">50% Opacity</p>
                </div>
                <div className="text-center">
                  <LoadingSpinner size="md" className="border-accent/30 border-t-accent" />
                  <p className="text-sm mt-2">Accent Color</p>
                </div>
                <div className="text-center">
                  <LoadingSpinner size="md" className="border-destructive/30 border-t-destructive" />
                  <p className="text-sm mt-2">Destructive</p>
                </div>
              </div>
            </section>

            {/* Animation Speed Comparison */}
            <section className="glassmorphism rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Animation Consistency</h2>
              <p className="text-muted-foreground mb-6">
                All spinners rotate at the same speed (0.8s per rotation)
              </p>
              <div className="flex justify-around items-center">
                <div className="text-center">
                  <LoadingSpinner size="sm" />
                  <p className="text-xs mt-2">Small</p>
                </div>
                <div className="text-center">
                  <LoadingSpinner size="md" />
                  <p className="text-xs mt-2">Medium</p>
                </div>
                <div className="text-center">
                  <LoadingSpinner size="lg" />
                  <p className="text-xs mt-2">Large</p>
                </div>
              </div>
            </section>

            {/* Accessibility Info */}
            <section className="glassmorphism rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Accessibility Features</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>✅ <code>role="status"</code> attribute for screen readers</li>
                <li>✅ <code>aria-label="Loading"</code> for context</li>
                <li>✅ Hidden text: <code>&lt;span className="sr-only"&gt;Loading...&lt;/span&gt;</code></li>
                <li>✅ Respects prefers-reduced-motion (Tailwind's animate-spin)</li>
              </ul>
            </section>

            {/* Documentation Link */}
            <section className="glassmorphism rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Documentation</h2>
              <p className="text-muted-foreground mb-6">
                For complete usage guidelines and best practices, see:
              </p>
              <code className="px-4 py-2 bg-muted rounded-lg inline-block">
                docs/LOADING_STANDARDS.md
              </code>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
};

export default LoadingTest;
