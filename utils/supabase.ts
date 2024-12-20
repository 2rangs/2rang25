
import {createBrowserClient} from "@supabase/ssr";

const supabaseUrl = process.env.VITE_SUPABASE_URL as string
const supabaseKey =  process.env.VITE_SUPABASE_KEY as string
export const supabase = createBrowserClient(supabaseUrl, supabaseKey);
        