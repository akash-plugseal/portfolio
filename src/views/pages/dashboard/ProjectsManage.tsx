import { useState } from 'react';
import { usePortfolioViewModel } from '../../../viewmodels/usePortfolioViewModel';
import { Plus, Edit2, Trash2, ExternalLink, Save, X } from 'lucide-react';
import RichTextEditor from '../../components/RichTextEditor';
import { upsertProjectToSupabase, deleteProjectFromSupabase } from '../../../services/supabase/projectService';
import type { Project, ProjectFeature, TechStackItem } from '../../../models/types';

interface ProjectFormData {
  id?: string;
  title: string;
  description: string;
  technologies: string;
  imageUrl: string;
  link: string;
  tag: string;
  category: 'ios' | 'android' | 'cross-platform';
  subtitle: string;
  client: string;
  duration: string;
  role: string;
  year: string;
  challenge: string;
  solution: string;
  results: string;
  features: string;
  gallery: string;
  techStack: string;
}

const emptyProject: ProjectFormData = {
  title: '',
  description: '',
  technologies: '',
  imageUrl: '/assets/images/app-ui.png',
  link: '#',
  tag: '',
  category: 'cross-platform',
  subtitle: '',
  client: '',
  duration: '',
  role: '',
  year: '',
  challenge: '',
  solution: '',
  results: '',
  features: '',
  gallery: '',
  techStack: '',
};

const ProjectsManage = () => {
  const { projects, refreshProjects } = usePortfolioViewModel();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<ProjectFormData>(emptyProject);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const features: ProjectFeature[] = formData.features
      ? formData.features.split('\n').filter(Boolean).map(line => {
          const [title, ...descParts] = line.split('|');
          return { title: title.trim(), description: descParts.join('|').trim() };
        })
      : [];

    const techStack: TechStackItem[] = formData.techStack
      ? formData.techStack.split('\n').filter(Boolean).map(line => {
          const [name, ...catParts] = line.split('|');
          return { name: name.trim(), category: catParts.join('|').trim() };
        })
      : [];

    const projectData: Project = {
      id: formData.id || crypto.randomUUID(),
      title: formData.title,
      description: formData.description,
      technologies: formData.technologies.split(',').map(s => s.trim()).filter(Boolean),
      imageUrl: formData.imageUrl,
      link: formData.link,
      tag: formData.tag,
      category: formData.category,
      subtitle: formData.subtitle,
      client: formData.client,
      duration: formData.duration,
      role: formData.role,
      year: formData.year,
      challenge: formData.challenge,
      solution: formData.solution,
      results: formData.results ? formData.results.split('\n').filter(Boolean).map(s => s.trim()) : [],
      features,
      gallery: formData.gallery ? formData.gallery.split('\n').filter(Boolean).map(s => s.trim()) : [],
      techStack,
    };

    const result = await upsertProjectToSupabase(projectData);

    if (result.success) {
      await refreshProjects();
      setSaved(true);
      setShowForm(false);
      setFormData(emptyProject);
      setTimeout(() => setSaved(false), 3000);
    } else {
      setError(result.error || 'Failed to save project');
    }

    setSaving(false);
  };

  const handleEdit = (project: typeof projects[0]) => {
    setFormData({
      id: project.id,
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(', '),
      imageUrl: project.imageUrl,
      link: project.link,
      tag: project.tag,
      category: project.category,
      subtitle: project.subtitle || '',
      client: project.client || '',
      duration: project.duration || '',
      role: project.role || '',
      year: project.year || '',
      challenge: project.challenge || '',
      solution: project.solution || '',
      results: (project.results || []).join('\n'),
      features: (project.features || []).map(f => `${f.title} | ${f.description}`).join('\n'),
      gallery: (project.gallery || []).join('\n'),
      techStack: (project.techStack || []).map(t => `${t.name} | ${t.category}`).join('\n'),
    });
    setShowForm(true);
    setShowAdvanced(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const result = await deleteProjectFromSupabase(id);
      if (result.success) {
        await refreshProjects();
      } else {
        setError(result.error || 'Failed to delete project');
      }
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-header">
        <div>
          <h1>Projects Management</h1>
          <p>Create, edit, and manage your project case studies</p>
        </div>
        <button className="btn-primary" onClick={() => { setShowForm(true); setFormData(emptyProject); setShowAdvanced(false); }}>
          <Plus size={18} />
          Add Project
        </button>
      </div>

      {saved && (
        <div className="dashboard-success">
          Project saved successfully!
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
              <h2>{formData.id ? 'Edit Project' : 'Add New Project'}</h2>
              <button className="modal-close" onClick={() => setShowForm(false)}>
                <X size={20} />
              </button>
            </div>

            <form className="dashboard-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="title">Project Title</label>
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
                  <label htmlFor="subtitle">Subtitle</label>
                  <input
                    type="text"
                    id="subtitle"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Modern Banking Reimagined"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="tag">Tag</label>
                  <input
                    type="text"
                    id="tag"
                    name="tag"
                    value={formData.tag}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="React Native"
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
                    <option value="ios">iOS</option>
                    <option value="android">Android</option>
                    <option value="cross-platform">Cross-Platform</option>
                  </select>
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

                <div className="form-group">
                  <label htmlFor="link">Project Link</label>
                  <input
                    type="url"
                    id="link"
                    name="link"
                    value={formData.link}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="client">Client</label>
                  <input
                    type="text"
                    id="client"
                    name="client"
                    value={formData.client}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="NovaBank"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="duration">Duration</label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="6 months"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Lead iOS Developer"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="year">Year</label>
                  <input
                    type="text"
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="2023"
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="description">Description</label>
                  <RichTextEditor
                    value={formData.description}
                    onChange={(html) => setFormData({ ...formData, description: html })}
                    placeholder="Describe your project..."
                    rows={3}
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="technologies">Technologies (comma separated)</label>
                  <input
                    type="text"
                    id="technologies"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="React Native, TypeScript, Firebase"
                  />
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
                    <div className="form-group full-width">
                      <label htmlFor="challenge">Challenge</label>
                      <textarea
                        id="challenge"
                        name="challenge"
                        value={formData.challenge}
                        onChange={handleChange}
                        className="form-input"
                        rows={2}
                        placeholder="Legacy banking apps had poor UX and slow performance"
                      />
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="solution">Solution</label>
                      <textarea
                        id="solution"
                        name="solution"
                        value={formData.solution}
                        onChange={handleChange}
                        className="form-input"
                        rows={2}
                        placeholder="Built a native iOS app with CoreData caching and real-time sync"
                      />
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="results">Results (one per line)</label>
                      <textarea
                        id="results"
                        name="results"
                        value={formData.results}
                        onChange={handleChange}
                        className="form-input"
                        rows={3}
                        placeholder="40% faster transactions&#10;4.8 star rating&#10;100K+ downloads"
                      />
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="features">Features (one per line: Title | Description)</label>
                      <textarea
                        id="features"
                        name="features"
                        value={formData.features}
                        onChange={handleChange}
                        className="form-input"
                        rows={3}
                        placeholder="Tap to Transfer | Send money instantly with NFC&#10;Biometric Login | Face ID & Touch ID support"
                      />
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="gallery">Gallery Image URLs (one per line)</label>
                      <textarea
                        id="gallery"
                        name="gallery"
                        value={formData.gallery}
                        onChange={handleChange}
                        className="form-input"
                        rows={2}
                        placeholder="/assets/images/screenshot1.png&#10;/assets/images/screenshot2.png"
                      />
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="techStack">Tech Stack (one per line: Name | Category)</label>
                      <textarea
                        id="techStack"
                        name="techStack"
                        value={formData.techStack}
                        onChange={handleChange}
                        className="form-input"
                        rows={3}
                        placeholder="Swift | Language&#10;CoreData | Database&#10;UIKit | Framework"
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
                  {saving ? 'Saving...' : formData.id ? 'Update Project' : 'Add Project'}
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
              <th>Project</th>
              <th>Category</th>
              <th>Technologies</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>
                  <div className="table-project">
                    <img src={project.imageUrl} alt={project.title} />
                    <div>
                      <span className="table-title">{project.title}</span>
                      <span className="table-subtitle">{project.tag}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`table-badge badge-${project.category}`}>
                    {project.category}
                  </span>
                </td>
                <td>
                  <div className="table-tech">
                    {project.technologies.slice(0, 2).map((tech, i) => (
                      <span key={i} className="tech-chip">{tech}</span>
                    ))}
                    {project.technologies.length > 2 && (
                      <span className="tech-more">+{project.technologies.length - 2}</span>
                    )}
                  </div>
                </td>
                <td>
                  <div className="table-actions">
                    <a href={`/projects/${project.id}`} target="_blank" rel="noopener noreferrer" className="action-btn view">
                      <ExternalLink size={16} />
                    </a>
                    <button className="action-btn edit" onClick={() => handleEdit(project)}>
                      <Edit2 size={16} />
                    </button>
                    <button className="action-btn delete" onClick={() => handleDelete(project.id)}>
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

export default ProjectsManage;
