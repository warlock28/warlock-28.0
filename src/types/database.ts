/**
 * Database types — match the Supabase PostgreSQL schema exactly.
 * Generated manually to match the SQL migration.
 */

export interface Profile {
    id: string; // UUID, single row
    name: string;
    title: string;
    bio: string;
    email: string;
    phone?: string;
    location?: string;
    profile_image_url?: string;
    resume_url?: string;
    github_url?: string;
    linkedin_url?: string;
    twitter_url?: string;
    instagram_url?: string;
    updated_at: string;
}

export interface Project {
    id: string; // UUID
    title: string;
    description: string;
    long_description?: string;
    image_url?: string;
    technologies: string[]; // text[]
    category: 'fullstack' | 'frontend' | 'backend' | 'security' | 'mobile' | 'other';
    demo_url?: string;
    github_url?: string;
    featured: boolean;
    date?: string; // YYYY-MM
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface Certification {
    id: string; // UUID
    name: string;
    issuer: string;
    date: string;
    expiry_date?: string;
    credential_id?: string;
    credential_url?: string;
    image_url?: string;
    skills: string[]; // text[]
    description?: string;
    featured: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface BlogPost {
    id: string; // UUID
    title: string;
    slug: string;
    excerpt: string;
    content: string; // Markdown
    cover_image_url?: string;
    tags: string[]; // text[]
    published: boolean;
    published_at?: string | null;
    read_time_minutes: number;
    created_at: string;
    updated_at: string;
}

export interface SkillCategory {
    id: string;
    category: string;
    sort_order: number;
    skills: Skill[];
}

export interface Skill {
    id: string;
    category_id: string;
    name: string;
    level: number; // 0-100
    icon?: string;
    sort_order: number;
}

// ── Supabase DB type map (used by createClient generic) ──
// We use Record<string, unknown> for Row/Insert/Update so Supabase SDK
// accepts our objects without constraint errors.

type RowOf<T> = T & Record<string, unknown>;
type InsertOf<T> = Partial<T> & Record<string, unknown>;
type UpdateOf<T> = Partial<T> & Record<string, unknown>;

interface TableDef<R, I = Partial<R>, U = Partial<R>> {
    Row: RowOf<R>;
    Insert: InsertOf<I>;
    Update: UpdateOf<U>;
    Relationships: [];
}

export interface Database {
    public: {
        Tables: {
            profile: TableDef<Profile>;
            projects: TableDef<Project, Omit<Project, 'id' | 'created_at' | 'updated_at'>>;
            certifications: TableDef<Certification, Omit<Certification, 'id' | 'created_at' | 'updated_at'>>;
            blog_posts: TableDef<BlogPost, Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>>;
            skill_categories: TableDef<SkillCategory, Omit<SkillCategory, 'id' | 'skills'>>;
            skills: TableDef<Skill, Omit<Skill, 'id'>>;
        };
        Views: Record<string, never>;
        Functions: Record<string, never>;
        Enums: Record<string, never>;
        CompositeTypes: Record<string, never>;
    };
}
