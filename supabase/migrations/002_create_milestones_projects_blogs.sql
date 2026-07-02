-- Add new columns to blogs table if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blogs' AND column_name = 'date') THEN
    ALTER TABLE blogs ADD COLUMN date TEXT NOT NULL DEFAULT '';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blogs' AND column_name = 'author') THEN
    ALTER TABLE blogs ADD COLUMN author TEXT NOT NULL DEFAULT '';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blogs' AND column_name = 'author_role') THEN
    ALTER TABLE blogs ADD COLUMN author_role TEXT NOT NULL DEFAULT '';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blogs' AND column_name = 'content') THEN
    ALTER TABLE blogs ADD COLUMN content JSONB NOT NULL DEFAULT '[]';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blogs' AND column_name = 'tags') THEN
    ALTER TABLE blogs ADD COLUMN tags TEXT[] NOT NULL DEFAULT '{}';
  END IF;
END $$;
