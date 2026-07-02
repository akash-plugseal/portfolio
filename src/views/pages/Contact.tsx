import { useState } from 'react';
import { usePortfolioViewModel } from '../../viewmodels/usePortfolioViewModel';
import {
  Mail,
  Link2,
  Code2,
  MessageCircle,
  Phone,
  Quote,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { Skeleton } from '../components/Skeleton';
import {
  sendContactEmail,
  type ContactFormData,
} from '../../services/contactService';

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const Contact = () => {
  const { profile, footerLinks, loading } = usePortfolioViewModel();

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (loading || !profile) {
    return (
      <div
        className="contact-container"
        style={{ padding: '120px 20px 60px', maxWidth: 900, margin: '0 auto' }}
      >
        <Skeleton height="48px" width="60%" />
        <Skeleton height="20px" width="40%" />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 24,
            marginTop: 40,
          }}
        >
          <Skeleton height="200px" />
          <Skeleton height="200px" />
        </div>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      setSubmitStatus('error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      setSubmitStatus('error');
      return;
    }

    const result = await sendContactEmail(formData);

    if (result.success) {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      setErrorMessage(result.error || 'Something went wrong. Please try again.');
      setSubmitStatus('error');
    }
  };

  return (
    <div className="contact-container">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-badge">
          <span>AVAILABLE FOR PROJECTS</span>
        </div>
        <h1 className="contact-hero-title">
          Let's build <span className="highlight">something</span>
          <br />
          together.
        </h1>
        <p className="contact-hero-description">
          Whether you have a specific mobile architecture challenge or a creative
          application idea, I'm here to translate your vision into performant,
          elegant code.
        </p>
      </section>

      {/* Main Content */}
      <div className="contact-content">
        {/* Contact Form */}
        <div className="contact-form-section glass-card">
          {submitStatus === 'success' && (
            <div className="form-feedback form-success">
              <CheckCircle size={20} />
              <span>
                Message sent successfully! I'll get back to you soon.
              </span>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="form-feedback form-error">
              <AlertCircle size={20} />
              <span>{errorMessage}</span>
            </div>
          )}

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="What's this about?"
                className="form-input"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Your Message *</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell me about your tech stack and project goals..."
                className="form-input form-textarea"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn-send-message"
              disabled={submitStatus === 'submitting'}
            >
              {submitStatus === 'submitting' ? (
                <>
                  <Loader2 size={18} className="spin" /> Sending...
                </>
              ) : (
                <>
                  Send Message <Send size={18} />
                </>
              )}
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
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
              <div className="contact-info-item">
                <Code2 size={20} />
                <div className="contact-info-content">
                  <span className="contact-info-label">GITHUB</span>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </div>
              </div>
              <div className="contact-info-item">
                <MessageCircle size={20} />
                <div className="contact-info-content">
                  <span className="contact-info-label">TWITTER</span>
                  <a
                    href={profile.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>
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
              "Efficiency is doing things right; effectiveness is doing the
              right things. Let's ensure your mobile experience is both."
            </p>
            <div className="quote-author">
              <div className="quote-avatar"></div>
              <div className="quote-author-info">
                <span className="quote-author-name">DevStack Lead</span>
                <span className="quote-author-title">
                  Cross-Platform Architect
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-brand">{profile.name}</div>
        <div className="footer-copyright">
          © 2024 {profile.name} Portfolio. Built with Precision.
        </div>
        <div className="footer-links">
          {footerLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default Contact;
