import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { Service } from '@/types/database';

export function useServices(featuredOnly: boolean = false) {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchServices = async () => {
        try {
            setLoading(true);
            if (!isSupabaseConfigured) {
                throw new Error('Supabase is not configured. Please connect to Supabase first.');
            }

            let query = supabase
                .from('services')
                .select('*')
                .order('sort_order', { ascending: true });

            if (featuredOnly) {
                query = query.eq('featured', true);
            }

            const { data, error: fetchError } = await query;

            if (fetchError) {
                throw fetchError;
            }

            setServices((data as Service[]) || []);
            setError(null);
        } catch (err) {
            console.error('Error fetching services:', err);
            setError(err instanceof Error ? err : new Error('Failed to fetch services'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, [featuredOnly]);

    const addService = async (service: Omit<Service, 'id' | 'created_at' | 'updated_at'>) => {
        try {
            const { data, error } = await supabase
                .from('services')
                .insert([service])
                .select()
                .single();

            if (error) throw error;
            if (data) {
                const newService = data as Service;
                setServices(prev => [...prev, newService].sort((a, b) => a.sort_order - b.sort_order));
            }
            return { data, error: null };
        } catch (error) {
            console.error('Error adding service:', error);
            return { data: null, error };
        }
    };

    const updateService = async (id: string, updates: Partial<Omit<Service, 'id' | 'created_at' | 'updated_at'>>) => {
        try {
            const { data, error } = await supabase
                .from('services')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            if (data) {
                const updatedService = data as Service;
                setServices(prev => prev.map(s => (s.id === id ? updatedService : s)).sort((a, b) => a.sort_order - b.sort_order));
            }
            return { data, error: null };
        } catch (error) {
            console.error('Error updating service:', error);
            return { data: null, error };
        }
    };

    const deleteService = async (id: string) => {
        try {
            const { error } = await supabase
                .from('services')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setServices(prev => prev.filter(s => s.id !== id));
            return { error: null };
        } catch (error) {
            console.error('Error deleting service:', error);
            return { error };
        }
    };

    return { services, loading, error, refresh: fetchServices, addService, updateService, deleteService };
}
