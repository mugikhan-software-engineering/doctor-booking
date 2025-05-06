<script lang="ts">
	import { fly } from 'svelte/transition';
	import { SyncLoader } from 'svelte-loading-spinners';
	import { showSuccessToast, showErrorToast } from '$lib/components/toasts/toaster-svelte';
	import { enhance, applyAction } from '$app/forms';
	import { onMount } from 'svelte';
	import type { ApiResponseBody, AvailableSlotsResponse } from '$lib/types/api';

	let loading = $state(false);
	let availableSlots = $state<string[]>([]);
	let selectedDate = $state(new Date().toISOString().split('T')[0]);
	let selectedTime = $state('');

	let { modalClose } = $props();

	const apiUrl = import.meta.env.VITE_API_URL;

	// Format time to remove seconds
	function formatTime(time: string): string {
		return time.split(':').slice(0, 2).join(':');
	}

	// Fetch available slots when date changes
	async function fetchAvailableSlots(date: string) {
		try {
			loading = true;
			const response = await fetch(`${apiUrl}/appointments/slots?date=${date}`);
			const data: ApiResponseBody<AvailableSlotsResponse> = await response.json();
			if (data.data) {
				availableSlots = data.data.availableSlots.map(formatTime);
			}
			selectedTime = ''; // Reset selected time when date changes
		} catch (error) {
			console.error('Error fetching slots:', error);
			showErrorToast('Failed to fetch available slots, Try selecting a different date');
		} finally {
			loading = false;
		}
	}

	// Fetch slots for today on mount
	onMount(() => {
		fetchAvailableSlots(selectedDate);
	});
</script>

<div class="flex flex-col w-full">
	<form
		novalidate
		class="group"
		method="POST"
		action="?/bookAppointment"
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
		<div class="flex flex-col md:flex-row mb-3">
			<label class="label px-5 flex-1 md:mb-0">
				<span class="text-white">Name</span>
				<input
					name="name"
					class="input peer text-md
					bg-white border-2 border-slate-300 rounded-md shadow-sm placeholder-slate-400
					focus:valid:border-success-500
					focus:invalid:border-error-500"
					type="text"
					placeholder="Your name"
					required
					pattern="^[a-zA-Z ]+$"
					minlength="3"
				/>
				<span
					class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
				>
					Please enter a name longer than 3 characters
				</span>
			</label>
		</div>

		<div class="flex flex-col md:flex-row mb-3">
			<label class="label px-5 flex-1 mb-3 md:mb-0">
				<span class="text-white">Contact number</span>
				<input
					name="contactNumber"
					class="input peer text-md
					bg-white border-2 border-slate-300 rounded-md shadow-sm placeholder-slate-400
					focus:valid:border-success-500
					focus:invalid:border-error-500"
					type="text"
					placeholder="Your phone number"
					required
					pattern="^(\+27|0|27)[0-9]&#123;9&#125;$"
				/>
				<span
					class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
				>
					Please enter a valid contact number
				</span>
			</label>
			<label class="label px-5 flex-1">
				<span class="text-white">Email</span>
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
		</div>

		<div class="flex flex-col md:flex-row mb-3">
			<label class="label px-5 flex-1 mb-3 md:mb-0">
				<span class="text-white">Date</span>
				<input
					name="date"
					type="date"
					bind:value={selectedDate}
					onchange={(e: Event) => {
						const target = e.target as HTMLInputElement;
						fetchAvailableSlots(target.value);
					}}
					class="input peer text-md
					bg-white border-2 border-slate-300 rounded-md shadow-sm placeholder-slate-400
					focus:valid:border-success-500
					focus:invalid:border-error-500"
					required
					min={new Date().toISOString().split('T')[0]}
				/>
			</label>
			<label class="label px-5 flex-1">
				<span class="text-white">Time</span>
				<select
					name="time"
					bind:value={selectedTime}
					class="select text-md
					bg-white border-2 border-slate-300 rounded-md shadow-sm placeholder-slate-400
					focus:valid:border-success-500
					focus:invalid:border-error-500"
					required
					disabled={availableSlots.length === 0}
				>
					<option value="">Select a time slot</option>
					{#each availableSlots as slot}
						<option value={slot}>{slot}</option>
					{/each}
				</select>
				{#if availableSlots.length === 0}
					<span class="mt-2 text-sm text-red-500">No available slots for this date</span>
				{/if}
			</label>
		</div>

		<div class="w-full flex flex-row items-center justify-center md:mb-2">
			<button type="submit" class="btn preset-filled text-lg hover:cursor-pointer">
				{#if loading}
					<p>Booking</p>
					<SyncLoader size="30" color="#000" unit="px" duration="2s" />
				{:else}
					Book Appointment
				{/if}
			</button>
		</div>
	</form>
</div>
