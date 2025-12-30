
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Button } from '@/components/ui/button';
import { personalInfo } from '@/data/portfolio';
import { Github, Linkedin, Twitter, Mail, ChevronDown } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadResume = () => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = personalInfo.resumeUrl;
    link.download = 'Nitin_Kumar_Resume.pdf';
    link.click();
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Subtle accent blobs */}
      <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-32 sm:w-48 md:w-72 h-32 sm:h-48 md:h-72 bg-primary/5 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-10 w-32 sm:w-48 md:w-72 h-32 sm:h-48 md:h-72 bg-accent/5 rounded-full filter blur-3xl opacity-30"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              Hi, I'm{' '}
              <span className="gradient-text">{personalInfo.name}</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 h-12 sm:h-16 flex items-center justify-center px-4"
          >
            <TypeAnimation
              sequence={[
                'Full Stack Developer',
                2000,
                'Cybersecurity Enthusiast',
                2000,
                'Problem Solver',
                2000,
                'Code Craftsman',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto px-4 leading-relaxed"
          >
            {personalInfo.bio}
          </motion.p>

          <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
                >
                <Button
                  size="lg"
                  onClick={() => scrollToSection('contact')}
                  className="w-full sm:w-auto bg-gradient-primary hover:bg-gradient-primary/90 text-white px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-semibold transition-all duration-200 hover:shadow-lg"
                  style={{ transition: 'box-shadow 0.2s ease-out' }}
                >
                  Let's Talk
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.open(personalInfo.resumeUrl, '_blank')}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-semibold transition-all duration-200 hover:shadow-lg glassmorphism"
                  style={{ transition: 'box-shadow 0.2s ease-out' }}
                >
                  Download Resume
                </Button>
                </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            className="flex justify-center space-x-4 sm:space-x-6 mt-8 sm:mt-12 px-4"
          >
            {Object.entries(personalInfo.social).map(([platform, url]) => {
              const IconComponent = platform === 'github' ? Github : 
                                  platform === 'linkedin' ? Linkedin : 
                                  platform === 'twitter' ? Twitter : Mail;
              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glassmorphism flex items-center justify-center hover:text-primary transition-all duration-200"
                  style={{ transition: 'transform 0.2s ease-out, color 0.2s ease-out' }}
                >
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:flex"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-primary"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
