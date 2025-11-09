<script lang="ts">
	const currentYear = new Date().getFullYear().toString();
</script>

<footer
	class="flex flex-col md:flex-row justify-center items-center px-2 py-4 sm:py-3 md:py-4 bg-white min-h-[60px] sm:min-h-[56px] md:min-h-[64px]"
>
	<p class="text-sm sm:text-base text-center">
		Copyright © {currentYear} Dr. Ahsan Ahmad. Website by
		<a
			href="https://mugikhan.com/"
			target="_blank"
			rel="noopener noreferrer"
			class="hover:underline underline-offset-2 text-secondary-600 hover:text-secondary-700 transition-colors"
		>
			Mugi Khan
		</a>
	</p>
</footer>
