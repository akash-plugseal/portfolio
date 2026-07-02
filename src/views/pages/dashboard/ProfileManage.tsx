import { useState, useEffect } from 'react';
import { Save, User, Award, BarChart3, Upload, Plus, Trash2, X } from 'lucide-react';
import { usePortfolioViewModel } from '../../../viewmodels/usePortfolioViewModel';
import type { Milestone } from '../../../models/types';
import RichTextEditor from '../../components/RichTextEditor';
import FileUpload from '../../components/FileUpload';
import { upsertProfileToSupabase } from '../../../services/supabase/profileService';
import { upsertMilestoneToSupabase, deleteMilestoneFromSupabase } from '../../../services/supabase/milestoneService';
import {
  upsertWorkExperience, upsertDevStackPortfolio, upsertAppsLaunched,
  upsertGitCommits, upsertCrashFreeRate, upsertClientSatisfaction, upsertResume
} from '../../../services/supabase/metaService';
import { supabase } from '../../../services/supabase/client';

type TabType = 'profile' | 'milestones' | 'metadata';

const ProfileManage = () => {
  const {
    profile, milestones,
    workExperience, setWorkExperience,
    devstackPortfolio, setDevstackPortfolio,
    appsLaunched, setAppsLaunched,
    gitCommits, setGitCommits,
    crashFreeRate, setCrashFreeRate,
    clientSatisfaction, setClientSatisfaction,
    resumeUrl, setResumeUrl,
    setProfile, refreshMilestones
  } = usePortfolioViewModel();

  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Profile form data
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    email: '',
    github: '',
    linkedin: '',
    twitter: '',
    skills: ''
  });

  // Milestones form data
  const [milestonesData, setMilestonesData] = useState<Milestone[]>([]);
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);
  const [showMilestoneForm, setShowMilestoneForm] = useState(false);
  const [savingMilestone, setSavingMilestone] = useState(false);

  // Meta field local states
  const [localWorkExp, setLocalWorkExp] = useState('');
  const [localPortfolio, setLocalPortfolio] = useState('');
  const [localApps, setLocalApps] = useState('');
  const [localCommits, setLocalCommits] = useState('');
  const [localCrash, setLocalCrash] = useState('');
  const [localSatisfaction, setLocalSatisfaction] = useState('');
  const [savingField, setSavingField] = useState<string | null>(null);
  const [uploadingResume, setUploadingResume] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        title: profile.title,
        bio: profile.bio,
        email: profile.email,
        github: profile.github,
        linkedin: profile.linkedin,
        twitter: profile.twitter,
        skills: profile.skills.join(', ')
      });
    }
    if (milestones) {
      setMilestonesData(milestones);
    }
  }, [profile, milestones]);

  useEffect(() => {
    setLocalWorkExp(workExperience || '');
    setLocalPortfolio(devstackPortfolio || '');
    setLocalApps(appsLaunched || '');
    setLocalCommits(gitCommits || '');
    setLocalCrash(crashFreeRate || '');
    setLocalSatisfaction(clientSatisfaction || '');
  }, [workExperience, devstackPortfolio, appsLaunched, gitCommits, crashFreeRate, clientSatisfaction]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const result = await upsertProfileToSupabase({
      name: formData.name,
      title: formData.title,
      bio: formData.bio,
      email: formData.email,
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
      avatarUrl: profile?.avatarUrl || '',
      github: formData.github,
      linkedin: formData.linkedin,
      twitter: formData.twitter,
    });

    if (result.success) {
      setProfile({
        name: formData.name,
        title: formData.title,
        bio: formData.bio,
        email: formData.email,
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
        avatarUrl: profile?.avatarUrl || '',
        github: formData.github,
        linkedin: formData.linkedin,
        twitter: formData.twitter,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      setError(result.error || 'Failed to save profile');
    }

    setSaving(false);
  };

  // Milestone handlers
  const handleMilestoneChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (editingMilestone) {
      setEditingMilestone({ ...editingMilestone, [e.target.name]: e.target.value });
    }
  };

  const handleMilestoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMilestone) return;
    setSavingMilestone(true);

    const result = await upsertMilestoneToSupabase(editingMilestone, milestonesData.length);

    if (result.success) {
      await refreshMilestones();
      setShowMilestoneForm(false);
      setEditingMilestone(null);
    } else {
      setError(result.error || 'Failed to save milestone');
    }

    setSavingMilestone(false);
  };

  const handleEditMilestone = (milestone: Milestone) => {
    setEditingMilestone({ ...milestone });
    setShowMilestoneForm(true);
  };

  const handleDeleteMilestone = async (id: string) => {
    if (confirm('Are you sure you want to delete this milestone?')) {
      const result = await deleteMilestoneFromSupabase(id);
      if (result.success) {
        await refreshMilestones();
      } else {
        setError(result.error || 'Failed to delete milestone');
      }
    }
  };

  const handleAddMilestone = () => {
    const newId = crypto.randomUUID();
    setEditingMilestone({
      id: newId,
      period: '',
      role: '',
      company: '',
      description: '',
      badge: ''
    });
    setShowMilestoneForm(true);
  };

  // Meta field save handlers
  const handleSaveMetaField = async (field: string, value: string) => {
    setSavingField(field);
    setError('');
    let result;

    switch (field) {
      case 'workExperience':
        result = await upsertWorkExperience(value);
        if (result.success) setWorkExperience(value);
        break;
      case 'devstackPortfolio':
        result = await upsertDevStackPortfolio(value);
        if (result.success) setDevstackPortfolio(value);
        break;
      case 'appsLaunched':
        result = await upsertAppsLaunched(value);
        if (result.success) setAppsLaunched(value);
        break;
      case 'gitCommits':
        result = await upsertGitCommits(value);
        if (result.success) setGitCommits(value);
        break;
      case 'crashFreeRate':
        result = await upsertCrashFreeRate(value);
        if (result.success) setCrashFreeRate(value);
        break;
      case 'clientSatisfaction':
        result = await upsertClientSatisfaction(value);
        if (result.success) setClientSatisfaction(value);
        break;
      case 'resume':
        result = await upsertResume(value);
        if (result.success) setResumeUrl(value);
        break;
    }

    if (result && !result.success) {
      setError(result.error || 'Failed to save');
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }

    setSavingField(null);
  };

  const handleResumeUpload = async (file: File): Promise<void> => {
    setUploadingResume(true);
    setError('');

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `resume-${Date.now()}.${fileExt}`;
      const filePath = `resumes/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, file, {
          contentType: 'application/pdf',
          upsert: true
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: urlData } = supabase.storage
        .from('resumes')
        .getPublicUrl(filePath);

      const publicUrl = urlData.publicUrl;

      const result = await upsertResume(publicUrl);
      if (result.success) {
        setResumeUrl(publicUrl);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } else {
        setError(result.error || 'Failed to save resume URL');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload file. Please try again.');
      throw err;
    } finally {
      setUploadingResume(false);
    }
  };

  const handleResumeRemove = async () => {
    const result = await upsertResume('');
    if (result.success) {
      setResumeUrl('');
    }
  };

  const tabs = [
    { id: 'profile' as TabType, label: 'Profile Management', icon: <User size={18} /> },
    { id: 'milestones' as TabType, label: 'Professional Milestones', icon: <Award size={18} /> },
    { id: 'metadata' as TabType, label: 'Meta Data', icon: <BarChart3 size={18} /> }
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-header">
        <div>
          <h1>Profile</h1>
          <p>Manage your profile information and milestones</p>
        </div>
      </div>

      {saved && (
        <div className="dashboard-success">
          Changes saved successfully!
        </div>
      )}

      {error && (
        <div className="dashboard-error">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="dashboard-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`dashboard-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Profile Management Tab */}
      {activeTab === 'profile' && (
        <form className="dashboard-form glass-card" onSubmit={handleProfileSubmit}>
          <div className="form-section">
            <h2>
              <User size={20} />
              Personal Information
            </h2>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleProfileChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Professional Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleProfileChange}
                  className="form-input"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="bio">Bio</label>
                <RichTextEditor
                  value={formData.bio}
                  onChange={(html) => setFormData({ ...formData, bio: html })}
                  placeholder="Write your bio..."
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleProfileChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="skills">Skills (comma separated)</label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleProfileChange}
                  className="form-input"
                  placeholder="React Native, Flutter, TypeScript"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Social Links</h2>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="github">GitHub URL</label>
                <input
                  type="url"
                  id="github"
                  name="github"
                  value={formData.github}
                  onChange={handleProfileChange}
                  className="form-input"
                  placeholder="https://github.com/username"
                />
              </div>

              <div className="form-group">
                <label htmlFor="linkedin">LinkedIn URL</label>
                <input
                  type="url"
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleProfileChange}
                  className="form-input"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div className="form-group">
                <label htmlFor="twitter">Twitter URL</label>
                <input
                  type="url"
                  id="twitter"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleProfileChange}
                  className="form-input"
                  placeholder="https://twitter.com/username"
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={saving}>
              <Save size={18} />
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      )}

      {/* Milestones Tab */}
      {activeTab === 'milestones' && (
        <div className="dashboard-form glass-card">
          <div className="form-section">
            <div className="form-section-header milestones-header">
              <h2>
                <Award size={20} />
                Professional Milestones
              </h2>
              <button type="button" className="btn-primary" onClick={handleAddMilestone}>
                <Plus size={18} />
                Add Milestone
              </button>
            </div>

            {/* Milestone Form Modal */}
            {showMilestoneForm && editingMilestone && (
              <div className="dashboard-modal-overlay" onClick={() => setShowMilestoneForm(false)}>
                <div className="dashboard-modal glass-card" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h2>{editingMilestone.id ? 'Edit Milestone' : 'Add Milestone'}</h2>
                    <button className="modal-close" onClick={() => setShowMilestoneForm(false)}>
                      <X size={18} />
                    </button>
                  </div>

                  <form className="dashboard-form" onSubmit={handleMilestoneSubmit}>
                    <div className="form-grid">
                      <div className="form-group">
                        <label htmlFor="period">Period</label>
                        <input
                          type="text"
                          id="period"
                          name="period"
                          value={editingMilestone.period}
                          onChange={handleMilestoneChange}
                          className="form-input"
                          placeholder="2023 - Present"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <input
                          type="text"
                          id="role"
                          name="role"
                          value={editingMilestone.role}
                          onChange={handleMilestoneChange}
                          className="form-input"
                          placeholder="Senior Mobile Engineer"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="company">Company</label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={editingMilestone.company}
                          onChange={handleMilestoneChange}
                          className="form-input"
                          placeholder="@ TechFlow"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="badge">Badge</label>
                        <input
                          type="text"
                          id="badge"
                          name="badge"
                          value={editingMilestone.badge}
                          onChange={handleMilestoneChange}
                          className="form-input"
                          placeholder="Architected scalable design systems"
                        />
                      </div>

                      <div className="form-group full-width">
                        <label htmlFor="description">Description</label>
                        <RichTextEditor
                          value={editingMilestone.description}
                          onChange={(html) => setEditingMilestone({ ...editingMilestone, description: html })}
                          placeholder="Describe your milestone..."
                          rows={3}
                        />
                      </div>
                    </div>

                    <div className="form-actions">
                      <button type="button" className="btn-outline" onClick={() => setShowMilestoneForm(false)}>
                        Cancel
                      </button>
                      <button type="submit" className="btn-primary" disabled={savingMilestone}>
                        <Save size={18} />
                        {savingMilestone ? 'Saving...' : 'Save Milestone'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Milestones List */}
            <div className="milestones-list">
              {milestonesData.map((milestone) => (
                <div key={milestone.id} className="milestone-item glass-card">
                  <div className="milestone-content">
                    <span className="milestone-period">{milestone.period}</span>
                    <h3 className="milestone-role">
                      {milestone.role} <span className="milestone-company">{milestone.company}</span>
                    </h3>
                    <p className="milestone-description" dangerouslySetInnerHTML={{ __html: milestone.description }} />
                    {milestone.badge && (
                      <span className="milestone-badge">{milestone.badge}</span>
                    )}
                  </div>
                  <div className="milestone-actions">
                    <button 
                      className="action-btn edit" 
                      onClick={() => handleEditMilestone(milestone)}
                    >
                      Edit
                    </button>
                    <button 
                      className="action-btn delete" 
                      onClick={() => handleDeleteMilestone(milestone.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Meta Data Tab */}
      {activeTab === 'metadata' && (
        <div className="meta-data-section">
          {/* Work Experience */}
          <div className="meta-field-card glass-card">
            <div className="meta-field-header">
              <h3>Work Experience</h3>
              <span className="meta-current-value">Current: {workExperience}</span>
            </div>
            <div className="meta-field-form">
              <input
                type="text"
                value={localWorkExp}
                onChange={(e) => setLocalWorkExp(e.target.value)}
                className="form-input"
                placeholder="3+"
              />
              <button
                className="btn-primary"
                onClick={() => handleSaveMetaField('workExperience', localWorkExp)}
                disabled={savingField === 'workExperience'}
              >
                <Save size={16} />
                {savingField === 'workExperience' ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>

          {/* DevStack Portfolio */}
          <div className="meta-field-card glass-card">
            <div className="meta-field-header">
              <h3>DevStack Portfolio</h3>
              <span className="meta-current-value">Current: {devstackPortfolio}</span>
            </div>
            <div className="meta-field-form">
              <input
                type="text"
                value={localPortfolio}
                onChange={(e) => setLocalPortfolio(e.target.value)}
                className="form-input"
                placeholder="5+"
              />
              <button
                className="btn-primary"
                onClick={() => handleSaveMetaField('devstackPortfolio', localPortfolio)}
                disabled={savingField === 'devstackPortfolio'}
              >
                <Save size={16} />
                {savingField === 'devstackPortfolio' ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>

          {/* Apps Launched */}
          <div className="meta-field-card glass-card">
            <div className="meta-field-header">
              <h3>Apps Launched</h3>
              <span className="meta-current-value">Current: {appsLaunched}</span>
            </div>
            <div className="meta-field-form">
              <input
                type="text"
                value={localApps}
                onChange={(e) => setLocalApps(e.target.value)}
                className="form-input"
                placeholder="10+"
              />
              <button
                className="btn-primary"
                onClick={() => handleSaveMetaField('appsLaunched', localApps)}
                disabled={savingField === 'appsLaunched'}
              >
                <Save size={16} />
                {savingField === 'appsLaunched' ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>

          {/* Git Commits */}
          <div className="meta-field-card glass-card">
            <div className="meta-field-header">
              <h3>Git Commits</h3>
              <span className="meta-current-value">Current: {gitCommits}</span>
            </div>
            <div className="meta-field-form">
              <input
                type="text"
                value={localCommits}
                onChange={(e) => setLocalCommits(e.target.value)}
                className="form-input"
                placeholder="2000+"
              />
              <button
                className="btn-primary"
                onClick={() => handleSaveMetaField('gitCommits', localCommits)}
                disabled={savingField === 'gitCommits'}
              >
                <Save size={16} />
                {savingField === 'gitCommits' ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>

          {/* Crash-Free Rate */}
          <div className="meta-field-card glass-card">
            <div className="meta-field-header">
              <h3>Crash-Free Rate</h3>
              <span className="meta-current-value">Current: {crashFreeRate}</span>
            </div>
            <div className="meta-field-form">
              <input
                type="text"
                value={localCrash}
                onChange={(e) => setLocalCrash(e.target.value)}
                className="form-input"
                placeholder="99.5%"
              />
              <button
                className="btn-primary"
                onClick={() => handleSaveMetaField('crashFreeRate', localCrash)}
                disabled={savingField === 'crashFreeRate'}
              >
                <Save size={16} />
                {savingField === 'crashFreeRate' ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>

          {/* Client Satisfaction */}
          <div className="meta-field-card glass-card">
            <div className="meta-field-header">
              <h3>Client Satisfaction</h3>
              <span className="meta-current-value">Current: {clientSatisfaction}</span>
            </div>
            <div className="meta-field-form">
              <input
                type="text"
                value={localSatisfaction}
                onChange={(e) => setLocalSatisfaction(e.target.value)}
                className="form-input"
                placeholder="100%"
              />
              <button
                className="btn-primary"
                onClick={() => handleSaveMetaField('clientSatisfaction', localSatisfaction)}
                disabled={savingField === 'clientSatisfaction'}
              >
                <Save size={16} />
                {savingField === 'clientSatisfaction' ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>

          {/* Resume */}
          <div className="meta-field-card glass-card">
            <div className="meta-field-header">
              <h3>
                <Upload size={18} />
                Resume (PDF)
              </h3>
              {resumeUrl && (
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="meta-current-link">
                  View Current Resume
                </a>
              )}
            </div>
            <FileUpload
              accept=".pdf"
              onFileSelect={handleResumeUpload}
              onFileRemove={handleResumeRemove}
              currentFileName={resumeUrl ? 'resume.pdf' : undefined}
              disabled={uploadingResume}
              uploading={uploadingResume}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileManage;
