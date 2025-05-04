
<script lang="ts">
	import QuickNavLink from './links/quick_nav_link.svelte'

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
			<QuickNavLink href="#about" text="About" scrollIntoView={scrollIntoView} />
			<QuickNavLink href="#contact" text="Contact" scrollIntoView={scrollIntoView} />
		</div>
		<div class="flex flex-col items-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
			<QuickNavLink href="#google_map" text="Location" scrollIntoView={scrollIntoView} />
			<QuickNavLink href="#reviews" text="Reviews" scrollIntoView={scrollIntoView} />
		</div>
	</div>