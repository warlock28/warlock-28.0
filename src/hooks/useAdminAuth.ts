import { useEffect, useState, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { Session, User } from '@supabase/supabase-js';

interface AdminAuthState {
    user: User | null;
    session: Session | null;
    loading: boolean;
    isAdmin: boolean;
    signIn: (email: string, password: string) => Promise<{ error: string | null }>;
    signOut: () => Promise<void>;
}

export function useAdminAuth(): AdminAuthState {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // If Supabase is not configured, skip auth entirely
        if (!isSupabaseConfigured) {
            setLoading(false);
            return;
        }

        // Get the initial session once on mount
        supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
            setSession(currentSession);
            setUser(currentSession?.user ?? null);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, updatedSession) => {
                setSession(updatedSession);
                setUser(updatedSession?.user ?? null);
                setLoading(false);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const signIn = useCallback(async (email: string, password: string) => {
        if (!isSupabaseConfigured) {
            return { error: 'Supabase is not configured. Please check your .env.local file.' };
        }
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            return { error: error ? error.message : null };
        } catch {
            return { error: 'Unable to reach the server. Please check your internet connection.' };
        }
    }, []);

    const signOut = useCallback(async () => {
        if (!isSupabaseConfigured) {
            setSession(null);
            setUser(null);
            return;
        }
        try {
            await supabase.auth.signOut();
        } catch {
            setSession(null);
            setUser(null);
        }
    }, []);

    return {
        user,
        session,
        loading,
        isAdmin: !!user,
        signIn,
        signOut,
    };
}
