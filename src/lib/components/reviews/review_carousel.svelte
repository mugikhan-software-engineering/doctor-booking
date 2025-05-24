<script lang="ts">
	import ChevronLeftIcon from '~icons/mdi/chevron-left';
	import ChevronRightIcon from '~icons/mdi/chevron-right';

	import ReviewCard from './review_card.svelte';
	import type { Review } from '$lib/types/review_types';

	let { reviews }: { reviews: Review[] } = $props();
</script>

<div class="md:p-4 grid grid-cols-[auto_1fr_auto] md:gap-4 items-center md:my-4 mt-5 mb-20">
	<!-- Button: Left -->
	<button
		type="button"
		class="btn hover:preset-tonal-primary"
		aria-label="chevron-left"
		data-carousel-left
	>
		<ChevronLeftIcon style="font-size: 1.5em;" class="text-gray-600" />
	</button>
	<!-- Full Images -->
	<div
		data-carousel
		class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex md:gap-10 overflow-x-auto md:px-5 md:py-10 overflow-y-auto"
	>
		{#each reviews as review}
			<ReviewCard {review} />
		{/each}
	</div>
	<!-- Button: Right -->
	<button
		type="button"
		class="btn hover:preset-tonal-primary"
		aria-label="chevron-right"
		data-carousel-right
	>
		<ChevronRightIcon style="font-size: 1.5em;" class="text-gray-600" />
	</button>
</div>
