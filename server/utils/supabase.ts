
import { createClient } from '@supabase/supabase-js'


const supabaseUrl ='https://wbtbmarooytomtynuvoe.supabase.co'
const supabaseKey =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndidGJtYXJvb3l0b210eW51dm9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg2NTQ3NTAsImV4cCI6MjAxNDIzMDc1MH0.xV176B7fRp8qooWmygkUmGxA4shPEjH7JGXNrsx3QEk'
export const supabase = createClient(supabaseUrl, supabaseKey);
