import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jtunhbzkievmyxxreudg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0dW5oYnpraWV2bXl4eHJldWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI0MTU3MjQsImV4cCI6MjA0Nzk5MTcyNH0.drSMbKtOPo69-2F65p_hQRKZmTZtsOiRtxbq8hVYwwU";

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface LiquidityPosition {
  id: number;
  address: string;
  tickLower: number;
  tickUpper: number;
  liquidityDelta: number;
  ethAmount: number;
  created_at: string;
}
