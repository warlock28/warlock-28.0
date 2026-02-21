import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase, uploadAsset, isSupabaseConfigured } from '@/lib/supabase';
import type { BlogPost } from '@/types/database';

export function useBlog(publishedOnly = false) {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const mountedRef = useRef(true);

    const fetchPosts = useCallback(async () => {
        if (!isSupabaseConfigured) {
            setError('Supabase is not configured. Please check your .env.local file.');
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            let query = supabase.from('blog_posts').select('*').order('published_at', { ascending: false });
            if (publishedOnly) query = query.eq('published', true);
            const { data, error: dbError } = await query;

            if (!mountedRef.current) return;
            if (dbError) {
                setError(dbError.message);
            } else {
                setPosts((data as BlogPost[]) ?? []);
            }
        } catch {
            if (mountedRef.current) {
                setError('Failed to load blog posts. Please check your connection.');
            }
        } finally {
            if (mountedRef.current) setLoading(false);
        }
    }, [publishedOnly]);

    useEffect(() => {
        mountedRef.current = true;
        fetchPosts();
        return () => { mountedRef.current = false; };
    }, [fetchPosts]);

    const addPost = useCallback(async (post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>, coverFile?: File) => {
        if (!isSupabaseConfigured) return { error: 'Supabase is not configured.' };
        try {
            let coverUrl = post.cover_image_url;
            if (coverFile) coverUrl = await uploadAsset(coverFile, 'blog');
            // Auto-set published_at when publishing
            const publishedAt = post.published ? new Date().toISOString() : null;
            const { error: dbError } = await supabase.from('blog_posts').insert({
                ...post,
                cover_image_url: coverUrl,
                published_at: publishedAt,
            } as never);
            if (!dbError) await fetchPosts();
            return { error: dbError?.message ?? null };
        } catch (err) {
            return { error: err instanceof Error ? err.message : 'Failed to add post. Please try again.' };
        }
    }, [fetchPosts]);

    const updatePost = useCallback(async (id: string, updates: Partial<BlogPost>, coverFile?: File) => {
        if (!isSupabaseConfigured) return { error: 'Supabase is not configured.' };
        try {
            let coverUrl = updates.cover_image_url;
            if (coverFile) coverUrl = await uploadAsset(coverFile, 'blog');
            const { error: dbError } = await supabase
                .from('blog_posts')
                .update({ ...updates, cover_image_url: coverUrl, updated_at: new Date().toISOString() } as never)
                .eq('id', id);
            if (!dbError) await fetchPosts();
            return { error: dbError?.message ?? null };
        } catch (err) {
            return { error: err instanceof Error ? err.message : 'Failed to update post. Please try again.' };
        }
    }, [fetchPosts]);

    const deletePost = useCallback(async (id: string) => {
        if (!isSupabaseConfigured) return { error: 'Supabase is not configured.' };
        try {
            const { error: dbError } = await supabase.from('blog_posts').delete().eq('id', id);
            if (!dbError) await fetchPosts();
            return { error: dbError?.message ?? null };
        } catch (err) {
            return { error: err instanceof Error ? err.message : 'Failed to delete post. Please try again.' };
        }
    }, [fetchPosts]);

    const togglePublish = useCallback(async (id: string, published: boolean) => {
        if (!isSupabaseConfigured) return { error: 'Supabase is not configured.' };
        try {
            const { error: dbError } = await supabase.from('blog_posts').update({
                published,
                published_at: published ? new Date().toISOString() : null,
                updated_at: new Date().toISOString()
            } as never).eq('id', id);
            if (!dbError) await fetchPosts();
            return { error: dbError?.message ?? null };
        } catch (err) {
            return { error: err instanceof Error ? err.message : 'Failed to update publication status. Please try again.' };
        }
    }, [fetchPosts]);

    return { posts, loading, error, refetch: fetchPosts, addPost, updatePost, deletePost, togglePublish };
}
