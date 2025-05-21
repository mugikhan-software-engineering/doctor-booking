<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { showErrorToast, showSuccessToast } from '$lib/components/toasts/toaster-svelte';
	import { SyncLoader } from 'svelte-loading-spinners';

	let { data } = $props();

	let loading = $state(false);
	let active_class = $derived(loading ? 'opacity-50 pointer-events-none' : '');
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-md w-full space-y-8">
		<div>
			<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin Login</h2>
		</div>
		<form
			class="mt-8 space-y-6"
			method="POST"
			use:enhance={() => {
				loading = true;
				return async ({ result }) => {
					loading = false;
					if (result.type === 'failure') {
						showErrorToast('Invalid credentials');
					}
					if (result.type === 'success') {
						showSuccessToast('Login successful');
						if (data.isDev) {
							goto('/');
						} else {
							goto('/admin/dashboard');
						}
					}
				};
			}}
		>
			<div class="rounded-md shadow-sm -space-y-px">
				<div>
					<label for="email" class="sr-only">Email address</label>
					<input
						id="email"
						name="email"
						type="email"
						required
						class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="Email address"
					/>
				</div>
				<div>
					<label for="password" class="sr-only">Password</label>
					<input
						id="password"
						name="password"
						type="password"
						required
						class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="Password"
					/>
				</div>
			</div>

			<div>
				<button
					type="submit"
					class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 {active_class}"
				>
					{#if loading}
						<SyncLoader size="8" color="#ffffff" />
					{:else}
						Sign in
					{/if}
				</button>
			</div>
		</form>
	</div>
</div>
