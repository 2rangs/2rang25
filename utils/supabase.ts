
import {createBrowserClient} from "@supabase/ssr";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey =  import.meta.env.VITE_SUPABASE_KEY
export const supabase = createBrowserClient(supabaseUrl, supabaseKey);
        