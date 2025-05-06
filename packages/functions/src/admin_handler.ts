import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { db } from "$lib/server/db";
import { appointmentsTable, availabilityTable } from "$lib/server/schema";
import { eq, and, gte, lte, asc } from "drizzle-orm";
import type { 
    ApiResponse, 
    AppointmentData, 
    AvailableSlotsResponse 
} from "$lib/types/api";
import { createApiResponse } from "$lib/types/api";

export const getAllAppointments: APIGatewayProxyHandlerV2 = async (event): Promise<ApiResponse<AppointmentData[]>> => {
    try {
        const { status, startDate, endDate } = event.queryStringParameters || {};
        
        const conditions = [];
        if (status) {
            conditions.push(eq(appointmentsTable.status, status));
        }
        if (startDate && endDate) {
            conditions.push(
                and(
                    gte(appointmentsTable.date, startDate),
                    lte(appointmentsTable.date, endDate)
                )
            );
        }

        const appointments = await db
            .select()
            .from(appointmentsTable)
            .where(conditions.length > 0 ? and(...conditions) : undefined)
            .orderBy(appointmentsTable.date, appointmentsTable.time);

        return createApiResponse(200, "Appointments retrieved successfully", appointments);
    } catch (error) {
        console.error("Error getting appointments:", error);
        return createApiResponse(500, "Internal server error");
    }
};

export const updateAppointmentStatus: APIGatewayProxyHandlerV2 = async (event): Promise<ApiResponse<AppointmentData>> => {
    try {
        const { appointmentId } = event.pathParameters || {};
        const body = JSON.parse(event.body || "{}");
        const { status } = body;

        if (!appointmentId || !status) {
            return createApiResponse(400, "Appointment ID and status are required");
        }

        const [appointment] = await db
            .update(appointmentsTable)
            .set({ 
                status,
                updatedAt: new Date()
            })
            .where(eq(appointmentsTable.id, parseInt(appointmentId)))
            .returning();

        return createApiResponse(200, "Appointment status updated successfully", appointment);
    } catch (error) {
        console.error("Error updating appointment status:", error);
        return createApiResponse(500, "Internal server error");
    }
};

export const setAvailability: APIGatewayProxyHandlerV2 = async (event): Promise<ApiResponse> => {
    try {
        const body = JSON.parse(event.body || "{}");
        const { date: dateStr, isAvailable, reason, startTime, endTime } = body;

        if (!dateStr || typeof isAvailable !== 'boolean') {
            return createApiResponse(400, "Date and isAvailable are required");
        }

        // Check if availability record already exists
        const [existingAvailability] = await db
            .select()
            .from(availabilityTable)
            .where(eq(availabilityTable.date, dateStr));

        let result;
        if (existingAvailability) {
            // Update existing record
            [result] = await db
                .update(availabilityTable)
                .set({
                    isAvailable,
                    reason,
                    startTime,
                    endTime,
                    updatedAt: new Date()
                })
                .where(eq(availabilityTable.id, existingAvailability.id))
                .returning();
        } else {
            // Create new record
            [result] = await db
                .insert(availabilityTable)
                .values({
                    date: dateStr,
                    isAvailable,
                    reason,
                    startTime,
                    endTime
                })
                .returning();
        }

        return createApiResponse(200, "Availability updated successfully", result);
    } catch (error) {
        console.error("Error setting availability:", error);
        return createApiResponse(500, "Internal server error");
    }
};

export const getAvailability: APIGatewayProxyHandlerV2 = async (event): Promise<ApiResponse> => {
    try {
        const { startDate, endDate } = event.queryStringParameters || {};
        
        let conditions = [];
        if (startDate && endDate) {
            conditions.push(
                and(
                    gte(availabilityTable.date, startDate),
                    lte(availabilityTable.date, endDate)
                )
            );
        }

        const availability = await db
            .select()
            .from(availabilityTable)
            .where(conditions.length > 0 ? and(...conditions) : undefined)
            .orderBy(asc(availabilityTable.date));

        return createApiResponse(200, "Availability retrieved successfully", availability);
    } catch (error) {
        console.error("Error getting availability:", error);
        return createApiResponse(500, "Internal server error");
    }
}; 