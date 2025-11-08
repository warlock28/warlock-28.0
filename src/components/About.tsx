
import { motion } from 'framer-motion';
import { personalInfo, timeline } from '@/data/portfolio';
import { Button } from '@/components/ui/button';
import { Rocket, Handshake, Search, Lightbulb, MapPin } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20 px-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-primary mx-auto mb-4 sm:mb-6 rounded-full"></div>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Passionate developer crafting digital experiences with innovation and precision
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-8 sm:gap-12 items-start mb-16 sm:mb-20 lg:mb-24">
            {/* Profile Image Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="lg:col-span-2 relative order-2 lg:order-1"
            >
              <div className="relative max-w-sm sm:max-w-md mx-auto">
                {/* Main Image Container */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-2xl opacity-20 scale-105"></div>
                  <div className="relative glassmorphism rounded-3xl p-2 border-2 border-white/20">
                    <img
                      src={personalInfo.profileImage}
                      alt={personalInfo.name}
                      className="w-full aspect-square object-cover rounded-2xl shadow-2xl"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-2 rounded-2xl bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none"></div>
                  </div>
                </div>

                {/* Floating Stats - Better positioned for mobile */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="absolute left-4 sm:-left-4 top-1/2 transform -translate-y-1/2 glassmorphism rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20"
                >
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold gradient-text">3+</div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">Years</div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="absolute right-4 sm:-right-4 bottom-1/4 glassmorphism rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20"
                >
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold gradient-text">50+</div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">Projects</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* About Content Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-3 space-y-6 sm:space-y-8 order-1 lg:order-2"
            >
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                  Crafting Digital Excellence with{' '}
                  <span className="gradient-text">Passion & Precision</span>
                </h3>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    {personalInfo.bio}
                  </p>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    When I'm not coding, you can find me exploring cutting-edge technologies, 
                    contributing to open-source communities, and mentoring the next generation of developers. 
                    I believe in the power of continuous learning and innovation to shape the future.
                  </p>
                </div>
              </div>

              {/* Skills Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {[
                  { icon: Rocket, title: 'Innovation', desc: 'Cutting-edge tech adoption' },
                  { icon: Handshake, title: 'Collaboration', desc: 'Team-first mindset' },
                  { icon: Search, title: 'Problem Solving', desc: 'Analytical approach' },
                  { icon: Lightbulb, title: 'Creativity', desc: 'Unique solutions' }
                ].map((strength, index) => {
                  const IconComponent = strength.icon;
                  return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      y: -5,
                      transition: { type: "spring", stiffness: 400, damping: 17 }
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="glassmorphism rounded-lg sm:rounded-xl p-4 sm:p-6 text-center border border-white/10 hover:border-primary/30 transition-all duration-300 group cursor-pointer relative overflow-hidden"
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all duration-300" />
                    
                    <motion.div 
                      className="mb-2 sm:mb-3 relative z-10"
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    >
                      <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-primary drop-shadow-lg" />
                    </motion.div>
                    <h4 className="font-bold text-foreground mb-1 sm:mb-2 text-sm sm:text-base relative z-10">{strength.title}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed relative z-10">{strength.desc}</p>
                  </motion.div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6,
                  delay: 0.6,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="default"
                    className="w-full sm:w-auto bg-gradient-primary hover:opacity-90 border-0 shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
                    onClick={() => window.open(personalInfo.social.linkedin, '_blank')}
                  >
                    Connect on LinkedIn
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto glassmorphism hover:bg-primary/10 border-primary/30 hover:border-primary/50 transition-all duration-300"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Get in Touch
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="px-4"
        >
          <motion.h3 
            className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            My <span className="gradient-text">Journey</span>
          </motion.h3>
          <div className="relative">
            {/* Timeline Line with gradient animation */}
            <motion.div 
              className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-primary rounded-full"
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            />
            
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className={`relative flex items-center mb-8 sm:mb-12 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot with pulse effect */}
                <motion.div 
                  className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-6 sm:w-8 h-6 sm:h-8 bg-gradient-primary rounded-full border-3 sm:border-4 border-background z-10 flex items-center justify-center shadow-lg shadow-primary/50"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    delay: index * 0.1 + 0.2
                  }}
                  whileHover={{ scale: 1.2 }}
                >
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </motion.div>
                
                {/* Content with hover effect */}
                <motion.div 
                  className={`ml-12 sm:ml-16 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="glassmorphism rounded-lg p-4 sm:p-6 border border-white/10 hover:border-primary/30 transition-colors group cursor-pointer">
                    <div className="text-primary font-bold text-base sm:text-lg mb-1 sm:mb-2 group-hover:scale-105 transition-transform">{item.year}</div>
                    <h4 className="text-lg sm:text-xl font-semibold mb-1">{item.title}</h4>
                    <p className="text-primary/80 font-medium mb-1 sm:mb-2 text-sm sm:text-base">{item.company}</p>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
