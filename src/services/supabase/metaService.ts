import { supabase } from './client';

// Generic functions for single-value tables
async function getValueFromTable(table: string): Promise<string> {
  const { data, error } = await supabase
    .from(table)
    .select('value')
    .limit(1)
    .single();

  if (error) {
    console.error(`Error fetching ${table}:`, error.message);
    return '';
  }

  return data?.value || '';
}

async function upsertValueToTable(table: string, value: string): Promise<{ success: boolean; error?: string }> {
  const { data: existing } = await supabase
    .from(table)
    .select('id')
    .limit(1)
    .single();

  if (existing) {
    const { error } = await supabase
      .from(table)
      .update({ value, updated_at: new Date().toISOString() })
      .eq('id', existing.id);

    if (error) {
      console.error(`Error updating ${table}:`, error.message);
      return { success: false, error: error.message };
    }
  } else {
    const { error } = await supabase
      .from(table)
      .insert({ value });

    if (error) {
      console.error(`Error inserting ${table}:`, error.message);
      return { success: false, error: error.message };
    }
  }

  return { success: true };
}

// Work Experience
export async function getWorkExperience(): Promise<string> {
  return getValueFromTable('work_experience');
}

export async function upsertWorkExperience(value: string) {
  return upsertValueToTable('work_experience', value);
}

// DevStack Portfolio
export async function getDevStackPortfolio(): Promise<string> {
  return getValueFromTable('devstack_portfolio');
}

export async function upsertDevStackPortfolio(value: string) {
  return upsertValueToTable('devstack_portfolio', value);
}

// Apps Launched
export async function getAppsLaunched(): Promise<string> {
  return getValueFromTable('apps_launched');
}

export async function upsertAppsLaunched(value: string) {
  return upsertValueToTable('apps_launched', value);
}

// Git Commits
export async function getGitCommits(): Promise<string> {
  return getValueFromTable('git_commits');
}

export async function upsertGitCommits(value: string) {
  return upsertValueToTable('git_commits', value);
}

// Crash Free Rate
export async function getCrashFreeRate(): Promise<string> {
  return getValueFromTable('crash_free_rate');
}

export async function upsertCrashFreeRate(value: string) {
  return upsertValueToTable('crash_free_rate', value);
}

// Client Satisfaction
export async function getClientSatisfaction(): Promise<string> {
  return getValueFromTable('client_satisfaction');
}

export async function upsertClientSatisfaction(value: string) {
  return upsertValueToTable('client_satisfaction', value);
}

// Resume
export async function getResume(): Promise<string> {
  return getValueFromTable('resume');
}

export async function upsertResume(value: string) {
  return upsertValueToTable('resume', value);
}
