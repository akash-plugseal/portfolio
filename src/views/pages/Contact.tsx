import { usePortfolioViewModel } from '../../viewmodels/usePortfolioViewModel';
import { Mail, Link2, Code2, MessageCircle, Phone, ArrowRight, Quote } from 'lucide-react';
import { Skeleton } from '../components/Skeleton';

const Contact = () => {
  const { profile, footerLinks, loading } = usePortfolioViewModel();

  if (loading || !profile) {
    return (
      <div className="contact-container" style={{ padding: '120px 20px 60px', maxWidth: 900, margin: '0 auto' }}>
        <Skeleton height="48px" width="60%" />
        <Skeleton height="20px" width="40%" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 40 }}>
          <Skeleton height="200px" />
          <Skeleton height="200px" />
        </div>
      </div>
    );
  }

  return (
    <div className="contact-container">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-badge">
          <span>AVAILABLE FOR PROJECTS</span>
        </div>
        <h1 className="contact-hero-title">
          Let's build <span className="highlight">something</span><br />
          together.
        </h1>
        <p className="contact-hero-description">
          Whether you have a specific mobile architecture challenge or a creative 
          application idea, I'm here to translate your vision into performant, elegant code.
        </p>
      </section>

      {/* Main Content */}
      <div className="contact-content">
        {/* Contact Form */}
        <div className="contact-form-section glass-card">
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" placeholder="John Doe" className="form-input" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="john@example.com" className="form-input" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <select id="subject" className="form-input form-select">
                <option value="new-project">New Mobile Project</option>
                <option value="consultation">Consultation</option>
                <option value="collaboration">Collaboration</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea 
                id="message" 
                rows={5} 
                placeholder="Tell me about your tech stack and project goals..." 
                className="form-input form-textarea"
              ></textarea>
            </div>
            <button type="submit" className="btn-send-message">
              Send Message <ArrowRight size={18} />
            </button>
          </form>
        </div>

        {/* Contact Details */}
        <div className="contact-details-section">
          <div className="contact-details-card glass-card">
            <h2>Contact Details</h2>
            <div className="contact-info-list">
              <div className="contact-info-item">
                <Mail size={20} />
                <div className="contact-info-content">
                  <span className="contact-info-label">EMAIL</span>
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </div>
              </div>
              <div className="contact-info-item">
                <Link2 size={20} />
                <div className="contact-info-content">
                  <span className="contact-info-label">LINKEDIN</span>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
              </div>
              <div className="contact-info-item">
                <Code2 size={20} />
                <div className="contact-info-content">
                  <span className="contact-info-label">GITHUB</span>
                  <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
              </div>
              <div className="contact-info-item">
                <MessageCircle size={20} />
                <div className="contact-info-content">
                  <span className="contact-info-label">TWITTER</span>
                  <a href={profile.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
                </div>
              </div>
              <div className="contact-info-item">
                <Phone size={20} />
                <div className="contact-info-content">
                  <span className="contact-info-label">BOOK A CALL</span>
                  <a href="#">Schedule a call</a>
                </div>
              </div>
            </div>
          </div>

          {/* Quote Card */}
          <div className="quote-card glass-card">
            <Quote size={32} className="quote-icon" />
            <p className="quote-text">
              "Efficiency is doing things right; effectiveness is doing the right things. 
              Let's ensure your mobile experience is both."
            </p>
            <div className="quote-author">
              <div className="quote-avatar"></div>
              <div className="quote-author-info">
                <span className="quote-author-name">DevStack Lead</span>
                <span className="quote-author-title">Cross-Platform Architect</span>
              </div>
            </div>
          </div>
        </div>
      </div>

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

export default Contact;
