<script lang="ts">
	import { Avatar, Rating } from '@skeletonlabs/skeleton-svelte';

	import { icons } from '../constants/icons';
	import type { Review } from '$lib/types/review_types';

	let { review }: { review: Review } = $props();
</script>

<div class="flex flex-col md:flex-row md:my-5 md:px-5 pr-20 w-[280px] md:w-[500px] snap-start shrink-0">
	<div class="flex flex-col md:mr-5">
		<Avatar
			src={review.profile_photo_url}
			name={review.author_name}
			classes="w-12 h-12 md:w-24 md:h-24"
			rounded="rounded-full"
		/>
	</div>
	<div class="flex flex-col gap-2">
		<p class="text-base p-2 capitalize">{review.author_name}</p>
		<Rating value={review.rating} classes="!place-content-start items-center" allowHalf readOnly>
			{#snippet iconEmpty()}
				{@html icons.starEmpty}
			{/snippet}
			{#snippet iconHalf()}
				{@html icons.starHalf}
			{/snippet}
			{#snippet iconFull()}
				{@html icons.starFull}
			{/snippet}
		</Rating>
		<p class="text-base p-2">{review.text}</p>
	</div>
</div>
