<script lang="ts">
	import { fly } from 'svelte/transition';
	import { Avatar, Rating } from '@skeletonlabs/skeleton-svelte';

	import { icons } from '../constants/icons';

	export let isVisible: boolean = true;
	export let review: any;
</script>

{#if isVisible}
	<div
		class="flex flex-col md:flex-row md:my-5 md:px-5 pr-20 w-[280px] md:w-[500px] snap-start shrink-0"
	>
		<div class="flex flex-col md:mr-5">
			<Avatar
				src={review.profile_photo_url}
				loading="lazy"
				width="w-12 h-12 md:w-24 md:h-24"
				rounded="rounded-full"
				alt={review.author_name}
			/>
		</div>
		<div class="flex flex-col gap-2">
			<p class="text-base p-2 capitalize">{review.author_name}</p>
			<Rating bind:value={review.rating} max={5} class="!place-content-start items-center">
				<svelte:fragment slot="empty">{@html icons.starEmpty}</svelte:fragment>
				<svelte:fragment slot="half">{@html icons.starHalf}</svelte:fragment>
				<svelte:fragment slot="full">{@html icons.starFull}</svelte:fragment>
			</Rating>
			<p class="text-base p-2">{review.text}</p>
		</div>
	</div>
{/if}
