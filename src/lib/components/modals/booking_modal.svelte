<script lang="ts">
	import { Modal } from '@skeletonlabs/skeleton-svelte';
	import BookingForm from '$lib/components/booking_form.svelte';

	let { bookingModalState, bookingModalClose, onOpenChange, apiUrl } = $props();
</script>

<Modal
	open={bookingModalState}
	{onOpenChange}
	contentBase="bg-surface-100-900 py-4 px-2 space-y-4 w-4/5 shadow-xl rounded-lg"
	backdropClasses="preset-glass-primary"
>
	{#snippet content()}
		<header class="flex justify-between">
			<h2 class="h2">Book an Appointment</h2>
		</header>
		<BookingForm modalClose={bookingModalClose} {apiUrl} />
		<!-- <footer class="flex justify-end gap-4">
			<button type="button" class="btn preset-tonal" onclick={modalClose}>Cancel</button>
			<button type="button" class="btn preset-filled" onclick={modalClose}>Confirm</button>
		</footer> -->
	{/snippet}
</Modal>
