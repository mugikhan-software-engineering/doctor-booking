<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type {
		ApiResponseBody,
		AppointmentData,
		AvailableSlotsResponse
	} from '$lib/types/api_types';
	import type { DateValue } from '@internationalized/date';
	import { showErrorToast, showSuccessToast } from './toasts/toaster-svelte';
	import DatePicker from './form_fields/date_picker.svelte';
	import { SyncLoader } from 'svelte-loading-spinners';
	import { DateFormatter, getLocalTimeZone, parseDate } from '@internationalized/date';

	let { modalClose, localToday } = $props();

	const dateFormatter = new DateFormatter('en-ZA', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	let appointment = $state<AppointmentData | null>(null);
	let loading = $state(false);
	let loadingSlots = $state(false);
	let availableSlots = $state<string[]>([]);
	let selectedDate = $state<DateValue>(localToday);
	let selectedTime = $state('');

	function getSelectedDate() {
		return selectedDate;
	}

	function setSelectedDate(newValue: DateValue) {
		selectedDate = newValue;
		if (selectedDate) {
			fetchAvailableSlots(selectedDate.toString());
		}
	}

	const apiUrl = import.meta.env.VITE_API_URL;

	// Format time to remove seconds
	function formatTime(time: string): string {
		return time.split(':').slice(0, 2).join(':');
	}

	// Fetch available slots when date changes
	async function fetchAvailableSlots(date: string) {
		try {
			loadingSlots = true;
			const response = await fetch(`${apiUrl}/appointments/slots?date=${date}`);
			const data: ApiResponseBody<AvailableSlotsResponse> = await response.json();
			if (data.data) {
				availableSlots = data.data.availableSlots.map(formatTime);
				selectedTime = '';
			}
		} catch (error) {
			selectedTime = '';
			console.error('Error fetching slots:', error);
			showErrorToast('Failed to fetch available slots, Try selecting a different date');
		} finally {
			loadingSlots = false;
		}
	}

	function formatDateTime(date: string | null, time: string | null) {
		if (!date || !time) return '';
		const dateObj = parseDate(date).toDate(getLocalTimeZone());
		const formattedDate = dateFormatter.format(dateObj);

		// Convert 24-hour time to 12-hour format
		const [hours, minutes] = time.split(':');
		const hour = parseInt(hours);
		const ampm = hour >= 12 ? 'PM' : 'AM';
		const hour12 = hour % 12 || 12;
		const formattedTime = `${hour12}:${minutes} ${ampm}`;

		return `${formattedDate} at ${formattedTime}`;
	}
</script>

<form
	novalidate
	class="group space-y-6 md:space-y-6 md:space-x-6"
	method="POST"
	action="?/searchAppointment"
	use:enhance={({ formElement, formData }) => {
		loading = true;
		return async ({ result, update }) => {
			loading = false;
			if (result.type === 'success') {
				if (result.data && result.data['data']) {
					appointment = result.data['data'] as AppointmentData;
					let date: DateValue = parseDate(appointment.date);
					setSelectedDate(date);
					showSuccessToast(result.data['description'] as string);
				}
			} else if (result.type === 'failure') {
				if (result.data) {
					showErrorToast(result.data['description'] as string);
				}
			}
			await applyAction(result);
			update();
		};
	}}
>
	<div class="flex flex-row space-x-2">
		<label class="label flex-1">
			<span class="text-base">Email</span>
			<input
				name="email"
				class="input peer text-md
            bg-white border-2 border-slate-300 rounded-md shadow-sm placeholder-slate-400
            focus:valid:border-success-500
            focus:invalid:border-error-500"
				type="email"
				placeholder="Your email"
				required
			/>
			<span
				class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
			>
				Please enter a valid email address
			</span>
		</label>
		<label class="label flex-0">
			<span class="text-base text-transparent">Search</span>
			<button type="submit" class="btn preset-filled text-lg hover:cursor-pointer">
				{#if loading}
					<p>Searching</p>
					<SyncLoader size="30" color="#000" unit="px" duration="2s" />
				{:else}
					Search
				{/if}
			</button>
		</label>
	</div>
</form>

{#if appointment}
	<div class="rounded-lg border border-slate-200 p-4 space-y-2">
		<h3 class="text-lg font-semibold">Current Appointment Details</h3>
		<div class="grid grid-cols-2 gap-2 text-sm">
			<div class="font-medium">Patient Name:</div>
			<div>{appointment.user.name}</div>

			<div class="font-medium">Email:</div>
			<div>{appointment.user.email}</div>

			<div class="font-medium">Date & Time:</div>
			<div>{formatDateTime(appointment.date, appointment.time)}</div>
		</div>
	</div>

	<form
		novalidate
		class="group space-y-6 md:space-y-6 md:space-x-6"
		method="POST"
		action="?/rescheduleAppointment"
		use:enhance={({ formElement, formData }) => {
			loading = true;
			return async ({ result, update }) => {
				loading = false;
				if (result.type === 'success') {
					formElement.reset();
					if (result.data) {
						showSuccessToast(result.data['description'] as string);
					}
					modalClose();
				} else if (result.type === 'failure') {
					if (result.data) {
						showErrorToast(result.data['description'] as string);
					}
				}
				await applyAction(result);
				update();
			};
		}}
	>
		<h3 class="text-lg font-semibold">Reschedule Appointment</h3>
		<div class="flex flex-col md:flex-row space-x-4 space-y-6 md:space-y-0">
			<input type="hidden" name="appointmentId" value={appointment.id} />
			<DatePicker {getSelectedDate} {setSelectedDate} minValue={localToday} />
			<label class="label flex-1">
				<span class="text-base">Time</span>
				<select
					name="time"
					bind:value={selectedTime}
					class="select text-md text-black
					bg-white border-2 border-slate-300 rounded-md shadow-sm
					focus:valid:border-success-500
					focus:invalid:border-error-500"
					required
					disabled={availableSlots.length === 0 || loadingSlots}
				>
					<option value="">Select a time slot</option>
					{#each availableSlots as slot}
						<option value={slot}>{slot}</option>
					{/each}
				</select>
				{#if availableSlots.length === 0 && !loadingSlots}
					<span class="mt-2 text-sm text-red-500">No available slots for this date</span>
				{/if}
			</label>
		</div>
		<div class="flex justify-end space-x-2">
			<button
				type="button"
				class="btn variant-ghost"
				onclick={() => {
					appointment = null;
					selectedTime = '';
					modalClose();
				}}
			>
				Cancel
			</button>
			<button type="submit" class="btn variant-filled" disabled={loading || !selectedTime}>
				{#if loading}
					<p>Rescheduling</p>
					<SyncLoader size="20" color="#000" unit="px" duration="2s" />
				{:else}
					Reschedule
				{/if}
			</button>
		</div>
	</form>
{/if}
