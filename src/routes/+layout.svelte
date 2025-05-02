<script lang="ts">
	import '../app.css';
	import AppBar from '$lib/components/navbar/app_bar.svelte';
	import Footer from '$lib/components/footer/footer.svelte';
	import whatsapp from '$lib/assets/svg/whatsapp.svg';

	import { Toaster } from '@skeletonlabs/skeleton-svelte';
  	import { toaster } from '$lib/components/toasts/toaster-svelte';

	let { children } = $props();
</script>

<Toaster {toaster}></Toaster>

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
		class="fixed xxs:bottom-[52px] xs:bottom-[52px] sm:bottom-[27px] md:bottom-[27px] right-[12px] z-100"
	>
		<a aria-label="Chat on WhatsApp" href="https://wa.me/+27737881600">
			<img alt="Chat on WhatsApp" src={whatsapp} />
		</a>
	</div>
</div>
