<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
	import newLogo from '$lib/assets/png/new_logo.png';
	import MenuIcon from '~icons/material-symbols-light/menu';
	import MobileNav from '../modals/mobile_nav.svelte';
	import { userStore } from '$lib/stores/user';

	let drawerState = $state(false);

	function drawerClose() {
		drawerState = false;
	}

	function drawerOpen() {
		drawerState = true;
	}

	function onOpenChange(e: any) {
		drawerState = e.open;
	}
</script>

<MobileNav {drawerState} {drawerClose} {onOpenChange} />

<AppBar background="bg-primary-500">
	{#snippet lead()}
		<a href="/">
			<img
				alt="The project logo"
				class="h-auto xs:h-[30px] w-[200px]"
				src={newLogo}
				loading="lazy"
			/>
		</a>
	{/snippet}
	{#snippet trail()}
		<div class="hidden md:flex gap-5">
			<a href="/">Home</a>
			<a href="/about">About</a>
			<a href="/treatments">Treatments</a>
			{#if $userStore.user}
				<a href="/admin/dashboard">Admin</a>
			{/if}
		</div>
		<div class="md:hidden">
			<button
				type="button"
				data-collapse-toggle="#navbar-default"
				class="btn hover:preset-tonal-primary inline-flex items-center justify-center text-sm px-2 py-1.5"
				aria-controls="navbar-default"
				aria-expanded="false"
				onclick={drawerOpen}
				><span class="sr-only">Open main menu</span>
				<MenuIcon></MenuIcon>
			</button>
		</div>
	{/snippet}
</AppBar>
