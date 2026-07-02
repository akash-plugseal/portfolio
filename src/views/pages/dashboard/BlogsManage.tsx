import { useState } from 'react';
import { usePortfolioViewModel } from '../../../viewmodels/usePortfolioViewModel';
import { Plus, Edit2, Trash2, ExternalLink, Save, X } from 'lucide-react';
import RichTextEditor from '../../components/RichTextEditor';
import { upsertBlogToSupabase, deleteBlogFromSupabase } from '../../../services/supabase/blogService';
import type { BlogPost, BlogContent } from '../../../models/types';

interface BlogFormData {
  id?: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: 'flutter' | 'react-native' | 'architecture' | 'performance';
  readTime: string;
  featured: boolean;
  date: string;
  author: string;
  authorRole: string;
  contentText: string;
  tags: string;
}

const emptyBlog: BlogFormData = {
  title: '',
  excerpt: '',
  imageUrl: '/assets/images/blog.png',
  category: 'flutter',
  readTime: '5 Min Read',
  featured: false,
  date: new Date().toISOString().split('T')[0],
  author: 'DevStack Lead',
  authorRole: 'Cross-Platform Architect',
  contentText: '',
  tags: '',
};

const BlogsManage = () => {
  const { blogs, refreshBlogs } = usePortfolioViewModel();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<BlogFormData>(emptyBlog);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const parseContent = (text: string): BlogContent[] => {
    if (!text.trim()) return [];
    const sections: BlogContent[] = [];
    const lines = text.split('\n');
    let currentSection: BlogContent | null = null;

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      if (trimmed.startsWith('## ')) {
        sections.push({ type: 'heading', content: trimmed.slice(3) });
      } else if (trimmed.startsWith('> ')) {
        sections.push({ type: 'quote', content: trimmed.slice(2) });
      } else if (trimmed.startsWith('```')) {
        if (currentSection?.type === 'code') {
          sections.push(currentSection);
          currentSection = null;
        } else {
          currentSection = { type: 'code', content: '', language: '' };
        }
      } else if (currentSection?.type === 'code') {
        currentSection.content += (currentSection.content ? '\n' : '') + trimmed;
      } else if (trimmed.startsWith('- ')) {
        if (currentSection?.type === 'list') {
          currentSection.items?.push(trimmed.slice(2));
        } else {
          currentSection = { type: 'list', content: '', items: [trimmed.slice(2)] };
        }
      } else {
        if (currentSection?.type === 'list') {
          sections.push(currentSection);
          currentSection = null;
        }
        sections.push({ type: 'paragraph', content: trimmed });
      }
    }

    if (currentSection) sections.push(currentSection);
    return sections;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const blogData: BlogPost = {
      id: formData.id || crypto.randomUUID(),
      title: formData.title,
      excerpt: formData.excerpt,
      imageUrl: formData.imageUrl,
      category: formData.category,
      readTime: formData.readTime,
      featured: formData.featured,
      date: formData.date,
      author: formData.author,
      authorRole: formData.authorRole,
      content: parseContent(formData.contentText),
      tags: formData.tags ? formData.tags.split(',').map(s => s.trim()).filter(Boolean) : [],
    };

    const result = await upsertBlogToSupabase(blogData);

    if (result.success) {
      await refreshBlogs();
      setSaved(true);
      setShowForm(false);
      setFormData(emptyBlog);
      setTimeout(() => setSaved(false), 3000);
    } else {
      setError(result.error || 'Failed to save blog post');
    }

    setSaving(false);
  };

  const handleEdit = (blog: typeof blogs[0]) => {
    const contentText = (blog.content || []).map(section => {
      switch (section.type) {
        case 'heading': return `## ${section.content}`;
        case 'quote': return `> ${section.content}`;
        case 'code': return `\`\`\`\n${section.content}\n\`\`\``;
        case 'list': return section.items?.map(item => `- ${item}`).join('\n') || '';
        default: return section.content;
      }
    }).join('\n\n');

    setFormData({
      id: blog.id,
      title: blog.title,
      excerpt: blog.excerpt,
      imageUrl: blog.imageUrl,
      category: blog.category,
      readTime: blog.readTime,
      featured: blog.featured || false,
      date: blog.date || '',
      author: blog.author || '',
      authorRole: blog.authorRole || '',
      contentText,
      tags: (blog.tags || []).join(', '),
    });
    setShowForm(true);
    setShowAdvanced(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      const result = await deleteBlogFromSupabase(id);
      if (result.success) {
        await refreshBlogs();
      } else {
        setError(result.error || 'Failed to delete blog post');
      }
    }
  };

  const categoryColors: Record<string, string> = {
    'flutter': '#638CBE',
    'react-native': '#2C3E3A',
    'architecture': '#f59e0b',
    'performance': '#10b981'
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-header">
        <div>
          <h1>Blog Management</h1>
          <p>Create, edit, and manage your blog posts</p>
        </div>
        <button className="btn-primary" onClick={() => { setShowForm(true); setFormData(emptyBlog); setShowAdvanced(false); }}>
          <Plus size={18} />
          Add Blog Post
        </button>
      </div>

      {saved && (
        <div className="dashboard-success">
          Blog post saved successfully!
        </div>
      )}

      {error && (
        <div className="dashboard-error">
          {error}
        </div>
      )}

      {showForm && (
        <div className="dashboard-modal-overlay" onClick={() => setShowForm(false)}>
          <div className="dashboard-modal glass-card modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{formData.id ? 'Edit Blog Post' : 'Add New Blog Post'}</h2>
              <button className="modal-close" onClick={() => setShowForm(false)}>
                <X size={20} />
              </button>
            </div>

            <form className="dashboard-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="flutter">Flutter Tips</option>
                    <option value="react-native">React Native</option>
                    <option value="architecture">Architecture</option>
                    <option value="performance">Performance</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="readTime">Read Time</label>
                  <input
                    type="text"
                    id="readTime"
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="5 Min Read"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="imageUrl">Image URL</label>
                  <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="excerpt">Excerpt</label>
                  <RichTextEditor
                    value={formData.excerpt}
                    onChange={(html) => setFormData({ ...formData, excerpt: html })}
                    placeholder="Write blog excerpt..."
                    rows={3}
                  />
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                    />
                    <span>Featured Post</span>
                  </label>
                </div>
              </div>

              {/* Advanced Toggle */}
              <button
                type="button"
                className="btn-outline btn-advanced-toggle"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                {showAdvanced ? 'Hide Advanced' : 'Show Advanced'}
              </button>

              {/* Advanced Fields */}
              {showAdvanced && (
                <div className="form-advanced">
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="author">Author</label>
                      <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="DevStack Lead"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="authorRole">Author Role</label>
                      <input
                        type="text"
                        id="authorRole"
                        name="authorRole"
                        value={formData.authorRole}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Cross-Platform Architect"
                      />
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="tags">Tags (comma separated)</label>
                      <input
                        type="text"
                        id="tags"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="flutter, dart, performance"
                      />
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="contentText">Content (supports markdown: ## heading, &gt; quote, ```code```, - list)</label>
                      <textarea
                        id="contentText"
                        name="contentText"
                        value={formData.contentText}
                        onChange={handleChange}
                        className="form-input"
                        rows={10}
                        placeholder="## Heading&#10;&#10;Paragraph text here...&#10;&#10;> Quote&#10;&#10;- List item 1&#10;- List item 2"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="form-actions">
                <button type="button" className="btn-outline" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={saving}>
                  <Save size={18} />
                  {saving ? 'Saving...' : formData.id ? 'Update Post' : 'Add Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="dashboard-table-container glass-card">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Post</th>
              <th>Category</th>
              <th>Read Time</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <td>
                  <div className="table-project">
                    <img src={blog.imageUrl} alt={blog.title} />
                    <div>
                      <span className="table-title">{blog.title}</span>
                      <span className="table-subtitle">{blog.date}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span 
                    className="table-badge"
                    style={{ backgroundColor: categoryColors[blog.category] }}
                  >
                    {blog.category}
                  </span>
                </td>
                <td>{blog.readTime}</td>
                <td>
                  {blog.featured && (
                    <span className="featured-badge">Featured</span>
                  )}
                </td>
                <td>
                  <div className="table-actions">
                    <a href={`/blog/${blog.id}`} target="_blank" rel="noopener noreferrer" className="action-btn view">
                      <ExternalLink size={16} />
                    </a>
                    <button className="action-btn edit" onClick={() => handleEdit(blog)}>
                      <Edit2 size={16} />
                    </button>
                    <button className="action-btn delete" onClick={() => handleDelete(blog.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogsManage;
