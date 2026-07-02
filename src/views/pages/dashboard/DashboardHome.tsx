import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { FolderKanban, FileText, User, TrendingUp } from 'lucide-react';

const DashboardHome = () => {
  useAuth();

  const stats = [
    { icon: <FolderKanban size={24} />, label: 'Projects', value: '6', color: '#638CBE' },
    { icon: <FileText size={24} />, label: 'Blog Posts', value: '5', color: '#2C3E3A' },
    { icon: <User size={24} />, label: 'Profile', value: '1', color: '#638CBE' },
    { icon: <TrendingUp size={24} />, label: 'Total Views', value: '12.5K', color: '#2C3E3A' },
  ];

  const quickActions = [
    { title: 'Manage Projects', description: 'Create, edit or delete projects', to: '/me/projects' },
    { title: 'Manage Blog Posts', description: 'Write, edit or delete articles', to: '/me/blogs' },
    { title: 'Update Profile', description: 'Edit your profile information', to: '/me/profile' },
  ];

  return (
    <div className="dashboard-home">
      <div className="dashboard-welcome">
        <h1>Welcome back!</h1>
        <p>Manage your portfolio content from here.</p>
      </div>

      <div className="dashboard-stats">
        {stats.map((stat, index) => (
          <div key={index} className="dashboard-stat-card glass-card">
            <div className="stat-icon" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-quick-actions">
        <h2>Quick Actions</h2>
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.to} className="quick-action-card glass-card">
              <h3>{action.title}</h3>
              <p>{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="dashboard-info glass-card">
        <h2>Supabase Setup</h2>
        <div className="setup-instructions">
          <p>To connect to your Supabase project:</p>
          <ol>
            <li>Create a <code>.env</code> file in the project root</li>
            <li>Add your Supabase URL: <code>VITE_SUPABASE_URL=your-url</code></li>
            <li>Add your anon key: <code>VITE_SUPABASE_ANON_KEY=your-key</code></li>
            <li>Enable Email auth in Supabase Dashboard &gt; Authentication &gt; Providers</li>
          </ol>
          <p className="note">
            <strong>Note:</strong> For demo purposes, you can sign up with any email/password.
            The data is stored locally until you connect to Supabase.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
