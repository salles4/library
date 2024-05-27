import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://oatzrwezibkcabfwxppo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hdHpyd2V6aWJrY2FiZnd4cHBvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMzYwOTE3MSwiZXhwIjoyMDI5MTg1MTcxfQ.u2HUJZ-hGi8Jk97FWI-hiQ3NpyMMM7V6hHQaL_Gvx1s"
);