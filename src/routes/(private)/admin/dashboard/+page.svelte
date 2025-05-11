<script lang="ts">
	import { onMount } from 'svelte';
	import { SyncLoader } from 'svelte-loading-spinners';
	import { showErrorToast } from '$lib/components/toasts/toaster-svelte';
	import Calendar from '$lib/components/calendar/calendar.svelte';
	import type { PageProps } from './$types';
	import type { CurrentMonth } from '$lib/types/api_types';

	let loading = $state(false);
	let { data }: PageProps = $props();

	let appointments = data.appointments;
	let currentMonth: CurrentMonth = data.currentMonth || { startDate: '', endDate: '' };
	let token = data.token;

	const apiUrl = import.meta.env.VITE_API_URL;

	async function updateAppointmentStatus(appointmentId: number, status: string) {
		try {
			const response = await fetch(`${apiUrl}/admin/appointments/${appointmentId}/status`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({ status })
			});

			if (!response.ok) {
				throw new Error('Failed to update status');
			}

			// Refresh appointments after update
			// await fetchAppointments();
		} catch (error) {
			console.error('Error updating appointment:', error);
			showErrorToast('Failed to update appointment status');
		}
	}

	onMount(() => {
		// fetchAppointments();
	});
</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="text-3xl font-bold mb-8">Appointments Dashboard</h1>

	{#if loading}
		<div class="flex justify-center items-center h-64">
			<SyncLoader size="30" color="#000" />
		</div>
	{:else}
		<Calendar appointments={appointments || []} {currentMonth} {token} />
	{/if}
</div>
