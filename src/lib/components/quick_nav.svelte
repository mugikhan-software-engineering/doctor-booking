
<script lang="ts">
	import ChevronsDownIcon from '~icons/mdi/chevron-double-down'

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
		class="flex flex-row place-self-center justify-center items-center h-fit w-fit z-2 sticky mb-10 md:mb-0 bg-secondary-400/15 p-2 md:p-3 rounded-md space-x-4"
	>
		<div class="flex flex-col items-center space-y-4 md:flex-row md:items-stretch md:space-x-4 md:space-y-0">
			<div class="flex flex-row items-center">
				<a
					class="text-sm md:text-lg text-slate-200"
					href="#about"
					on:click|preventDefault={scrollIntoView}>About</a
				>
				<ChevronsDownIcon style="width: 24px; height: 24px;" class="text-slate-200" />
			</div>
			<div class="flex flex-row items-center">
				<a
					class="text-sm md:text-lg text-slate-200"
					href="#contact"
					on:click|preventDefault={scrollIntoView}>Contact</a
				>
				<ChevronsDownIcon style="width: 24px; height: 24px;" class="text-slate-200" />
			</div>
		</div>
		<div class="flex flex-col items-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
			<div class="flex flex-row items-center">
				<a
					class="text-sm md:text-lg text-slate-200"
					href="#google_map"
					on:click|preventDefault={scrollIntoView}>Location</a
				>
				<ChevronsDownIcon style="width: 24px; height: 24px;" class="text-slate-200" />
			</div>
			<div class="flex flex-row items-center">
				<a
					class="text-sm md:text-lg text-slate-200"
					href="#reviews"
					on:click|preventDefault={scrollIntoView}>Reviews</a
				>
				<ChevronsDownIcon style="width: 24px; height: 24px;" class="text-slate-200" />
			</div>
		</div>
	</div>