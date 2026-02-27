import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase, uploadAsset, isSupabaseConfigured } from '@/lib/supabase';
import type { BlogPost } from '@/types/database';

export function useBlog(publishedOnly = false) {
    const queryClient = useQueryClient();

    const { data: posts, isLoading, error: queryError, refetch } = useQuery({
        queryKey: ['blog_posts', publishedOnly],
        queryFn: async () => {
            if (!isSupabaseConfigured) {
                throw new Error('Supabase is not configured. Please check your .env.local file.');
            }
            let query = supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
            if (publishedOnly) query = query.eq('published', true);
            const { data, error: dbError } = await query;

            if (dbError) throw new Error(dbError.message);
            return (data as BlogPost[]) ?? [];
        },
        staleTime: 2 * 60 * 1000, // 2 min — quick refresh after admin changes
        refetchOnWindowFocus: true,
    });

    const addPost = async (post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>, coverFile?: File) => {
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
            if (!dbError) await queryClient.invalidateQueries({ queryKey: ['blog_posts'] });
            return { error: dbError?.message ?? null };
        } catch (err) {
            return { error: err instanceof Error ? err.message : 'Failed to add post. Please try again.' };
        }
    };

    const updatePost = async (id: string, updates: Partial<BlogPost>, coverFile?: File) => {
        if (!isSupabaseConfigured) return { error: 'Supabase is not configured.' };
        try {
            let coverUrl = updates.cover_image_url;
            if (coverFile) coverUrl = await uploadAsset(coverFile, 'blog');
            const { error: dbError } = await supabase
                .from('blog_posts')
                .update({ ...updates, cover_image_url: coverUrl, updated_at: new Date().toISOString() } as never)
                .eq('id', id);
            if (!dbError) await queryClient.invalidateQueries({ queryKey: ['blog_posts'] });
            return { error: dbError?.message ?? null };
        } catch (err) {
            return { error: err instanceof Error ? err.message : 'Failed to update post. Please try again.' };
        }
    };

    const deletePost = async (id: string) => {
        if (!isSupabaseConfigured) return { error: 'Supabase is not configured.' };
        try {
            const { error: dbError } = await supabase.from('blog_posts').delete().eq('id', id);
            if (!dbError) await queryClient.invalidateQueries({ queryKey: ['blog_posts'] });
            return { error: dbError?.message ?? null };
        } catch (err) {
            return { error: err instanceof Error ? err.message : 'Failed to delete post. Please try again.' };
        }
    };

    const togglePublish = async (id: string, published: boolean) => {
        if (!isSupabaseConfigured) return { error: 'Supabase is not configured.' };
        try {
            const { error: dbError } = await supabase.from('blog_posts').update({
                published,
                published_at: published ? new Date().toISOString() : null,
                updated_at: new Date().toISOString()
            } as never).eq('id', id);
            if (!dbError) await queryClient.invalidateQueries({ queryKey: ['blog_posts'] });
            return { error: dbError?.message ?? null };
        } catch (err) {
            return { error: err instanceof Error ? err.message : 'Failed to update publication status. Please try again.' };
        }
    };

    return {
        posts: posts ?? [],
        loading: isLoading,
        error: queryError instanceof Error ? queryError.message : (queryError ? "Failed to load posts." : null),
        refetch,
        addPost,
        updatePost,
        deletePost,
        togglePublish
    };
}
