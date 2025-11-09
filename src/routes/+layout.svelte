<script lang="ts">
	import '../app.css';
	import AppBar from '$lib/components/navbar/app_bar.svelte';
	import Footer from '$lib/components/footer/footer.svelte';
	import whatsapp from '$lib/assets/svg/whatsapp.svg';

	// import { Toaster } from '@skeletonlabs/skeleton-svelte';
	// import { toaster } from '$lib/components/toasts/toaster-svelte';

	import { Toaster } from 'svelte-french-toast';

	let { children } = $props();

	let isNearBottom = $state(false);

	$effect(() => {
		const checkScrollPosition = () => {
			const scrollHeight = document.documentElement.scrollHeight;
			const scrollTop = window.scrollY || document.documentElement.scrollTop;
			const clientHeight = window.innerHeight;

			// Consider "near bottom" when within 200px of the bottom
			const threshold = 200;
			const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

			isNearBottom = distanceFromBottom < threshold;
		};

		// Check on mount and on scroll
		checkScrollPosition();
		window.addEventListener('scroll', checkScrollPosition, { passive: true });
		window.addEventListener('resize', checkScrollPosition, { passive: true });

		return () => {
			window.removeEventListener('scroll', checkScrollPosition);
			window.removeEventListener('resize', checkScrollPosition);
		};
	});
</script>

<Toaster></Toaster>

<div class="min-h-screen grid grid-rows-[auto_1fr_auto]">
	<header class="sticky top-0 z-4">
		<AppBar />
	</header>

	<main>
		{@render children()}
	</main>

	<footer>
		<Footer />
	</footer>

	<div
		class="fixed right-3 sm:right-4 md:right-6 z-100 transition-all duration-200 {isNearBottom
			? 'bottom-[calc(60px+1rem)] sm:bottom-[calc(56px+0.75rem)] md:bottom-8'
			: 'bottom-4 sm:bottom-6 md:bottom-8'}"
	>
		<a
			aria-label="Chat on WhatsApp"
			href="https://wa.me/+27737881600"
			target="_blank"
			rel="noopener noreferrer"
			class="block hover:scale-105 active:scale-95 transition-transform duration-200 drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:drop-shadow-[0_6px_16px_rgba(0,0,0,0.4)]"
		>
			<img
				alt="Chat on WhatsApp"
				src={whatsapp}
				class="w-auto h-auto max-w-[170px] sm:max-w-[200px] md:max-w-[220px] max-h-[60px] sm:max-h-[70px] md:max-h-[80px]"
			/>
		</a>
	</div>
</div>
