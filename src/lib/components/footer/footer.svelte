<script lang="ts">
	import { onMount } from 'svelte';
	import DarkModeButton from '../theme/dark_mode_button.svelte';
	let { isDev } = $props();

	let currentYear: String = $state(`${new Date().getFullYear()}`);
</script>

<div class="flex flex-col md:flex-row justify-center items-center p-2 bg-white dark:bg-black">
	<p class="text-md">
		Copyright © {currentYear} Dr. Ahsan Ahmad. Website by
		<a href="https://mugikhan.com/" target="_blank" class="hover:underline underline-offset-2"
			>Mugi Khan</a
		>
	</p>
	{#if isDev}
		<DarkModeButton />
	{/if}
</div>
