<script lang="ts">
	import { Dialog, Portal } from '@skeletonlabs/skeleton-svelte';
	import newLogo from '$lib/assets/png/new_logo.png';
	import CloseIcon from '~icons/material-symbols-light/close-rounded';
	import HomeIcon from '~icons/material-symbols/home-rounded';
	import BookOpenIcon from '~icons/material-symbols/book-5-rounded';
	import SyringeIcon from '~icons/material-symbols/syringe';
	import MenuIcon from '~icons/material-symbols-light/menu';

	let { drawerState, drawerClose, onOpenChange } = $props();
</script>

<Dialog open={drawerState} {onOpenChange}>
	<Dialog.Trigger
		><button
			type="button"
			data-collapse-toggle="#navbar-default"
			class="btn hover:preset-tonal-primary inline-flex items-center justify-center text-sm px-2 py-1.5"
			aria-controls="navbar-default"
			aria-expanded="false"
			><span class="sr-only">Open main menu</span>
			<MenuIcon></MenuIcon>
		</button></Dialog.Trigger
	>
	<Portal>
		<Dialog.Backdrop class="fixed inset-0 z-101 bg-surface-50-950/50" />
		<Dialog.Positioner class="fixed inset-0 z-101 flex justify-start items-center">
			<Dialog.Content
				class="bg-surface-100-900 w-4/5 sm:w-3/4 md:w-2/3 shadow-xl h-dvh flex flex-col"
			>
				<!-- Header Section -->
				<div
					class="flex flex-row justify-between items-center gap-x-2 sm:gap-x-3 px-2 sm:px-4 pt-4 pb-2 flex-shrink-0"
				>
					<div class="flex-1 min-w-0">
						<img
							alt="The project logo"
							class="h-auto w-auto max-h-10 sm:max-h-12 md:max-h-14"
							src={newLogo}
						/>
					</div>
					<div class="flex-none">
						<Dialog.CloseTrigger>
							<button
								type="button"
								data-drawer-hide="drawer-navigation"
								aria-controls="drawer-navigation"
								onclick={drawerClose}
								class="btn preset-outlined-tertiary-500 rounded-full p-1.5 sm:p-2 text-black transition-colors"
							>
								<CloseIcon
									class="w-5 h-5 sm:w-6 sm:h-6 dark:hover:bg-gray-600 dark:hover:text-white hover:bg-black-200 hover:text-slate-500"
								/>
								<span class="sr-only">Close menu</span>
							</button>
						</Dialog.CloseTrigger>
					</div>
				</div>

				<!-- Navigation Section - Pushed to Bottom -->
				<nav class="flex-1 flex flex-col justify-end pb-6 sm:pb-8 md:pb-10 px-2 sm:px-4 mt-auto">
					<ul class="font-medium flex flex-col space-y-8 sm:space-y-8 md:space-y-10 w-full">
						<li>
							<a
								onclick={drawerClose}
								class="flex flex-row items-center text-lg sm:text-xl md:text-2xl text-gray-900 rounded transition-colors hover:text-slate-500 dark:text-white dark:hover:text-blue-500 active:scale-95"
								href="/"
							>
								<HomeIcon
									class="text-black dark:text-white w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mr-3 sm:mr-4 hover:text-slate-500 dark:hover:text-blue-500 transition-colors"
								/>
								<span>Home</span>
							</a>
						</li>
						<li>
							<a
								onclick={drawerClose}
								class="flex flex-row items-center text-lg sm:text-xl md:text-2xl text-gray-900 rounded transition-colors hover:text-slate-500 dark:text-white dark:hover:text-blue-500 active:scale-95"
								href="/about"
							>
								<BookOpenIcon
									class="text-black dark:text-white w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mr-3 sm:mr-4 hover:text-slate-500 dark:hover:text-blue-500 transition-colors"
								/>
								<span>About</span>
							</a>
						</li>
						<li>
							<a
								onclick={drawerClose}
								class="flex flex-row items-center text-lg sm:text-xl md:text-2xl text-gray-900 rounded transition-colors hover:text-slate-500 dark:text-white dark:hover:text-blue-500 active:scale-95"
								href="/treatments"
							>
								<SyringeIcon
									class="text-black dark:text-white w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mr-3 sm:mr-4 hover:text-slate-500 dark:hover:text-blue-500 transition-colors"
								/>
								<span>Treatments</span>
							</a>
						</li>
					</ul>
				</nav>
			</Dialog.Content>
		</Dialog.Positioner>
	</Portal>
</Dialog>

<!-- <Dialog
	open={drawerState}
	{onOpenChange}
	contentBase="bg-surface-100-900 py-4 px-2 space-y-4 w-4/5 shadow-xl h-dvh"
	backdropClasses="preset-glass-primary"
	positionerJustify="justify-start"
	positionerPadding="p-0"
	transitionsPositionerIn={{ x: -480, duration: 200 }}
	transitionsPositionerOut={{ x: -480, duration: 200 }}
>
	{#snippet content()}{/snippet}
</Dialog> -->
