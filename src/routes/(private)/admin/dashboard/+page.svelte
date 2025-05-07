<script lang="ts">
	import { onMount } from 'svelte';
	import { SyncLoader } from 'svelte-loading-spinners';
	import { showErrorToast } from '$lib/components/toasts/toaster-svelte';
	import Calendar from '$lib/components/calendar/calendar.svelte';
	import type { PageProps } from './$types';

	let loading = $state(false);
	let { data }: PageProps = $props();

	let appointments = data.appointments;

	const apiUrl = import.meta.env.VITE_API_URL;

	async function updateAppointmentStatus(appointmentId: number, status: string) {
		try {
			const response = await fetch(`${apiUrl}/admin/appointments/${appointmentId}/status`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
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
		<div class="overflow-x-auto">
			<table class="min-w-full bg-white border border-gray-300">
				<thead>
					<tr class="bg-gray-100">
						<th class="px-6 py-3 border-b text-left">Name</th>
						<th class="px-6 py-3 border-b text-left">Email</th>
						<th class="px-6 py-3 border-b text-left">Contact</th>
						<th class="px-6 py-3 border-b text-left">Date</th>
						<th class="px-6 py-3 border-b text-left">Time</th>
						<th class="px-6 py-3 border-b text-left">Status</th>
						<th class="px-6 py-3 border-b text-left">Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each appointments || [] as appointment}
						<tr class="hover:bg-gray-50">
							<td class="px-6 py-4 border-b">{appointment.name}</td>
							<td class="px-6 py-4 border-b">{appointment.email}</td>
							<td class="px-6 py-4 border-b">{appointment.contactNumber}</td>
							<td class="px-6 py-4 border-b">{appointment.date}</td>
							<td class="px-6 py-4 border-b">{appointment.time}</td>
							<td class="px-6 py-4 border-b">
								<span
									class="px-2 py-1 rounded-full text-sm
                                    {appointment.status === 'scheduled'
										? 'bg-blue-100 text-blue-800'
										: appointment.status === 'completed'
											? 'bg-green-100 text-green-800'
											: 'bg-red-100 text-red-800'}"
								>
									{appointment.status}
								</span>
							</td>
							<td class="px-2 py-4 border-b">
								<select
									class="border rounded py-1"
									value={appointment.status}
									onchange={(e) =>
										updateAppointmentStatus(appointment.id, (e.target as HTMLSelectElement).value)}
								>
									<option value="scheduled">Scheduled</option>
									<option value="completed">Completed</option>
									<option value="cancelled">Cancelled</option>
								</select>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
	<Calendar appointments={data.appointments || []} currentMonth={data.currentMonth} />
</div>
