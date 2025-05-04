<script lang="ts">
    import { onMount } from 'svelte';
    import whatsapp from '$lib/assets/svg/whatsapp.svg';
    let currentYear: String = '2023';

    onMount(() => {
		const d: Date = new Date();
		currentYear = `${d.getFullYear()}`;
	});
</script>
<div class="flex flex-col md:flex-row justify-center items-center pl-2 md:pl-0 bg-white">
    <p class="text-md">
        Copyright © {currentYear} Dr. Ahsan Ahmad. Website by <a href="https://mugikhan.com/" target="_blank" class="hover:underline underline-offset-2">Mugi Khan</a>
    </p>
</div>
