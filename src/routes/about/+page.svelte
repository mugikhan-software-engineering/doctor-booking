<script lang="ts">
	import { inview } from 'svelte-inview';
	import floatingTitle from '$lib/components/float_in_title.svelte';
	import profile from '$lib/assets/png/dr-about.png';
	import aboutUsHeader from '$lib/assets/about-us-header.jpg';
	import medicalDoctor from '$lib/assets/png/medical.png';

	
	import { otherServices } from '$lib/constants/other_services';

	import Accordion from '$lib/components/accordion.svelte';
	import FloatInTitle from '$lib/components/float_in_title.svelte';

	let isInViewMeetTitle: boolean = $state(false);
	let isInViewSpecialitiesTitle: boolean = $state(false);
	let isInViewOtherServicesTitle: boolean = $state(false);

	let value = $state(['club']);
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<section
	class="pb-32 relative w-screen h-screen flex flex-col md:flex-row justify-center items-center"
>
	<div
		class="absolute w-screen h-screen top-0 left-0 bg-cover bg-center bg-no-repeat bg-fixed bg-blend-color opacity-80 blur-[1px]"
		style="background-image:url({aboutUsHeader})"
	></div>
	<div
		class="sticky flex bg-transparent p-5 lg:flex-row flex-col items-center md:justify-center justify-between z-0 gap-y-8"
	>
		<div
			class="flex flex-col md:flex-row items-center justify-start md:justify-start md:items-center xs:mt-5 sm:mt-5 md:mt-0 basis-3/5 text-start"
		>
			<h1
				class="h1 lg:text-[50px] md:text-[40px] text-[30px] leading-none md:mx-0 w-full uppercase"
			>
				Get to know more about Dr. Ahsan Ahmad
			</h1>
		</div>
		<div class="flex">
			<img class="w-full mr-2" src={profile} alt="Dr. Ahsan Ahmad" loading="lazy" />
		</div>
	</div>
</section>

<div class="h-fit w-screen">
	<section id="about" class="mt-2 z-1 flex-col md:flex-row">
		<div
			class="flex flex-row flex-wrap w-full place-content-start items-start"
			use:inview
			oninview_change={(event) => {
				const { inView } = event.detail;
				isInViewMeetTitle = inView;
			}}
		>
			<FloatInTitle
				title="ABOUT"
				subtitle="Dr. Ahsan Ahmad"
				yOffset={-50}
				isVisible={isInViewMeetTitle}
			/>
		</div>

		<div class="flex flex-col md:flex-row w-full place-content-center items-start px-6 my-4">
			<div class="flex flex-1 md:basis-9/12 justify-center items-start md:mt-0 mt-2">
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

			<div class="md:basis-3/12 justify-center items-center hidden md:flex">
				<img
					class="rounded-md aspect-square drop-shadow-md"
					src={medicalDoctor}
					alt="Medical Doctor"
					loading="lazy"
				/>
			</div>
		</div>
	</section>

	<section id="specialities" class="mt-2 z-1 flex-col md:flex-row">
		<div
			class="flex flex-row flex-wrap w-full place-content-start items-start mb-2"
			use:inview
			oninview_change={(event) => {
				const { inView } = event.detail;
				isInViewSpecialitiesTitle = inView;
			}}
		>
			<FloatInTitle
				title="SPECIALITIES"
				subtitle="We specialise in the following"
				yOffset={-50}
				isVisible={isInViewSpecialitiesTitle}
			/>
		</div>

		<div class="flex w-full">
			<Accordion />
		</div>
	</section>

	<section id="other_services" class="mt-2 z-1 flex-col md:flex-row">
		<div
			class="flex flex-row flex-wrap w-full place-content-start items-start"
			use:inview
			oninview_change={(event) => {
				const { inView } = event.detail;
				isInViewOtherServicesTitle = inView;
			}}
		>
			<FloatInTitle
				title="WHAT ELSE?"
				subtitle="Other services we provide"
				yOffset={-50}
				isVisible={isInViewOtherServicesTitle}
			/>
		</div>

		<div class="flex flex-col md:flex-row w-full px-6 my-4">
			<div
				class="w-full base-font-color card bg-secondary-400 p-2 md:p-4 flex flex-col md:flex-row justify-between items-start"
			>
				{#each otherServices as service, i}
					<div class="flex flex-row text-white m-4">
						<img
							src={service.icon}
							alt="service"
							class="h-[48px] w-[48px] md:h-[48px] md:w-[48px] mr-5 md:mr-8"
							loading="lazy"
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
