const SUPABASE_URL = 'NEXT_PUBLIC_SUPABASE_URL=https://rbtwvemljpgnwhlzayqy.supabase.co';

const SUPABASE_PUBLISHABLE_KEY = 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_m-Uc3eR2-57P36HMP_eHsQ_F5h1tfzu';

window.supabaseClient = supabase.createClient(

  SUPABASE_URL,

  SUPABASE_PUBLISHABLE_KEY

);
