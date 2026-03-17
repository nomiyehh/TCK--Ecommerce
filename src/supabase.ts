import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://pawzsovaadcrmrvsmxuj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhd3pzb3ZhYWRjcm1ydnNteHVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0NzMxNzIsImV4cCI6MjA4OTA0OTE3Mn0.QKc_5bZj5RtMw8eIksqqZ8oz1luq5vIfaHQIeO8e2xA';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
