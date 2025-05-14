<script lang="ts">
	import { onMount } from 'svelte';
	import { Calendar } from '@fullcalendar/core';
	import dayGridPlugin from '@fullcalendar/daygrid';
	import timeGridPlugin from '@fullcalendar/timegrid';
	import interactionPlugin from '@fullcalendar/interaction';
	import type { ApiResponseBody, AppointmentData, CurrentMonth } from '$lib/types/api_types';
	import AppointmentDetailsModal from '$lib/components/modals/appointment_details_modal.svelte';
	import { appointmentsStore } from '$lib/stores/appointments';

	let {
		appointments,
		currentMonth,
		token
	}: { appointments: AppointmentData[]; currentMonth: CurrentMonth; token: string } = $props();

	const apiUrl = import.meta.env.VITE_API_URL;

	let calendar: Calendar;
	let appointmentModalState = $state(false);
	let selectedAppointment = $state<AppointmentData | null>(null);

	function createDateTime(date: string, time: string): Date {
		const [year, month, day] = date.split('-').map(Number);
		const [hours, minutes] = time.split(':').map(Number);
		return new Date(year, month - 1, day, hours, minutes);
	}

	function getEventColor(status: string) {
		return status === 'scheduled' ? '#00BCD4' : status === 'cancelled' ? '#dc3545' : '#11ac4f';
	}

	function updateCalendarEvent(appointment: AppointmentData) {
		if (!calendar) return;

		const event = calendar.getEventById(appointment.id.toString());
		if (event) {
			const color = getEventColor(appointment.status);
			event.setProp('backgroundColor', color);
			event.setProp('borderColor', color);
		}
		appointmentsStore.updateAppointment(appointment);
	}

	function handleAppointmentClick(info: any) {
		selectedAppointment = info.event.extendedProps;
		appointmentModalState = true;
	}

	function closeAppointmentModal() {
		appointmentModalState = false;
		selectedAppointment = null;
	}

	function onOpenChange(e: any) {
		appointmentModalState = e.open;
		if (!e.open) {
			selectedAppointment = null;
		}
	}

	async function fetchAppointments(start: Date, end: Date) {
		appointmentsStore.setLoading(true);
		try {
			const startDate = start.toISOString().split('T')[0];
			const endDate = end.toISOString().split('T')[0];
			const response = await fetch(
				`${apiUrl}/admin/appointments?startDate=${startDate}&endDate=${endDate}`,
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			);
			const data: ApiResponseBody<AppointmentData[]> = await response.json();
			if (response.ok && data.data) {
				appointmentsStore.setAppointments(data.data);
			} else {
				appointmentsStore.setError(data.message);
			}
		} catch (error) {
			appointmentsStore.setError('Failed to fetch appointments');
		} finally {
			appointmentsStore.setLoading(false);
		}
	}

	onMount(() => {
		// Initialize store with current month's appointments
		appointmentsStore.setAppointments(appointments);

		calendar = new Calendar(document.getElementById('calendar') as HTMLElement, {
			plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
			initialView: 'dayGridMonth',
			events: [],
			eventTimeFormat: {
				hour: '2-digit',
				minute: '2-digit',
				hour12: true
			},
			businessHours: {
				daysOfWeek: [1, 2, 3, 4, 5],
				startTime: '09:00',
				endTime: '17:00'
			},
			eventClick: handleAppointmentClick,
			eventDisplay: 'block',
			datesSet: (info) => {
				// Only fetch if the view is different from the current month
				const viewStart = info.start.toISOString().split('T')[0];
				const viewEnd = info.end.toISOString().split('T')[0];
				if (viewStart !== currentMonth.startDate || viewEnd !== currentMonth.endDate) {
					fetchAppointments(info.start, info.end);
				}
			}
		});
		calendar.render();

		// Subscribe to appointments store changes
		const unsubscribe = appointmentsStore.subscribe((state) => {
			if (calendar) {
				calendar.removeAllEvents();
				calendar.addEventSource(
					state.appointments.map((appointment) => ({
						id: appointment.id.toString(),
						title: appointment.name,
						start: createDateTime(appointment.date, appointment.time),
						extendedProps: appointment,
						backgroundColor: getEventColor(appointment.status),
						borderColor: getEventColor(appointment.status)
					}))
				);
			}
		});

		return () => {
			unsubscribe();
		};
	});
</script>

<div id="calendar"></div>

<AppointmentDetailsModal
	{appointmentModalState}
	appointmentModalClose={closeAppointmentModal}
	{onOpenChange}
	appointment={selectedAppointment}
	{updateCalendarEvent}
/>
