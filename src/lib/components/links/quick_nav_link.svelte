<script lang="ts">
	let {
		scrollIntoView,
		text,
		href,
		icon: Icon
	}: {
		scrollIntoView: (event: Event) => void;
		text: string;
		href: string;
		icon: any;
	} = $props();
</script>

<a
	{href}
	onclick={scrollIntoView}
	class="group flex flex-row items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-200 ease-in-out text-white hover:text-white active:scale-95 shadow-sm hover:shadow-md w-full sm:w-auto"
>
	<span class="text-xs sm:text-sm md:text-base font-medium whitespace-nowrap">{text}</span>
	{#if Icon}
		<Icon
			class="w-5 h-5 text-white transition-transform duration-200 group-hover:translate-y-0.5 text-xl"
		/>
	{/if}
</a>
