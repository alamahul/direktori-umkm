export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Listing {
  id: string;
  user_id: string;
  category_id: string;
  title: string;
  slug: string;
  description: string;
  phone_number: string;
  address: string;
  district: string;
  city: string;
  images: string[];
  is_verified: boolean;
  is_featured: boolean;
  created_at: string;
  category?: Category;
}

// src/types/database.ts
export interface FilterParams {
  q?: string;
  category?: string;
  district?: string;
}