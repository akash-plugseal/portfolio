import { supabase } from './supabase/client';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  error?: string;
}

export async function sendContactEmail(
  data: ContactFormData
): Promise<ContactFormResponse> {
  const { data: result, error } = await supabase.functions.invoke(
    'send-contact-email',
    {
      body: data,
    }
  );

  if (error) {
    return { success: false, error: error.message };
  }

  if (result?.error) {
    return {
      success: false,
      error:
        typeof result.error === 'string'
          ? result.error
          : 'Failed to send email',
    };
  }

  return { success: true };
}
