import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase, uploadAsset, isSupabaseConfigured } from '@/lib/supabase';
import type { Certification } from '@/types/database';

export function useCertifications(featuredOnly = false) {
    const queryClient = useQueryClient();

    const { data: certifications, isLoading, error: queryError, refetch } = useQuery({
        queryKey: ['certifications', featuredOnly],
        queryFn: async () => {
            if (!isSupabaseConfigured) {
                throw new Error('Supabase is not configured. Please check your .env.local file.');
            }
            let query = supabase.from('certifications').select('*').order('sort_order');
            if (featuredOnly) query = query.eq('featured', true);
            const { data, error: dbError } = await query;

            if (dbError) throw new Error(dbError.message);
            return (data as Certification[]) ?? [];
        },
        staleTime: 5 * 60 * 1000,
    });

    const addCertification = async (cert: Omit<Certification, 'id' | 'created_at' | 'updated_at'>, imageFile?: File) => {
        if (!isSupabaseConfigured) return { error: 'Supabase is not configured.' };
        try {
            let imageUrl = cert.image_url;
            if (imageFile) imageUrl = await uploadAsset(imageFile, 'certifications');
            const { error: dbError } = await supabase.from('certifications').insert({ ...cert, image_url: imageUrl } as never);
            if (!dbError) await queryClient.invalidateQueries({ queryKey: ['certifications'] });
            return { error: dbError?.message ?? null };
        } catch (err) {
            return { error: err instanceof Error ? err.message : 'Failed to add certification. Please try again.' };
        }
    };

    const updateCertification = async (id: string, updates: Partial<Certification>, imageFile?: File) => {
        if (!isSupabaseConfigured) return { error: 'Supabase is not configured.' };
        try {
            let imageUrl = updates.image_url;
            if (imageFile) imageUrl = await uploadAsset(imageFile, 'certifications');
            const { error: dbError } = await supabase
                .from('certifications')
                .update({ ...updates, image_url: imageUrl, updated_at: new Date().toISOString() } as never)
                .eq('id', id);
            if (!dbError) await queryClient.invalidateQueries({ queryKey: ['certifications'] });
            return { error: dbError?.message ?? null };
        } catch (err) {
            return { error: err instanceof Error ? err.message : 'Failed to update certification. Please try again.' };
        }
    };

    const deleteCertification = async (id: string) => {
        if (!isSupabaseConfigured) return { error: 'Supabase is not configured.' };
        try {
            const { error: dbError } = await supabase.from('certifications').delete().eq('id', id);
            if (!dbError) await queryClient.invalidateQueries({ queryKey: ['certifications'] });
            return { error: dbError?.message ?? null };
        } catch (err) {
            return { error: err instanceof Error ? err.message : 'Failed to delete certification. Please try again.' };
        }
    };

    return {
        certifications: certifications ?? [],
        loading: isLoading,
        error: queryError instanceof Error ? queryError.message : (queryError ? "Failed to load certifications." : null),
        refetch,
        addCertification,
        updateCertification,
        deleteCertification
    };
}
