export const api = new sst.aws.ApiGatewayV2("api", {
    domain: "api.drahsanahmad.com",
});

api.route("POST /send-email", {
    handler: "packages/functions/src/send_email.handler",
    runtime: "nodejs20.x",
});
api.route("POST /contact", {
    handler: "packages/functions/src/contact_handler.handler",
    runtime: "nodejs20.x",
});
