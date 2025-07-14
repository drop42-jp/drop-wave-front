import { createClient } from "@supabase/supabase-js";
import { Database } from "../database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Client-side auth helpers
export const auth = supabase.auth;

// Database helpers
export const db = supabase;

// Storage helpers
export const storage = supabase.storage;
