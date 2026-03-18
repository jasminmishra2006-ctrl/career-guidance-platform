import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  grade_level: '10th' | '12th' | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
};

export type AptitudeResult = {
  id: string;
  user_id: string;
  grade_level: string;
  results: Record<string, any>;
  completed_at: string;
};

export type EbookPurchase = {
  id: string;
  user_id: string;
  ebook_id: string;
  ebook_title: string;
  price: number;
  purchased_at: string;
};

export type ChatMessage = {
  id: string;
  user_id: string;
  message: string;
  sender: 'user' | 'bot';
  created_at: string;
};
