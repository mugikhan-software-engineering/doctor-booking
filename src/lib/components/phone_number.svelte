<script lang="ts">
	export let number: string;
	export let url: string;
</script>

<a
	class="text-sm md:text-base text-primary-400 md:text-white sm:underline xs:underline underline-offset-2 md:no-underline link link-underline-thin link-underline-white"
	href={url}
>
	{number}
</a>
