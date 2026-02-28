import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Menu, X, Code2, SunMedium, Moon } from 'lucide-react';
import { BLOG_ENABLED } from '@/config/featureFlags';

const Navbar = () => {
  const { activeSection, isMenuOpen, isDarkMode, toggleMenu, toggleDarkMode, setActiveSection, setDarkMode } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const location = useLocation();

  // Smooth transform values for scroll animations
  const navbarPadding = useTransform(scrollY, [0, 100], ['1rem', '0.5rem']);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.92]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'services', label: 'Services' },
    { id: 'certifications', label: 'Certifications' },
    ...(BLOG_ENABLED ? [{ id: 'blog', label: 'Blog' }] : []),
    { id: 'contact', label: 'Contact' },
  ];

  const restingBackground = isDarkMode ? 'rgba(12, 0, 4, 0.9)' : 'rgba(255, 255, 255, 0.9)';
  const scrolledBackground = isDarkMode ? 'rgba(12, 0, 4, 0.96)' : 'rgba(255, 255, 255, 0.96)';
  const restingBorder = isDarkMode ? 'rgba(255, 142, 142, 0.2)' : 'rgba(15, 23, 42, 0.12)';
  const scrolledBorder = isDarkMode ? 'rgba(255, 111, 111, 0.35)' : 'rgba(15, 23, 42, 0.16)';
  const restingShadow = isDarkMode ? '0 10px 40px rgba(0, 0, 0, 0.6)' : '0 8px 28px rgba(15, 23, 42, 0.08)';
  const scrolledShadow = isDarkMode ? '0 22px 55px rgba(0, 0, 0, 0.65)' : '0 18px 45px rgba(15, 23, 42, 0.1)';
  const navButtonBase = isDarkMode
    ? 'text-white/85 hover:text-white'
    : 'text-foreground/80 hover:text-foreground';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedTheme = window.localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setDarkMode(true);
    } else if (storedTheme === 'light') {
      setDarkMode(false);
    } else {
      // Default to light mode instead of matching system preference
      setDarkMode(false);
    }
  }, [setDarkMode]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.classList.toggle('dark', isDarkMode);
    document.documentElement.style.setProperty('color-scheme', isDarkMode ? 'dark' : 'light');
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }
  }, [isDarkMode]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-close mobile menu when switching to desktop layout
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches && isMenuOpen) {
        toggleMenu();
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [isMenuOpen, toggleMenu]);

  const scrollToSection = (sectionId: string) => {
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

  const handleNavSelection = (sectionId: string) => {
    const performNavigation = () => {
      if (location.pathname !== '/') {
        navigate('/', { state: { scrollTo: sectionId } });
        setActiveSection(sectionId);
      } else {
        scrollToSection(sectionId);
      }
    };

    if (isMenuOpen) {
      toggleMenu();
      window.setTimeout(performNavigation, 240);
    } else {
      performNavigation();
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-[9999] px-3 sm:px-4 md:px-6"
      style={{ paddingTop: navbarPadding, paddingBottom: navbarPadding }}
    >
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-background/70 backdrop-blur-sm lg:hidden z-[9997]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>
      <motion.div
        className="relative max-w-7xl mx-auto rounded-2xl sm:rounded-3xl backdrop-blur-xl border z-[9999]"
        animate={{
          backgroundColor: scrolled ? scrolledBackground : restingBackground,
          borderColor: scrolled ? scrolledBorder : restingBorder
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          boxShadow: scrolled ? scrolledShadow : restingShadow
        }}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              style={{ scale: logoScale }}
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => handleNavSelection('home')}
            >
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30"
                style={{ transition: 'transform 0.2s ease-out' }}
              >
                <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span
                className="text-xl sm:text-2xl font-bold gradient-text"
              >
                Warlock
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.1 + (0.04 * index),
                    ease: "easeOut"
                  }}
                >
                  <Button
                    variant="ghost"
                    onClick={() => handleNavSelection(item.id)}
                    className={`relative px-4 py-2 rounded-xl transition-colors duration-200 group ${activeSection === item.id
                      ? 'text-primary font-semibold'
                      : `${navButtonBase} font-medium`
                      }`}
                  >
                    <span className="relative z-10 text-base lg:text-lg">{item.label}</span>

                    {/* Active Background with smooth animation */}
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary/15 rounded-xl"
                        transition={{
                          duration: 0.2,
                          ease: "easeOut"
                        }}
                      />
                    )}

                    {/* Smooth Bottom Indicator */}
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-1 left-2 right-2 h-0.5 bg-gradient-primary rounded-full"
                        transition={{
                          duration: 0.2,
                          ease: "easeOut"
                        }}
                      />
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleDarkMode}
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                className={`hidden sm:flex rounded-xl border ${isDarkMode ? 'border-border/40 bg-[#1b0204]' : 'border-border bg-card/80'} text-foreground hover:bg-primary/10`}
              >
                {isDarkMode ? <SunMedium className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                className={`sm:hidden rounded-xl border ${isDarkMode ? 'border-border/40 bg-[#1b0204]' : 'border-border bg-card/80'} text-foreground hover:bg-primary/10`}
              >
                {isDarkMode ? <SunMedium className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              {/* Mobile Menu Button */}
              <div
                className="lg:hidden"
              >
                <button
                  onClick={toggleMenu}
                  className="rounded-xl relative overflow-hidden w-10 h-10 sm:w-11 sm:h-11 bg-card/80 border border-border flex items-center justify-center"
                  style={{ transition: 'transform 0.2s ease-out' }}
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
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation with smooth AnimatePresence */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="lg:hidden overflow-hidden"
              >
                <div className="px-2 pt-3 pb-5 space-y-1.5 border-t border-slate-700/50 mt-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{
                        duration: 0.2,
                        delay: 0.025 * index,
                        ease: "easeOut"
                      }}
                    >
                      <button
                        onClick={() => handleNavSelection(item.id)}
                        className={`w-full text-left rounded-xl py-4 px-5 relative min-h-[52px] flex items-center border ${activeSection === item.id
                          ? 'text-primary bg-primary/15 font-semibold border-primary/20'
                          : 'text-foreground/80 hover:text-foreground hover:bg-slate-800/50 font-medium border-transparent'
                          }`}
                        style={{ transition: 'background-color 0.2s ease-out, color 0.2s ease-out, border-color 0.2s ease-out' }}
                      >
                        {/* Active Indicator */}
                        {activeSection === item.id && (
                          <motion.div
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-primary rounded-full"
                            layoutId="mobileActiveIndicator"
                            transition={{
                              duration: 0.2,
                              ease: "easeOut"
                            }}
                          />
                        )}
                        <span className="relative z-10 text-lg">{item.label}</span>
                      </button>
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
