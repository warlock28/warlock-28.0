-- Create the services table
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT,
    features JSONB DEFAULT '[]'::jsonb NOT NULL,
    featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public profiles are viewable by everyone."
ON services FOR SELECT
USING (true);

-- Allow authenticated users (admin) full access
CREATE POLICY "Authenticated users have full access to services."
ON services FOR ALL
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_services_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_services_updated_at
    BEFORE UPDATE ON services
    FOR EACH ROW
    EXECUTE FUNCTION update_services_updated_at_column();

-- Insert dummy data
INSERT INTO services (title, description, icon, features, featured, sort_order)
VALUES 
('Full Stack Web Development', 'End-to-end web application development using modern frameworks like React, Node.js, and Supabase. Building scalable and responsive solutions.', 'Code2', '["Custom Web Applications", "API Development & Integration", "Database Design", "Performance Optimization"]', true, 1),
('UI/UX Design', 'Creating intuitive and visually stunning user interfaces with a focus on user experience, modern aesthetics, and accessibility.', 'PenTool', '["Wireframing & Prototyping", "Responsive Design", "Design Systems", "User Testing"]', true, 2),
('Cybersecurity Consulting', 'Identifying vulnerabilities, securing applications, and providing best practices to protect digital assets against modern threats.', 'ShieldCheck', '["Security Audits", "Vulnerability Assessment", "Secure Coding Practices", "Incident Response planning"]', true, 3);
