import { email } from "./email";
import { project } from "./storage";

export const api = new sst.aws.ApiGatewayV2("api", {
    domain: $app.stage === "mugi" ? undefined : {
        name: $app.stage === "production" ? "api.drahsanahmad.com" : "dev-api.drahsanahmad.com",
    },
    transform: {
        route: {
            handler: {
                link: $app.stage === "mugi" ? [project] : [email],
            },
        }
    },
    link: [project],
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

api.route("GET /admin/appointments", {
    handler: "packages/functions/src/admin_handler.getAllAppointments",
    runtime: "nodejs20.x",
});

api.route("GET /appointments/slots", {
    handler: "packages/functions/src/appointment_handler.getAvailableSlots",
    runtime: "nodejs20.x",
});

api.route("POST /book-appointment", {
    handler: "packages/functions/src/appointment_handler.bookAppointment",
    runtime: "nodejs20.x",
});

// Appointment routes
// api.route("GET /appointments/slots", {
//     handler: "packages/functions/src/appointment_handler.getAvailableSlots",
//     runtime: "nodejs20.x",
//     permissions: [{
//         actions: ["dynamodb:Scan"],
//         resources: ["*"]
//     }]
// });

// api.route("POST /appointments", {
//     handler: "packages/functions/src/appointment_handler.bookAppointment",
//     runtime: "nodejs20.x",
//     permissions: [{
//         actions: ["dynamodb:PutItem"],
//         resources: ["*"]
//     }]
// });

// api.route("PUT /appointments/{appointmentId}", {
//     handler: "packages/functions/src/appointment_handler.updateAppointment",
//     runtime: "nodejs20.x",
//     permissions: [{
//         actions: ["dynamodb:UpdateItem"],
//         resources: ["*"]
//     }]
// });

// // Admin routes
// api.route("GET /admin/appointments", {
//     handler: "packages/functions/src/admin_handler.getAllAppointments",
//     runtime: "nodejs20.x",
//     permissions: [{
//         actions: ["dynamodb:Scan"],
//         resources: ["*"]
//     }]
// });

// api.route("PUT /admin/appointments/{appointmentId}/status", {
//     handler: "packages/functions/src/admin_handler.updateAppointmentStatus",
//     runtime: "nodejs20.x",
//     permissions: [{
//         actions: ["dynamodb:UpdateItem"],
//         resources: ["*"]
//     }]
// });

api.route("POST /admin/availability", {
    handler: "packages/functions/src/admin_handler.setAvailability",
    runtime: "nodejs20.x",
    permissions: [{
        actions: ["dynamodb:PutItem"],
        resources: ["*"]
    }]
});

api.route("GET /admin/availability", {
    handler: "packages/functions/src/admin_handler.getAvailability",
    runtime: "nodejs20.x",
    permissions: [{
        actions: ["dynamodb:Scan"],
        resources: ["*"]
    }]
});
