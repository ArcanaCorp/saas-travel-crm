import { SUPABASE } from "@/config";
import { createBrowserClient } from "@supabase/ssr";

export const clientDB = createBrowserClient(SUPABASE.URL, SUPABASE.KEY);