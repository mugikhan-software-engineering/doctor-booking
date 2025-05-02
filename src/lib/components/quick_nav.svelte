
<script lang="ts">
	import { ChevronsDownIcon } from 'svelte-feather-icons';

	const scrollIntoView = ({ currentTarget }: any) => {
		const scrollToElement = document.querySelector(currentTarget.getAttribute('href'));

		if (!scrollToElement) return;

		scrollToElement.scrollIntoView({
			behavior: 'smooth',
			block: 'center'
		});
	};
</script>

<div
		class="flex flex-row place-self-center justify-center items-center h-fit w-fit z-2 sticky mb-10 md:mb-0 bg-secondary-400/15 p-2 md:p-3 rounded-md xs:space-x-1 space-x-4 md:space-x-8"
	>
		<div class="flex flex-row items-center">
			<a
				class="text-sm md:text-lg text-slate-200"
				href="#about"
				on:click|preventDefault={scrollIntoView}>About</a
			>
			<ChevronsDownIcon size="24" class="text-slate-200" />
		</div>
		<div class="flex flex-row items-center">
			<a
				class="text-sm md:text-lg text-slate-200"
				href="#contact"
				on:click|preventDefault={scrollIntoView}>Contact</a
			>
			<ChevronsDownIcon size="24" class="text-slate-200" />
		</div>
		<div class="flex flex-row items-center">
			<a
				class="text-sm md:text-lg text-slate-200"
				href="#google_map"
				on:click|preventDefault={scrollIntoView}>Location</a
			>
			<ChevronsDownIcon size="24" class="text-slate-200" />
		</div>
		<div class="flex flex-row items-center">
			<a
				class="text-sm md:text-lg text-slate-200"
				href="#reviews"
				on:click|preventDefault={scrollIntoView}>Reviews</a
			>
			<ChevronsDownIcon size="24" class="text-slate-200" />
		</div>
	</div>