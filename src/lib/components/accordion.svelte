<script lang="ts">
    import { Accordion } from '@skeletonlabs/skeleton-svelte';

    import { specialiaties } from '$lib/constants/specialities';

    let value = $state([specialiaties[0].title]);
</script>

<Accordion {value} onValueChange={(e) => (value = e.value)} collapsible padding="py-2 px-2">
    <div class="base-font-color space-y-2 md:space-y-4 m-1 md:m-6 flex flex-col">
        {#each specialiaties as speciality, i}
            <Accordion.Item value={speciality.title}>
                {#snippet lead()}
                    <span class="badge-icon p-4 preset-tonal-secondary mr-0 md:mr-5">
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