import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  LayoutDashboard, User, FolderKanban, FileText, 
  LogOut, Menu, X, ExternalLink 
} from 'lucide-react';
import { useState } from 'react';

const DashboardLayout = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navItems = [
    { to: '/me', icon: <LayoutDashboard size={20} />, label: 'Dashboard', end: true },
    { to: '/me/profile', icon: <User size={20} />, label: 'Profile' },
    { to: '/me/projects', icon: <FolderKanban size={20} />, label: 'Projects' },
    { to: '/me/blogs', icon: <FileText size={20} />, label: 'Blog Posts' },
  ];

  return (
    <div className="dashboard-layout">
      {/* Mobile Header */}
      <header className="dashboard-mobile-header">
        <button 
          className="menu-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <span className="brand-text">DevStack Dashboard</span>
        <a href="/" className="view-site-link" target="_blank" rel="noopener noreferrer">
          <ExternalLink size={18} />
        </a>
      </header>

      {/* Sidebar */}
      <aside className={`dashboard-sidebar glass-card ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span className="brand-text">DevStack</span>
          <span className="sidebar-subtitle">Dashboard</span>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => 
                `sidebar-link ${isActive ? 'active' : ''}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="sidebar-user-info">
              <span className="sidebar-user-email">{user?.email}</span>
              <span className="sidebar-user-role">Admin</span>
            </div>
          </div>

          <div className="sidebar-actions">
            <a href="/" className="sidebar-action-btn" target="_blank" rel="noopener noreferrer">
              <ExternalLink size={18} />
              <span>View Site</span>
            </a>
            <button className="sidebar-action-btn logout" onClick={handleSignOut}>
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="dashboard-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
