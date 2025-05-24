<script lang="ts">
	import { Modal } from '@skeletonlabs/skeleton-svelte';
	import newLogo from '$lib/assets/png/new_logo.png';
	import CloseIcon from '~icons/material-symbols-light/close-rounded';

	import House from 'phosphor-svelte/lib/House';
	import BookOpenText from 'phosphor-svelte/lib/BookOpenText';
	import Syringe from 'phosphor-svelte/lib/Syringe';
	import Desktop from 'phosphor-svelte/lib/Desktop';

	let { drawerState, drawerClose, onOpenChange, user, pathname } = $props();

	let links = [
		{ href: '/', text: 'Home' },
		{ href: '/about', text: 'About' },
		{ href: '/treatments', text: 'Treatments' }
	];

	if (user) {
		links.push({ href: '/admin/dashboard', text: 'Admin' });
	}
</script>

{#snippet link(href: string, text: string)}
	<li
		class="w-full p-4 hover:bg-tertiary-50/20 hover:rounded-lg {pathname === href
			? 'bg-tertiary-50/20 rounded-lg'
			: ''}"
	>
		<a class="flex flex-row space-x-4 items-center" onclick={drawerClose} {href}>
			{#if text === 'Home'}
				<House color="white" size={24} />
			{:else if text === 'About'}
				<BookOpenText color="white" size={24} />
			{:else if text === 'Treatments'}
				<Syringe color="white" size={24} />
			{:else if text === 'Admin'}
				<Desktop color="white" size={24} />
			{/if}
			<p class="text-base text-white">{text}</p>
		</a>
	</li>
{/snippet}

<Modal
	open={drawerState}
	{onOpenChange}
	contentBase="bg-surface-900 py-4 px-2 space-y-4 xs:w-4/5 w-[calc(100%-30px)] shadow-xl h-dvh dark:bg-surface-900 flex flex-col"
	backdropClasses="preset-glass-primary"
	positionerJustify="justify-start"
	positionerPadding="p-0"
	transitionsPositionerIn={{ x: -480, duration: 200 }}
	transitionsPositionerOut={{ x: -480, duration: 200 }}
>
	{#snippet content()}
		<div class="flex flex-row justify-between items-start gap-x-3 flex-1">
			<div class="flex-1">
				<img alt="The project logo" class="h-auto w-auto" src={newLogo} />
			</div>
			<div class="flex-none">
				<button
					type="button"
					data-drawer-hide="drawer-navigation"
					aria-controls="drawer-navigation"
					onclick={drawerClose}
					class="btn preset-outlined-tertiary-500 rounded-full p-2 hover:border-slate-500 hover:text-slate-500"
				>
					<CloseIcon class="text-tertiary-500 hover:bg-black-200 hover:text-slate-500" />
					<span class="sr-only">Close menu</span>
				</button>
			</div>
		</div>
		<div class="bottom-8 w-full self-end flex-0">
			<div class="flex flex-col justify-end grow py-4 overflow-y-auto self-end">
				<ul class="font-medium flex flex-col px-4 w-full items-start justify-center">
					{#each links as linkItem}
						{@render link(linkItem.href, linkItem.text)}
					{/each}
				</ul>
			</div>
		</div>
	{/snippet}
</Modal>
