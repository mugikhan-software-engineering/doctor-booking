<script lang="ts">
	import { Accordion } from 'bits-ui';
	import CaretDown from 'phosphor-svelte/lib/CaretDown';
	import { specialiaties } from '$lib/constants/specialities';
</script>

<Accordion.Root class="w-full" type="single">
	{#each specialiaties as speciality, i}
		<Accordion.Item value={speciality.title} class="group">
			<Accordion.Header>
				<Accordion.Trigger
					class="flex w-full flex-1 select-none items-center justify-between py-5 text-[15px] font-medium transition-all [&[data-state=open]>span>svg]:rotate-180 px-2"
				>
					<span class="badge-icon p-4 bg-primary-500 mr-2 dark:bg-primary-500 dark:text-black">
						{i + 1}
					</span>
					<span class="w-full text-left font-bold text-base md:text-2xl">
						{speciality.title}
					</span>
					<span
						class="hover:bg-dark-10 inline-flex size-8 items-center justify-center rounded-[7px] bg-transparent"
					>
						<CaretDown class="size-[18px] transition-transform duration-200" />
					</span>
				</Accordion.Trigger>
			</Accordion.Header>
			<Accordion.Content
				class="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm tracking-[-0.01em]"
			>
				<div class="pb-[25px] px-4 text-sm md:text-lg">
					{speciality.description}
				</div>
			</Accordion.Content>
		</Accordion.Item>
	{/each}
</Accordion.Root>
