<script lang="ts">
	import { fly } from 'svelte/transition';

	export let title: string;
	export let subtitle: string;
	export let isVisible: boolean;
	export let yOffset: number;
</script>

{#if isVisible}
	<div class="flex flex-col px-4 my-2" transition:fly={{ duration: 750, y: yOffset, opacity: 0 }}>
		<h4 class="h4 opacity-75">{title}</h4>
		<h2 class="h2">{subtitle}</h2>
	</div>
{/if}
