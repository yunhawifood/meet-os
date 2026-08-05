const SUPABASE_URL = 'https://rbtwvemljpgnwhlzayqy.supabase.co';

const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_m-Uc3eR2-57P36HMP_eHsQ_F5h1tfzu';

window.supabaseClient = window.supabase.createClient(

  SUPABASE_URL,

  SUPABASE_PUBLISHABLE_KEY

);
