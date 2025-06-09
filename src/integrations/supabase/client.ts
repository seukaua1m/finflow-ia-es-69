
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://jlvethvtfxqriehnsihu.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsdmV0aHZ0ZnhxcmllaG5zaWh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NzYzMjUsImV4cCI6MjA1MjQ1MjMyNX0.wvq6PqXJpZN8VO-eUB8XbEL_Xj45W7-5MZQg-PUrO30"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
