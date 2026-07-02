-- Work Experience table
CREATE TABLE IF NOT EXISTS work_experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  value TEXT NOT NULL DEFAULT '3+',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE work_experience ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON work_experience FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON work_experience FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access" ON work_experience FOR UPDATE USING (true);
CREATE POLICY "Public delete access" ON work_experience FOR DELETE USING (true);
INSERT INTO work_experience (value) SELECT '3+' WHERE NOT EXISTS (SELECT 1 FROM work_experience LIMIT 1);

-- DevStack Portfolio table
CREATE TABLE IF NOT EXISTS devstack_portfolio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  value TEXT NOT NULL DEFAULT '5+',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE devstack_portfolio ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON devstack_portfolio FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON devstack_portfolio FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access" ON devstack_portfolio FOR UPDATE USING (true);
CREATE POLICY "Public delete access" ON devstack_portfolio FOR DELETE USING (true);
INSERT INTO devstack_portfolio (value) SELECT '5+' WHERE NOT EXISTS (SELECT 1 FROM devstack_portfolio LIMIT 1);

-- Apps Launched table
CREATE TABLE IF NOT EXISTS apps_launched (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  value TEXT NOT NULL DEFAULT '10+',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE apps_launched ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON apps_launched FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON apps_launched FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access" ON apps_launched FOR UPDATE USING (true);
CREATE POLICY "Public delete access" ON apps_launched FOR DELETE USING (true);
INSERT INTO apps_launched (value) SELECT '10+' WHERE NOT EXISTS (SELECT 1 FROM apps_launched LIMIT 1);

-- Git Commits table
CREATE TABLE IF NOT EXISTS git_commits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  value TEXT NOT NULL DEFAULT '2000+',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE git_commits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON git_commits FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON git_commits FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access" ON git_commits FOR UPDATE USING (true);
CREATE POLICY "Public delete access" ON git_commits FOR DELETE USING (true);
INSERT INTO git_commits (value) SELECT '2000+' WHERE NOT EXISTS (SELECT 1 FROM git_commits LIMIT 1);

-- Crash Free Rate table
CREATE TABLE IF NOT EXISTS crash_free_rate (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  value TEXT NOT NULL DEFAULT '99.5%',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE crash_free_rate ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON crash_free_rate FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON crash_free_rate FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access" ON crash_free_rate FOR UPDATE USING (true);
CREATE POLICY "Public delete access" ON crash_free_rate FOR DELETE USING (true);
INSERT INTO crash_free_rate (value) SELECT '99.5%' WHERE NOT EXISTS (SELECT 1 FROM crash_free_rate LIMIT 1);

-- Client Satisfaction table
CREATE TABLE IF NOT EXISTS client_satisfaction (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  value TEXT NOT NULL DEFAULT '100%',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE client_satisfaction ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON client_satisfaction FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON client_satisfaction FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access" ON client_satisfaction FOR UPDATE USING (true);
CREATE POLICY "Public delete access" ON client_satisfaction FOR DELETE USING (true);
INSERT INTO client_satisfaction (value) SELECT '100%' WHERE NOT EXISTS (SELECT 1 FROM client_satisfaction LIMIT 1);

-- Resume table
CREATE TABLE IF NOT EXISTS resume (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  value TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE resume ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON resume FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON resume FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access" ON resume FOR UPDATE USING (true);
CREATE POLICY "Public delete access" ON resume FOR DELETE USING (true);
