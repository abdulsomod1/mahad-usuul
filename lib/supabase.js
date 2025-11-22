import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://boypchcfpiaeqrosfrbn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJveXBjaGNmcGlhZXFyb3NmcmJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3ODgzNzMsImV4cCI6MjA3OTM2NDM3M30.qycWLoy-MwGusT0cDjhUck4SKf6rK805FS7nyv31SQs'

export const supabase = createClient(supabaseUrl, supabaseKey)
