import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { db } from "$lib/server/db";
import { appointmentsTable, availabilityTable } from "$lib/server/schema";
import { eq, and, gte, lte } from "drizzle-orm";
import { sql } from "drizzle-orm";

interface Appointment {
    id: number;
    email: string;
    name: string;
    contactNumber: string;
    date: string;
    time: string;
    status: "scheduled" | "completed" | "cancelled";
    createdAt: string;
    updatedAt: string;
}

interface Availability {
    id: number;
    date: string;
    isAvailable: boolean;
    reason?: string;
    startTime?: string;
    endTime?: string;
    createdAt: string;
    updatedAt: string;
}

export const getAvailableSlots: APIGatewayProxyHandlerV2 = async (event) => {
    try {
        const { date } = event.queryStringParameters || {};
        
        if (!date) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Date is required" })
            };
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
                SELECT "isAvailable", "startTime", "endTime"
                FROM availability
                WHERE date = ${date}
            )
            SELECT ts.slot::text
            FROM time_slots ts
            LEFT JOIN booked_slots bs ON ts.slot = bs."time"
            LEFT JOIN availability_settings av ON true
            WHERE bs."time" IS NULL
            AND (
                av."isAvailable" IS NULL  -- No availability record exists
                OR av."isAvailable" = true  -- Date is available
                OR (
                    av."isAvailable" = false  -- Date is blocked
                    AND (
                        av."startTime" IS NULL
                        OR ts.slot < av."startTime"
                        OR av."endTime" IS NULL
                        OR ts.slot > av."endTime"
                    )
                )
            )
            ORDER BY ts.slot;
        `);

        return {
            statusCode: 200,
            body: JSON.stringify({ availableSlots: result.map(row => row.slot) })
        };
    } catch (error) {
        console.error("Error getting available slots:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal server error" })
        };
    }
};

export const bookAppointment: APIGatewayProxyHandlerV2 = async (event) => {
    try {
        const body = JSON.parse(event.body || "{}");
        const { email, name, contactNumber, date, time } = body;

        if (!email || !name || !contactNumber || !date || !time) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Missing required fields" })
            };
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
            return {
                statusCode: 409,
                body: JSON.stringify({ message: "Time slot is already booked" })
            };
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
                return {
                    statusCode: 409,
                    body: JSON.stringify({ message: "Time slot is not available" })
                };
            }
        }

        // Create appointment
        const [appointment] = await db
            .insert(appointmentsTable)
            .values({
                email,
                name,
                contactNumber,
                date,
                time,
                status: 'scheduled'
            })
            .returning();

        return {
            statusCode: 201,
            body: JSON.stringify({ message: "Appointment booked successfully", appointment })
        };
    } catch (error) {
        console.error("Error booking appointment:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal server error" })
        };
    }
};

export const updateAppointment: APIGatewayProxyHandlerV2 = async (event) => {
    try {
        const { appointmentId } = event.pathParameters || {};
        const body = JSON.parse(event.body || "{}");
        const { date, time, status } = body;

        if (!appointmentId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Appointment ID is required" })
            };
        }

        const [appointment] = await db
            .update(appointmentsTable)
            .set({
                date,
                time,
                status,
                updatedAt: new Date()
            })
            .where(eq(appointmentsTable.id, parseInt(appointmentId)))
            .returning();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Appointment updated successfully", appointment })
        };
    } catch (error) {
        console.error("Error updating appointment:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal server error" })
        };
    }
}; 