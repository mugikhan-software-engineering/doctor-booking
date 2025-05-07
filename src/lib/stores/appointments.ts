import { writable } from 'svelte/store';
import type { AppointmentData } from '$lib/types/api';

interface AppointmentsState {
    appointments: AppointmentData[];
    isLoading: boolean;
    error: string | null;
}

function createAppointmentsStore() {
    const { subscribe, set, update } = writable<AppointmentsState>({
        appointments: [],
        isLoading: false,
        error: null
    });

    return {
        subscribe,
        setAppointments: (appointments: AppointmentData[]) => {
            update(state => ({ ...state, appointments, error: null }));
        },
        updateAppointment: (updatedAppointment: AppointmentData) => {
            update(state => ({
                ...state,
                appointments: state.appointments.map(appointment => 
                    appointment.id === updatedAppointment.id ? updatedAppointment : appointment
                ),
                error: null
            }));
        },
        setLoading: (isLoading: boolean) => {
            update(state => ({ ...state, isLoading }));
        },
        setError: (error: string) => {
            update(state => ({ ...state, error }));
        },
        reset: () => {
            set({ appointments: [], isLoading: false, error: null });
        }
    };
}

export const appointmentsStore = createAppointmentsStore(); 