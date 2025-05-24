import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { Resource } from 'sst';
import type { User } from '@supabase/supabase-js';
import type { AppointmentData } from '$lib/types/api_types';
import type { ApiResponseBody } from '$lib/types/api_types';

interface Locals {
    user: User | null;
    session: any;
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
            `${Resource.api.url}/admin/appointments?startDate=${startDate}&endDate=${endDate}`,
            {
                headers: {
                    'Authorization': `Bearer ${locals.session?.access_token}`
                }
            }
        );

        const responseData: ApiResponseBody<AppointmentData[]> = await response.json();

        if (!response.ok) {
            error(response.status, {
                message: responseData.message || 'Failed to fetch appointments. Please try again.',
            });
        }
        if (responseData.data) {
            return {
                appointments: responseData.data,
                currentMonth: {
                    startDate,
                    endDate
                },
                token: locals.session?.access_token
            };
        }
    } catch (err: any) {
        console.error('Error fetching appointments:', err);
        error(500, {
            message: 'Failed to fetch appointments. Please try again later.',
        });
    }
};

export const actions: Actions = {
    updateAppointmentStatus: async ({ request, locals }) => {
        const formData = await request.formData();
        const appointmentId = formData.get('appointmentId');
        const status = formData.get('status');

        if (!appointmentId || !status) {
            error(400, {
                message: 'Appointment ID and status are required',
            });
        }

        const response = await fetch(`${Resource.api.url}/admin/appointments/${appointmentId}/status`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${locals.session?.access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        });

        const responseData: ApiResponseBody<AppointmentData> = await response.json();

        if (!response.ok) {
            error(response.status, {
                message: 'Failed to update appointment status',
            });
        }

        return {
            success: true,
            message: 'Appointment status updated successfully',
            data: responseData.data
        };
    }
};