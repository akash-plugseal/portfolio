import { supabase } from './client';
import type { Project, ProjectFeature, TechStackItem } from '../../models/types';

interface ProjectRow {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image_url: string;
  link: string;
  tag: string;
  category: string;
  subtitle: string;
  client: string;
  duration: string;
  role: string;
  year: string;
  challenge: string;
  solution: string;
  results: string[];
  features: ProjectFeature[];
  gallery: string[];
  tech_stack: TechStackItem[];
}

function rowToProject(row: ProjectRow): Project {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    technologies: row.technologies || [],
    imageUrl: row.image_url,
    link: row.link,
    tag: row.tag,
    category: row.category as Project['category'],
    subtitle: row.subtitle || '',
    client: row.client || '',
    duration: row.duration || '',
    role: row.role || '',
    year: row.year || '',
    challenge: row.challenge || '',
    solution: row.solution || '',
    results: row.results || [],
    features: row.features || [],
    gallery: row.gallery || [],
    techStack: row.tech_stack || [],
  };
}

function projectToRow(project: Project) {
  return {
    title: project.title,
    description: project.description,
    technologies: project.technologies,
    image_url: project.imageUrl,
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
    results: project.results || [],
    features: project.features || [],
    gallery: project.gallery || [],
    tech_stack: project.techStack || [],
    updated_at: new Date().toISOString(),
  };
}

export async function getProjectsFromSupabase(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error.message);
    return [];
  }

  return (data as ProjectRow[]).map(rowToProject);
}

export async function upsertProjectToSupabase(project: Project): Promise<{ success: boolean; error?: string }> {
  const { data: existing } = await supabase
    .from('projects')
    .select('id')
    .eq('id', project.id)
    .single();

  if (existing) {
    const { error } = await supabase
      .from('projects')
      .update(projectToRow(project))
      .eq('id', project.id);

    if (error) {
      console.error('Error updating project:', error.message);
      return { success: false, error: error.message };
    }
  } else {
    const { error } = await supabase
      .from('projects')
      .insert({
        id: project.id,
        ...projectToRow(project),
      });

    if (error) {
      console.error('Error inserting project:', error.message);
      return { success: false, error: error.message };
    }
  }

  return { success: true };
}

export async function deleteProjectFromSupabase(id: string): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting project:', error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}
