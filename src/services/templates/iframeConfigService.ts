import { supabase } from '@/integrations/supabase/client';
import { IframeConfig } from '@/types/database';

export const fetchIframeConfig = async (templateId: string): Promise<IframeConfig | null> => {
  const { data, error } = await supabase
    .from('template_iframe_configs')
    .select('*')
    .eq('template_id', templateId)
    .eq('is_active', true)
    .maybeSingle();

  if (error) {
    console.error('Error fetching iframe config:', error);
    throw error;
  }

  return data;
};

export const fetchAllIframeConfigs = async (): Promise<IframeConfig[]> => {
  const { data, error } = await supabase
    .from('template_iframe_configs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all iframe configs:', error);
    throw error;
  }

  return data || [];
};

export const createIframeConfig = async (
  iframeData: Omit<IframeConfig, 'id' | 'created_at' | 'updated_at'>
): Promise<IframeConfig> => {
  const { data, error } = await supabase
    .from('template_iframe_configs')
    .insert(iframeData)
    .select()
    .single();

  if (error) {
    console.error('Error creating iframe config:', error);
    throw error;
  }

  return data;
};

export const updateIframeConfig = async (
  id: string,
  updates: Partial<Omit<IframeConfig, 'id' | 'created_at' | 'updated_at'>>
): Promise<IframeConfig> => {
  const { data, error } = await supabase
    .from('template_iframe_configs')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating iframe config:', error);
    throw error;
  }

  return data;
};

export const deleteIframeConfig = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('template_iframe_configs')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting iframe config:', error);
    throw error;
  }
};
