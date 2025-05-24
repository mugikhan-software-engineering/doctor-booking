const secrets = {
  PlacesApiKey: new sst.Secret("PlacesApiKey", "no-no"),
  SupabaseUrl: new sst.Secret("SupabaseUrl", "https://sjfgkwkkbbhchurkbxzb.supabase.co"),
  SupabaseAnonKey: new sst.Secret("SupabaseAnonKey", "anon-key"),
  SupabaseJwtSecret: new sst.Secret("SupabaseJwtSecret", "no-no"),
};
export const allSecrets = Object.values(secrets);