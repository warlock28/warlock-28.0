import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { BlogPost } from '@/types/database';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Calendar, AlertCircle, Loader2, Share2, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const BlogPostPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    const { data: post, isLoading, error } = useQuery({
        queryKey: ['blog_post', slug],
        queryFn: async () => {
            if (!slug) throw new Error('No slug provided');
            if (!isSupabaseConfigured) throw new Error('Supabase is not configured');

            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('slug', slug)
                .eq('published', true)
                .single();

            if (error) {
                if (error.code === 'PGRST116') throw new Error('Post not found');
                throw new Error(error.message);
            }
            return data as BlogPost;
        },
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: post?.title,
                    text: post?.excerpt,
                    url: window.location.href,
                });
            } catch { /* user cancelled */ }
        } else {
            navigator.clipboard.writeText(window.location.href);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col pt-16">
            <Navbar />

            <main className="flex-1 py-10 md:py-16 lg:py-20 relative overflow-hidden">
                {/* Decorative background */}
                <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl pointer-events-none" />
                <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl pointer-events-none" />

                <div className="container mx-auto px-4 max-w-4xl relative z-10">
                    {/* Back button */}
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Button
                            variant="ghost"
                            className="mb-8 hover:bg-primary/5 hover:text-primary px-3 text-muted-foreground group"
                            onClick={() => navigate('/blog')}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform" />
                            Back to Blog
                        </Button>
                    </motion.div>

                    {/* Loading */}
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-32">
                            <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                            <p className="text-muted-foreground">Loading post…</p>
                        </div>

                        /* Error / Not found */
                    ) : error || !post ? (
                        <div className="text-center py-32 glassmorphism rounded-3xl border border-border/30">
                            <AlertCircle className="h-14 w-14 mx-auto text-destructive/40 mb-5" />
                            <h2 className="text-2xl font-bold mb-2">Post not found</h2>
                            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                                {error instanceof Error ? error.message : "The post you're looking for doesn't exist or isn't published yet."}
                            </p>
                            <Button onClick={() => navigate('/blog')}>
                                Browse all posts
                            </Button>
                        </div>

                        /* Article */
                    ) : (
                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Hero cover image */}
                            {post.cover_image_url && (
                                <div className="w-full h-56 sm:h-72 md:h-96 relative rounded-2xl sm:rounded-3xl overflow-hidden mb-8 sm:mb-10 shadow-xl">
                                    <img
                                        src={post.cover_image_url}
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                                </div>
                            )}

                            {/* Article card */}
                            <div className="bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg">
                                <div className="p-6 sm:p-8 md:p-12 lg:p-16">
                                    {/* Header */}
                                    <header className="mb-10 sm:mb-12">
                                        {/* Tags */}
                                        {(post.tags ?? []).length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-5">
                                                {post.tags.map(tag => (
                                                    <Badge
                                                        key={tag}
                                                        className="bg-primary/8 text-primary border-primary/15 hover:bg-primary/15 text-xs sm:text-sm px-3 py-1"
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}

                                        {/* Title */}
                                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight tracking-tight text-foreground">
                                            {post.title}
                                        </h1>

                                        {/* Excerpt */}
                                        {post.excerpt && (
                                            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 max-w-3xl">
                                                {post.excerpt}
                                            </p>
                                        )}

                                        {/* Meta bar */}
                                        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-muted-foreground border-t border-border/30 pt-5">
                                            <span className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-primary/70" />
                                                {post.read_time_minutes} min read
                                            </span>
                                            {post.published_at && (
                                                <span className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-primary/70" />
                                                    {new Date(post.published_at).toLocaleDateString('en-US', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                            )}

                                            {/* Share button */}
                                            <button
                                                onClick={handleShare}
                                                className="ml-auto flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors px-2.5 py-1.5 rounded-lg hover:bg-primary/5"
                                                title="Share this post"
                                            >
                                                <Share2 className="w-3.5 h-3.5" />
                                                Share
                                            </button>
                                        </div>
                                    </header>

                                    {/* Divider */}
                                    <div className="w-full h-px bg-gradient-to-r from-transparent via-border/60 to-transparent mb-10 sm:mb-12" />

                                    {/* Content */}
                                    <div className="prose prose-base sm:prose-lg dark:prose-invert max-w-none
                    prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
                    prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-10 prose-h2:mb-4
                    prose-h3:text-xl prose-h3:sm:text-2xl prose-h3:mt-8 prose-h3:mb-3
                    prose-p:text-foreground/85 prose-p:leading-[1.8] prose-p:mb-5
                    prose-a:text-primary prose-a:underline-offset-2 hover:prose-a:text-primary/80
                    prose-strong:text-foreground prose-strong:font-semibold
                    prose-img:rounded-xl prose-img:shadow-md
                    prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-medium prose-code:before:content-none prose-code:after:content-none
                    prose-pre:bg-card prose-pre:border prose-pre:border-border/40 prose-pre:rounded-xl prose-pre:shadow-sm
                    prose-blockquote:border-l-primary/40 prose-blockquote:bg-primary/3 prose-blockquote:rounded-r-lg prose-blockquote:py-1 prose-blockquote:px-5 prose-blockquote:not-italic
                    prose-ul:my-4 prose-ol:my-4 prose-li:marker:text-primary/50
                    prose-hr:border-border/30
                    prose-table:overflow-hidden prose-table:rounded-lg prose-th:bg-muted/50 prose-th:px-4 prose-th:py-2
                  ">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {post.content}
                                        </ReactMarkdown>
                                    </div>

                                    {/* Post footer */}
                                    <div className="mt-12 sm:mt-16 pt-8 border-t border-border/30">
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                                                    <BookOpen className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-foreground">Thanks for reading!</p>
                                                    <p className="text-xs text-muted-foreground">Share this post if you found it helpful.</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-3">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={handleShare}
                                                    className="gap-1.5 hover:bg-primary/5 hover:border-primary/30"
                                                >
                                                    <Share2 className="w-3.5 h-3.5" />
                                                    Share
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => navigate('/blog')}
                                                    className="gap-1.5 hover:bg-primary/5 hover:border-primary/30"
                                                >
                                                    <ArrowLeft className="w-3.5 h-3.5" />
                                                    All posts
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default BlogPostPage;
