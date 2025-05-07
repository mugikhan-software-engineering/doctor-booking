<script lang="ts">
	import { Modal } from '@skeletonlabs/skeleton-svelte';
	import type { AppointmentData } from '$lib/types/api';
	import CloseIcon from '~icons/material-symbols/close-rounded';
	import { enhance } from '$app/forms';

	let {
		appointmentModalState,
		appointmentModalClose,
		onOpenChange,
		appointment,
		updateCalendarEvent
	}: {
		appointmentModalState: boolean;
		appointmentModalClose: () => void;
		onOpenChange: (open: boolean) => void;
		appointment: AppointmentData | null;
		updateCalendarEvent: (appointment: AppointmentData) => void;
	} = $props();

	let currentAppointment = $derived(appointment ? { ...appointment } : null);
	let isUpdating = $state(false);

	function formatDateTime(date: string | null, time: string | null) {
		if (!date || !time) return '';
		const dateObj = new Date(date);
		const formattedDate = dateObj.toLocaleDateString('en-ZA', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
		return `${formattedDate} at ${time.slice(0, 5)}`;
	}
</script>

<Modal
	open={appointmentModalState}
	{onOpenChange}
	contentBase="bg-surface-100-900 p-6 space-y-2 w-4/5 shadow-xl rounded-lg"
	backdropClasses="preset-glass-primary"
>
	{#snippet content()}
		<header class="flex justify-between">
			<h2 class="h2">Appointment Details</h2>
			<button type="button" class="btn variant-ghost p-0" onclick={appointmentModalClose}>
				<CloseIcon class="w-6 h-6" />
			</button>
		</header>
		<div class="space-y-4">
			<div class="grid grid-cols-2 gap-4">
				<div>
					<h3 class="text-sm font-medium text-surface-600-400">Name</h3>
					<p class="text-lg">{currentAppointment?.name || ''}</p>
				</div>
				<div>
					<h3 class="text-sm font-medium text-surface-600-400">Contact Number</h3>
					<p class="text-lg">{currentAppointment?.contactNumber || ''}</p>
				</div>
				<div>
					<h3 class="text-sm font-medium text-surface-600-400">Email</h3>
					<p class="text-lg">{currentAppointment?.email || ''}</p>
				</div>
				<div>
					<h3 class="text-sm font-medium text-surface-600-400">Date & Time</h3>
					<p class="text-lg">
						{formatDateTime(currentAppointment?.date ?? null, currentAppointment?.time ?? null)}
					</p>
				</div>
			</div>
			<div>
				<h3 class="text-sm font-medium text-surface-600-400">Status</h3>
				<form
					novalidate
					method="POST"
					action="?/updateAppointmentStatus"
					use:enhance={() => {
						isUpdating = true;
						return async ({ result }) => {
							isUpdating = false;
							if (result.type === 'success' && result.data?.data) {
								const updatedAppointment = result.data.data as AppointmentData;
								updateCalendarEvent(updatedAppointment);
							}
						};
					}}
				>
					<input type="hidden" name="appointmentId" value={currentAppointment?.id} />
					<div class="flex items-center gap-2">
						<select
							name="status"
							class="border rounded py-1"
							value={currentAppointment?.status}
							disabled={isUpdating}
						>
							<option value="scheduled">Scheduled</option>
							<option value="completed">Completed</option>
							<option value="cancelled">Cancelled</option>
						</select>
						<button type="submit" class="btn preset-filled" disabled={isUpdating}> Update </button>
						{#if isUpdating}
							<span class="text-sm text-surface-600-400">Updating...</span>
						{/if}
					</div>
				</form>
			</div>
		</div>
	{/snippet}
</Modal>
