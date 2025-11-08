import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Menu, X, Code2 } from 'lucide-react';


const Navbar = () => {
  const { activeSection, isMenuOpen, toggleMenu } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  // Transform values for scroll animations
  const navbarPadding = useTransform(scrollY, [0, 100], ['1rem', '0.5rem']);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#certifications', label: 'Certifications' },
    { href: '#blog', label: 'Blog' },
    { href: '#contact', label: 'Contact' },
  ];

  // Force dark mode on mount
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    if (isMenuOpen) {
      toggleMenu();
    }
    
    setTimeout(() => {
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
    }, isMenuOpen ? 150 : 0);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-[9999] px-3 sm:px-4 md:px-6"
      style={{ paddingTop: navbarPadding, paddingBottom: navbarPadding }}
    >
      <div 
        className={`max-w-7xl mx-auto rounded-2xl sm:rounded-3xl transition-all duration-500 backdrop-blur-xl ${
          scrolled 
            ? 'bg-slate-900/80 shadow-2xl border border-slate-700/50' 
            : 'bg-slate-900/60 border border-slate-700/30 shadow-lg'
        }`}
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
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ scale: logoScale }}
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => scrollToSection('#home')}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/30">
                <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold gradient-text group-hover:scale-105 transition-transform duration-300">
                Warlock
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <Button
                    variant="ghost"
                    onClick={() => scrollToSection(item.href)}
                    className={`relative px-4 py-2 rounded-xl transition-all duration-300 group ${
                      activeSection === item.href.slice(1)
                        ? 'text-primary font-semibold'
                        : 'text-foreground/80 hover:text-foreground font-medium'
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    
                    {/* Active Background */}
                    {activeSection === item.href.slice(1) && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary/15 rounded-xl"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    
                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                    
                    {/* Bottom Indicator */}
                    {activeSection === item.href.slice(1) && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-1 left-2 right-2 h-0.5 bg-gradient-primary rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
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
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="lg:hidden"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMenu}
                  className="rounded-xl relative overflow-hidden group w-10 h-10 sm:w-11 sm:h-11 bg-slate-800/50 hover:bg-primary/20 border border-transparent hover:border-primary/30 transition-all duration-300"
                >
                  <motion.div
                    animate={{ rotate: isMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isMenuOpen ? (
                      <X className="h-6 w-6 text-primary" />
                    ) : (
                      <Menu className="h-6 w-6 text-primary" />
                    )}
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <motion.div
            initial={false}
            animate={{
              height: isMenuOpen ? 'auto' : 0,
              opacity: isMenuOpen ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden"
            style={{ pointerEvents: isMenuOpen ? 'auto' : 'none' }}
          >
            <div className="px-2 pt-3 pb-5 space-y-1.5 border-t border-slate-700/50 mt-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: isMenuOpen ? 1 : 0,
                    x: isMenuOpen ? 0 : -20,
                  }}
                  transition={{ 
                    duration: 0.3, 
                    delay: isMenuOpen ? 0.05 * index : 0,
                    ease: "easeOut"
                  }}
                >
                  <Button
                    variant="ghost"
                    onClick={() => scrollToSection(item.href)}
                    className={`w-full justify-start rounded-xl py-4 px-5 transition-all duration-300 group relative min-h-[52px] ${
                      activeSection === item.href.slice(1)
                        ? 'text-primary bg-primary/15 font-semibold border border-primary/20'
                        : 'text-foreground/80 hover:text-foreground hover:bg-slate-800/50 font-medium border border-transparent'
                    }`}
                  >
                    <span className="relative z-10 text-base">{item.label}</span>
                    
                    {/* Active Indicator for Mobile */}
                    {activeSection === item.href.slice(1) && (
                      <motion.div
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-primary rounded-full"
                        layoutId="mobileActiveIndicator"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl -z-10" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
