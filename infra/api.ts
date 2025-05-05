import { email } from "./email";

export const api = new sst.aws.ApiGatewayV2("api", {
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
    permissions: [{
        actions: ["ses:SendEmail", "ses:SendRawEmail", "ses:SendTemplatedEmail"],
        resources: ["*"]
    }]
});
api.route("POST /contact", {
    handler: "packages/functions/src/contact_handler.handler",
    runtime: "nodejs20.x",
    permissions: [{
        actions: ["ses:SendEmail", "ses:SendRawEmail", "ses:SendTemplatedEmail"],
        resources: ["*"]
    }]
});
