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
          profile: input.stage === "production" ? "default" : "doctor-dev"
        }
      }
    };
  },
  async run() {
    const api = await import("./infra/api");
    const email = await import("./infra/email");

    new sst.aws.SvelteKit("site", {
      domain: {
        name: "drahsanahmad.com",
        redirects: ["www.drahsanahmad.com"],
      },
      link: [email, api],
    });
  },
});
