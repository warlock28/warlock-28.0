-- ============================================================
-- Warlock 28.0 Portfolio — Supabase Migration
-- Run this entire script in: Supabase Dashboard → SQL Editor
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- 1. PROFILE  (single-row personal info)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profile (
    id          UUID PRIMARY KEY DEFAULT '00000000-0000-0000-0000-000000000001',
    name        TEXT NOT NULL DEFAULT '',
    title       TEXT NOT NULL DEFAULT '',
    bio         TEXT NOT NULL DEFAULT '',
    email       TEXT NOT NULL DEFAULT '',
    phone       TEXT,
    location    TEXT,
    profile_image_url TEXT,
    resume_url  TEXT,
    github_url  TEXT,
    linkedin_url TEXT,
    twitter_url TEXT,
    instagram_url TEXT,
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed the single profile row
INSERT INTO profile (id, name, title, bio, email, github_url, linkedin_url, twitter_url, instagram_url)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'Nitin Kumar',
    'Full Stack Developer & Cybersecurity Enthusiast',
    'Passionate developer crafting digital experiences with innovation and precision. Specializing in modern web technologies, cloud architecture, and security-first development.',
    'your-email@example.com',
    'https://github.com/warlocknitin',
    'https://linkedin.com/in/warlocknitin',
    'https://twitter.com/warlocknitin',
    'https://instagram.com/warlocknitin'
)
ON CONFLICT (id) DO NOTHING;

-- ────────────────────────────────────────────────────────────
-- 2. PROJECTS
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title           TEXT NOT NULL,
    description     TEXT NOT NULL DEFAULT '',
    long_description TEXT,
    image_url       TEXT,
    technologies    TEXT[] NOT NULL DEFAULT '{}',
    category        TEXT NOT NULL DEFAULT 'other'
                    CHECK (category IN ('fullstack','frontend','backend','security','mobile','other')),
    demo_url        TEXT,
    github_url      TEXT,
    featured        BOOLEAN NOT NULL DEFAULT FALSE,
    date            TEXT,                        -- e.g. '2025-01'
    sort_order      INT NOT NULL DEFAULT 0,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────
-- 3. CERTIFICATIONS
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS certifications (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            TEXT NOT NULL,
    issuer          TEXT NOT NULL DEFAULT '',
    date            TEXT NOT NULL DEFAULT '',
    expiry_date     TEXT,
    credential_id   TEXT,
    credential_url  TEXT,
    image_url       TEXT,
    skills          TEXT[] NOT NULL DEFAULT '{}',
    description     TEXT,
    featured        BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order      INT NOT NULL DEFAULT 0,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────
-- 4. BLOG POSTS
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blog_posts (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title             TEXT NOT NULL,
    slug              TEXT NOT NULL UNIQUE,
    excerpt           TEXT NOT NULL DEFAULT '',
    content           TEXT NOT NULL DEFAULT '',      -- Markdown
    cover_image_url   TEXT,
    tags              TEXT[] NOT NULL DEFAULT '{}',
    published         BOOLEAN NOT NULL DEFAULT FALSE,
    published_at      TIMESTAMPTZ,
    read_time_minutes INT NOT NULL DEFAULT 5,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────
-- 5. SKILL CATEGORIES + SKILLS
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS skill_categories (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category    TEXT NOT NULL,
    sort_order  INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS skills (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES skill_categories(id) ON DELETE CASCADE,
    name        TEXT NOT NULL,
    level       INT NOT NULL DEFAULT 50 CHECK (level >= 0 AND level <= 100),
    icon        TEXT,
    sort_order  INT NOT NULL DEFAULT 0
);

-- ────────────────────────────────────────────────────────────
-- 6. AUTO-UPDATE updated_at TRIGGER
-- ────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach trigger to tables with updated_at
DO $$
DECLARE
    tbl TEXT;
BEGIN
    FOR tbl IN SELECT unnest(ARRAY['profile','projects','certifications','blog_posts'])
    LOOP
        EXECUTE format(
            'CREATE TRIGGER set_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION update_updated_at();',
            tbl
        );
    END LOOP;
END;
$$;

-- ────────────────────────────────────────────────────────────
-- 7. ROW LEVEL SECURITY (RLS)
--    Public = read-only  |  Authenticated = full access
-- ────────────────────────────────────────────────────────────

-- Enable RLS on all tables
ALTER TABLE profile         ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects        ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications  ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts      ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills          ENABLE ROW LEVEL SECURITY;

-- Public read for everyone (anon key)
CREATE POLICY "Public read profile"        ON profile         FOR SELECT USING (true);
CREATE POLICY "Public read projects"       ON projects        FOR SELECT USING (true);
CREATE POLICY "Public read certifications" ON certifications  FOR SELECT USING (true);
CREATE POLICY "Public read published blog" ON blog_posts      FOR SELECT USING (published = true);
CREATE POLICY "Public read skill_cats"     ON skill_categories FOR SELECT USING (true);
CREATE POLICY "Public read skills"         ON skills          FOR SELECT USING (true);

-- Authenticated (admin) full access
CREATE POLICY "Admin manage profile"       ON profile         FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage projects"      ON projects        FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage certifications" ON certifications FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage blog_posts"    ON blog_posts      FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage skill_cats"    ON skill_categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage skills"        ON skills          FOR ALL USING (auth.role() = 'authenticated');

-- ────────────────────────────────────────────────────────────
-- 8. STORAGE BUCKET for images
-- ────────────────────────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read for asset files
CREATE POLICY "Public read assets"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'portfolio-assets');

-- Allow authenticated users to upload/update/delete
CREATE POLICY "Admin upload assets"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'portfolio-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Admin update assets"
    ON storage.objects FOR UPDATE
    USING (bucket_id = 'portfolio-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Admin delete assets"
    ON storage.objects FOR DELETE
    USING (bucket_id = 'portfolio-assets' AND auth.role() = 'authenticated');

-- ============================================================
-- DONE! Tables, RLS, triggers, and storage are ready.
-- Next: Create an admin user in Authentication → Users
-- ============================================================
