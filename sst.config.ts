/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "doctor-booking",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          profile: input.stage === "dev" ? "doctor-dev" : undefined, // Only use doctor-dev profile for dev stage
          region: "af-south-1"
        }
      }
    };
  },
  async run() {
   const { email } = await import("./infra/email");
   const { api } = await import("./infra/api");

    const domain = $app.stage === "production"
      ? "drahsanahmad.com"
      : "dev.drahsanahmad.com";
    const routerName = $app.stage === "production" ? "DoctorBooking" : "router";
    const redirects = $app.stage === "production" ? [`www.${domain}`] : undefined;
    const router = new sst.aws.Router(routerName, {
      domain: {
        name: domain,
        redirects: redirects,
      }
    });
   
    const secrets = {
      PlacesApiKey: new sst.Secret("PlacesApiKey"),
    };
    const allSecrets = Object.values(secrets);
  
    new sst.aws.SvelteKit("site", {
      router: {
        instance: router,
      },
      link: [...allSecrets, email, api]
    });

    return {
      api: api.url,
    }
  },
});
