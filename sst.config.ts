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
          profile:
            input.stage === "dev"
              ? "doctor-dev"
              : input.stage === "mugi"
                ? "mugi-dev"
                : undefined, // Only use doctor-dev profile for dev stage
          region: "af-south-1",
        },
        supabase: {
          accessToken: process.env.SUPABASE_ACCESS_TOKEN,
          endpoint: "https://api.supabase.com/"
        },
        random: "4.18.2",
      },
    };
  },
  async run() {
    const { allSecrets } = await import("./infra/secrets");
    const { email } = await import("./infra/email");
    const { api } = await import("./infra/api");
    const { project } = await import("./infra/storage");

    const domain =
      $app.stage === "production" ? "drahsanahmad.com" : "dev.drahsanahmad.com";
    const routerName = $app.stage === "production" ? "DoctorBooking" : "router";
    const redirects =
      $app.stage === "production" ? [`www.${domain}`] : undefined;
    const isPermanentStage = ["production", "dev"].includes($app.stage);
    const router = isPermanentStage
      ? new sst.aws.Router(routerName, {
          domain: {
            name: domain,
            redirects: redirects,
          },
        })
      : new sst.aws.Router(routerName);
    let links: any[] = [];
    if (isPermanentStage) {
      links = [...allSecrets, api, email, project];
    } else {
      links = [...allSecrets, api, project];
    }
    new sst.aws.SvelteKit("site", {
      router: {
        instance: router,
      },
      link: links,
      environment: {
        VITE_API_URL: api.url,
        VITE_SUPABASE_URL: allSecrets[1].value,
        VITE_SUPABASE_ANON_KEY: allSecrets[2].value,
      }
    });
    new sst.x.DevCommand("Studio", {
      link: [project],
      dev: {
        command: "npx drizzle-kit studio",
      },
    });
    return {
      api: api.url,
      project_id: project.id,
      project_name: project.name,
      db_password: project.databasePassword,
    };
  },
});
