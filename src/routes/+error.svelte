<script lang="ts">
	import { goto } from '$app/navigation';

	const routeToPage = () => {
		goto(`/`);
	};
</script>

<div class="w-full h-full flex flex-col justify-center items-center gap-y-6">
	<h1 class="h1 text-9xl text-primary-500">404</h1>
	<h4 class="h4 text-primary-500">Page Not Found</h4>
	<h5 class="h5">Sorry, we can't find the page you're looking for.</h5>
	<button type="button" class="btn bg-secondary-100-800-token" on:click={routeToPage}
		>Back to home</button
	>
</div>
