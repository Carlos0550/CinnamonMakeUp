import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.log('Supabase URL:', process.env.REACT_APP_SUPABASE_URL);
  console.log('Supabase Anon Key:', process.env.REACT_APP_SUPABASE_ANON_KEY);
  

  throw new Error('supabaseUrl and supabaseAnonKey are required.');

}
// console.log('Supabase URL:', process.env.REACT_APP_SUPABASE_URL);
  // console.log('Supabase Anon Key:', process.env.REACT_APP_SUPABASE_ANON_KEY);
  

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
