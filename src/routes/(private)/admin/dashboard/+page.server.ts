import { error, fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { Resource } from 'sst';
import type { User } from '@supabase/supabase-js';
import type { AppointmentData } from '$lib/types/api';
import type { ApiResponseBody } from '$lib/types/api';

interface Locals {
    user: User | null;
}

function getMonthStartEndDates(): { startDate: string; endDate: string } {
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    return {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0]
    };
}

export const load: PageServerLoad = async ({ locals }: { locals: Locals }) => {
    try {
        const { startDate, endDate } = getMonthStartEndDates();
        const response = await fetch(
            `${Resource.api.url}/admin/appointments?startDate=${startDate}&endDate=${endDate}`
        );

        const responseData: ApiResponseBody<AppointmentData[]> = await response.json();

        if (!response.ok) {
            return fail(response.status, {
                description: responseData.message || 'Failed to fetch appointments. Please try again.',
                error: responseData.message
            });
        }
        if (responseData.data) {
            return {
                appointments: responseData.data,
                currentMonth: {
                    startDate,
                    endDate
                }
            };
        }
    } catch (error) {
        console.error('Error fetching appointments:', error);
        return fail(500, {
            description: 'Failed to fetch appointments. Please try again later.',
            error: 'Failed to fetch appointments'
        });
    }
};

export const actions: Actions = {
    updateAppointmentStatus: async ({ request }) => {
        const formData = await request.formData();
        const appointmentId = formData.get('appointmentId');
        const status = formData.get('status');

        if (!appointmentId || !status) {
            return fail(400, {
                description: 'Appointment ID and status are required',
                error: 'Invalid form data'
            });
        }

        const response = await fetch(`${Resource.api.url}/admin/appointments/${appointmentId}/status`, {
            method: 'PUT',
            body: JSON.stringify({ status })
        });

        const responseData: ApiResponseBody<AppointmentData> = await response.json();

        if (!response.ok) {
            return fail(response.status, {
                description: 'Failed to update appointment status',
                error: 'Failed to update appointment status'
            });
        }

        return {
            success: true,
            message: 'Appointment status updated successfully',
            data: responseData.data
        };
    }
};