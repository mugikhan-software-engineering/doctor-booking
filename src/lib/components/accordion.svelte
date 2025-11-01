<script lang="ts">
	import { Accordion } from '@skeletonlabs/skeleton-svelte';

	import { specialiaties } from '$lib/constants/specialities';

	import MdiChevronDown from '~icons/mdi/chevron-down';
	import MdiChevronUp from '~icons/mdi/chevron-up';
	let accordionValue = $state<string[]>([specialiaties[0].title]);
</script>

<Accordion value={accordionValue} onValueChange={(e) => (accordionValue = e.value)} collapsible>
	{#each specialiaties as speciality, i (speciality.title)}
		<Accordion.Item value={speciality.title}>
			<Accordion.ItemTrigger
				class="font-bold flex justify-between items-center hover:bg-primary-500"
			>
				<div class="flex justify-start items-center">
					<span
						class="badge-icon p-4 text-base bg-primary-500 mr-1 md:mr-4 rounded-full flex items-center justify-center w-3 h-3 md:min-w-[24px] md:min-h-[24px] aspect-square"
					>
						{i + 1}
					</span>
					<p class="font-bold text-base md:text-xl">
						{speciality.title}
					</p>
				</div>
				<Accordion.ItemIndicator class="group">
					<MdiChevronUp class="w-8 h-8 group-data-[state=open]:block hidden" />
					<MdiChevronDown class="w-8 h-8 group-data-[state=open]:hidden block" />
				</Accordion.ItemIndicator>
			</Accordion.ItemTrigger>

			<Accordion.ItemContent>
				{#snippet children()}
					<p class="text-base md:text-lg opacity-80">
						{speciality.description}
					</p>
				{/snippet}
			</Accordion.ItemContent>
		</Accordion.Item>
	{/each}
</Accordion>

<style>
	:global([data-accordion-content]),
	:global([data-accordion-item-content]) {
		transition:
			opacity 0.3s ease-in-out,
			transform 0.3s ease-in-out,
			max-height 0.3s ease-in-out;
		overflow: hidden;
	}

	:global([data-accordion-content][data-state='closed']),
	:global([data-accordion-item-content][data-state='closed']) {
		opacity: 0;
		transform: translateY(-10px);
		max-height: 0;
	}

	:global([data-accordion-content][data-state='open']),
	:global([data-accordion-item-content][data-state='open']) {
		opacity: 1;
		transform: translateY(0);
		max-height: 1000px;
	}
</style>
