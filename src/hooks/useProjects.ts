import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase, uploadAsset, isSupabaseConfigured } from '@/lib/supabase';
import type { Project } from '@/types/database';

export function useProjects() {
    const queryClient = useQueryClient();

    const { data: projects, isLoading, error: queryError, refetch } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            if (!isSupabaseConfigured) {
                throw new Error('Supabase is not configured. Please check your .env.local file.');
            }
            const { data, error: dbError } = await supabase
                .from('projects')
                .select('*')
                .order('sort_order');

            if (dbError) throw new Error(dbError.message);
            return (data as Project[]) ?? [];
        },
        staleTime: 2 * 60 * 1000, // 2 min — quick refresh after admin changes
        refetchOnWindowFocus: true,
    });

    const addProject = async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>, imageFile?: File) => {
        if (!isSupabaseConfigured) return { error: 'Supabase is not configured.' };
        try {
            let imageUrl = project.image_url;
            if (imageFile) imageUrl = await uploadAsset(imageFile, 'projects');
            const { error: dbError } = await supabase.from('projects').insert({ ...project, image_url: imageUrl } as never);
            if (!dbError) await queryClient.invalidateQueries({ queryKey: ['projects'] });
            return { error: dbError?.message ?? null };
        } catch (err) {
            return { error: err instanceof Error ? err.message : 'Failed to add project. Please try again.' };
        }
    };

    const updateProject = async (id: string, updates: Partial<Project>, imageFile?: File) => {
        if (!isSupabaseConfigured) return { error: 'Supabase is not configured.' };
        try {
            let imageUrl = updates.image_url;
            if (imageFile) imageUrl = await uploadAsset(imageFile, 'projects');
            const { error: dbError } = await supabase
                .from('projects')
                .update({ ...updates, image_url: imageUrl, updated_at: new Date().toISOString() } as never)
                .eq('id', id);
            if (!dbError) await queryClient.invalidateQueries({ queryKey: ['projects'] });
            return { error: dbError?.message ?? null };
        } catch (err) {
            return { error: err instanceof Error ? err.message : 'Failed to update project. Please try again.' };
        }
    };

    const deleteProject = async (id: string) => {
        if (!isSupabaseConfigured) return { error: 'Supabase is not configured.' };
        try {
            const { error: dbError } = await supabase.from('projects').delete().eq('id', id);
            if (!dbError) await queryClient.invalidateQueries({ queryKey: ['projects'] });
            return { error: dbError?.message ?? null };
        } catch (err) {
            return { error: err instanceof Error ? err.message : 'Failed to delete project. Please try again.' };
        }
    };

    return {
        projects: projects ?? [],
        loading: isLoading,
        error: queryError instanceof Error ? queryError.message : (queryError ? "Failed to load projects." : null),
        refetch,
        addProject,
        updateProject,
        deleteProject
    };
}
