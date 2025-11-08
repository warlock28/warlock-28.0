import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '@/data/portfolio';
import { X } from 'lucide-react';

interface SkillPopupProps {
  category: string;
  items: { name: string; level: number; icon: string }[];
  onClose: () => void;
}

const SkillPopup = ({ category, items, onClose }: SkillPopupProps) => {
  const popupVariants = {
    hidden: { 
      opacity: 0,
      y: -20,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1], // Custom cubic-bezier for smooth easing
        opacity: { duration: 0.3 },
        y: { duration: 0.4 },
        scale: { duration: 0.3 }
      }
    },
    exit: { 
      opacity: 0,
      y: -10,
      scale: 0.98,
      transition: {
        duration: 0.25,
        ease: [0.4, 0, 1, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -15, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        delay: i * 0.04,
        duration: 0.35,
        ease: [0.25, 0.46, 0.45, 0.94] // Smooth easing
      }
    })
  };

  return (
    <motion.div
      variants={popupVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="
        relative w-full mt-3 mb-2 overflow-hidden
        bg-[#0a192f]/98 backdrop-blur-xl 
        border border-[#00ff41]/40 
        rounded-xl p-4 sm:p-5 md:p-6 
        shadow-2xl shadow-[#00ff41]/20
        max-w-full
      "
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 p-1 rounded-lg hover:bg-white/10 transition-colors z-10"
        aria-label="Close skill details"
      >
        <X className="w-4 h-4 text-[#00ff41]" />
      </button>

      {/* Header */}
      <div className="mb-3 sm:mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
          {category}
        </h3>
        <div className="h-[2px] w-12 bg-gradient-to-r from-[#00ff41] to-transparent rounded-full" />
      </div>

      {/* Skills list */}
      <div className="space-y-2.5 sm:space-y-3">
        {items.map((skill, index) => (
          <motion.div
            key={skill.name}
            custom={index}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-base sm:text-lg">{skill.icon}</span>
                <span className="text-xs sm:text-sm font-medium text-white/90">
                  {skill.name}
                </span>
              </div>
              <span className="text-xs text-[#00ff41]/70 font-mono">
                {skill.level}%
              </span>
            </div>
            {/* Progress bar */}
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ 
                  delay: index * 0.04 + 0.25, 
                  duration: 1,
                  ease: [0.25, 0.46, 0.45, 0.94] // Smooth easing curve
                }}
                className="h-full bg-gradient-to-r from-[#00ff41] to-[#00ff41]/70 rounded-full relative shadow-sm shadow-[#00ff41]/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#00ff41]/5 via-transparent to-transparent rounded-xl blur-xl" />
    </motion.div>
  );
};

interface CategoryBoxProps {
  category: string;
  items: { name: string; level: number; icon: string }[];
  index: number;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave: () => void;
}

const CategoryBox = ({ category, items, index, isActive, onClick, onMouseEnter, onMouseLeave }: CategoryBoxProps) => {
  const boxVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Get a representative icon
  const mainIcon = items[0]?.icon || '💻';

  return (
    <motion.button
      variants={boxVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
      }}
      whileTap={{ scale: 0.98 }}
      animate={{
        scale: isActive ? 1.02 : 1,
        transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`
        group relative
        w-full
        bg-gradient-to-br from-[#0a192f]/80 to-[#001122]/80
        backdrop-blur-sm
        border-2 rounded-xl
        transition-all duration-300
        overflow-hidden
        py-6 px-4
        ${isActive 
          ? 'border-[#00ff41] shadow-lg shadow-[#00ff41]/30' 
          : 'border-[#00ff41]/20 hover:border-[#00ff41]/50 hover:shadow-lg hover:shadow-[#00ff41]/20'
        }
      `}
      aria-expanded={isActive}
      aria-label={`View ${category} skills`}
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00ff41]/0 via-[#00ff41]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-between gap-3">
        {/* Icon */}
        <div className="text-3xl sm:text-4xl transform group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
          {mainIcon}
        </div>
        
        <div className="flex-1 text-left">
          {/* Category name */}
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1">
            {category}
          </h3>
          
          {/* Skills count */}
          <div className="text-xs sm:text-sm text-[#00ff41]/70 font-mono">
            {items.length} {items.length === 1 ? 'skill' : 'skills'}
          </div>
        </div>

        {/* Arrow indicator */}
        <div className="text-[#00ff41]/50 group-hover:text-[#00ff41] transition-colors flex-shrink-0">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-12 sm:w-16 h-12 sm:h-16 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
        <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-[#00ff41] to-transparent" />
        <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-[#00ff41] to-transparent" />
      </div>
    </motion.button>
  );
};

const SkillsNew = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Desktop: Hover handlers
  const handleCategoryHover = (
    category: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    // Check if device supports hover (desktop)
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    if (!supportsHover || window.innerWidth < 768) return;
    
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    
    setActiveCategory(category);
    
    const rect = event.currentTarget.getBoundingClientRect();
    const scrollY = window.scrollY;
    const viewportWidth = window.innerWidth;
    const popupWidth = 350;
    
    // Position to the right if there's space, otherwise to the left
    const x = rect.right + 20 + popupWidth < viewportWidth 
      ? rect.right + 20 
      : rect.left - popupWidth - 20;
    
    // Add scroll offset to Y position
    const y = rect.top + scrollY;
    
    setPopupPosition({ x, y });
  };

  const handleCategoryLeave = () => {
    // Check if device supports hover (desktop)
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    if (!supportsHover || window.innerWidth < 768) return;
    
    // Delay closing to allow moving to popup
    closeTimeoutRef.current = setTimeout(() => {
      setActiveCategory(null);
    }, 100);
  };

  const handlePopupEnter = () => {
    // Clear close timeout when entering popup
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handlePopupLeave = () => {
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    if (!supportsHover || window.innerWidth < 768) return;
    setActiveCategory(null);
  };

  // Click handler - works on both mobile and desktop
  const handleCategoryClick = (
    category: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    
    // Toggle: close if same category, open if different
    if (activeCategory === category) {
      setActiveCategory(null);
      return;
    }

    setActiveCategory(category);
  };

  const activeSkillData = skills.find(s => s.category === activeCategory);

  return (
    <section id="skills" className="py-12 sm:py-16 lg:py-20 relative overflow-x-hidden overflow-y-visible">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-primary mx-auto mb-4 sm:mb-6 rounded-full" />
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            
          </p>
        </motion.div>

        {/* Category Grid */}
        <div className="max-w-6xl mx-auto mb-16 sm:mb-20 lg:mb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {skills.map((skill, index) => (
              <div key={skill.category} className="relative">
                <CategoryBox
                  category={skill.category}
                  items={skill.items}
                  index={index}
                  isActive={activeCategory === skill.category}
                  onClick={(e) => handleCategoryClick(skill.category, e)}
                  onMouseEnter={() => {}}
                  onMouseLeave={() => {}}
                />
                
                {/* Show popup below on both mobile and desktop */}
                {activeCategory === skill.category && activeSkillData && (
                  <AnimatePresence>
                    <SkillPopup
                      category={activeSkillData.category}
                      items={activeSkillData.items}
                      onClose={() => setActiveCategory(null)}
                    />
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technologies Marquee - Full Width */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="w-full"
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
    </section>
  );
};

export default SkillsNew;

function setPopupPosition(arg0: { x: number; y: number; }) {
  throw new Error('Function not implemented.');
}
