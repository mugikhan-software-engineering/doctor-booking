import { db } from "./db";
import { availabilityTable } from "./schema";
import { eq } from "drizzle-orm";

/**
 * Generates an array of dates for all Sundays between startDate and endDate
 */
export function getSundaysBetween(startDate: Date, endDate: Date): Date[] {
    const sundays: Date[] = [];
    const currentDate = new Date(startDate);
    
    // Set to next Sunday if current date is not Sunday
    if (currentDate.getDay() !== 0) {
        currentDate.setDate(currentDate.getDate() + (7 - currentDate.getDay()));
    }
    
    while (currentDate <= endDate) {
        sundays.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 7);
    }
    
    return sundays;
}

/**
 * Disables all Sundays in the given date range
 */
export async function disableSundays(startDate: Date, endDate: Date) {
    const sundays = getSundaysBetween(startDate, endDate);
    
    for (const sunday of sundays) {
        const dateStr = sunday.toISOString().split('T')[0];
        
        // Check if availability record already exists
        const [existingAvailability] = await db
            .select()
            .from(availabilityTable)
            .where(eq(availabilityTable.date, dateStr));
            
        if (existingAvailability) {
            // Update existing record
            await db
                .update(availabilityTable)
                .set({
                    isAvailable: false,
                    reason: "Sunday - Closed",
                    updatedAt: new Date()
                })
                .where(eq(availabilityTable.id, existingAvailability.id));
        } else {
            // Create new record
            await db
                .insert(availabilityTable)
                .values({
                    date: dateStr,
                    isAvailable: false,
                    reason: "Sunday - Closed"
                });
        }
    }
} 