
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects, getFeaturedProjects } from '@/data/projects';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Star, Calendar, Code2 } from 'lucide-react';
type ProjectsVariant = 'full' | 'featured';

interface ProjectsProps {
  variant?: ProjectsVariant;
  featuredLimit?: number;
  ctaHref?: string;
  ctaLabel?: string;
  sectionId?: string;
}

const Projects = ({
  variant = 'full',
  featuredLimit = 3,
  ctaHref = '/projects',
  ctaLabel = 'View all projects',
  sectionId = 'projects',
}: ProjectsProps) => {
  const { projectFilter, setProjectFilter } = useStore();
  const isFeaturedVariant = variant === 'featured';

  const categories = ['all', 'fullstack', 'frontend', 'backend', 'security', 'mobile'];
  const featuredProjects = getFeaturedProjects().slice(0, featuredLimit);
  const filteredProjects = projectFilter === 'all'
    ? projects
    : projects.filter(project => project.category === projectFilter);
  const displayProjects = isFeaturedVariant ? featuredProjects : filteredProjects;

  return (
    <section id={sectionId} className="py-14 sm:py-16 lg:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {isFeaturedVariant ? 'Featured' : 'My'} <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            {isFeaturedVariant
              ? 'A curated selection of highlighted builds currently showcased on the homepage'
              : 'A showcase of my recent work and side projects'}
          </p>
        </div>

        {/* Filter Buttons */}
        {!isFeaturedVariant && (
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 px-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={projectFilter === category ? "default" : "outline"}
                onClick={() => setProjectFilter(category)}
                size="sm"
                className={`capitalize text-xs sm:text-sm ${projectFilter === category
                    ? 'bg-gradient-primary text-white'
                    : 'glassmorphism hover:bg-primary/10'
                  }`}
              >
                {category}
              </Button>
            ))}
          </div>
        )}

        {/* Projects - Mobile Certificate Style & Desktop Grid */}
        <div className="px-4">
          {/* Mobile: Horizontal Scrollable */}
          <div className="md:hidden">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
              {displayProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex-shrink-0 w-[85vw] sm:w-[70vw] snap-center card-shell group"
                >
                  {/* Certificate Header */}
                  <div className="rounded-t-2xl px-6 py-4 border-b border-border/40 bg-card/90">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Code2 className="w-5 h-5 text-primary" />
                        <span className="text-sm font-semibold text-primary">PROJECT CERTIFICATE</span>
                      </div>
                      {project.featured && (
                        <Badge className="bg-gradient-secondary text-white px-2 py-1 text-xs">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-center gradient-text mb-2">{project.title}</h3>
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>Completed Project</span>
                    </div>
                  </div>

                  {/* Certificate Body */}
                  <div className="glassmorphism rounded-b-2xl p-6">
                    {/* Project Image */}
                    <div className="relative mb-4 overflow-hidden rounded-lg bg-muted">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-32 object-cover"
                      />
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 text-center italic">
                      "{project.description}"
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4 justify-center">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(project.demoUrl, '_blank')}
                        className="flex-1 text-xs hover:bg-primary/10"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Demo
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(project.githubUrl, '_blank')}
                        className="flex-1 text-xs hover:bg-primary/10"
                      >
                        <Github className="w-3 h-3 mr-1" />
                        Code
                      </Button>
                    </div>

                    {/* Certificate Footer */}
                    <div className="mt-4 pt-4 border-t border-white/10 text-center">
                      <div className="text-xs text-muted-foreground">
                        Developed by <span className="font-semibold text-primary">Nitin Kumar</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Desktop: Alternating Layout */}
          <div className="hidden md:block space-y-16 lg:space-y-24">
            {displayProjects.map((project, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}
                >
                  {/* Project Image Section */}
                  <motion.div
                    className="w-full lg:w-1/2 relative"
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <div className="relative rounded-2xl shadow-xl border border-border/30 bg-card/50 p-4">
                      {/* Image */}
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-[280px] lg:h-[320px] object-contain rounded-xl"
                      />

                      {/* Featured Badge */}
                      {project.featured && (
                        <Badge className="absolute top-8 right-8 bg-gradient-secondary text-white flex items-center gap-1 px-3 py-1.5 text-sm shadow-lg">
                          <Star className="w-4 h-4" />
                          Featured
                        </Badge>
                      )}
                    </div>
                  </motion.div>

                  {/* Project Content Section */}
                  <motion.div
                    className="w-full lg:w-1/2 space-y-6"
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {/* Project Title */}
                    <div className="space-y-3">
                      <motion.div
                        className="flex items-center gap-3"
                        whileHover={{ x: isEven ? 5 : -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Code2 className="w-6 h-6 text-primary" />
                        <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                          Project {String(index + 1).padStart(2, '0')}
                        </span>
                      </motion.div>

                      <h3 className="text-3xl lg:text-4xl font-bold leading-tight">
                        <span className="gradient-text">{project.title}</span>
                      </h3>
                    </div>

                    {/* Description Card */}
                    <div className="glassmorphism p-6 rounded-xl border border-border/50 shadow-lg">
                      <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide flex items-center gap-2">
                        <div className="w-8 h-px bg-gradient-primary" />
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: techIndex * 0.05 }}
                            whileHover={{ scale: 1.1, y: -2 }}
                          >
                            <Badge
                              variant="secondary"
                              className="text-sm px-4 py-1.5 bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 transition-all duration-300 border border-primary/20"
                            >
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Project Links */}
                    <div className="flex flex-wrap gap-4 pt-4">
                      <Button
                        variant="default"
                        size="lg"
                        onClick={() => window.open(project.demoUrl, '_blank')}
                        className="flex items-center gap-2 bg-gradient-primary text-white hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                      >
                        <ExternalLink className="w-5 h-5" />
                        View Live Demo
                      </Button>

                      {project.githubUrl && (
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={() => window.open(project.githubUrl, '_blank')}
                          className="flex items-center gap-2 glassmorphism hover:bg-primary/10 transition-all duration-300"
                        >
                          <Github className="w-5 h-5" />
                          Source Code
                        </Button>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* View More Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mt-12 px-4"
        >
          {isFeaturedVariant ? (
            <Button
              variant="outline"
              size="lg"
              className="glassmorphism flex items-center gap-2 w-full sm:w-auto max-w-sm"
              asChild
            >
              <Link to={ctaHref}>{ctaLabel}</Link>
            </Button>
          ) : (
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open('https://github.com/nitin', '_blank')}
              className="glassmorphism flex items-center gap-2 w-full sm:w-auto max-w-sm"
            >
              <Github className="w-5 h-5" />
              View All Projects on GitHub
            </Button>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
