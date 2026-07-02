import { useState } from 'react';
import { usePortfolioViewModel } from '../../viewmodels/usePortfolioViewModel';
import ProjectCard from '../components/ProjectCard';
import { Code2, Smartphone, Monitor, Layers } from 'lucide-react';
import { SkeletonProjects } from '../components/Skeleton';

const categories = [
  { id: 'all', label: 'All', icon: <Layers size={16} /> },
  { id: 'ios', label: 'iOS', icon: <Smartphone size={16} /> },
  { id: 'android', label: 'Android', icon: <Smartphone size={16} /> },
  { id: 'cross-platform', label: 'Cross-Platform', icon: <Monitor size={16} /> }
];

const techStack = [
  { name: 'React Native', icon: <Code2 size={16} /> },
  { name: 'Flutter', icon: <Code2 size={16} /> },
  { name: 'Firebase', icon: <Code2 size={16} /> },
  { name: 'TypeScript', icon: <Code2 size={16} /> }
];

const Projects = () => {
  const { profile, projects, footerLinks, loading } = usePortfolioViewModel();
  const [activeCategory, setActiveCategory] = useState('all');

  if (loading) {
    return <SkeletonProjects />;
  }

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className="projects-container">
      <header className="projects-hero">
        <h1 className="projects-hero-title">
          Crafting High-<br />
          Performance <span className="hero-title-highlight">Mobile</span><br />
          Experiences
        </h1>
        <p className="projects-hero-subtitle">
          A curated showcase of engineering precision and intuitive design across iOS, Android, 
          and cross-platform applications.
        </p>
      </header>

      <div className="projects-filters">
        {categories.map(category => (
          <button
            key={category.id}
            className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.icon}
            {category.label}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filteredProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <section className="tech-stack-section">
        <div className="tech-stack-content">
          <h2 className="tech-stack-title">The Stack Behind the Projects</h2>
          <p className="tech-stack-subtitle">
            Specializing in frameworks that deliver native performance with 
            cross-platform efficiency. Fluent in ecosystems of native tools to ensure scalability and speed.
          </p>
          <div className="tech-stack-grid">
            {techStack.map((tech, index) => (
              <div key={index} className="tech-stack-item">
                {tech.icon}
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="tech-stack-illustration">
          <div className="tech-icon-large">
            <Code2 size={48} />
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-brand">{profile?.name}</div>
        <div className="footer-copyright">© 2024 {profile?.name} Portfolio. Built with Precision.</div>
        <div className="footer-links">
          {footerLinks.map((link, idx) => (
            <a key={idx} href={link.url} className="footer-link" target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default Projects;
