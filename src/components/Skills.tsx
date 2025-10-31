
import { motion } from 'framer-motion';
import { skills } from '@/data/portfolio';
import { Progress } from '@/components/ui/progress';

const Skills = () => {
  return (
    <section id="skills" className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Mobile: Horizontal Scrolling Skills */}
        <div className="block sm:hidden mb-8">
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide px-4 pb-4">
            {skills.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="flex-shrink-0 w-[280px] skill-card"
              >
                <h3 className="text-lg font-bold mb-4 text-center gradient-text">
                  {category.category}
                </h3>
                <div className="space-y-3">
                  {category.items.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{skill.icon}</span>
                          <span className="font-medium text-sm">{skill.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress 
                        value={skill.level} 
                        className="h-1.5"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {skills.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="skill-card"
            >
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-center gradient-text">
                {category.category}
              </h3>
              <div className="space-y-4 sm:space-y-6">
                {category.items.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <span className="text-lg sm:text-xl lg:text-2xl">{skill.icon}</span>
                        <span className="font-medium text-sm sm:text-base">{skill.name}</span>
                      </div>
                      <span className="text-xs sm:text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress 
                      value={skill.level} 
                      className="h-1.5 sm:h-2"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Dynamic Scrolling Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 sm:mt-12 lg:mt-16"
        >
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-6 sm:mb-8 text-center px-4">
            Technologies I Love Working With
          </h3>
          
          {/* Mobile Optimized Marquee - Right to Left */}
          <div className="relative overflow-hidden">
            <div className="flex space-x-3 sm:space-x-4 lg:space-x-6 animate-marquee-smooth">
              {/* First set of technologies */}
              {skills.flatMap(category => category.items).map((skill, index) => (
                <div
                  key={`first-${skill.name}-${index}`}
                  className="flex-shrink-0 glassmorphism rounded-full px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-3 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 cursor-pointer group backdrop-blur-md"
                >
                  <span className="text-sm sm:text-base lg:text-lg mr-1.5 sm:mr-2 lg:mr-3 group-hover:scale-110 transition-transform duration-300">{skill.icon}</span>
                  <span className="text-xs sm:text-sm lg:text-base font-medium whitespace-nowrap">{skill.name}</span>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {skills.flatMap(category => category.items).map((skill, index) => (
                <div
                  key={`second-${skill.name}-${index}`}
                  className="flex-shrink-0 glassmorphism rounded-full px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-3 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 cursor-pointer group backdrop-blur-md"
                >
                  <span className="text-sm sm:text-base lg:text-lg mr-1.5 sm:mr-2 lg:mr-3 group-hover:scale-110 transition-transform duration-300">{skill.icon}</span>
                  <span className="text-xs sm:text-sm lg:text-base font-medium whitespace-nowrap">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reverse Direction Marquee - Left to Right */}
          <div className="relative overflow-hidden mt-3 sm:mt-4 lg:mt-6">
            <div className="flex space-x-3 sm:space-x-4 lg:space-x-6 animate-marquee-reverse-smooth">
              {/* First set of technologies */}
              {skills.flatMap(category => category.items).reverse().map((skill, index) => (
                <div
                  key={`reverse-first-${skill.name}-${index}`}
                  className="flex-shrink-0 glassmorphism rounded-full px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-3 border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:scale-105 cursor-pointer group backdrop-blur-md"
                >
                  <span className="text-sm sm:text-base lg:text-lg mr-1.5 sm:mr-2 lg:mr-3 group-hover:scale-110 transition-transform duration-300">{skill.icon}</span>
                  <span className="text-xs sm:text-sm lg:text-base font-medium whitespace-nowrap">{skill.name}</span>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {skills.flatMap(category => category.items).reverse().map((skill, index) => (
                <div
                  key={`reverse-second-${skill.name}-${index}`}
                  className="flex-shrink-0 glassmorphism rounded-full px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-3 border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:scale-105 cursor-pointer group backdrop-blur-md"
                >
                  <span className="text-sm sm:text-base lg:text-lg mr-1.5 sm:mr-2 lg:mr-3 group-hover:scale-110 transition-transform duration-300">{skill.icon}</span>
                  <span className="text-xs sm:text-sm lg:text-base font-medium whitespace-nowrap">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
