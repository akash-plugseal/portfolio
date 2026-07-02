import { Link } from 'react-router-dom';
import type { BlogPost } from '../../models/types';
import { ArrowRight } from 'lucide-react';
import './Cards.css';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

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

const BlogCard: React.FC<BlogCardProps> = ({ post, featured = false }) => {
  return (
    <article className={`glass-card blog-card ${featured ? 'blog-card-featured' : ''}`}>
      <div className="blog-image-wrapper">
        <img src={post.imageUrl} alt={post.title} className="blog-image" />
        <span 
          className="blog-category-badge"
          style={{ backgroundColor: categoryColors[post.category] }}
        >
          {categoryLabels[post.category]}
        </span>
      </div>
      <div className="blog-content">
        <div className="blog-meta">
          <span className="blog-date">{post.date}</span>
          <span className="blog-read-time">{post.readTime}</span>
        </div>
        <h3>{post.title}</h3>
        <p className="blog-excerpt-truncated" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
        <Link to={`/blog/${post.id}`} className="read-more">
          {featured ? 'Read Full Case Study' : 'Read More'} <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
