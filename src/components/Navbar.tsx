
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const { isDarkMode, toggleDarkMode, activeSection, isMenuOpen, toggleMenu } = useStore();
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#certifications', label: 'Certifications' },
    { href: '#blog', label: 'Blog' },
    { href: '#contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMenuOpen) toggleMenu();
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'glassmorphism shadow-xl border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl font-bold gradient-text cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => scrollToSection('#home')}
          >
            Nitin Kumar
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
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
                  className={`relative px-4 py-2 rounded-full transition-all duration-300 group overflow-hidden ${
                    activeSection === item.href.slice(1)
                      ? 'text-primary bg-primary/20 shadow-lg shadow-primary/20'
                      : 'text-foreground hover:text-primary hover:bg-primary/10'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                  {activeSection === item.href.slice(1) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary/10 rounded-full"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="rounded-full relative overflow-hidden group bg-muted/20 hover:bg-primary/20 transition-all duration-300"
              >
                <motion.div
                  animate={{ rotate: isDarkMode ? 180 : 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {isDarkMode ? (
                    <Sun className="h-5 w-5 text-primary" />
                  ) : (
                    <Moon className="h-5 w-5 text-primary" />
                  )}
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              </Button>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="md:hidden"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                className="rounded-full relative overflow-hidden group bg-muted/20 hover:bg-primary/20 transition-all duration-300"
              >
                <motion.div
                  animate={{ rotate: isMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6 text-primary" />
                  ) : (
                    <Menu className="h-6 w-6 text-primary" />
                  )}
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
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
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="md:hidden overflow-hidden border-t border-border/50"
        >
          <div className="px-2 pt-4 pb-6 space-y-2 bg-gradient-to-b from-transparent to-muted/10">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isMenuOpen ? 1 : 0,
                  x: isMenuOpen ? 0 : -20,
                }}
                transition={{ duration: 0.3, delay: isMenuOpen ? 0.1 * index : 0 }}
              >
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection(item.href)}
                  className={`w-full justify-start rounded-xl py-3 transition-all duration-300 group ${
                    activeSection === item.href.slice(1)
                      ? 'text-primary bg-primary/20 shadow-lg shadow-primary/10'
                      : 'text-foreground hover:text-primary hover:bg-primary/10'
                  }`}
                >
                  <span className="relative z-10 font-medium">{item.label}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
