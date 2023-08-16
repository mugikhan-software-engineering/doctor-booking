<script lang="ts">
	import type { PageData } from './$types';
	import { inview } from 'svelte-inview';
	import { fly, fade } from 'svelte/transition';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	import floatingTitle from '$lib/components/float_in_title.svelte';
	import profile from '$lib/assets/png/dr-about.png';

	import { specialiaties } from '$lib/constants/specialities';
	import { otherServices } from '$lib/constants/other_services';

	let isInViewMeetTitle: boolean;
	let isInViewSpecialitiesTitle: boolean;
	let isInViewOtherServicesTitle: boolean;

	export let data: PageData;
</script>

<section
	class="pb-32 relative w-screen h-screen flex flex-col md:flex-row justify-center items-center"
>
	<div
		class="absolute w-screen h-screen top-0 left-0 bg-cover bg-center bg-no-repeat bg-fixed bg-blend-color opacity-60 blur-[1px]"
		style="background-image:url(src/lib/assets/about-us-header.jpg)"
	/>
	<div
		class="sticky flex bg-transparent p-5 md:p-2 lg:flex-row flex-col items-center lg:justify-between z-0 gap-y-8"
	>
		<div class="flex flex-col flex-1 justify-center items-center lg:h-full xs:mt-5 sm: mt-5">
			<h4
				class="md:text-[60px] text-[20px] leading-none xs:text-center md:px-6 md:mx-0 lg:mt-2 uppercase w-full"
			>
				Meet Dr. Ahsan Ahmad
			</h4>
		</div>
		<div class="flex flex-2 justify-center items-center lg:h-full">
			<img class="w-full mr-2" src={profile} alt="Dr. Ahsan Ahmad" />
		</div>
	</div>
</section>

<div class="h-fit w-screen">
	<section id="about" class="mt-10 z-1 flex-col md:flex-row">
		<div
			class="flex flex-row flex-wrap w-full place-content-start items-start"
			use:inview
			on:inview_change={(event) => {
				const { inView } = event.detail;
				isInViewMeetTitle = inView;
			}}
		>
			<svelte:component
				this={floatingTitle}
				title="MEET"
				subtitle="Dr. Ahsan Ahmad"
				yOffset={-50}
				isVisible={isInViewMeetTitle}
			/>
		</div>

		<div class="flex flex-col md:flex-row w-full place-content-center items-start px-6 my-4">
			<div class="flex flex-1 md:basis-2/3 justify-center items-start md:mt-0 mt-2">
				<p class="text-lg">
					As a Urologist, Dr Ahmad is able to assist patients with conditions of the urinary tract
					system, as well as male reproductive organs. These include, but are not limited to, the
					kidneys, ureters, adrenal glands, bladder, urethra, testes and prostate.
					<br />
					<br />
					He attended the University of Witwatersrand, where he received his post-graduation specialist
					Urological degree in 2005 through The College of Medicine South Africa and since then he is
					practicing both in the Private and Public sector.
					<br />
					<br />
					Dr Ahmad also has a keen interest in Prostate Cancer and is listed as a prostate cancer professional
					by the Prostate cancer Foundation of South Africa.
					<br />
					<br />
					Aside from his professional duties, Dr. Ahsan Ahmad serves as a board member of his local community
					organization. He is also an avid Hiker and enjoys Hiking on various different mountains across
					South Africa. He is married and has two children who he considers to be his greatest achievement!
				</p>
			</div>

			<div class="flex flex-1 md:basis-1/3 justify-center items-start md:mt-0 mt-2" />
		</div>
	</section>

	<section id="specialities" class="mt-10 z-1 flex-col md:flex-row">
		<div
			class="flex flex-row flex-wrap w-full place-content-start items-start"
			use:inview
			on:inview_change={(event) => {
				const { inView } = event.detail;
				isInViewSpecialitiesTitle = inView;
			}}
		>
			<svelte:component
				this={floatingTitle}
				title=""
				subtitle="Specialising in"
				yOffset={-50}
				isVisible={isInViewSpecialitiesTitle}
			/>
		</div>

		<Accordion autocollapse>
			<!-- <div class="w-full text-token card p-4 space-y-4 m-6 flex flex-col"> -->
			{#each specialiaties as speciality, i}
				<AccordionItem>
					<svelte:fragment slot="lead"
						><span class="badge-icon p-4 variant-soft-secondary mr-5">{i + 1}</span
						></svelte:fragment
					>
					<svelte:fragment slot="summary"
						><p class="font-bold text-base md:text-2xl">
							{speciality.description}
						</p></svelte:fragment
					>
					<svelte:fragment slot="content"
						><p class="text-base md:text-lg opacity-50">
							Description about speciality
						</p></svelte:fragment
					>
				</AccordionItem>
			{/each}
			<!-- </div> -->
		</Accordion>
	</section>

	<section id="other_services" class="mt-10 z-1 flex-col md:flex-row">
		<div
			class="flex flex-row flex-wrap w-full place-content-start items-start"
			use:inview
			on:inview_change={(event) => {
				const { inView } = event.detail;
				isInViewOtherServicesTitle = inView;
			}}
		>
			<svelte:component
				this={floatingTitle}
				title=""
				subtitle="Other services we provide."
				yOffset={-50}
				isVisible={isInViewOtherServicesTitle}
			/>
		</div>

		<div class="flex flex-col md:flex-row w-full px-6 my-4">
			<div
				class="w-full text-token card variant-filled-primary p-2 md:p-4 flex flex-col md:flex-row justify-between items-start"
			>
				{#each otherServices as service, i}
					<div class="flex flex-row text-white m-4">
						<img
							src={service.icon}
							alt="service"
							class="h-[48px] w-[48px] md:h-[48px] md:w-[48px] mr-5 md:mr-8"
						/>
						<div class="flex flex-col">
							<p class="font-bold text-2xl underline">{service.title}</p>
							<p class="text-base mt-2">{service.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
</div>
