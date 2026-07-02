import { useParams, Link } from 'react-router-dom';
import { usePortfolioViewModel } from '../../viewmodels/usePortfolioViewModel';
import { ArrowLeft, ExternalLink, Calendar, Clock, User, Briefcase, CheckCircle } from 'lucide-react';
import { SkeletonProjectDetail } from '../components/Skeleton';

const categoryColors: Record<string, string> = {
  'ios': '#638CBE',
  'android': '#2C3E3A',
  'cross-platform': '#638CBE'
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const {profile, footerLinks, projects, loading } = usePortfolioViewModel();

  if (loading) {
    return <SkeletonProjectDetail />;
  }

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="project-detail-container">
        <div className="project-detail-not-found">
          <h2>Project not found</h2>
          <Link to="/projects" className="back-link">
            <ArrowLeft size={18} /> Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="project-detail-container">
      {/* Back Navigation */}
      <Link to="/projects" className="project-detail-back">
        <ArrowLeft size={18} />
        <span>Back to Projects</span>
      </Link>

      {/* Hero Section */}
      <header className="project-detail-hero">
        <div 
          className="project-detail-category"
          style={{ backgroundColor: categoryColors[project.category] }}
        >
          {project.category}
        </div>
        <h1 className="project-detail-title">{project.title}</h1>
        {project.subtitle && (
          <p className="project-detail-subtitle">{project.subtitle}</p>
        )}
      </header>

      {/* Project Meta */}
      <div className="project-detail-meta glass-card">
        {project.client && (
          <div className="project-detail-meta-item">
            <Briefcase size={18} />
            <div>
              <span className="meta-label">Client</span>
              <span className="meta-value">{project.client}</span>
            </div>
          </div>
        )}
        {project.duration && (
          <div className="project-detail-meta-item">
            <Clock size={18} />
            <div>
              <span className="meta-label">Duration</span>
              <span className="meta-value">{project.duration}</span>
            </div>
          </div>
        )}
        {project.role && (
          <div className="project-detail-meta-item">
            <User size={18} />
            <div>
              <span className="meta-label">Role</span>
              <span className="meta-value">{project.role}</span>
            </div>
          </div>
        )}
        {project.year && (
          <div className="project-detail-meta-item">
            <Calendar size={18} />
            <div>
              <span className="meta-label">Year</span>
              <span className="meta-value">{project.year}</span>
            </div>
          </div>
        )}
      </div>

      {/* Featured Image */}
      <div className="project-detail-image">
        <img src={project.imageUrl} alt={project.title} />
      </div>

      {/* Overview */}
      <section className="project-detail-section">
        <h2>Overview</h2>
        <p className="project-detail-description" dangerouslySetInnerHTML={{ __html: project.description }} />
      </section>

      {/* Challenge & Solution */}
      {(project.challenge || project.solution) && (
        <div className="project-detail-challenge-solution">
          {project.challenge && (
            <div className="project-detail-challenge glass-card">
              <h3>The Challenge</h3>
              <p>{project.challenge}</p>
            </div>
          )}
          {project.solution && (
            <div className="project-detail-solution glass-card">
              <h3>The Solution</h3>
              <p>{project.solution}</p>
            </div>
          )}
        </div>
      )}

      {/* Features */}
      {project.features && project.features.length > 0 && (
        <section className="project-detail-section">
          <h2>Key Features</h2>
          <div className="project-detail-features">
            {project.features.map((feature, index) => (
              <div key={index} className="project-detail-feature glass-card">
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Results */}
      {project.results && project.results.length > 0 && (
        <section className="project-detail-section">
          <h2>Results & Impact</h2>
          <div className="project-detail-results">
            {project.results.map((result, index) => (
              <div key={index} className="project-detail-result">
                <CheckCircle size={20} />
                <span>{result}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tech Stack */}
      {project.techStack && project.techStack.length > 0 && (
        <section className="project-detail-section">
          <h2>Technology Stack</h2>
          <div className="project-detail-tech-stack">
            {project.techStack.map((tech, index) => (
              <div key={index} className="project-detail-tech-item glass-card">
                <span className="tech-name">{tech.name}</span>
                <span className="tech-category">{tech.category}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Technologies Used */}
      <section className="project-detail-section">
        <h2>Technologies Used</h2>
        <div className="project-detail-technologies">
          {project.technologies.map((tech, index) => (
            <span key={index} className="project-detail-tech-badge">
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="project-detail-section">
          <h2>Gallery</h2>
          <div className="project-detail-gallery">
            {project.gallery.map((image, index) => (
              <div key={index} className="project-detail-gallery-item">
                <img src={image} alt={`${project.title} screenshot ${index + 1}`} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <div className="project-detail-cta glass-card">
        <h3>Interested in similar work?</h3>
        <p>Let's discuss how I can help bring your mobile app idea to life.</p>
        <div className="project-detail-cta-actions">
          <Link to="/contact" className="btn-primary">
            Get In Touch
          </Link>
          <a href={project.link} className="btn-outline" target="_blank" rel="noopener noreferrer">
            Visit Project <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {/* Footer */}
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

export default ProjectDetail;
