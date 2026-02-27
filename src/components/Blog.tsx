import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useBlog } from '@/hooks/useBlog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Clock, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

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
  // Published-only for homepage; all posts for full blog page
  const { posts, loading, error } = useBlog(true);
  const displayPosts = isFeaturedVariant ? posts.slice(0, featuredLimit) : posts;



  return (
    <section id={sectionId} className="py-14 sm:py-16 lg:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {isFeaturedVariant ? 'Latest' : 'All'}{' '}
            <span className="gradient-text">Blog Posts</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            {isFeaturedVariant
              ? 'Thoughts, tutorials, and insights from my development journey'
              : 'Browse all published articles and tutorials'}
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="text-center py-12">
            <AlertCircle className="h-10 w-10 mx-auto text-destructive/50 mb-3" />
            <p className="text-muted-foreground text-sm">Failed to load blog posts. Please try again later.</p>
          </div>
        )}

        {/* Blog post cards */}
        {!loading && !error && displayPosts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4">
            {displayPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="card-shell h-full flex flex-col overflow-hidden group">
                  {/* Cover image */}
                  {post.cover_image_url && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.cover_image_url}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                  )}

                  <CardContent className={`flex-1 flex flex-col ${post.cover_image_url ? 'p-5' : 'p-6'}`}>
                    {/* Tags */}
                    {(post.tags ?? []).length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {(post.tags ?? []).slice(0, 3).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold mb-2 leading-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Meta: read time and CTA */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/40">
                      <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.read_time_minutes} min read
                        </span>
                        {post.published_at && (
                          <span>
                            {new Date(post.published_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        )}
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 gap-1.5 px-3 text-primary hover:bg-primary/10 hover:text-primary transition-colors" asChild>
                        <Link to={`/blog/${post.slug}`}>
                          Read full blog <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && displayPosts.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-10 w-10 mx-auto text-muted-foreground/30 mb-3" />
            <p className="text-muted-foreground">{isFeaturedVariant ? 'No featured posts added yet.' : 'No published posts yet. Check back soon!'}</p>
          </div>
        )}

        {/* CTA button */}
        {isFeaturedVariant && !loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center mt-12 px-4"
          >
            <Button
              variant="outline"
              size="lg"
              className="glassmorphism flex items-center gap-2 w-full sm:w-auto max-w-sm"
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
