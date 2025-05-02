<script lang="ts">
	import kidneyHome from '$lib/assets/banner2.jpg';
	import kidneysIcon from '$lib/assets/png/kidney.png';
	import bladderIcon from '$lib/assets/png/bladder.png';
	import prostateIcon from '$lib/assets/png/prostate.png';
	import testicularIcon from '$lib/assets/png/testicular.png';
	import infertilityIcon from '$lib/assets/png/infertility.png';
	import sexualHealthIcon from '$lib/assets/png/sexual-health.png';

	import { kidneys } from '$lib/constants/kidneys';
	import { bladders } from '$lib/constants/bladder';
	import { prostates } from '$lib/constants/prostate';
	import { testiculars } from '$lib/constants/testicular';
	import { infertilities } from '$lib/constants/infertility';

	import { ChevronsDownIcon } from 'svelte-feather-icons';

	const scrollIntoView = ({ currentTarget }: any) => {
		const scrollToElement = document.querySelector(currentTarget.getAttribute('href'));

		if (!scrollToElement) return;

		scrollToElement.scrollIntoView({
			behavior: 'smooth',
			block: 'center'
		});
	};
</script>

<svelte:head>
	<title>Treatments</title>
</svelte:head>

<section
	class="pb-32 relative w-screen h-screen flex flex-col md:flex-row justify-center items-center"
>
	<div
		class="absolute w-screen h-screen top-0 left-0 bg-cover bg-center bg-no-repeat bg-fixed bg-blend-color opacity-60 blur-[1px]"
		style="background-image:url({kidneyHome})"
	/>
	<div
		class="sticky flex bg-transparent p-5 md:p-2 lg:flex-row flex-col items-center lg:justify-between z-0 gap-y-8"
	>
		<div class="flex flex-col flex-1 justify-center items-center lg:h-full">
			<h1
				class="h1 md:text-[60px] text-[32px] leading-none text-center md:px-6 md:mx-0 uppercase w-full"
			>
				Common Diseases & Treatments
			</h1>

			<div class="flex flex-col mt-6 items-center">
				<a
					class="font-display max-w-sm text-lg font-bold leading-tight"
					href="#kidney"
					on:click|preventDefault={scrollIntoView}
				>
					<span
						class="text-black sm:underline xs:underline md:no-underline underline-offset-2 link link-underline link-underline-black"
					>
						Learn more
					</span>
				</a>
			</div>
		</div>
	</div>
</section>

<div class="diseases flex flex-col">
	<section id="kidney" class="flex flex-col h-fit w-screen bg-[#f4f5f7] py-8">
		<div class="flex flex-col md:flex-row mt-5">
			<div class="flex justify-center items-center basis-2/5">
				<span class="bg-[#CBE9FA] w-44 h-44 rounded-full flex justify-center items-center">
					<img src={kidneysIcon} class="w-36 h-36 rounded-full" alt="Kidneys" loading="lazy" />
				</span>
			</div>

			<div class="flex flex-col shrink-0 basis-3/5 pl-5 md:pl-0">
				<div class="flex flex-row items-center">
					<span class="badge-icon p-7 preset-tonal-primary mr-5 text-xl text-black">{1}</span>
					<h3 class="h2">Kidneys</h3>
				</div>
				<div>
					<ul class="p-6 flex flex-col list-disc gap-y-1">
						{#each kidneys as kidney}
							<li class="text-black">
								<span class="flex-auto">{kidney.title}</span>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</section>

	<section id="bladder" class="flex flex-col h-fit w-screen bg-[#FFF] py-8">
		<div class="flex flex-col md:flex-row mt-5">
			<div class="flex justify-center items-center basis-2/5">
				<span class="bg-[#CBE9FA] w-44 h-44 rounded-full flex justify-center items-center">
					<img src={bladderIcon} class="w-36 h-36 rounded-full" alt="Bladder" loading="lazy" />
				</span>
			</div>

			<div class="flex flex-col shrink-0 basis-3/5 pl-5 md:pl-0">
				<div class="flex flex-row items-center">
					<span class="badge-icon p-7 preset-tonal-primary mr-5 text-xl text-black">{2}</span>
					<h3 class="h2">Bladders</h3>
				</div>
				<div>
					<ul class="p-6 flex flex-col list-disc gap-y-1">
						{#each bladders as bladder}
							<li class="text-black">
								<span class="flex-auto">{bladder.title}</span>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</section>

	<section id="prostate" class="flex flex-col h-fit w-screen bg-[#f4f5f7] py-8">
		<div class="flex flex-col md:flex-row mt-5">
			<div class="flex justify-center items-center basis-2/5">
				<span class="bg-[#CBE9FA] w-44 h-44 rounded-full flex justify-center items-center">
					<img src={prostateIcon} class="w-36 h-36 rounded-full" alt="Prostate" loading="lazy" />
				</span>
			</div>

			<div class="flex flex-col shrink-0 basis-3/5 pl-5 md:pl-0">
				<div class="flex flex-row items-center">
					<span class="badge-icon p-7 preset-tonal-primary mr-5 text-xl text-black">{3}</span>
					<h3 class="h2">Prostate</h3>
				</div>
				<div>
					<ul class="p-6 flex flex-col list-disc gap-y-1">
						{#each prostates as prostate}
							<li class="text-black">
								<span class="flex-auto">{prostate.title}</span>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</section>

	<section id="testicular" class="flex flex-col h-fit w-screen bg-[#FFF] py-8">
		<div class="flex flex-col md:flex-row mt-5">
			<div class="flex justify-center items-center basis-2/5">
				<span class="bg-[#CBE9FA] w-44 h-44 rounded-full flex justify-center items-center">
					<img
						src={testicularIcon}
						class="w-36 h-36 rounded-full"
						alt="Testicular"
						loading="lazy"
					/>
				</span>
			</div>

			<div class="flex flex-col shrink-0 basis-3/5 pl-5 md:pl-0">
				<div class="flex flex-row items-center">
					<span class="badge-icon p-7 preset-tonal-primary mr-5 text-xl text-black">{4}</span>
					<h3 class="h2">Testicular</h3>
				</div>
				<div>
					<ul class="p-6 flex flex-col list-disc gap-y-1">
						{#each testiculars as testicular}
							<li class="text-black">
								<span class="flex-auto">{testicular.title}</span>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</section>

	<section id="infertility" class="flex flex-col h-fit w-screen bg-[#f4f5f7] py-8">
		<div class="flex flex-col md:flex-row mt-5">
			<div class="flex justify-center items-center basis-2/5">
				<span class="bg-[#CBE9FA] w-44 h-44 rounded-full flex justify-center items-center">
					<img
						src={infertilityIcon}
						class="w-36 h-36 rounded-full"
						alt="Infertility"
						loading="lazy"
					/>
				</span>
			</div>

			<div class="flex flex-col shrink-0 basis-3/5 pl-5 md:pl-0">
				<div class="flex flex-row items-center">
					<span class="badge-icon p-7 preset-tonal-primary mr-5 text-xl text-black">{5}</span>
					<h3 class="h2">Male infertility</h3>
				</div>
				<div>
					<ul class="p-6 flex flex-col list-disc gap-y-1">
						{#each infertilities as infertility}
							<li class="text-black">
								<span class="flex-auto">{infertility.title}</span>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</section>

	<section id="sexual_health" class="flex flex-col h-fit w-screen bg-[#FFF] py-8">
		<div class="flex flex-col md:flex-row mt-5">
			<div class="flex justify-center items-center basis-2/5">
				<span class="bg-[#CBE9FA] w-44 h-44 rounded-full flex justify-center items-center">
					<img
						src={sexualHealthIcon}
						class="w-36 h-36 rounded-full"
						alt="Sexual health"
						loading="lazy"
					/>
				</span>
			</div>

			<div class="flex flex-col shrink-0 basis-3/5 pl-5 md:pl-0">
				<div class="flex flex-row items-center">
					<span class="badge-icon p-7 preset-tonal-primary mr-5 text-xl text-black">{6}</span>
					<h3 class="h2">Male sexual health</h3>
				</div>
				<div>
					<div class="p-6 flex flex-col gap-y-1">
						<p class="text-black">
							The male sexual dysfunction is the most common problem among males in our society
							arising from various diseases including high blood pressure, diabetes, smoking, high
							cholesterol, prostate cancer and enlargements, testosterone deficiency, heart and
							vascular diseases (some psychological elements are also responsible for this problem).<br
							/>
							We strongly recommend you exercise moderately and maintain a healthy diet. This will not
							only improve your overall health but also improve your sexual health.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>
