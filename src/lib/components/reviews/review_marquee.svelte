<script lang="ts">
	import type { Review } from '$lib/types/review_types';
	import ReviewCard from './review_card.svelte';

	let { reviews }: { reviews: Review[] } = $props();
</script>

<div class="overflow-clip mb-10 md:mb-0 fadeout-horizontal">
	<div class="animate-marquee-left flex gap-x-4 w-max">
		{#each reviews as review}
			<ReviewCard {review} />
		{/each}
		{#each reviews as review}
			<ReviewCard {review} ariaHidden={true} />
		{/each}
	</div>
</div>
