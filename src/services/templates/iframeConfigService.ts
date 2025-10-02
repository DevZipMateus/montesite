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

  if (!data) return null;

  const mapped: IframeConfig = {
    id: (data as any).id,
    name: (data as any).name ?? 'Iframe Config',
    template_id: (data as any).template_id ?? null,
    iframe_code: (data as any).iframe_code,
    is_active: (data as any).is_active,
    created_at: (data as any).created_at,
    updated_at: (data as any).updated_at,
  };
  return mapped;
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

  return (data as any[] | null)?.map((row: any) => ({
    id: row.id,
    name: row.name ?? 'Iframe Config',
    template_id: row.template_id ?? null,
    iframe_code: row.iframe_code,
    is_active: row.is_active,
    created_at: row.created_at,
    updated_at: row.updated_at,
  })) || [];
};

export const createIframeConfig = async (
  iframeData: Omit<IframeConfig, 'id' | 'created_at' | 'updated_at' | 'template_id'> & { template_id?: string }
): Promise<IframeConfig> => {
  const { data, error } = await supabase
    .from('template_iframe_configs')
    .insert({ ...iframeData, template_id: null })
    .select('*')
    .single();

  if (error) {
    console.error('Error creating iframe config:', error);
    throw error;
  }

  const mapped: IframeConfig = {
    id: (data as any).id,
    name: (data as any).name ?? 'Iframe Config',
    template_id: (data as any).template_id ?? null,
    iframe_code: (data as any).iframe_code,
    is_active: (data as any).is_active,
    created_at: (data as any).created_at,
    updated_at: (data as any).updated_at,
  };
  return mapped;
};

export const updateIframeConfig = async (
  id: string,
  updates: Partial<Omit<IframeConfig, 'id' | 'created_at' | 'updated_at'>>
): Promise<IframeConfig> => {
  const { data, error } = await supabase
    .from('template_iframe_configs')
    .update(updates)
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    console.error('Error updating iframe config:', error);
    throw error;
  }

  const mapped: IframeConfig = {
    id: (data as any).id,
    name: (data as any).name ?? 'Iframe Config',
    template_id: (data as any).template_id ?? null,
    iframe_code: (data as any).iframe_code,
    is_active: (data as any).is_active,
    created_at: (data as any).created_at,
    updated_at: (data as any).updated_at,
  };
  return mapped;
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
