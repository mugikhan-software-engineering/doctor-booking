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
    const email = new sst.aws.Email("HelpEmail", {
      sender: "help@drahsanahmad.com",
      transform: {
          identity: (args, opts) => {
              args.configurationSetName = undefined;
              opts.import = "help@drahsanahmad.com";
          }
      }
    });

    const api = new sst.aws.ApiGatewayV2("api", {
      domain: {
          name: $app.stage === "production" ? "api.drahsanahmad.com" : "dev-api.drahsanahmad.com",
      },
      transform: {
        route: {
          handler: {
            link: [email],
          },
        }
      },      
    });
  
    api.route("POST /send-email", {
        handler: "packages/functions/src/send_email.handler",
        runtime: "nodejs20.x",
        permissions: [
          {
            actions: ["ses:SendEmail", "ses:SendRawEmail", "ses:SendTemplatedEmail"],
            resources: ["*"]
          }
        ]
    });
    api.route("POST /contact", {
        handler: "packages/functions/src/contact_handler.handler",
        runtime: "nodejs20.x",
        permissions: [
          {
            actions: ["ses:SendEmail", "ses:SendRawEmail", "ses:SendTemplatedEmail"],
            resources: ["*"]
          }
        ]
    });

    const domain = $app.stage === "production"
      ? "drahsanahmad.com"
      : "dev.drahsanahmad.com";
    const routerName = $app.stage === "production" ? "DoctorBooking" : "router";
    const router = new sst.aws.Router(routerName, {
      domain: {
        name: domain,
        redirects: [`www.${domain}`],
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
