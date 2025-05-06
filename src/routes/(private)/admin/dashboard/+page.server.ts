import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { Resource } from 'sst';
import type { User } from '@supabase/supabase-js';
import type { AppointmentData } from '$lib/types/api';
import type { ApiResponseBody } from '$lib/types/api';

interface Locals {
    user: User | null;
}

export const load: PageServerLoad = async ({ locals }: { locals: Locals }) => {
    try {
        const response = await fetch(`${Resource.api.url}/admin/appointments`);

        const responseData: ApiResponseBody<AppointmentData[]> = await response.json();

        if (!response.ok) {
            return fail(response.status, {
                description: responseData.message || 'Failed to fetch appointments. Please try again.',
                error: responseData.message
            });
        }
        if (responseData.data) {
            return {
                appointments: responseData.data
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