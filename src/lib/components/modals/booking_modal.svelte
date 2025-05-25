<script lang="ts">
	import { Modal } from '@skeletonlabs/skeleton-svelte';
	import { Tabs } from 'bits-ui';
	import BookingForm from '$lib/components/booking_form.svelte';
	import RescheduleForm from '$lib/components/reschedule_form.svelte';
	import X from 'phosphor-svelte/lib/X';
	import { getLocalTimeZone, today } from '@internationalized/date';

	let { bookingModalState, bookingModalClose, onOpenChange } = $props();
	let activeTab = $state('book');

	const localToday = today(getLocalTimeZone());
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
			<h3 class="h3">Appointment Management</h3>
			<button onclick={bookingModalClose}>
				<X class="text-foreground size-6" />
				<span class="sr-only">Close</span>
			</button>
		</header>

		<Tabs.Root
			value={activeTab}
			onValueChange={(value) => (activeTab = value)}
			class="w-full space-y-4"
		>
			<Tabs.List
				class="space-x-2 rounded-lg shadow-mini-inset bg-surface-100-900 grid w-full grid-cols-2 gap-1 p-1 text-sm font-semibold leading-[0.01em] dark:border dark:border-neutral-600/30"
			>
				<Tabs.Trigger
					value="book"
					class="data-[state=active]:shadow-mini dark:data-[state=active]:bg-muted h-8 rounded-lg py-2 data-[state=active]:bg-surface-50-950"
					>Book New</Tabs.Trigger
				>
				<Tabs.Trigger
					value="reschedule"
					class="data-[state=active]:shadow-mini dark:data-[state=active]:bg-muted h-8 rounded-lg py-2 data-[state=active]:bg-surface-50-950"
					>Reschedule</Tabs.Trigger
				>
			</Tabs.List>

			<Tabs.Content value="book">
				<BookingForm modalClose={bookingModalClose} {localToday} />
			</Tabs.Content>

			<Tabs.Content value="reschedule">
				<RescheduleForm modalClose={bookingModalClose} {localToday} />
			</Tabs.Content>
		</Tabs.Root>
	{/snippet}
</Modal>
