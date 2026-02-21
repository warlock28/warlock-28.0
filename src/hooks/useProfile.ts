import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase, uploadAsset, isSupabaseConfigured } from '@/lib/supabase';
import type { Profile } from '@/types/database';

const PROFILE_ID = '00000000-0000-0000-0000-000000000001'; // fixed single-row ID

export function useProfile() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const mountedRef = useRef(true);

    const fetchProfile = useCallback(async () => {
        if (!isSupabaseConfigured) {
            setError('Supabase is not configured. Please check your .env.local file.');
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const { data, error: dbError } = await supabase
                .from('profile')
                .select('*')
                .eq('id', PROFILE_ID)
                .single();

            if (!mountedRef.current) return;
            if (dbError) {
                setError(dbError.message);
            } else {
                setProfile(data as Profile);
            }
        } catch {
            if (mountedRef.current) {
                setError('Failed to load profile. Please check your connection.');
            }
        } finally {
            if (mountedRef.current) setLoading(false);
        }
    }, []);

    useEffect(() => {
        mountedRef.current = true;
        fetchProfile();
        return () => { mountedRef.current = false; };
    }, [fetchProfile]);

    const updateProfile = useCallback(async (updates: Partial<Profile>, imageFile?: File) => {
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

            if (!dbError) await fetchProfile();
            return { error: dbError?.message ?? null };
        } catch (err) {
            return { error: err instanceof Error ? err.message : 'Failed to update profile. Please try again.' };
        }
    }, [fetchProfile]);

    return { profile, loading, error, refetch: fetchProfile, updateProfile };
}
