-- Create storage bucket for resumes
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to resumes bucket
CREATE POLICY "Public access for resumes" ON storage.objects
  FOR SELECT USING (bucket_id = 'resumes');

-- Allow authenticated uploads to resumes bucket
CREATE POLICY "Authenticated uploads for resumes" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'resumes');

-- Allow updates to resumes bucket
CREATE POLICY "Authenticated updates for resumes" ON storage.objects
  FOR UPDATE USING (bucket_id = 'resumes');

-- Allow deletes from resumes bucket
CREATE POLICY "Authenticated deletes for resumes" ON storage.objects
  FOR DELETE USING (bucket_id = 'resumes');
