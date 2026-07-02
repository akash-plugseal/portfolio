import './Skeleton.css';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

export const Skeleton = ({ width, height, borderRadius, className = '' }: SkeletonProps) => {
  return (
    <div 
      className={`skeleton ${className}`}
      style={{ width, height, borderRadius }}
    />
  );
};

export const SkeletonText = ({ lines = 3, className = '' }: { lines?: number; className?: string }) => {
  return (
    <div className={`skeleton-text ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          height="14px" 
          width={i === lines - 1 ? '60%' : '100%'} 
        />
      ))}
    </div>
  );
};

export const SkeletonCard = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`skeleton-card glass-card ${className}`}>
      <Skeleton className="skeleton-card-image" height="200px" />
      <div className="skeleton-card-content">
        <SkeletonText lines={2} />
      </div>
    </div>
  );
};

export const SkeletonProjectDetail = () => {
  return (
    <div className="skeleton-project-detail">
      <Skeleton height="20px" width="120px" />
      <Skeleton height="40px" width="60%" />
      <Skeleton height="20px" width="40%" />
      <div className="skeleton-meta-grid">
        <Skeleton height="60px" />
        <Skeleton height="60px" />
        <Skeleton height="60px" />
        <Skeleton height="60px" />
      </div>
      <Skeleton height="300px" />
      <SkeletonText lines={4} />
      <SkeletonText lines={3} />
    </div>
  );
};

export const SkeletonBlogPost = () => {
  return (
    <div className="skeleton-blog-post">
      <Skeleton height="24px" width="100px" />
      <Skeleton height="36px" width="80%" />
      <div className="skeleton-meta">
        <Skeleton height="16px" width="100px" />
        <Skeleton height="16px" width="80px" />
      </div>
      <Skeleton height="350px" />
      <div className="skeleton-author">
        <Skeleton height="48px" width="48px" borderRadius="50%" />
        <div>
          <Skeleton height="16px" width="120px" />
          <Skeleton height="14px" width="160px" />
        </div>
      </div>
      <SkeletonText lines={5} />
      <SkeletonText lines={4} />
      <SkeletonText lines={3} />
    </div>
  );
};

export const SkeletonHome = () => {
  return (
    <div className="skeleton-home">
      <div className="skeleton-hero">
        <Skeleton height="16px" width="140px" />
        <Skeleton height="48px" width="60%" />
        <SkeletonText lines={2} />
        <div className="skeleton-buttons">
          <Skeleton height="48px" width="140px" borderRadius="24px" />
          <Skeleton height="48px" width="140px" borderRadius="24px" />
        </div>
      </div>
      <div className="skeleton-grid">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
};

export const SkeletonProjects = () => {
  return (
    <div className="skeleton-projects">
      <div className="skeleton-hero">
        <Skeleton height="16px" width="120px" />
        <Skeleton height="48px" width="50%" />
        <SkeletonText lines={2} />
      </div>
      <div className="skeleton-filters">
        <Skeleton height="40px" width="80px" borderRadius="20px" />
        <Skeleton height="40px" width="80px" borderRadius="20px" />
        <Skeleton height="40px" width="80px" borderRadius="20px" />
        <Skeleton height="40px" width="100px" borderRadius="20px" />
      </div>
      <div className="skeleton-grid">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
};

export const SkeletonBlog = () => {
  return (
    <div className="skeleton-blog">
      <div className="skeleton-hero">
        <Skeleton height="16px" width="180px" />
        <Skeleton height="48px" width="60%" />
        <SkeletonText lines={2} />
      </div>
      <div className="skeleton-filters">
        <Skeleton height="40px" width="100px" borderRadius="20px" />
        <Skeleton height="40px" width="100px" borderRadius="20px" />
        <Skeleton height="40px" width="100px" borderRadius="20px" />
        <Skeleton height="40px" width="100px" borderRadius="20px" />
        <Skeleton height="40px" width="110px" borderRadius="20px" />
      </div>
      <SkeletonCard className="skeleton-blog-featured" />
      <div className="skeleton-grid">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
};

export const SkeletonAbout = () => {
  return (
    <div className="skeleton-about">
      <div className="skeleton-hero">
        <Skeleton height="16px" width="140px" />
        <Skeleton height="48px" width="55%" />
        <SkeletonText lines={3} />
      </div>
      <div className="skeleton-about-grid">
        <div className="skeleton-about-stats">
          <Skeleton height="80px" />
          <Skeleton height="80px" />
          <Skeleton height="80px" />
        </div>
        <div className="skeleton-about-skills">
          <Skeleton height="24px" width="150px" />
          <div className="skeleton-skill-chips">
            <Skeleton height="36px" width="100px" borderRadius="18px" />
            <Skeleton height="36px" width="120px" borderRadius="18px" />
            <Skeleton height="36px" width="90px" borderRadius="18px" />
            <Skeleton height="36px" width="110px" borderRadius="18px" />
            <Skeleton height="36px" width="80px" borderRadius="18px" />
          </div>
        </div>
      </div>
      <div className="skeleton-timeline">
        <Skeleton height="24px" width="120px" />
        <Skeleton height="100px" />
        <Skeleton height="100px" />
        <Skeleton height="100px" />
      </div>
    </div>
  );
};
