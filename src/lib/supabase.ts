import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// ── Check whether credentials look valid ──
export const isSupabaseConfigured = Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== 'your_supabase_project_url' &&
    supabaseUrl.startsWith('https://') &&
    supabaseAnonKey.length > 20
);

if (!isSupabaseConfigured) {
    console.warn(
        '[Supabase] Missing or invalid credentials.\n' +
        '  1. Go to https://supabase.com/dashboard → Settings → API\n' +
        '  2. Copy "Project URL" and "anon public" key\n' +
        '  3. Add them to .env.local as VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY\n' +
        '  ⮑  All data hooks will return empty state until this is fixed.'
    );
}

export const supabase = createClient<Database>(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key',
    {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
        },
    }
);

/** Upload a file to the portfolio-assets storage bucket.
 *  Throws on failure so callers can surface the error via toast. */
export async function uploadAsset(
    file: File,
    folder: 'profile' | 'projects' | 'certifications' | 'blog'
): Promise<string> {
    if (!isSupabaseConfigured) {
        throw new Error('Supabase is not configured. Cannot upload files.');
    }

    // Validate file size (max 5 MB)
    if (file.size > 5 * 1024 * 1024) {
        throw new Error('File is too large. Maximum size is 5 MB.');
    }

    const ext = file.name.split('.').pop()?.toLowerCase() ?? 'bin';
    const filename = `${folder}/${Date.now()}.${ext}`;

    const { error } = await supabase.storage
        .from('portfolio-assets')
        .upload(filename, file, { upsert: true });

    if (error) {
        console.error('[Storage] Upload error:', error.message);
        throw new Error(`Image upload failed: ${error.message}`);
    }

    const { data } = supabase.storage.from('portfolio-assets').getPublicUrl(filename);
    return data.publicUrl;
}
