import { email } from "./email";
import { project } from "./storage";
import { allSecrets } from "./secrets";
export const api = new sst.aws.ApiGatewayV2("api", {
    domain: $app.stage === "mugi" ? undefined : {
        name: $app.stage === "production" ? "api.drahsanahmad.com" : "dev-api.drahsanahmad.com",
    },
    transform: {
        route: {
            handler: {
                link: $app.stage === "mugi" ? [project] : [email, project],
            },
        }
    },
    link: [project],
});

const authorizer = api.addAuthorizer({
    name: "SupabaseAuthorizer",
    lambda: {
        function: {
            handler: "packages/functions/src/authorize.handler",
            runtime: "nodejs20.x",
            link: [allSecrets[3]]
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

api.route("GET /appointments/slots", {
    handler: "packages/functions/src/appointment_handler.getAvailableSlots",
    runtime: "nodejs20.x",
});

api.route("POST /book-appointment", {
    handler: "packages/functions/src/appointment_handler.bookAppointment",
    runtime: "nodejs20.x",
});

api.route("POST /search-appointment", {
    handler: "packages/functions/src/appointment_handler.searchAppointment",
    runtime: "nodejs20.x",
});

api.route("PUT /update-appointment", {
    handler: "packages/functions/src/appointment_handler.updateAppointment",
    runtime: "nodejs20.x",
});

api.route("GET /admin/appointments", "packages/functions/src/admin_handler.getAllAppointments", {
    auth: {
        lambda: authorizer.id
    }
});

api.route("PUT /admin/appointments/{appointmentId}/status", "packages/functions/src/admin_handler.updateAppointmentStatus", {
    auth: {
        lambda: authorizer.id
    },
});

api.route("POST /admin/availability", "packages/functions/src/admin_handler.setAvailability", {
    auth: {
        lambda: authorizer.id
    }
});

api.route("POST /admin/availability/disable-sundays", "packages/functions/src/admin_handler.disableSundaysInRange", {
    auth: {
        lambda: authorizer.id
    }
});

api.route("GET /admin/availability", "packages/functions/src/admin_handler.getAvailability", {
    auth: {
        lambda: authorizer.id
    }
});
