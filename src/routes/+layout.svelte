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

	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	import { storePopup, popup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import type { ComponentEvents } from 'svelte';

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

	const scrollIntoView = ({ currentTarget }: any) => {
		const scrollToElement = document.querySelector(currentTarget.getAttribute('href'));

		if (!scrollToElement) return;

		scrollToElement.scrollIntoView({
			behavior: 'smooth'
		});
	};

	const popupClick: PopupSettings = {
		// Represents the type of event that opens/closed the popup
		event: 'click',
		// Matches the data-popup value on your popup element
		target: 'popupClick',
		// Defines which side of your trigger the popup will appear
		placement: 'bottom'
	};
</script>

<AppShell on:scroll={scrollHandler}>
	<svelte:fragment slot="header">
		<AppBar
			gridColumns="grid-cols-3"
			slotDefault="place-self-start"
			slotTrail="place-content-end"
			class="!bg-secondary-100-800-token"
		>
			<svelte:fragment slot="lead"
				><img alt="The project logo h-auto w-full" src={logo} /></svelte:fragment
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
						class="md:hidden btn-icon variant-filled inline-flex items-center justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
						aria-controls="navbar-default"
						aria-expanded="false"
						use:popup={popupClick}
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
					<div class="block" data-popup="popupClick">
						<ul
							class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
						>
							<li>
								<a
									class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
									href="#home"
									on:click|preventDefault={scrollIntoView}>Home</a
								>
							</li>
							<li>
								<a
									class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
									href="#about"
									on:click|preventDefault={scrollIntoView}>About</a
								>
							</li>
							<li>
								<a
									class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
									href="#contact"
									on:click|preventDefault={scrollIntoView}>Contact</a
								>
							</li>
						</ul>
					</div>
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
	<svelte:fragment slot="pageFooter">
		<div class="flex flex-col md:flex-row justify-center items-center pl-2 md:pl-0 bg-white">
			<p class="text-md">
				Copyright © {currentYear} Dr. Ahsan Ahmad. All Rights Reserved. Website by&nbsp;
				<a href="https://mugikhan.com/" target="_blank">Mugi Khan</a>
			</p>
		</div></svelte:fragment
	>

	<div
		class="absolute {scrolledToBottom
			? 'bottom-[52px]'
			: 'bottom-[12px]'} right-[12px] xs:bottom-[52px] sm:bottom-[27px] md:bottom-[27px] z-100"
	>
		<a aria-label="Chat on WhatsApp" href="https://wa.me/+27870879294">
			<img alt="Chat on WhatsApp" src={whatsapp} />
		</a>
	</div>
</AppShell>
