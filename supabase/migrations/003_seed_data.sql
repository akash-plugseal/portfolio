-- Seed default projects (only if table is empty)
INSERT INTO projects (title, description, technologies, image_url, link, tag, category, subtitle, client, duration, role, year, challenge, solution, results, features, gallery, tech_stack)
SELECT * FROM (VALUES
  ('NovaVault Pro', 'A frictionless mobile banking experience featuring seamless tap-to-connect transfers with an intuitive interface.', ARRAY['Swift', 'UIKit', 'CoreData'], '/assets/images/app-ui.png', '#', 'iOS', 'ios', 'Modern Banking Reimagined', 'NovaBank', '6 months', 'Lead iOS Developer', '2023', 'Legacy banking apps had poor UX and slow performance', 'Built a native iOS app with CoreData caching and real-time sync', ARRAY['40% faster transactions', '4.8 star rating', '100K+ downloads'], '[{"title":"Tap to Transfer","description":"Send money instantly with NFC"},{"title":"Biometric Login","description":"Face ID & Touch ID support"}]'::jsonb, '{}'::text[], '[{"name":"Swift","category":"Language"},{"name":"CoreData","category":"Database"}]'::jsonb),
  ('PulseAPI', 'A high-performance REST & GraphQL API gateway built for mobile-first applications.', ARRAY['Node.js', 'TypeScript', 'Redis'], '/assets/images/app-ui.png', '#', 'Backend', 'cross-platform', 'API Gateway for Mobile', 'PulseTech', '4 months', 'Backend Architect', '2023', 'Mobile apps needed a unified API layer', 'Created a hybrid REST/GraphQL gateway with Redis caching', ARRAY['99.9% uptime', '50ms avg response', '10M+ requests/day'], '[{"title":"Hybrid API","description":"REST & GraphQL in one"},{"title":"Auto Scaling","description":"Handles traffic spikes automatically"}]'::jsonb, '{}'::text[], '[{"name":"Node.js","category":"Runtime"},{"name":"Redis","category":"Cache"}]'::jsonb),
  ('LensCameraAI', 'An AI-powered camera app with real-time image processing and smart filters.', ARRAY['Flutter', 'TensorFlow Lite', 'Dart'], '/assets/images/app-ui.png', '#', 'Flutter', 'cross-platform', 'AI Camera Revolution', 'LensCorp', '5 months', 'Flutter Developer', '2024', 'Real-time AI processing on mobile was slow', 'Implemented TensorFlow Lite with Flutter for on-device inference', ARRAY['60fps processing', '500K+ users', '4.7 star rating'], '[{"title":"Smart Filters","description":"AI-powered real-time filters"},{"title":"Scene Detection","description":"Automatic scene optimization"}]'::jsonb, '{}'::text[], '[{"name":"Flutter","category":"Framework"},{"name":"TensorFlow Lite","category":"AI"}]'::jsonb)
) AS v(title, description, technologies, image_url, link, tag, category, subtitle, client, duration, role, year, challenge, solution, results, features, gallery, tech_stack)
WHERE NOT EXISTS (SELECT 1 FROM projects LIMIT 1);

-- Seed default blogs (only if table is empty)
INSERT INTO blogs (title, excerpt, image_url, category, read_time, featured)
SELECT * FROM (VALUES
  ('Building Scalable Mobile Architecture', 'A deep dive into clean architecture patterns for cross-platform mobile development.', '/assets/images/blog.png', 'architecture', '8 Min Read', true),
  ('Flutter Performance Optimization', 'Tips and tricks to make your Flutter apps blazing fast.', '/assets/images/blog.png', 'flutter', '6 Min Read', false)
) AS v(title, excerpt, image_url, category, read_time, featured)
WHERE NOT EXISTS (SELECT 1 FROM blogs LIMIT 1);

-- Seed default milestones (only if table is empty)
INSERT INTO milestones (period, role, company, description, badge, sort_order)
SELECT * FROM (VALUES
  ('2023 - PRESENT', 'Senior Mobile Engineer', '@ TechFlow', 'Leading the transition of the core flagship product to a Flutter-based architecture, reducing development time by 40%.', 'Architected scalable design systems', 1),
  ('2022 - 2023', 'Full Stack Developer', '@ CreativeLabs', 'Developed end-to-end mobile solutions using React Native and Node.js. Optimized app startup times by 25%.', 'Built 5+ cross-platform MVP apps', 2),
  ('2021 - 2022', 'Junior Developer', '@ StartUp Sphere', 'Began professional journey focusing on UI/UX implementation and frontend responsiveness.', 'Mastered Dart & React primitives', 3)
) AS v(period, role, company, description, badge, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM milestones LIMIT 1);
