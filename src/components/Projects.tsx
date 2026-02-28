
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useProjects } from '@/hooks/useProjects';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Star, Code2, Loader2, AlertCircle, ArrowRight, Layers } from 'lucide-react';
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
  const { projects, loading, error } = useProjects();

  const categories = ['all', 'fullstack', 'frontend', 'backend', 'security', 'mobile'];
  const featuredProjects = projects.slice(0, featuredLimit);
  const filteredProjects = projectFilter === 'all'
    ? projects
    : projects.filter(project => project.category === projectFilter);
  const displayProjects = isFeaturedVariant ? featuredProjects : filteredProjects;

  return (
    <section id={sectionId} className="py-14 sm:py-16 lg:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16 px-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {isFeaturedVariant ? 'Recent' : 'My'} <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-primary mx-auto mb-5 rounded-full" />
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {isFeaturedVariant
              ? 'A selection of my latest builds'
              : 'A showcase of my recent work and side projects'}
          </p>
        </motion.div>

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground text-sm">Loading projects…</p>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="text-center py-16 glassmorphism rounded-2xl max-w-md mx-auto">
            <AlertCircle className="h-12 w-12 mx-auto text-destructive/50 mb-4" />
            <p className="text-muted-foreground">Failed to load projects. Please try again later.</p>
          </div>
        )}

        {/* Filter Buttons */}
        {!loading && !error && !isFeaturedVariant && (
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14 px-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={projectFilter === category ? "default" : "outline"}
                onClick={() => setProjectFilter(category)}
                size="sm"
                className={`capitalize text-xs sm:text-sm rounded-full px-5 ${projectFilter === category
                  ? 'bg-gradient-primary text-white shadow-lg shadow-primary/25'
                  : 'glassmorphism hover:bg-primary/10 border-border/50'
                  }`}
              >
                {category}
              </Button>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && displayProjects.length > 0 && (
          <div className="px-0 sm:px-2">
            {/* Mobile: Vertical card stack */}
            <div className="md:hidden space-y-6">
              {displayProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="rounded-2xl overflow-hidden border border-border/50 bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                    {/* Image with overlay */}
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image_url ?? ''}
                        alt={project.title}
                        className="w-full h-44 sm:h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Featured badge */}
                      {project.featured && (
                        <Badge className="absolute top-3 right-3 bg-gradient-secondary text-white px-2.5 py-1 text-xs shadow-lg">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}

                      {/* Category pill */}
                      {project.category && (
                        <Badge className="absolute top-3 left-3 bg-black/40 backdrop-blur-md text-white border-white/20 px-2.5 py-1 text-xs capitalize">
                          <Layers className="w-3 h-3 mr-1" />
                          {project.category}
                        </Badge>
                      )}

                      {/* Title overlaid on image */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 pb-5">
                        <h3 className="text-xl font-bold text-white leading-tight drop-shadow-lg">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-5 space-y-4">
                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-primary/8 text-primary border border-primary/15 transition-colors hover:bg-primary/15"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2.5 pt-1">
                        {project.demo_url && (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => window.open(project.demo_url, '_blank')}
                            className="flex-1 text-xs bg-gradient-primary text-white rounded-lg shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all"
                          >
                            <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                            Live Demo
                          </Button>
                        )}
                        {project.github_url && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(project.github_url, '_blank')}
                            className="flex-1 text-xs rounded-lg border-border/60 hover:bg-primary/5"
                          >
                            <Github className="w-3.5 h-3.5 mr-1.5" />
                            Source
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop: Alternating Showcase Layout */}
            <div className="hidden md:block space-y-20 lg:space-y-28">
              {displayProjects.map((project, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, delay: index * 0.08 }}
                    className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-14 items-center`}
                  >
                    {/* Image Section */}
                    <motion.div
                      className="w-full lg:w-[55%] relative"
                      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.15 }}
                    >
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/30 bg-card/50 group">
                        <img
                          src={project.image_url ?? ''}
                          alt={project.title}
                          className="w-full h-[300px] lg:h-[360px] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Featured Badge */}
                        {project.featured && (
                          <Badge className="absolute top-5 right-5 bg-gradient-secondary text-white flex items-center gap-1.5 px-3 py-1.5 text-sm shadow-xl">
                            <Star className="w-4 h-4" />
                            Featured
                          </Badge>
                        )}

                        {/* Category chip */}
                        {project.category && (
                          <Badge className="absolute top-5 left-5 bg-black/30 backdrop-blur-lg text-white border-white/20 flex items-center gap-1.5 px-3 py-1.5 text-sm capitalize">
                            <Layers className="w-4 h-4" />
                            {project.category}
                          </Badge>
                        )}
                      </div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div
                      className="w-full lg:w-[45%] space-y-5"
                      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.25 }}
                    >
                      {/* Project number + title */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-primary/20">
                            <Code2 className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-sm font-bold text-primary uppercase tracking-widest">
                            Project {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>

                        <h3 className="text-3xl lg:text-4xl font-bold leading-tight">
                          <span className="gradient-text-secondary">{project.title}</span>
                        </h3>
                      </div>

                      {/* Description */}
                      <div className="glassmorphism p-5 rounded-xl border border-border/40">
                        <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Tech stack */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/60 flex items-center gap-2">
                          <div className="w-6 h-px bg-gradient-primary rounded-full" />
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <motion.span
                              key={tech}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: techIndex * 0.04 }}
                              whileHover={{ scale: 1.08, y: -2 }}
                              className="text-sm font-medium px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-foreground/80 hover:border-primary/40 hover:from-primary/15 hover:to-accent/15 transition-all duration-300 cursor-default"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap gap-3 pt-2">
                        {project.demo_url && (
                          <Button
                            variant="default"
                            size="lg"
                            onClick={() => window.open(project.demo_url, '_blank')}
                            className="flex items-center gap-2 bg-gradient-primary text-white hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 rounded-xl"
                          >
                            <ExternalLink className="w-5 h-5" />
                            Live Demo
                          </Button>
                        )}

                        {project.github_url && (
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={() => window.open(project.github_url, '_blank')}
                            className="flex items-center gap-2 glassmorphism hover:bg-primary/10 hover:-translate-y-0.5 transition-all duration-300 rounded-xl border-border/60"
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
        )}

        {/* Empty state */}
        {!loading && !error && displayProjects.length === 0 && (
          <div className="text-center py-16 glassmorphism rounded-2xl max-w-md mx-auto">
            <Code2 className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-lg font-medium text-muted-foreground mb-1">
              {isFeaturedVariant ? 'No featured projects yet' : 'No projects in this category'}
            </p>
          </div>
        )}

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mt-14 px-4"
        >
          {isFeaturedVariant ? (
            <Button
              variant="outline"
              size="lg"
              className="glassmorphism flex items-center gap-2 w-full sm:w-auto max-w-sm hover:-translate-y-0.5 transition-all duration-300 border-primary/20 hover:border-primary/50 rounded-xl"
              asChild
            >
              <Link to={ctaHref}>
                {ctaLabel} <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          ) : (
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open('https://github.com/nitin', '_blank')}
              className="glassmorphism flex items-center gap-2 w-full sm:w-auto max-w-sm rounded-xl"
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
