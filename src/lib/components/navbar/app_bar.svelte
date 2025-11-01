<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
	import newLogo from '$lib/assets/png/new_logo.png';
	import MenuIcon from '~icons/material-symbols-light/menu';
	import MobileNav from '../modals/mobile_nav.svelte';
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

<!-- <MobileNav {drawerState} {drawerClose} {onOpenChange} /> -->

<AppBar class="bg-primary-500">
	<AppBar.Toolbar class="grid-cols-[auto_1fr_auto]">
		<AppBar.Lead>
			<a href="/">
				<img
					alt="The project logo"
					class="h-auto xs:h-[30px] w-[200px]"
					src={newLogo}
					loading="lazy"
				/>
			</a>
		</AppBar.Lead>
		<AppBar.Headline>
			<p class="text-2xl"></p>
		</AppBar.Headline>
		<AppBar.Trail>
			<div class="hidden md:flex gap-5">
				<a href="/">Home</a>
				<a href="/about">About</a>
				<a href="/treatments">Treatments</a>
			</div>
			<div class="md:hidden">
				<MobileNav {drawerState} {drawerClose} {onOpenChange} />
			</div>
		</AppBar.Trail>
	</AppBar.Toolbar>
</AppBar>
