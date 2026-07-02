import { Link } from 'react-router-dom';
import type { Project } from '../../models/types';
import { ExternalLink } from 'lucide-react';
import './Cards.css';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="glass-card project-card">
      <div className="project-tag">{project.tag}</div>
      <div className="project-image-wrapper">
        <img src={project.imageUrl} alt={project.title} className="project-image" />
      </div>
      <div className="project-content">
        <h3>{project.title}</h3>
        <p dangerouslySetInnerHTML={{ __html: project.description }} />
        <div className="project-footer">
          <div className="project-technologies">
            {project.technologies.slice(0, 2).map((tech, idx) => (
              <span key={idx} className="tech-chip">{tech}</span>
            ))}
          </div>
          <Link to={`/projects/${project.id}`} className="project-case-study">
            View Case Study <ExternalLink size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
