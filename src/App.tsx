import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './views/components/ProtectedRoute';
import Home from './views/pages/Home';
import Projects from './views/pages/Projects';
import ProjectDetail from './views/pages/ProjectDetail';
import About from './views/pages/About';
import Contact from './views/pages/Contact';
import Blog from './views/pages/Blog';
import BlogPost from './views/pages/BlogPost';
import Login from './views/pages/dashboard/Login';
import DashboardLayout from './views/pages/dashboard/DashboardLayout';
import DashboardHome from './views/pages/dashboard/DashboardHome';
import ProfileManage from './views/pages/dashboard/ProfileManage';
import ProjectsManage from './views/pages/dashboard/ProjectsManage';
import BlogsManage from './views/pages/dashboard/BlogsManage';
import './styles/global.css';
import './styles/home.css';
import './styles/footer.css';
import './styles/projects.css';
import './styles/about.css';
import './styles/contact.css';
import './styles/blog.css';
import './styles/blogPost.css';
import './styles/projectDetail.css';
import './styles/login.css';
import './styles/components.css';
import './styles/dashboard.css';
import './styles/loading.css';
import './styles/responsive.css';
import { usePortfolioViewModel } from './viewmodels/usePortfolioViewModel';

const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path ? 'active' : '';
  const { devstackPortfolio } = usePortfolioViewModel()

  // Hide navbar on dashboard routes
  if (location.pathname.startsWith('/me')) {
    return null;
  }

  return (
    <nav className="navbar glass-card">
      <div className="nav-brand">
        <span className="brand-text">{devstackPortfolio}</span>
      </div>
      <div className="nav-links">
        <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
        <Link to="/projects" className={`nav-link ${isActive('/projects')}`}>Projects</Link>
        <Link to="/blog" className={`nav-link ${isActive('/blog')}`}>Blog</Link>
        <Link to="/about" className={`nav-link ${isActive('/about')}`}>About</Link>
        <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>Contact</Link>
        <Link to="/contact" className="btn-primary">Hire Me</Link>
      </div>
    </nav>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />

              {/* Auth Routes */}
              <Route path="/me/login" element={<Login />} />

              {/* Dashboard Routes */}
              <Route 
                path="/me" 
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardHome />} />
                <Route path="profile" element={<ProfileManage />} />
                <Route path="projects" element={<ProjectsManage />} />
                <Route path="blogs" element={<BlogsManage />} />
              </Route>

              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
