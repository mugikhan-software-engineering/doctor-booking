<script lang="ts">
	import '../app.css';
	import AppBar from '$lib/components/navbar/app_bar.svelte';
	import Footer from '$lib/components/footer/footer.svelte';
	import whatsapp from '$lib/assets/svg/whatsapp.svg';
	import { userStore } from '$lib/stores/user';

	import { Toaster } from 'svelte-french-toast';
	import { onMount } from 'svelte';
	import { goto, invalidate } from '$app/navigation';

	let { data, children } = $props();
	let { session, supabase, user } = $derived(data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			console.log('onAuthStateChange', newSession);
			if (!newSession) {
				userStore.set({ user: null });
				goto('/', { replaceState: true });
				invalidate('/'); // Explicitly invalidate the current page
			}
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}

			if (user) {
				userStore.set({ user: user });
			}
		});

		return () => data.subscription.unsubscribe();
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
		class="fixed bottom-[52px] xxs:bottom-[52px] xs:bottom-[52px] sm:bottom-[27px] md:bottom-[27px] right-[12px] z-100"
	>
		<a aria-label="Chat on WhatsApp" href="https://wa.me/+27737881600">
			<img alt="Chat on WhatsApp" src={whatsapp} />
		</a>
	</div>
</div>
