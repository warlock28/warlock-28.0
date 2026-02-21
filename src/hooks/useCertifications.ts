import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase, uploadAsset, isSupabaseConfigured } from '@/lib/supabase';
import type { Certification } from '@/types/database';

export function useCertifications(featuredOnly = false) {
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const mountedRef = useRef(true);

    const fetchCertifications = useCallback(async () => {
        if (!isSupabaseConfigured) {
            setError('Supabase is not configured. Please check your .env.local file.');
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            let query = supabase.from('certifications').select('*').order('sort_order');
            if (featuredOnly) query = query.eq('featured', true);
            const { data, error: dbError } = await query;

            if (!mountedRef.current) return;
            if (dbError) {
                setError(dbError.message);
            } else {
                setCertifications((data as Certification[]) ?? []);
            }
        } catch {
            if (mountedRef.current) {
                setError('Failed to load certifications. Please check your connection.');
            }
        } finally {
            if (mountedRef.current) setLoading(false);
        }
    }, [featuredOnly]);

    useEffect(() => {
        mountedRef.current = true;
        fetchCertifications();
        return () => { mountedRef.current = false; };
    }, [fetchCertifications]);

    const addCertification = useCallback(async (cert: Omit<Certification, 'id' | 'created_at' | 'updated_at'>, imageFile?: File) => {
        if (!isSupabaseConfigured) return { error: 'Supabase is not configured.' };
        try {
            let imageUrl = cert.image_url;
            if (imageFile) imageUrl = await uploadAsset(imageFile, 'certifications');
            const { error: dbError } = await supabase.from('certifications').insert({ ...cert, image_url: imageUrl } as never);
            if (!dbError) await fetchCertifications();
            return { error: dbError?.message ?? null };
        } catch (err) {
            return { error: err instanceof Error ? err.message : 'Failed to add certification. Please try again.' };
        }
    }, [fetchCertifications]);

    const updateCertification = useCallback(async (id: string, updates: Partial<Certification>, imageFile?: File) => {
        if (!isSupabaseConfigured) return { error: 'Supabase is not configured.' };
        try {
            let imageUrl = updates.image_url;
            if (imageFile) imageUrl = await uploadAsset(imageFile, 'certifications');
            const { error: dbError } = await supabase
                .from('certifications')
                .update({ ...updates, image_url: imageUrl, updated_at: new Date().toISOString() } as never)
                .eq('id', id);
            if (!dbError) await fetchCertifications();
            return { error: dbError?.message ?? null };
        } catch (err) {
            return { error: err instanceof Error ? err.message : 'Failed to update certification. Please try again.' };
        }
    }, [fetchCertifications]);

    const deleteCertification = useCallback(async (id: string) => {
        if (!isSupabaseConfigured) return { error: 'Supabase is not configured.' };
        try {
            const { error: dbError } = await supabase.from('certifications').delete().eq('id', id);
            if (!dbError) await fetchCertifications();
            return { error: dbError?.message ?? null };
        } catch (err) {
            return { error: err instanceof Error ? err.message : 'Failed to delete certification. Please try again.' };
        }
    }, [fetchCertifications]);

    return { certifications, loading, error, refetch: fetchCertifications, addCertification, updateCertification, deleteCertification };
}
