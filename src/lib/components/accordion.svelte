<script lang="ts">
    import { Accordion } from '@skeletonlabs/skeleton-svelte';

    import { specialiaties } from '$lib/constants/specialities';

    import MdiChevronDown from '~icons/mdi/chevron-down'
    import MdiChevronUp from '~icons/mdi/chevron-up'
    let accordionValue = $state<string[]>([specialiaties[0].title]);
</script>

<Accordion value={accordionValue} onValueChange={(e) => (accordionValue = e.value)} collapsible padding="py-2 px-2">
    {#snippet iconOpen()}<MdiChevronUp style="width: 32px; height: 32px;" />{/snippet}
    {#snippet iconClosed()}<MdiChevronDown style="width: 32px; height: 32px;" />{/snippet}
    <div class="base-font-color space-y-2 md:space-y-4 m-1 flex flex-col">
        {#each specialiaties as speciality, i}
            <Accordion.Item value={speciality.title} controlClasses="hover:bg-primary-500">
                {#snippet lead()}
                    <span class="badge-icon p-4 bg-primary-500 mr-0 md:mr-5">
                        {i + 1}
                    </span>
                {/snippet}

                {#snippet control()}
                    <p class="font-bold text-base md:text-2xl md:m-2">
                        {speciality.title}
                    </p>
                {/snippet}

                {#snippet panel()}
                    <p class="text-base md:text-lg opacity-80">
                        {speciality.description}
                    </p>
                {/snippet}
            </Accordion.Item>
        {/each}
    </div>
</Accordion>