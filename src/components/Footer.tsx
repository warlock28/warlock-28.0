
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
    <footer className="relative overflow-hidden pb-4 px-2.5">
      {/* Floating glassmorphism container - matches Navbar */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto rounded-2xl glassmorphism border border-white/10 shadow-2xl"
        style={{
          boxShadow: '0 8px 32px rgba(0, 255, 65, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.08) inset'
        }}
      >
        <div className="py-12 sm:py-16 lg:py-20">
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
                  Warlock
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
            
           
            {/* Contact Info */}
           
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
              <span></span>
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
                
              </motion.span>
              <span></span>
            </div>
          </motion.div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
