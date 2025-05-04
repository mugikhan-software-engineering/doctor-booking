<script lang="ts">
	import { Modal } from '@skeletonlabs/skeleton-svelte';
	import newLogo from '$lib/assets/png/new_logo.png';
	import CloseIcon from '~icons/material-symbols-light/close-rounded'
	import HomeIcon from '~icons/material-symbols/home-rounded'
	import BookOpenIcon from '~icons/material-symbols/book-5-rounded'
	import SyringeIcon from '~icons/material-symbols/syringe'

	let { drawerState, drawerClose, onOpenChange } = $props();
</script>

<Modal
	open={drawerState}
	onOpenChange={onOpenChange}
	contentBase="bg-surface-100-900 py-4 px-2 space-y-4 w-4/5 shadow-xl h-dvh"
	backdropClasses="preset-glass-primary"
	positionerJustify="justify-start"
	positionerPadding="p-0"
	transitionsPositionerIn={{ x: -480, duration: 200 }}
	transitionsPositionerOut={{ x: -480, duration: 200 }}
>
{#snippet content()}
	<div class="flex flex-row justify-between items-center gap-x-3">
		<div class="flex-1">
			<img
				alt="The project logo"
				class="h-auto w-auto"
				src={newLogo}
			/>
		</div>
		<div class="flex-none">
			<button
				type="button"
				data-drawer-hide="drawer-navigation"
				aria-controls="drawer-navigation"
				onclick={drawerClose}
				class="btn preset-outlined-tertiary-500 rounded-full p-2 text-black"
			>
				<CloseIcon
					class="dark:hover:bg-gray-600 dark:hover:text-white hover:bg-black-200 hover:text-slate-500"
				/>
				<span class="sr-only">Close menu</span>
			</button>
		</div>
	</div>
	<div class="block absolute bottom-8 w-[calc(100%-50px)]">
		<div class="flex flex-col justify-end grow py-4 overflow-y-auto self-end">
			<ul class="font-medium flex flex-col space-y-12 px-4 w-full">
				<li>
					<a
						onclick={drawerClose}
						class="flex flex-row items-center text-xl text-gray-900 rounded hover:text-slate-500 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
						href="/">
						<HomeIcon class="text-black mr-4 hover:text-slate-500" />Home</a
					>
				</li>
				<li>
					<a
						onclick={drawerClose}
						class="flex flex-row items-center text-xl text-gray-900 rounded hover:text-slate-500 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
						href="/about"
						>
						<BookOpenIcon class="text-black mr-4 hover:text-slate-500" />About</a
					>
				</li>
				<li>
					<a
						onclick={drawerClose}
						class="flex flex-row items-center text-xl text-gray-900 rounded hover:text-slate-500 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
						href="/treatments"
						>
						<SyringeIcon class="text-black mr-4 hover:text-slate-500" />Treatments</a
					>
				</li>
			</ul>
		</div>
	</div>
{/snippet}
</Modal>