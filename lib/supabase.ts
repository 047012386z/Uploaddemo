import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_KEY || "";

export const supabase = createClient(
    'https://mtfinjbgtxivhfncbccm.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10ZmluamJndHhpdmhmbmNiY2NtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxNDYzMzIsImV4cCI6MjA1MTcyMjMzMn0.saAnHWrb0tYorgcI_Be-v6z_upvYQlpP9infGsQ-tEE'
)