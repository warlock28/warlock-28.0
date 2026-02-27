-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Allow public to insert messages
CREATE POLICY "Public can insert messages"
    ON messages FOR INSERT
    WITH CHECK (true);

-- Allow authenticated users to view messages
CREATE POLICY "Authenticated users can view messages"
    ON messages FOR SELECT
    USING (auth.role() = 'authenticated');

-- Allow authenticated users to update messages
CREATE POLICY "Authenticated users can update messages"
    ON messages FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete messages
CREATE POLICY "Authenticated users can delete messages"
    ON messages FOR DELETE
    USING (auth.role() = 'authenticated');
