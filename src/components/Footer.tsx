
import { motion } from 'framer-motion';
import { personalInfo } from '@/data/portfolio';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background to-background/80 backdrop-blur-xl"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
      
      {/* Main Content */}
      <div className="relative z-10 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 lg:mb-16">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text">
                  Nitin.dev
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md">
                  Full Stack Developer & Cybersecurity Enthusiast crafting innovative digital solutions 
                  with modern technologies and security-first approach.
                </p>
                
                {/* Social Links with modern design */}
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {Object.entries(personalInfo.social).map(([platform, url]) => {
                    const IconComponent = platform === 'github' ? Github : 
                                        platform === 'linkedin' ? Linkedin : 
                                        platform === 'twitter' ? Twitter : Mail;
                    return (
                      <motion.a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border border-border/50 flex items-center justify-center hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                      >
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-primary/5 transition-all duration-300"></div>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4 sm:space-y-6"
            >
              <h4 className="text-lg sm:text-xl font-semibold text-foreground">Navigation</h4>
              <nav className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.button
                    key={link.label}
                    onClick={() => scrollToSection(link.href)}
                    whileHover={{ x: 4 }}
                    className="group block text-left text-muted-foreground hover:text-primary transition-all duration-300 text-sm sm:text-base"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/50 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </motion.button>
                ))}
              </nav>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 sm:space-y-6"
            >
              <h4 className="text-lg sm:text-xl font-semibold text-foreground">Contact</h4>
              <div className="space-y-3">
                <motion.div 
                  className="group"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-sm sm:text-base text-muted-foreground group-hover:text-primary transition-colors duration-300 break-words">
                    {personalInfo.email}
                  </p>
                </motion.div>
                <motion.div 
                  className="group"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-sm sm:text-base text-muted-foreground group-hover:text-primary transition-colors duration-300">
                    {personalInfo.phone}
                  </p>
                </motion.div>
                <motion.div 
                  className="group"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-sm sm:text-base text-muted-foreground group-hover:text-primary transition-colors duration-300">
                    {personalInfo.location}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8 sm:mb-12"
          ></motion.div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6"
          >
            <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left order-2 sm:order-1">
              © {currentYear} {personalInfo.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground order-1 sm:order-2">
              <span>Built with</span>
              <motion.span
                animate={{ 
                  scale: [1, 1.2, 1],
                  color: ['hsl(var(--muted-foreground))', 'hsl(var(--primary))', 'hsl(var(--muted-foreground))']
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
                className="text-red-500"
              >
                ❤️
              </motion.span>
              <span>using React & TypeScript</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modern background elements */}
      <div className="absolute top-0 right-0 w-48 sm:w-64 lg:w-80 h-48 sm:h-64 lg:h-80 bg-gradient-to-bl from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-48 sm:w-64 lg:w-80 h-48 sm:h-64 lg:h-80 bg-gradient-to-tr from-secondary/10 via-accent/5 to-transparent rounded-full blur-3xl opacity-60"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-gradient-radial from-primary/5 to-transparent rounded-full blur-2xl"></div>
    </footer>
  );
};

export default Footer;
