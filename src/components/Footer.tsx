
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useProfile } from '@/hooks/useProfile';
import { Github, Linkedin, Twitter, Mail, Instagram, LayoutDashboard } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { profile } = useProfile();
  const name = profile?.name ?? '';
  const socialLinks = [
    { platform: 'github', url: profile?.github_url, Icon: Github },
    { platform: 'linkedin', url: profile?.linkedin_url, Icon: Linkedin },
    { platform: 'twitter', url: profile?.twitter_url, Icon: Twitter },
    { platform: 'instagram', url: profile?.instagram_url, Icon: Instagram },
    { platform: 'email', url: profile?.email ? `mailto:${profile.email}` : undefined, Icon: Mail },
  ].filter(s => Boolean(s.url));

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

                  {/* Social Links - matching Hero section style */}
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    {socialLinks.map(({ platform, url, Icon }) => (
                      <a
                        key={platform}
                        href={url}
                        target={platform === 'email' ? '_self' : '_blank'}
                        rel="noopener noreferrer"
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glassmorphism flex items-center justify-center hover:text-primary"
                        style={{ transition: 'color 0.2s ease-out' }}
                      >
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </a>
                    ))}
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
              <div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground text-center sm:text-left order-2 sm:order-1">
                <p>© {currentYear} {name}. All rights reserved.</p>
                <Link
                  to="/admin"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground/40 hover:text-primary hover:bg-primary/10 transition-all duration-300"
                  title="Admin Dashboard"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                </Link>
              </div>
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
