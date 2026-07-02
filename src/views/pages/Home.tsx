import { usePortfolioViewModel } from '../../viewmodels/usePortfolioViewModel';
import { Link } from 'react-router-dom';
import { MonitorSmartphone, ChevronDown, ArrowRight, Zap, Triangle, Mail, Code2, Download } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import { SkeletonHome } from '../components/Skeleton';

const Home = () => {
  const { profile, projects, philosophy, footerLinks, crashFreeRate, appsLaunched, workExperience, resumeUrl, loading } = usePortfolioViewModel();

  // Merge meta data into philosophy cards
  const dynamicPhilosophy = philosophy.map(card => {
    if (card.statLabel === 'CRASH-FREE USERS') {
      return { ...card, stat: crashFreeRate || card.stat };
    }
    if (card.statLabel === 'STORE RELEASES') {
      return { ...card, stat: appsLaunched || card.stat };
    }
    return card;
  });


  if (loading || !profile) {
    return <SkeletonHome />;
  }

  const scrollToProjects = () => {
    document.getElementById('featured-projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge">
          <MonitorSmartphone size={16} />
          {workExperience} YEARS CROSS-PLATFORM EXPERTISE
        </div>
        <h1 className="hero-title">
          Crafting <span className="hero-title-highlight">Seamless</span> Mobile Experiences
        </h1>
        <p className="hero-subtitle">
          Architecting high-performance Flutter and React Native applications that bridge the gap between native power and cross-platform efficiency.
        </p>
        <div className="hero-actions">
          <button onClick={scrollToProjects} className="btn-primary">
            View Projects <ArrowRight size={18} style={{ marginLeft: 8 }} />
          </button>
          <Link to="/about" className="btn-outline">
            Technical Stack
          </Link>
        </div>
        {resumeUrl && (
          <div className="hero-actions">
            <a href={resumeUrl} download className="btn-outline" target="_blank" rel="noopener noreferrer">
              <Download size={18} style={{ marginRight: 8 }} />
              Download Resume
            </a>
          </div>
        )}
        <div className="hero-scroll-indicator" onClick={scrollToProjects}>
          <ChevronDown size={24} />
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="featured-projects-section" id="featured-projects">
        <div className="section-header">
          <div className="section-header-text">
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">
              Selected works that showcase architectural integrity, fluid UI/UX, and technical depth in mobile engineering.
            </p>
          </div>
          <Link to="/projects" className="section-link">
            Explore All Work <ArrowRight size={16} />
          </Link>
        </div>
        <div className="projects-grid">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Engineering Philosophy Section */}
      <section className="philosophy-section">
        <div>
          <h2 className="philosophy-title">Engineering Philosophy</h2>
          <span className="philosophy-title-underline"></span>
        </div>
        <div className="philosophy-grid">
          {dynamicPhilosophy.map(card => (
            <div key={card.id} className={`philosophy-card glass-card ${card.large ? 'large' : ''}`}>
              {card.stat ? (
                <div className="philosophy-stat">
                  <div className="philosophy-stat-value">{card.stat}</div>
                  <div className="philosophy-stat-label">{card.statLabel}</div>
                </div>
              ) : (
                <>
                  {card.icon === 'triangle' && (
                    <div className="philosophy-card-icon">
                      <Triangle size={28} />
                    </div>
                  )}
                  {card.icon === 'zap' && (
                    <div className="philosophy-card-icon">
                      <Zap size={28} />
                    </div>
                  )}
                  <h3 className="philosophy-card-title">{card.title}</h3>
                  <p className="philosophy-card-description">{card.description}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2 className="cta-title">Ready to launch your next mobile breakthrough?</h2>
        <p className="cta-subtitle">
          Whether it's a startup MVP or a complex enterprise solution, I provide the technical precision required for success.
        </p>
        <div className="cta-actions">
          <Link to="/contact" className="btn-primary">Let's Collaborate</Link>
          <a href={`mailto:${profile.email}`} className="cta-icon-btn" aria-label="Email">
            <Mail size={18} />
          </a>
          <a href={profile.github} className="cta-icon-btn" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
            <Code2 size={18} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <span className="footer-brand">{profile.name}</span>
        <span className="footer-copyright">© 2024 {profile.name}. Built with Precision.</span>
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

export default Home;
