<script lang="ts">
	import { Avatar, Rating } from '@skeletonlabs/skeleton-svelte';

	import { icons } from '$lib/constants/icons';
	import type { Review } from '$lib/types/review_types';

	let { review, ariaHidden }: { review: Review; ariaHidden?: boolean } = $props();
</script>

<div
	class="flex flex-col md:flex-row md:my-5 w-[280px] md:w-[500px] max-h-[280px]
	shrink-0 text-ellipsis overflow-hidden preset-outlined-primary-500 p-4 rounded-2xl
	relative shadow-lg dark:shadow-primary-500/20 {ariaHidden ? 'aria-hidden' : ''}"
>
	<div class="absolute bottom-2 right-2 object-cover opacity-65 text-primary-500 fill-current z-10">
		<svg
			class=""
			width="64"
			height="64"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M4.583 17.321C3.553 16.227 3 15 3 13.011C3 9.511 5.457 6.374 9.03 4.823L9.923 6.201C6.588 8.005 5.936 10.346 5.676 11.822C6.213 11.544 6.916 11.447 7.605 11.511C9.409 11.678 10.831 13.159 10.831 15C10.831 15.9283 10.4623 16.8185 9.80587 17.4749C9.1495 18.1312 8.25926 18.5 7.331 18.5C6.258 18.5 5.232 18.01 4.583 17.321V17.321ZM14.583 17.321C13.553 16.227 13 15 13 13.011C13 9.511 15.457 6.374 19.03 4.823L19.923 6.201C16.588 8.005 15.936 10.346 15.676 11.822C16.213 11.544 16.916 11.447 17.605 11.511C19.409 11.678 20.831 13.159 20.831 15C20.831 15.9283 20.4623 16.8185 19.8059 17.4749C19.1495 18.1312 18.2593 18.5 17.331 18.5C16.258 18.5 15.232 18.01 14.583 17.321V17.321Z"
				fill="currentColor"
			></path>
		</svg>
	</div>
	<div class="flex flex-row md:mr-5 mb-2 md:mb-0 items-center md:items-start">
		<Avatar
			src={review.profile_photo_url}
			name={review.author_name}
			classes="w-12 h-12 md:w-24 md:h-24"
			rounded="rounded-full"
		/>
		<p class="text-base p-2 capitalize md:hidden">{review.author_name}</p>
	</div>
	<div class="flex flex-col gap-2">
		<p class="text-base p-2 capitalize hidden md:block">{review.author_name}</p>
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
		<p
			class="text-base overflow-hidden text-ellipsis text-pretty md:text-balance line-clamp-5 z-20"
		>
			{review.text}
		</p>
	</div>
</div>
