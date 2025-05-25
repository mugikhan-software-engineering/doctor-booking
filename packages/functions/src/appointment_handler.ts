import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { db } from "$lib/server/db";
import { appointmentsTable, availabilityTable, usersTable } from "$lib/server/schema";
import { eq, and, gte, lte } from "drizzle-orm";
import { sql } from "drizzle-orm";
import type { 
    ApiResponse, 
    AppointmentData, 
    AvailableSlotsResponse
} from "$lib/types/api_types";
import { createApiResponse } from "$lib/types/api_types";
import { Resource } from "sst";

export const getAvailableSlots: APIGatewayProxyHandlerV2 = async (event): Promise<ApiResponse<AvailableSlotsResponse>> => {
    try {
        const { date } = event.queryStringParameters || {};
        
        if (!date) {
            return createApiResponse(400, "Date is required");
        }

        // Get available slots using a more efficient query
        const result = await db.execute<{ slot: string }>(sql`
            WITH RECURSIVE time_slots AS (
                SELECT '09:00:00'::time AS slot
                UNION ALL
                SELECT (slot + '30 minutes'::interval)::time
                FROM time_slots
                WHERE slot < '17:00:00'::time
            ),
            booked_slots AS (
                SELECT "time"
                FROM appointments
                WHERE date = ${date}
                AND status = 'scheduled'
            ),
            availability_settings AS (
                SELECT is_available, start_time, end_time
                FROM availability
                WHERE date = ${date}
            )
            SELECT ts.slot::text
            FROM time_slots ts
            LEFT JOIN booked_slots bs ON ts.slot = bs."time"
            LEFT JOIN availability_settings av ON true
            WHERE bs."time" IS NULL
            AND (
                av.is_available IS NULL  -- No availability record exists
                OR av.is_available = true  -- Date is available
                OR (
                    av.is_available = false  -- Date is blocked
                    AND (
                        av.start_time IS NULL
                        OR ts.slot < av.start_time
                        OR av.end_time IS NULL
                        OR ts.slot > av.end_time
                    )
                )
            )
            ORDER BY ts.slot;
        `);

        return createApiResponse(200, "Available slots retrieved successfully", {
            availableSlots: result.map(row => row.slot)
        });
    } catch (error) {
        console.error("Error getting available slots:", error);
        return createApiResponse(500, "Internal server error");
    }
};

export const bookAppointment: APIGatewayProxyHandlerV2 = async (event): Promise<ApiResponse<AppointmentData>> => {
    try {
        const body = JSON.parse(event.body || "{}");
        const { email, name, contactNumber, date, time, patientType, hasReferral, referringDoctor, hasMedicalAuth, notes } = body;

        if (!email || !name || !contactNumber || !date || !time) {
            return createApiResponse(400, "Missing required fields");
        }

        // First, find or create the user
        let [user] = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, email));

        if (!user) {
            [user] = await db
                .insert(usersTable)
                .values({
                    name,
                    email,
                    phoneNumber: contactNumber,
                    age: 0, // Default age, can be updated later
                })
                .returning();
        }

        // Check if user already has an appointment
        const [existingUserAppointment] = await db
            .select()
            .from(appointmentsTable)
            .where(
                and(
                    eq(appointmentsTable.userId, user.id),
                    eq(appointmentsTable.status, 'scheduled')
                )
            );

        if (existingUserAppointment) {
            return createApiResponse(409, 
                "You already have a scheduled appointment. Please cancel or reschedule your existing appointment before booking a new one."
            );
        }

        // Check if slot is still available
        const [existingAppointment] = await db
            .select()
            .from(appointmentsTable)
            .where(
                and(
                    eq(appointmentsTable.date, date),
                    eq(appointmentsTable.time, time),
                    eq(appointmentsTable.status, 'scheduled')
                )
            );

        if (existingAppointment) {
            return createApiResponse(409, "Time slot is already booked");
        }

        // Check availability settings
        const [availability] = await db
            .select()
            .from(availabilityTable)
            .where(eq(availabilityTable.date, date));

        if (availability && !availability.isAvailable) {
            const isBlocked = (!availability.startTime || time >= availability.startTime) &&
                            (!availability.endTime || time <= availability.endTime);
            if (isBlocked) {
                return createApiResponse(409, "Time slot is not available");
            }
        }

        // Create appointment
        const [appointment] = await db
            .insert(appointmentsTable)
            .values({
                userId: user.id,
                date,
                time,
                status: 'scheduled',
                patientType: patientType || 'new',
                hasReferral: hasReferral || false,
                referringDoctor: hasReferral ? referringDoctor : null,
                hasMedicalAuth: hasMedicalAuth || false,
                notes: notes || null
            })
            .returning();

        // Fetch the complete appointment data with user information
        const [completeAppointment] = await db
            .select({
                id: appointmentsTable.id,
                userId: appointmentsTable.userId,
                date: appointmentsTable.date,
                time: appointmentsTable.time,
                status: appointmentsTable.status,
                patientType: appointmentsTable.patientType,
                hasReferral: appointmentsTable.hasReferral,
                referringDoctor: appointmentsTable.referringDoctor,
                hasMedicalAuth: appointmentsTable.hasMedicalAuth,
                notes: appointmentsTable.notes,
                createdAt: appointmentsTable.createdAt,
                updatedAt: appointmentsTable.updatedAt,
                user: {
                    id: usersTable.id,
                    name: usersTable.name,
                    email: usersTable.email,
                    age: usersTable.age,
                    phoneNumber: usersTable.phoneNumber,
                    address: usersTable.address,
                    medicalHistory: usersTable.medicalHistory,
                    emergencyContact: usersTable.emergencyContact,
                    createdAt: usersTable.createdAt,
                    updatedAt: usersTable.updatedAt
                }
            })
            .from(appointmentsTable)
            .leftJoin(usersTable, eq(appointmentsTable.userId, usersTable.id))
            .where(eq(appointmentsTable.id, appointment.id));

        if(process.env.SST_DEV) {
            console.log('App Stage', Resource.App.stage);
            console.log('Data', JSON.stringify(completeAppointment));
            return createApiResponse(200, "Appointment booked successfully", completeAppointment);
        }

        // Send email to admin
        const dateObj = new Date(date);
        const formattedDate = dateObj.toLocaleDateString('en-ZA', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    
        // Convert 24-hour time to 12-hour format
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        const formattedTime = `${hour12}:${minutes} ${ampm}`;

        const EmailParams = new SendEmailCommand({
            Destination: {
                ToAddresses: [email]
            },
            FromEmailAddress: Resource.HelpEmail.sender,
            Content: {
                Template: {
                    TemplateName: 'BookingConfirmationTemplate',
                    TemplateData: JSON.stringify({
                        name: name,
                        date: formattedDate,
                        time: formattedTime
                    })
                }
            }
        });
        const adminClient = new SESv2Client({ region: 'af-south-1' });
        await adminClient.send(EmailParams);

        return createApiResponse(200, "Appointment booked successfully", completeAppointment);
    } catch (error) {
        console.error("Error booking appointment:", error);
        return createApiResponse(500, "Internal server error");
    }
};

export const updateAppointment: APIGatewayProxyHandlerV2 = async (event) => {
    try {
        const body = JSON.parse(event.body || "{}");
        const { appointmentId, date, time, status, patientType, hasReferral, referringDoctor, hasMedicalAuth, notes } = body;

        if (!appointmentId) {
            return createApiResponse(400, "Search for an appointment first");
        }

        await db
            .update(appointmentsTable)
            .set({
                date,
                time,
                status,
                patientType,
                hasReferral,
                referringDoctor,
                hasMedicalAuth,
                notes,
                updatedAt: new Date()
            })
            .where(eq(appointmentsTable.id, parseInt(appointmentId)));

        // Fetch the complete updated appointment data
        const [appointment] = await db
            .select({
                id: appointmentsTable.id,
                userId: appointmentsTable.userId,
                date: appointmentsTable.date,
                time: appointmentsTable.time,
                status: appointmentsTable.status,
                patientType: appointmentsTable.patientType,
                hasReferral: appointmentsTable.hasReferral,
                referringDoctor: appointmentsTable.referringDoctor,
                hasMedicalAuth: appointmentsTable.hasMedicalAuth,
                notes: appointmentsTable.notes,
                createdAt: appointmentsTable.createdAt,
                updatedAt: appointmentsTable.updatedAt,
                user: {
                    id: usersTable.id,
                    name: usersTable.name,
                    email: usersTable.email,
                    age: usersTable.age,
                    phoneNumber: usersTable.phoneNumber,
                    address: usersTable.address,
                    medicalHistory: usersTable.medicalHistory,
                    emergencyContact: usersTable.emergencyContact,
                    createdAt: usersTable.createdAt,
                    updatedAt: usersTable.updatedAt
                }
            })
            .from(appointmentsTable)
            .leftJoin(usersTable, eq(appointmentsTable.userId, usersTable.id))
            .where(eq(appointmentsTable.id, parseInt(appointmentId)));

        return createApiResponse(200, "Appointment updated successfully", appointment);
    } catch (error) {
        console.error("Error updating appointment:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal server error" })
        };
    }
};

export const searchAppointment: APIGatewayProxyHandlerV2 = async (event): Promise<ApiResponse<AppointmentData>> => {
    try {
        const body = JSON.parse(event.body || "{}");
        const { email } = body;
        
        if (!email) {
            return createApiResponse(400, "Email is required");
        }

        // First find the user
        const [user] = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, email));

        if (!user) {
            return createApiResponse(404, "No user found with this email");
        }

        // Then find their appointment
        const [appointment] = await db
            .select({
                id: appointmentsTable.id,
                userId: appointmentsTable.userId,
                date: appointmentsTable.date,
                time: appointmentsTable.time,
                status: appointmentsTable.status,
                patientType: appointmentsTable.patientType,
                hasReferral: appointmentsTable.hasReferral,
                referringDoctor: appointmentsTable.referringDoctor,
                hasMedicalAuth: appointmentsTable.hasMedicalAuth,
                notes: appointmentsTable.notes,
                createdAt: appointmentsTable.createdAt,
                updatedAt: appointmentsTable.updatedAt,
                user: {
                    id: usersTable.id,
                    name: usersTable.name,
                    email: usersTable.email,
                    age: usersTable.age,
                    phoneNumber: usersTable.phoneNumber,
                    address: usersTable.address,
                    medicalHistory: usersTable.medicalHistory,
                    emergencyContact: usersTable.emergencyContact,
                    createdAt: usersTable.createdAt,
                    updatedAt: usersTable.updatedAt
                }
            })
            .from(appointmentsTable)
            .leftJoin(usersTable, eq(appointmentsTable.userId, usersTable.id))
            .where(
                and(
                    eq(appointmentsTable.userId, user.id),
                    eq(appointmentsTable.status, 'scheduled')
                )
            );

        if (!appointment) {
            return createApiResponse(404, "No scheduled appointment found");
        }

        return createApiResponse(200, "Appointment found", appointment);
    } catch (error) {
        console.error("Error searching appointment:", error);
        return createApiResponse(500, "Internal server error");
    }
}; 