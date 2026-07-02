import { supabase } from './client';
import type { BlogPost, BlogContent } from '../../models/types';

interface BlogRow {
  id: string;
  title: string;
  excerpt: string;
  image_url: string;
  category: string;
  read_time: string;
  featured: boolean;
  date: string;
  author: string;
  author_role: string;
  content: BlogContent[];
  tags: string[];
}

function rowToBlog(row: BlogRow): BlogPost {
  return {
    id: row.id,
    title: row.title,
    excerpt: row.excerpt,
    imageUrl: row.image_url,
    category: row.category as BlogPost['category'],
    readTime: row.read_time,
    featured: row.featured,
    date: row.date || '',
    author: row.author || '',
    authorRole: row.author_role || '',
    content: row.content || [],
    tags: row.tags || [],
  };
}

function blogToRow(blog: BlogPost) {
  return {
    title: blog.title,
    excerpt: blog.excerpt,
    image_url: blog.imageUrl,
    category: blog.category,
    read_time: blog.readTime,
    featured: blog.featured || false,
    date: blog.date || '',
    author: blog.author || '',
    author_role: blog.authorRole || '',
    content: blog.content || [],
    tags: blog.tags || [],
    updated_at: new Date().toISOString(),
  };
}

export async function getBlogsFromSupabase(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blogs:', error.message);
    return [];
  }

  return (data as BlogRow[]).map(rowToBlog);
}

export async function upsertBlogToSupabase(blog: BlogPost): Promise<{ success: boolean; error?: string }> {
  const { data: existing } = await supabase
    .from('blogs')
    .select('id')
    .eq('id', blog.id)
    .single();

  if (existing) {
    const { error } = await supabase
      .from('blogs')
      .update(blogToRow(blog))
      .eq('id', blog.id);

    if (error) {
      console.error('Error updating blog:', error.message);
      return { success: false, error: error.message };
    }
  } else {
    const { error } = await supabase
      .from('blogs')
      .insert({
        id: blog.id,
        ...blogToRow(blog),
      });

    if (error) {
      console.error('Error inserting blog:', error.message);
      return { success: false, error: error.message };
    }
  }

  return { success: true };
}

export async function deleteBlogFromSupabase(id: string): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('blogs')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting blog:', error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}
