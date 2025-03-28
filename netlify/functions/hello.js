import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function handler(event, context) {
  try {
    const { data, error } = await supabase

         .from("Users")
         .select()
         .eq('email', 'testuser@fakeemail.com')
      // .from('Items')
      // .select()
      // .eq('name', 'Test Item')
      ;

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}

