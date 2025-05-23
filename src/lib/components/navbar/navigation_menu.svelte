<script lang="ts">
	import { goto } from '$app/navigation';
	import { Menubar } from 'bits-ui';
	import CaretDown from 'phosphor-svelte/lib/CaretDown';

	function goToDashboard() {
		goto('/admin/dashboard');
	}
</script>

<Menubar.Root class="flex items-center">
	<Menubar.Menu>
		<Menubar.Trigger
			class="data-highlighted:bg-muted data-[state=open]:bg-red flex h-10 cursor-pointer items-center justify-center focus-visible:outline-none dark:text-black"
		>
			More
			<CaretDown
				class="ml-1 size-3 transition-transform duration-200 data-[state=open]:rotate-180"
				aria-hidden="true"
			/>
		</Menubar.Trigger>
		<Menubar.Portal>
			<Menubar.Content
				class="card bg-primary-500 focus-override shadow-lg z-50 w-full rounded-md border border-surface-200-800 px-1 py-1.5 mr-1"
				align="start"
				sideOffset={3}
			>
				<Menubar.Item
					class="data-highlighted:bg-muted flex h-10 select-none items-center py-3 pl-3 pr-1.5 text-sm focus-visible:outline-none cursor-pointer"
					onSelect={goToDashboard}
				>
					Dashboard
				</Menubar.Item>
				<Menubar.Separator class="my-1 bg-surface-900 h-[1px]" data-orientation="horizontal" />

				<Menubar.Item
					closeOnSelect={false}
					class="data-highlighted:bg-muted flex h-10 select-none items-center py-3 pl-3 pr-1.5 text-sm focus-visible:outline-none cursor-pointer"
				>
					{#snippet child({ props })}
						<form action="/logout" method="POST">
							<button {...props} type="submit">Logout</button>
						</form>
					{/snippet}
				</Menubar.Item>
			</Menubar.Content>
		</Menubar.Portal>
	</Menubar.Menu>
</Menubar.Root>
