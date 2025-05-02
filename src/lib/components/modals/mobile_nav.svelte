<script lang="ts">
	import { Modal } from '@skeletonlabs/skeleton-svelte';
	import { XIcon, HomeIcon, BookOpenIcon, UserIcon } from 'svelte-feather-icons';
	import newLogo from '$lib/assets/png/new_logo.png';

	let drawerState = $state(false);

	function closeDrawer() {
		drawerState = false;
	}
</script>

<Modal
	open={drawerState}
	onOpenChange={(e) => (drawerState = e.open)}
	triggerBase="btn preset-tonal"
	contentBase="bg-surface-100-900 p-4 space-y-4 shadow-xl w-[480px] h-screen"
	backdropBackground="variant-soft"
	positionerJustify="justify-start"
	positionerAlign=""
	positionerPadding=""
	transitionsPositionerIn={{ x: -480, duration: 200 }}
	transitionsPositionerOut={{ x: -480, duration: 200 }}
>
{#snippet trigger()}Open Drawer{/snippet}
{#snippet content()}
	<div class="flex flex-row justify-between items-center p-5 gap-3">
		<div class="flex-1">
			<img
				alt="The project logo"
				class="h-auto xs:h-[30px] max-w-[280px] xxs:max-w-[140px]"
				src={newLogo}
			/>
		</div>
		<div class="flex-none">
			<button
				type="button"
				data-drawer-hide="drawer-navigation"
				aria-controls="drawer-navigation"
				onclick={closeDrawer}
				class="btn-icon preset-outlined-primary-500 text-black"
			>
				<XIcon
					size="32"
					class="dark:hover:bg-gray-600 dark:hover:text-white hover:bg-black-200 hover:text-slate-500"
				/>
				<span class="sr-only">Close menu</span>
			</button>
		</div>
	</div>
	<div class="block absolute bottom-8 w-[calc(100%-50px)]">
		<div class="flex flex-col justify-end grow py-4 overflow-y-auto self-end">
			<ul class="font-medium flex flex-col space-y-12 pl-1 w-full">
				<li>
					<a
						onclick={closeDrawer}
						class="flex flex-row items-center px-4 text-2xl text-gray-900 rounded hover:text-slate-500 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
						href="/"><HomeIcon size="32" class="text-black mr-4 hover:text-slate-500" />Home</a
					>
				</li>
				<li>
					<a
						onclick={closeDrawer}
						class="flex flex-row items-center px-4 text-2xl text-gray-900 rounded hover:text-slate-500 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
						href="/about"
						><BookOpenIcon size="32" class="text-black mr-4 hover:text-slate-500" />About</a
					>
				</li>
				<li>
					<a
						onclick={closeDrawer}
						class="flex flex-row items-center px-4 text-2xl text-gray-900 rounded hover:text-slate-500 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
						href="/treatments"
						><UserIcon size="32" class="text-black mr-4 hover:text-slate-500" />Treatments</a
					>
				</li>
			</ul>
		</div>
	</div>
{/snippet}
</Modal>