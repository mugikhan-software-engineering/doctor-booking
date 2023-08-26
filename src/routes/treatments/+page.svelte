<script lang="ts">
	import { inview } from 'svelte-inview';

	import floatingTitle from '$lib/components/float_in_title.svelte';

	import kidneyHome from '$lib/assets/kidney-home.jpg';
	import kidneyHeader from '$lib/assets/kidney-header.jpg';
	import bladderHeader from '$lib/assets/bladder-header.jpg';

	import { kidneys } from '$lib/constants/kidneys';
	import { bladders } from '$lib/constants/bladder';

	let isInViewKidneyTitle: boolean;
</script>

<section
	class="pb-32 relative w-screen h-screen flex flex-col md:flex-row justify-center items-center"
>
	<div
		class="absolute w-screen h-screen top-0 left-0 bg-cover bg-center bg-no-repeat bg-fixed bg-blend-color opacity-60 blur-[1px]"
		style="background-image:url({kidneyHome})"
	/>
	<div
		class="sticky flex bg-transparent p-5 md:p-2 lg:flex-row flex-col items-center lg:justify-between z-0 gap-y-8"
	>
		<div class="flex flex-col flex-1 justify-center items-center lg:h-full xs:mt-5 sm: mt-5">
			<h4
				class="md:text-[60px] text-[20px] leading-none xs:text-center md:px-6 md:mx-0 lg:mt-2 uppercase w-full"
			>
				Common Diseases
			</h4>
		</div>
	</div>
</section>

<section id="kidney" class="flex flex-col h-fit w-screen mt-5">
	<div
		class="sticky flex bg-transparent px-0 md:p-2 mb-2 lg:flex-row flex-col items-center z-0 gap-y-8"
	>
		<div
			class="flex flex-row flex-wrap w-full place-content-start items-start z-2"
			use:inview
			on:inview_change={(event) => {
				const { inView } = event.detail;
				isInViewKidneyTitle = inView;
			}}
		>
			<svelte:component
				this={floatingTitle}
				title=""
				subtitle="KIDNEYS."
				yOffset={-50}
				isVisible={isInViewKidneyTitle}
			/>
		</div>
	</div>

	<div
		class="sticky w-screen h-fit bg-cover bg-center bg-no-repeat bg-fixed bg-blend-color z-0"
		style="background-image:url({kidneyHeader})"
		use:inview
	>
		<div class="flex flex-row p-6">
			<ul class="list card variant-glass-secondary p-6">
				{#each kidneys as kidney, i}
					<li class="text-white">
						<span>
							<svg
								width="20px"
								height="20px"
								viewBox="0 0 24 24"
								version="1.1"
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
							>
								<g id="out" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
									<path
										d="M19,3 L5,3 C3.9,3 3.01,3.9 3.01,5 L3,19 C3,20.1 3.9,21 5,21 L19,21 C20.1,21 21,20.1 21,19 L21,5 C21,3.9 20.1,3 19,3 L19,3 Z M18,14 L14,14 L14,18 L10,18 L10,14 L6,14 L6,10 L10,10 L10,6 L14,6 L14,10 L18,10 L18,14 L18,14 Z"
										id="path"
										fill="#FFF"
									/>
								</g>
							</svg>
						</span>
						<span class="flex-auto py-2">{kidney.title}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<section id="bladder" class="flex flex-col h-fit w-screen mt-5">
	<div
		class="sticky flex bg-transparent px-0 md:p-2 mb-2 lg:flex-row flex-col items-center z-0 gap-y-8"
	>
		<div
			class="flex flex-row flex-wrap w-full place-content-start items-start z-2"
			use:inview
			on:inview_change={(event) => {
				const { inView } = event.detail;
				isInViewKidneyTitle = inView;
			}}
		>
			<svelte:component
				this={floatingTitle}
				title=""
				subtitle="BLADDERS."
				yOffset={-50}
				isVisible={isInViewKidneyTitle}
			/>
		</div>
	</div>

	<div
		class="sticky w-screen h-fit bg-cover bg-center bg-no-repeat bg-fixed z-0"
		style="background-image:url({bladderHeader})"
		use:inview
	>
		<div class="flex flex-row p-6">
			<ul class="list card variant-glass-secondary p-6">
				{#each bladders as bladder, i}
					<li class="text-white">
						<span>
							<svg
								width="20px"
								height="20px"
								viewBox="0 0 24 24"
								version="1.1"
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
							>
								<g id="out" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
									<path
										d="M19,3 L5,3 C3.9,3 3.01,3.9 3.01,5 L3,19 C3,20.1 3.9,21 5,21 L19,21 C20.1,21 21,20.1 21,19 L21,5 C21,3.9 20.1,3 19,3 L19,3 Z M18,14 L14,14 L14,18 L10,18 L10,14 L6,14 L6,10 L10,10 L10,6 L14,6 L14,10 L18,10 L18,14 L18,14 Z"
										id="path"
										fill="#FFF"
									/>
								</g>
							</svg>
						</span>
						<span class="flex-auto py-2">{bladder.title}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<div class="invisible mt:10 md:mt-20">margin bottom</div>
</section>
