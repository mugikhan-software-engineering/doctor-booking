import type { AppointmentData } from "$lib/types/api_types";

interface AppointmentsState {
    appointments: AppointmentData[];
    isLoading: boolean;
    error: string | null;
}

class AppointmentsRune {
    state = $state<AppointmentsState>({
        appointments: [],
        isLoading: false,
        error: null
    });

    get appointments() {
        return this.state.appointments;
    }

    get isLoading() {
        return this.state.isLoading;
    }

    get error() {
        return this.state.error;
    }

    setAppointments(appointments: AppointmentData[]) {
        this.state.appointments = appointments;
    }

    addAppointment(appointment: AppointmentData) {
        this.state.appointments.push(appointment);
    }

    removeAppointment(appointment: AppointmentData) {
        this.state.appointments = this.state.appointments.filter(a => a.id !== appointment.id);
    }

    updateAppointment(appointment: AppointmentData) {
        this.state.appointments = this.state.appointments.map(a => a.id === appointment.id ? appointment : a);
    }

    setLoading(isLoading: boolean) {
        this.state.isLoading = isLoading;
    }

    setError(error: string) {
        this.state.error = error;
    }
}

export const appointmentsRune = new AppointmentsRune();