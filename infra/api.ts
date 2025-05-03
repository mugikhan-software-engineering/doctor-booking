export const api = new sst.aws.ApiGatewayV2("api", {
    domain: {
        name: $app.stage === "production" ? "drahsanahmad.com" : "dev.drahsanahmad.com",
        path: "api",
        dns: sst.aws.dns({
            override: $app.stage === "production" ? false : true
        })
    }
});

api.route("POST /send-email", {
    handler: "packages/functions/src/send_email.handler",
    runtime: "nodejs20.x",
});
api.route("POST /contact", {
    handler: "packages/functions/src/contact_handler.handler",
    runtime: "nodejs20.x",
});
