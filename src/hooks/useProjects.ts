import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase, uploadAsset, isSupabaseConfigured } from '@/lib/supabase';
import type { Project } from '@/types/database';

export function useProjects(featuredOnly = false) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const mountedRef = useRef(true);

    const fetchProjects = useCallback(async () => {
        if (!isSupabaseConfigured) {
            setError('Supabase is not configured. Please check your .env.local file.');
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            let query = supabase.from('projects').select('*').order('sort_order');
            if (featuredOnly) query = query.eq('featured', true);
            const { data, error: dbError } = await query;

            if (!mountedRef.current) return;
            if (dbError) {
                setError(dbError.message);
            } else {
                setProjects((data as Project[]) ?? []);
            }
        } catch {
            if (mountedRef.current) {
                setError('Failed to load projects. Please check your connection.');
            }
        } finally {
            if (mountedRef.current) setLoading(false);
        }
    }, [featuredOnly]);

    useEffect(() => {
        mountedRef.current = true;
        fetchProjects();
        return () => { mountedRef.current = false; };
    }, [fetchProjects]);

    const addProject = useCallback(async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>, imageFile?: File) => {
        if (!isSupabaseConfigured) return { error: 'Supabase is not configured.' };
        try {
            let imageUrl = project.image_url;
            if (imageFile) imageUrl = await uploadAsset(imageFile, 'projects');
            const { error: dbError } = await supabase.from('projects').insert({ ...project, image_url: imageUrl } as never);
            if (!dbError) await fetchProjects();
            return { error: dbError?.message ?? null };
        } catch (err) {
            return { error: err instanceof Error ? err.message : 'Failed to add project. Please try again.' };
        }
    }, [fetchProjects]);

    const updateProject = useCallback(async (id: string, updates: Partial<Project>, imageFile?: File) => {
        if (!isSupabaseConfigured) return { error: 'Supabase is not configured.' };
        try {
            let imageUrl = updates.image_url;
            if (imageFile) imageUrl = await uploadAsset(imageFile, 'projects');
            const { error: dbError } = await supabase
                .from('projects')
                .update({ ...updates, image_url: imageUrl, updated_at: new Date().toISOString() } as never)
                .eq('id', id);
            if (!dbError) await fetchProjects();
            return { error: dbError?.message ?? null };
        } catch (err) {
            return { error: err instanceof Error ? err.message : 'Failed to update project. Please try again.' };
        }
    }, [fetchProjects]);

    const deleteProject = useCallback(async (id: string) => {
        if (!isSupabaseConfigured) return { error: 'Supabase is not configured.' };
        try {
            const { error: dbError } = await supabase.from('projects').delete().eq('id', id);
            if (!dbError) await fetchProjects();
            return { error: dbError?.message ?? null };
        } catch (err) {
            return { error: err instanceof Error ? err.message : 'Failed to delete project. Please try again.' };
        }
    }, [fetchProjects]);

    return { projects, loading, error, refetch: fetchProjects, addProject, updateProject, deleteProject };
}
