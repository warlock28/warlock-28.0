import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { BlogPost } from '@/types/database';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Calendar, AlertCircle, Loader2 } from 'lucide-react';
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
                // Ensure they can only view it if it's published
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

    // Scroll to top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-background flex flex-col pt-16">
            <Navbar />

            <main className="flex-1 py-12 md:py-20 lg:py-24 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary/10 rounded-full mix-blend-screen filter blur-3xl opacity-50 pointer-events-none" />
                <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-accent/10 rounded-full mix-blend-screen filter blur-3xl opacity-50 pointer-events-none" />

                <div className="container mx-auto px-4 max-w-4xl relative z-10">
                    <Button
                        variant="ghost"
                        className="mb-8 hover:bg-transparent hover:text-primary px-0 text-muted-foreground"
                        onClick={() => navigate('/blog')}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Blog
                    </Button>

                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-32">
                            <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                            <p className="text-muted-foreground">Loading post...</p>
                        </div>
                    ) : error || !post ? (
                        <div className="text-center py-32 bg-card/30 rounded-3xl border border-border/40">
                            <AlertCircle className="h-12 w-12 mx-auto text-destructive/50 mb-4" />
                            <h2 className="text-2xl font-bold mb-2">Post not found</h2>
                            <p className="text-muted-foreground mb-8">
                                {error instanceof Error ? error.message : "The post you're looking for doesn't exist or isn't published yet."}
                            </p>
                            <Button asChild>
                                <Link to="/blog">Browse all posts</Link>
                            </Button>
                        </div>
                    ) : (
                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-card/50 backdrop-blur-sm border border-border/40 rounded-3xl overflow-hidden shadow-xl"
                        >
                            {post.cover_image_url && (
                                <div className="w-full h-64 md:h-96 relative">
                                    <img
                                        src={post.cover_image_url}
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                                </div>
                            )}

                            <div className="p-6 md:p-12 lg:p-16">
                                <header className="mb-12">
                                    {(post.tags ?? []).length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {post.tags.map(tag => (
                                                <Badge key={tag} className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}

                                    <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
                                        {post.title}
                                    </h1>

                                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-y border-border/40 py-4">
                                        <span className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            {post.read_time_minutes} min read
                                        </span>
                                        {post.published_at && (
                                            <span className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(post.published_at).toLocaleDateString('en-US', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        )}
                                    </div>
                                </header>

                                <div className="prose prose-base sm:prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {post.content}
                                    </ReactMarkdown>
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
