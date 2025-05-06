const secrets = {
  PlacesApiKey: new sst.Secret("PlacesApiKey"),
  SupabaseDatabasePassword: new sst.Secret("SupabaseDatabasePassword", ""),
};
export const allSecrets = Object.values(secrets);