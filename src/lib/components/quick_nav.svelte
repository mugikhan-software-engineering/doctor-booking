<script lang="ts">
	import QuickNavLink from './links/quick_nav_link.svelte';
	import KeyboardArrowDownIcon from '~icons/material-symbols/keyboard-arrow-down-rounded';

	let { hasReviews } = $props();

	const scrollIntoView = ({ currentTarget }: any) => {
		const scrollToElement = document.querySelector(currentTarget.getAttribute('href'));

		if (!scrollToElement) return;

		scrollToElement.scrollIntoView({
			behavior: 'smooth',
			block: 'center'
		});
	};
</script>

<nav
	class="flex place-self-center justify-center items-center h-fit w-full sm:w-fit z-2 sticky mb-10 md:mb-0 bg-primary-900/80 backdrop-blur-md p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl shadow-lg border border-white/10 max-w-[280px] sm:max-w-none"
>
	<div
		class="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4 w-full sm:w-auto"
	>
		<QuickNavLink href="#about" text="About" icon={KeyboardArrowDownIcon} {scrollIntoView} />
		<QuickNavLink href="#contact" text="Contact" icon={KeyboardArrowDownIcon} {scrollIntoView} />
		<QuickNavLink
			href="#google_map"
			text="Location"
			icon={KeyboardArrowDownIcon}
			{scrollIntoView}
		/>
		{#if hasReviews}
			<QuickNavLink href="#reviews" text="Reviews" icon={KeyboardArrowDownIcon} {scrollIntoView} />
		{/if}
	</div>
</nav>
