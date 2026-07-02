import { useParams, Link } from 'react-router-dom';
import { usePortfolioViewModel } from '../../viewmodels/usePortfolioViewModel';
import { ArrowLeft, Calendar, Clock, Tag, Share2, Bookmark } from 'lucide-react';
import { SkeletonBlogPost } from '../components/Skeleton';

const categoryColors: Record<string, string> = {
  'flutter': '#06b6d4',
  'react-native': '#8b5cf6',
  'architecture': '#f59e0b',
  'performance': '#10b981'
};

const categoryLabels: Record<string, string> = {
  'flutter': 'Flutter Tips',
  'react-native': 'React Native',
  'architecture': 'Architecture',
  'performance': 'Performance'
};

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const { blogs, loading } = usePortfolioViewModel();

  if (loading) {
    return <SkeletonBlogPost />;
  }

  const post = blogs.find(blog => blog.id === id);

  if (!post) {
    return (
      <div className="blog-post-container">
        <div className="blog-post-not-found">
          <h2>Blog post not found</h2>
          <Link to="/blog" className="back-link">
            <ArrowLeft size={18} /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-container">
      {/* Back Navigation */}
      <Link to="/blog" className="blog-post-back">
        <ArrowLeft size={18} />
        <span>Back to Articles</span>
      </Link>

      {/* Article Header */}
      <header className="blog-post-header">
        <div 
          className="blog-post-category"
          style={{ backgroundColor: categoryColors[post.category] }}
        >
          {categoryLabels[post.category]}
        </div>
        <h1 className="blog-post-title">{post.title}</h1>
        <div className="blog-post-meta">
          <div className="blog-post-meta-item">
            <Calendar size={16} />
            <span>{post.date}</span>
          </div>
          <div className="blog-post-meta-item">
            <Clock size={16} />
            <span>{post.readTime}</span>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="blog-post-image">
        <img src={post.imageUrl} alt={post.title} />
      </div>

      {/* Author Info */}
      <div className="blog-post-author glass-card">
        <div className="blog-post-author-avatar"></div>
        <div className="blog-post-author-info">
          <span className="blog-post-author-name">{post.author || 'DevStack Lead'}</span>
          <span className="blog-post-author-role">{post.authorRole || 'Cross-Platform Architect'}</span>
        </div>
        <div className="blog-post-actions">
          <button className="blog-post-action-btn" title="Share">
            <Share2 size={18} />
          </button>
          <button className="blog-post-action-btn" title="Bookmark">
            <Bookmark size={18} />
          </button>
        </div>
      </div>

      {/* Article Content */}
      <article className="blog-post-content">
        {/* Description (full excerpt) */}
        {post.excerpt && (
          <section className="blog-post-description">
            <h2>Description</h2>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          </section>
        )}

        {post.content?.map((section, index) => {
          switch (section.type) {
            case 'heading':
              return (
                <h2 key={index} className="blog-post-heading">
                  {section.content}
                </h2>
              );
            case 'paragraph':
              return (
                <p key={index} className="blog-post-paragraph">
                  {section.content}
                </p>
              );
            case 'code':
              return (
                <div key={index} className="blog-post-code">
                  {section.language && (
                    <div className="blog-post-code-header">
                      <span className="blog-post-code-lang">{section.language}</span>
                    </div>
                  )}
                  <pre><code>{section.content}</code></pre>
                </div>
              );
            case 'list':
              return (
                <div key={index} className="blog-post-list">
                  {section.content && (
                    <h4 className="blog-post-list-title">{section.content}</h4>
                  )}
                  <ul>
                    {section.items?.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </div>
              );
            case 'quote':
              return (
                <blockquote key={index} className="blog-post-quote">
                  <p>{section.content}</p>
                </blockquote>
              );
            default:
              return null;
          }
        })}
      </article>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="blog-post-tags">
          <Tag size={16} />
          <div className="blog-post-tags-list">
            {post.tags.map((tag, index) => (
              <span key={index} className="blog-post-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter CTA */}
      <div className="blog-post-cta glass-card">
        <h3>Enjoyed this article?</h3>
        <p>Subscribe to get more technical insights delivered straight to your inbox.</p>
        <form className="blog-post-cta-form" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="blog-post-cta-input" 
          />
          <button type="submit" className="blog-post-cta-btn">
            Subscribe
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-brand">DevStack</div>
        <div className="footer-copyright">Built with Precision.</div>
        <div className="footer-links">
          <a href="#" className="footer-link">GitHub</a>
          <a href="#" className="footer-link">LinkedIn</a>
          <a href="#" className="footer-link">Twitter</a>
          <a href="#" className="footer-link">Stack Overflow</a>
        </div>
        <div className="footer-copyright">© 2024 DevStack. All Rights Reserved.</div>
      </footer>
    </div>
  );
};

export default BlogPost;
