import { usePortfolioViewModel } from '../../viewmodels/usePortfolioViewModel';
import { Code2, Smartphone, Award, Zap } from 'lucide-react';
import { SkeletonAbout } from '../components/Skeleton';

const About = () => {
  const {
    profile, techSkills, tools, footerLinks, milestones, loading,
    appsLaunched, gitCommits, crashFreeRate, clientSatisfaction, resumeUrl
  } = usePortfolioViewModel();

  // Dynamic stats from Supabase
  const dynamicStats = [
    { value: appsLaunched, label: 'Apps Launched' },
    { value: gitCommits, label: 'Git Commits' },
    { value: crashFreeRate, label: 'Crash-Free Rate' },
    { value: clientSatisfaction, label: 'Client Satisfaction' },
  ];

  if (loading || !profile) {
    return <SkeletonAbout />;
  }

  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <div className="about-badge">
            <Zap size={14} />
            <span>3 YEARS IN THE STACK</span>
          </div>
          <h1 className="about-hero-title">
            Architecting<br />
            <span className="highlight">Experiences</span> through<br />
            Code.
          </h1>
          <p className="about-hero-description" dangerouslySetInnerHTML={{ __html: profile.bio }} />
        </div>
        <div className="about-hero-image">
          <img src={profile.avatarUrl} alt="Mobile Development" className="about-hero-img" />
        </div>
      </section>

      {/* Journey Section */}
      <section className="journey-section glass-card">
        <div className="journey-content">
          <h2 className="section-title">The Journey So Far</h2>
          <div className="journey-text">
            <p>
              It started with a curiosity about how the apps in our pockets actually worked. 
              Over the last 3 years, that curiosity evolved into a professional career focused 
              on bridging the gap between complex logic and beautiful user experiences.
            </p>
            <p>
              I transitioned from traditional web development to mobile-first environments, 
              quickly realizing that the constraints of mobile—limited real estate and high 
              performance expectations—were exactly where I thrived as a problem solver.
            </p>
            <p>
              Today, I specialize in Flutter and React Native, leveraging the best of both 
              worlds to deliver scalable products that don't compromise on native feel.
            </p>
          </div>
        </div>
        <div className="journey-stats">
          {dynamicStats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Toolbox Section */}
      <section className="toolbox-section">
        <div className="toolbox-header">
          <div>
            <h2 className="section-title">Technical Toolbox</h2>
            <p className="section-subtitle">My core stack and the tools that power my workflow.</p>
          </div>
          <div className="toolbox-badge">Active Focus</div>
        </div>
        
        <div className="toolbox-grid">
          {techSkills.map((skill, index) => (
            <div key={index} className={`toolbox-card glass-card ${skill.level}`}>
              <div className="toolbox-card-header">
                <div className="toolbox-card-icon">
                  {skill.name === 'Flutter' ? <Smartphone size={24} /> : <Code2 size={24} />}
                </div>
                <div className="toolbox-card-badge">{skill.level}</div>
              </div>
              <h3>{skill.name}</h3>
              <p>{skill.description}</p>
            </div>
          ))}
        </div>

        <div className="tools-grid">
          {tools.map((tool, index) => (
            <div key={index} className="tool-chip">
              {tool}
            </div>
          ))}
        </div>
      </section>

      {/* Professional Milestones Section */}
      <section className="milestones-section">
        <h2 className="section-title centered">Professional Milestones</h2>
        
        <div className="timeline">
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="timeline-content glass-card">
                <div className="timeline-period">{milestone.period}</div>
                <h3 className="timeline-role">
                  {milestone.role} <span className="timeline-company">{milestone.company}</span>
                </h3>
                <p className="timeline-description" dangerouslySetInnerHTML={{ __html: milestone.description }} />
              </div>
              <div className="timeline-badge glass-card">
                <Award size={16} />
                <span>{milestone.badge}</span>
              </div>
              <div className="timeline-dot"></div>
            </div>
          ))}
          <div className="timeline-line"></div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section about-cta">
        <div className="cta-gradient-line"></div>
        <h2 className="cta-title">
          Ready to build something<br />
          extraordinary?
        </h2>
        <p className="cta-subtitle">
          I'm currently open to new opportunities and interesting collaborations in the mobile space.
        </p>
        <div className="cta-actions">
          <a href="/contact" className="btn-primary">
            Get In Touch
          </a>
          {resumeUrl ? (
            <a href={resumeUrl} download className="btn-outline" target="_blank" rel="noopener noreferrer">
              Download Resume
            </a>
          ) : (
            <button className="btn-outline" disabled>
              Resume Not Available
            </button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-brand">{profile.name}</div>
        <div className="footer-copyright">© 2024 {profile.name} Portfolio. Built with Precision.</div>
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

export default About;
