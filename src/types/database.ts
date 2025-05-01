
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  created_at: string;
  updated_at: string;
}

export interface Template {
  id: string;
  title: string;
  description: string;
  image_url: string;
  form_url: string;
  preview_url: string;
  category_id: string | null;
  status: 'active' | 'inactive' | 'archived';
  order_index: number;
  created_at: string;
  updated_at: string;
  categories?: Category; // Added this field for the joined data from Supabase
}

export interface Showcase {
  id: string;
  client_name: string;
  site_url: string;
  image_url: string;
  description?: string;
  category_id: string | null;
  featured: boolean;
  created_at: string;
  updated_at: string;
}
