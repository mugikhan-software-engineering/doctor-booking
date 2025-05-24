<script lang="ts">
	import { Modal } from '@skeletonlabs/skeleton-svelte';
	import BookingForm from '$lib/components/booking_form.svelte';
	import X from 'phosphor-svelte/lib/X';

	let { bookingModalState, bookingModalClose, onOpenChange } = $props();
</script>

<Modal
	open={bookingModalState}
	{onOpenChange}
	contentBase="bg-surface-100-900 py-4 px-4 space-y-4 w-full md:w-4/5 shadow-xl rounded-lg"
	contentClasses="w-full flex flex-col justify-center items-center"
	backdropClasses="preset-glass-primary"
	positionerClasses="w-full md:w-4/5"
	positionerPadding="p-2 md:p-4"
	positionerJustify="justify-center"
	positionerAlign="items-center"
>
	{#snippet content()}
		<header class="flex flex-row w-full justify-between items-center">
			<h3 class="h3">Book an Appointment</h3>
			<button onclick={bookingModalClose}>
				<X class="text-foreground size-6" />
				<span class="sr-only">Close</span>
			</button>
		</header>
		<BookingForm modalClose={bookingModalClose} />
		<!-- <footer class="flex justify-end gap-4">
			<button type="button" class="btn preset-tonal" onclick={modalClose}>Cancel</button>
			<button type="button" class="btn preset-filled" onclick={modalClose}>Confirm</button>
		</footer> -->
	{/snippet}
</Modal>
