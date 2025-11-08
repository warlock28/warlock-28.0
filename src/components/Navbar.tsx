import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Menu, X, Code2 } from 'lucide-react';

const Navbar = () => {
  const { activeSection, isMenuOpen, toggleMenu } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  // Smooth transform values for scroll animations
  const navbarPadding = useTransform(scrollY, [0, 100], ['1rem', '0.5rem']);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.92]);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#certifications', label: 'Certifications' },
    { href: '#blog', label: 'Blog' },
    { href: '#contact', label: 'Contact' },
  ];

  // Initialize dark mode and scroll detection
  useEffect(() => {
    document.documentElement.classList.add('dark');
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const closeMenuAndScroll = () => {
      const sectionId = href.replace('#', '');
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
    };
    
    if (isMenuOpen) {
      toggleMenu();
      setTimeout(closeMenuAndScroll, 300);
    } else {
      closeMenuAndScroll();
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-[9999] px-3 sm:px-4 md:px-6"
      style={{ paddingTop: navbarPadding, paddingBottom: navbarPadding }}
    >
      <motion.div 
        className="max-w-7xl mx-auto rounded-2xl sm:rounded-3xl backdrop-blur-xl border"
        animate={{
          backgroundColor: scrolled ? 'rgba(15, 23, 42, 0.85)' : 'rgba(15, 23, 42, 0.65)',
          borderColor: scrolled ? 'rgba(100, 116, 139, 0.5)' : 'rgba(100, 116, 139, 0.3)'
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        style={{
          boxShadow: scrolled 
            ? '0 10px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
            : '0 4px 20px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.08) inset'
        }}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ scale: logoScale }}
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => scrollToSection('#home')}
            >
              <motion.div 
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </motion.div>
              <motion.span 
                className="text-xl sm:text-2xl font-bold gradient-text"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                Warlock
              </motion.span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.1 + (0.05 * index),
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <Button
                    variant="ghost"
                    onClick={() => scrollToSection(item.href)}
                    className={`relative px-4 py-2 rounded-xl transition-colors duration-200 group ${
                      activeSection === item.href.slice(1)
                        ? 'text-primary font-semibold'
                        : 'text-foreground/80 hover:text-foreground font-medium'
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    
                    {/* Active Background with smooth animation */}
                    {activeSection === item.href.slice(1) && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary/15 rounded-xl"
                        transition={{ 
                          type: 'spring', 
                          stiffness: 380, 
                          damping: 30 
                        }}
                      />
                    )}
                    
                    {/* Smooth Bottom Indicator */}
                    {activeSection === item.href.slice(1) && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-1 left-2 right-2 h-0.5 bg-gradient-primary rounded-full"
                        transition={{ 
                          type: 'spring', 
                          stiffness: 380, 
                          damping: 30 
                        }}
                      />
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Right Section - Mobile Menu Only */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile Menu Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="lg:hidden"
              >
                <motion.button
                  onClick={toggleMenu}
                  className="rounded-xl relative overflow-hidden w-10 h-10 sm:w-11 sm:h-11 bg-slate-800/50 border border-slate-700/50 flex items-center justify-center"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(0, 255, 65, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isMenuOpen ? 'close' : 'menu'}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isMenuOpen ? (
                        <X className="h-6 w-6 text-primary" />
                      ) : (
                        <Menu className="h-6 w-6 text-primary" />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Mobile Navigation with smooth AnimatePresence */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="lg:hidden overflow-hidden"
              >
                <div className="px-2 pt-3 pb-5 space-y-1.5 border-t border-slate-700/50 mt-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ 
                        duration: 0.2, 
                        delay: 0.03 * index,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                    >
                      <motion.button
                        onClick={() => scrollToSection(item.href)}
                        className={`w-full text-left rounded-xl py-4 px-5 relative min-h-[52px] flex items-center border transition-colors duration-200 ${
                          activeSection === item.href.slice(1)
                            ? 'text-primary bg-primary/15 font-semibold border-primary/20'
                            : 'text-foreground/80 hover:text-foreground hover:bg-slate-800/50 font-medium border-transparent'
                        }`}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      >
                        {/* Active Indicator */}
                        {activeSection === item.href.slice(1) && (
                          <motion.div
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-primary rounded-full"
                            layoutId="mobileActiveIndicator"
                            transition={{ 
                              type: 'spring', 
                              stiffness: 380, 
                              damping: 30 
                            }}
                          />
                        )}
                        <span className="relative z-10 text-base">{item.label}</span>
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
