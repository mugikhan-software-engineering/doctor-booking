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
          profile: input.stage === "production" ? "default" : "doctor-dev",
          region: "af-south-1"
        }
      }
    };
  },
  async run() {
    const domain = $app.stage === "production"
      ? "drahsanahmad.com"
      : "dev.drahsanahmad.com";
    const router = new sst.aws.Router("DoctorBooking", {
      domain: {
        name: domain,
        aliases: [`*.${domain}`]
      }
    });
    await import("./infra/api");

    const secrets = {
      PlacesApiKey: new sst.Secret("PlacesApiKey"),
    };
    const allSecrets = Object.values(secrets);
  

    new sst.aws.SvelteKit("site", {
      router: {
        instance: router,
      },
      link: [...allSecrets]
    });
  },
});
