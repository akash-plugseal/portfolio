export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  link: string;
  tag: string;
  category: 'ios' | 'android' | 'cross-platform';
  socialLinks?: { icon: string; url: string }[];
  // Detailed project data
  subtitle?: string;
  client?: string;
  duration?: string;
  role?: string;
  year?: string;
  challenge?: string;
  solution?: string;
  results?: string[];
  features?: ProjectFeature[];
  gallery?: string[];
  techStack?: TechStackItem[];
}

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface TechStackItem {
  name: string;
  category: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  imageUrl: string;
  category: 'flutter' | 'react-native' | 'architecture' | 'performance';
  featured?: boolean;
  author?: string;
  authorRole?: string;
  content?: BlogContent[];
  tags?: string[];
}

export interface BlogContent {
  type: 'heading' | 'paragraph' | 'code' | 'list' | 'quote' | 'image';
  content: string;
  items?: string[];
  language?: string;
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  skills: string[];
  avatarUrl: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
}

export interface PhilosophyCard {
  id: string;
  icon?: string;
  title: string;
  description: string;
  stat?: string;
  statLabel?: string;
  large?: boolean;
}

export interface FooterLink {
  label: string;
  url: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface TechSkill {
  name: string;
  description: string;
  level: 'primary' | 'expert' | 'intermediate';
}

export interface Milestone {
  id: string;
  period: string;
  role: string;
  company: string;
  description: string;
  badge: string;
}

export interface MetaData {
  id: string;
  workExperience: string;
  devstackPortfolio: string;
  appsLaunched: string;
  gitCommits: string;
  crashFreeRate: string;
  clientSatisfaction: string;
  resumeUrl: string;
}
