import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useBlog } from '@/hooks/useBlog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, ArrowRight, Calendar, Loader2, AlertCircle, User } from 'lucide-react';

interface BlogProps {
  variant?: 'full' | 'featured';
  featuredLimit?: number;
  ctaHref?: string;
  ctaLabel?: string;
  sectionId?: string;
}

const Blog = ({
  variant = 'full',
  featuredLimit = 3,
  ctaHref = '/blog',
  ctaLabel = 'Read the full blog',
  sectionId = 'blog',
}: BlogProps) => {
  const isFeaturedVariant = variant === 'featured';
  const { posts, loading, error } = useBlog(true);
  const displayPosts = isFeaturedVariant ? posts.slice(0, featuredLimit) : posts;

  return (
    <section id={sectionId} className="py-14 sm:py-16 lg:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16 px-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {isFeaturedVariant ? 'Latest' : 'All'}{' '}
            <span className="gradient-text">Blog Posts</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-primary mx-auto mb-5 rounded-full" />
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {isFeaturedVariant
              ? 'Thoughts, tutorials, and insights from my development journey'
              : 'Browse all published articles and tutorials'}
          </p>
        </motion.div>

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground text-sm">Loading posts…</p>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="text-center py-16 glassmorphism rounded-2xl max-w-md mx-auto">
            <AlertCircle className="h-12 w-12 mx-auto text-destructive/50 mb-4" />
            <p className="text-muted-foreground">Failed to load blog posts. Please try again later.</p>
          </div>
        )}

        {/* Blog post cards */}
        {!loading && !error && displayPosts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2 sm:px-4">
            {displayPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/blog/${post.slug}`} className="block h-full group">
                  <article className="card-shell h-full flex flex-col overflow-hidden rounded-2xl hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
                    {/* Cover image */}
                    {post.cover_image_url && (
                      <div className="relative h-48 sm:h-52 overflow-hidden">
                        <img
                          src={post.cover_image_url}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                        {/* Read time overlay */}
                        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
                          <Clock className="w-3 h-3" />
                          {post.read_time_minutes} min
                        </div>
                      </div>
                    )}

                    <div className={`flex-1 flex flex-col ${post.cover_image_url ? 'p-5 sm:p-6' : 'p-6 sm:p-7'}`}>
                      {/* Tags */}
                      {(post.tags ?? []).length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {(post.tags ?? []).slice(0, 3).map(tag => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs font-medium bg-primary/8 text-primary border-primary/15 px-2.5 py-0.5"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {(post.tags ?? []).length > 3 && (
                            <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground px-2 py-0.5">
                              +{(post.tags ?? []).length - 3}
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold mb-2 leading-snug text-foreground group-hover:text-primary transition-colors duration-200">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-sm sm:text-[0.9rem] text-muted-foreground line-clamp-3 mb-5 flex-1 leading-relaxed">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Footer: meta + CTA */}
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/30">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          {post.published_at && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(post.published_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                          )}
                          {!post.cover_image_url && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.read_time_minutes} min
                            </span>
                          )}
                        </div>
                        <span className="flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all duration-200">
                          Read more <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && displayPosts.length === 0 && (
          <div className="text-center py-16 glassmorphism rounded-2xl max-w-md mx-auto">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-lg font-medium text-muted-foreground mb-1">
              {isFeaturedVariant ? 'No posts yet' : 'Nothing published yet'}
            </p>
            <p className="text-sm text-muted-foreground/70">Check back soon for new articles!</p>
          </div>
        )}

        {/* CTA button */}
        {isFeaturedVariant && !loading && !error && displayPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center mt-12 px-4"
          >
            <Button
              variant="outline"
              size="lg"
              className="glassmorphism flex items-center gap-2 w-full sm:w-auto max-w-sm hover:-translate-y-0.5 transition-all duration-300"
              asChild
            >
              <Link to={ctaHref}>
                {ctaLabel} <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Blog;
