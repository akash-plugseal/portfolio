import { useState } from 'react';
import { usePortfolioViewModel } from '../../viewmodels/usePortfolioViewModel';
import BlogCard from '../components/BlogCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SkeletonBlog } from '../components/Skeleton';

const categories = [
  { id: 'all', label: 'All Articles' },
  { id: 'flutter', label: 'Flutter Tips' },
  { id: 'react-native', label: 'React Native' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'performance', label: 'Performance' }
];

const Blog = () => {
  const {profile, footerLinks, blogs, loading } = usePortfolioViewModel();
  const [activeCategory, setActiveCategory] = useState('all');

  if (loading) {
    return <SkeletonBlog />;
  }

  const filteredBlogs = activeCategory === 'all' 
    ? blogs 
    : blogs.filter(blog => blog.category === activeCategory);

  const featuredBlog = blogs.find(blog => blog.featured);
  const regularBlogs = filteredBlogs.filter(blog => !blog.featured);

  return (
    <div className="blog-container">
      {/* Hero Section */}
      <header className="blog-hero">
        <div className="blog-badge">
          <span>TECHNOLOGIES & IDEAS</span>
        </div>
        <h1 className="blog-hero-title">
          Technical <span className="highlight">Insights</span> &<br />
          Mobile Musings
        </h1>
        <p className="blog-hero-subtitle">
          Deep dives into cross-platform excellence. Sharing my journey through Flutter 
          internals, React Native performance, and scalable mobile architectures.
        </p>
      </header>

      {/* Filter Tabs */}
      <div className="blog-filters">
        {categories.map(category => (
          <button
            key={category.id}
            className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Featured Article */}
      {featuredBlog && activeCategory === 'all' && (
        <div className="blog-featured-section">
          <BlogCard post={featuredBlog} featured />
        </div>
      )}

      {/* Blog Grid */}
      <div className="blog-grid">
        {regularBlogs.map(post => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination */}
      <div className="blog-pagination">
        <button className="pagination-btn" disabled>
          <ChevronLeft size={18} />
        </button>
        <button className="pagination-btn active">1</button>
        <button className="pagination-btn">2</button>
        <button className="pagination-btn">3</button>
        <button className="pagination-btn">
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Newsletter Section */}
      <section className="newsletter-section glass-card">
        <h2 className="newsletter-title">
          Stay in the loop with the latest in mobile dev.
        </h2>
        <p className="newsletter-subtitle">
          Join over 2,000 developers receiving monthly curated content on Flutter, 
          React Native, and mobile architecture patterns.
        </p>
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="newsletter-input" 
          />
          <button type="submit" className="newsletter-btn">
            Subscribe
          </button>
        </form>
        <p className="newsletter-note">Zero spam. Only high-quality technical content.</p>
      </section>

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

export default Blog;
