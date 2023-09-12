<script lang="ts">
	// Your selected Skeleton theme:
	import '../theme.postcss';

	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';
	import { onMount } from 'svelte';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	import logo from '$lib/assets/svg/logo.svg';
	import whatsapp from '$lib/assets/svg/whatsapp.svg';

	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';

	import type { DrawerSettings } from '@skeletonlabs/skeleton';

	import type { ComponentEvents } from 'svelte';

	import { XIcon, HomeIcon, BookOpenIcon, UserIcon } from 'svelte-feather-icons';

	let currentYear: String = '2023';
	let scrolledToBottom: boolean = false;

	onMount(() => {
		const d: Date = new Date();
		currentYear = `${d.getFullYear()}`;
	});

	function scrollHandler(event: ComponentEvents<AppShell>['scroll']) {
		if (
			event.currentTarget.offsetHeight + event.currentTarget.scrollTop >=
			event.currentTarget.scrollHeight
		) {
			scrolledToBottom = true;
		} else {
			scrolledToBottom = false;
		}
	}

	const drawerSettings: DrawerSettings = {
		id: 'drawer-nav',
		// Provide your property overrides:
		bgDrawer: '!bg-slate-100',
		bgBackdrop: '!variant-soft',
		width: 'xs:w-[calc(100%-20px)] sm:w-[calc(100%-20px)] md:w-[480px]',
		padding: 'pr-4',
		rounded: 'rounded-lg'
	};

	const openDrawer = () => {
		drawerStore.open(drawerSettings);
	};

	const closeDrawer = () => {
		drawerStore.close();
	};
</script>

<Drawer>
	<div class="flex flex-row justify-end items-center p-8">
		<button
			type="button"
			data-drawer-hide="drawer-navigation"
			aria-controls="drawer-navigation"
			on:click={closeDrawer}
			class="btn-icon variant-ringed-primary text-black"
		>
			<XIcon
				size="32"
				class="dark:hover:bg-gray-600 dark:hover:text-white hover:bg-black-200 hover:text-slate-500"
			/>
			<span class="sr-only">Close menu</span>
		</button>
	</div>
	<div class="block absolute bottom-8 w-[calc(100%-40px)]">
		<div class="flex flex-col justify-end grow py-4 overflow-y-auto self-end">
			<ul class="font-medium flex flex-col space-y-12 pl-1 w-full">
				<li>
					<a
						on:click={closeDrawer}
						class="flex flex-row items-center px-4 text-2xl block text-gray-900 rounded hover:bg-slate-50 hover:text-slate-500 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
						href="/"><HomeIcon size="32" class="text-black mr-4" />Home</a
					>
				</li>
				<li>
					<a
						on:click={closeDrawer}
						class="flex flex-row items-center px-4 text-2xl block text-gray-900 rounded hover:bg-slate-50 hover:text-slate-500 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
						href="/about"><BookOpenIcon size="32" class="text-black mr-4" />About</a
					>
				</li>
				<li>
					<a
						on:click={closeDrawer}
						class="flex flex-row items-center px-4 text-2xl block text-gray-900 rounded hover:bg-slate-50 hover:text-slate-500 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
						href="/treatments"><UserIcon size="32" class="text-black mr-4" />Treatments</a
					>
				</li>
			</ul>
		</div>
	</div>
</Drawer>

<AppShell on:scroll={scrollHandler}>
	<svelte:fragment slot="header">
		<AppBar
			gridColumns="grid-cols-3"
			slotDefault="place-self-start"
			slotTrail="place-content-end"
			class="!bg-secondary-100-800-token"
		>
			<svelte:fragment slot="lead"
				><a href="/"
					><img alt="The project logo" class="h-auto max-w-none md:max-w-full" src={logo} /></a
				></svelte:fragment
			>
			<svelte:fragment slot="trail">
				<div class="hidden md:flex gap-5">
					<a href="/">Home</a>
					<a href="/about">About</a>
					<a href="/treatments">Treatments</a>
				</div>
				<div class="md:hidden">
					<button
						type="button"
						data-collapse-toggle="#navbar-default"
						class="md:hidden btn-icon variant-filled bg-white inline-flex items-center justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
						aria-controls="navbar-default"
						aria-expanded="false"
						on:click={openDrawer}
						><span class="sr-only">Open main menu</span>
						<svg
							class="w-7 h-5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 23 14"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M1 1h15M1 7h15M1 13h15"
							/>
						</svg></button
					>
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
	<svelte:fragment slot="pageFooter">
		<div class="flex flex-col md:flex-row justify-center items-center pl-2 md:pl-0 bg-white">
			<p class="text-md">
				Copyright © {currentYear} Dr. Ahsan Ahmad. All Rights Reserved. Website by&nbsp;
				<a href="https://mugikhan.com/" target="_blank" class="hover:underline underline-offset-2"
					>Mugi Khan</a
				>
			</p>
		</div>
	</svelte:fragment>

	<div
		class="absolute {scrolledToBottom
			? 'bottom-[52px]'
			: 'bottom-[12px]'} right-[12px] xs:bottom-[52px] sm:bottom-[27px] md:bottom-[27px] z-100"
	>
		<a aria-label="Chat on WhatsApp" href="https://wa.me/+27605680361">
			<img alt="Chat on WhatsApp" src={whatsapp} />
		</a>
	</div>
</AppShell>
