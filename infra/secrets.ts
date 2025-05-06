const secrets = {
  PlacesApiKey: new sst.Secret("PlacesApiKey", "no-no"),
  SupabaseUrl: new sst.Secret("SupabaseUrl", "https://sjfgkwkkbbhchurkbxzb.supabase.co"),
  SupabaseAnonKey: new sst.Secret("SupabaseAnonKey", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqZmdrd2trYmJoY2h1cmtieHpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0Nzk5NjgsImV4cCI6MjA2MjA1NTk2OH0.r-wER_yAGcpqK4NrEybr7_PGoMHx5cmFekPJov3SpgY"),
};
export const allSecrets = Object.values(secrets);