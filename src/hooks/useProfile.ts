import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase, uploadAsset, isSupabaseConfigured } from '@/lib/supabase';
import type { Profile } from '@/types/database';

const PROFILE_ID = '00000000-0000-0000-0000-000000000001'; // fixed single-row ID

export function useProfile() {
    const queryClient = useQueryClient();

    const { data: profile, isLoading, error: queryError, refetch } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            if (!isSupabaseConfigured) {
                throw new Error('Supabase is not configured. Please check your .env.local file.');
            }
            const { data, error: dbError } = await supabase
                .from('profile')
                .select('*')
                .eq('id', PROFILE_ID)
                .single();

            if (dbError) throw new Error(dbError.message);
            return data as Profile;
        },
        staleTime: 5 * 60 * 1000,
    });

    const updateProfile = async (updates: Partial<Profile>, imageFile?: File) => {
        if (!isSupabaseConfigured) return { error: 'Supabase is not configured.' };

        try {
            let imageUrl = updates.profile_image_url;
            if (imageFile) {
                imageUrl = await uploadAsset(imageFile, 'profile');
            }
            // Use upsert so the save works even if profile row doesn't exist yet
            const { error: dbError } = await supabase
                .from('profile')
                .upsert({
                    id: PROFILE_ID,
                    ...updates,
                    profile_image_url: imageUrl,
                    updated_at: new Date().toISOString(),
                } as never);

            if (!dbError) {
                await queryClient.invalidateQueries({ queryKey: ['profile'] });
            }
            return { error: dbError?.message ?? null };
        } catch (err) {
            return { error: err instanceof Error ? err.message : 'Failed to update profile. Please try again.' };
        }
    };

    return {
        profile: profile ?? null,
        loading: isLoading,
        error: queryError instanceof Error ? queryError.message : (queryError ? "Failed to load profile." : null),
        refetch,
        updateProfile
    };
}
