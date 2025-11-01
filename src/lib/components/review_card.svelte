<script lang="ts">
	import { Avatar, RatingGroup } from '@skeletonlabs/skeleton-svelte';

	import { icons } from '../constants/icons';
	import type { Review } from '$lib/types/review_types';

	let { review }: { review: Review } = $props();
</script>

<div
	class="flex flex-col md:flex-row md:my-5 md:px-5 pr-20 w-[280px] md:w-[500px] snap-start shrink-0"
>
	<div class="flex flex-col md:mr-5">
		<Avatar>
			<Avatar.Image src={review.profile_photo_url} />
			<Avatar.Fallback>{review.author_name.charAt(0)}</Avatar.Fallback>
		</Avatar>
	</div>
	<div class="flex flex-col gap-2">
		<p class="text-base p-2 capitalize">{review.author_name}</p>
		<RatingGroup count={5} allowHalf={true} value={review.rating}>
			<RatingGroup.Control>
				<RatingGroup.Context>
					{#snippet children(ratingGroup)}
						{#each ratingGroup().items as index (index)}
							<RatingGroup.Item {index}>
								{#snippet empty()}
									{@html icons.starEmpty}
								{/snippet}
								{#snippet half()}
									{@html icons.starHalf}
								{/snippet}
								{#snippet full()}
									{@html icons.starFull}
								{/snippet}
							</RatingGroup.Item>
						{/each}
					{/snippet}
				</RatingGroup.Context>
			</RatingGroup.Control>
			<RatingGroup.HiddenInput />
		</RatingGroup>
		<p class="text-base p-2">{review.text}</p>
	</div>
</div>
