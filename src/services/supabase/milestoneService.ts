import { supabase } from './client';
import type { Milestone } from '../../models/types';

interface MilestoneRow {
  id: string;
  period: string;
  role: string;
  company: string;
  description: string;
  badge: string;
  sort_order: number;
}

function rowToMilestone(row: MilestoneRow): Milestone {
  return {
    id: row.id,
    period: row.period,
    role: row.role,
    company: row.company,
    description: row.description,
    badge: row.badge,
  };
}

export async function getMilestonesFromSupabase(): Promise<Milestone[]> {
  const { data, error } = await supabase
    .from('milestones')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching milestones:', error.message);
    return [];
  }

  return (data as MilestoneRow[]).map(rowToMilestone);
}

export async function upsertMilestoneToSupabase(milestone: Milestone, sortOrder: number): Promise<{ success: boolean; error?: string }> {
  const { data: existing } = await supabase
    .from('milestones')
    .select('id')
    .eq('id', milestone.id)
    .single();

  if (existing) {
    const { error } = await supabase
      .from('milestones')
      .update({
        period: milestone.period,
        role: milestone.role,
        company: milestone.company,
        description: milestone.description,
        badge: milestone.badge,
        sort_order: sortOrder,
        updated_at: new Date().toISOString(),
      })
      .eq('id', milestone.id);

    if (error) {
      console.error('Error updating milestone:', error.message);
      return { success: false, error: error.message };
    }
  } else {
    const { error } = await supabase
      .from('milestones')
      .insert({
        id: milestone.id,
        period: milestone.period,
        role: milestone.role,
        company: milestone.company,
        description: milestone.description,
        badge: milestone.badge,
        sort_order: sortOrder,
      });

    if (error) {
      console.error('Error inserting milestone:', error.message);
      return { success: false, error: error.message };
    }
  }

  return { success: true };
}

export async function deleteMilestoneFromSupabase(id: string): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('milestones')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting milestone:', error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}
