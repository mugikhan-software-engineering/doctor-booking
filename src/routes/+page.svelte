<script lang="ts">
	import profile from '$lib/assets/png/dr-ahsan-ahmad.png';
	import stethoscope from '$lib/assets/banner1-a.jpg';
	import mapPin from '$lib/assets/svg/map-pin.svg';
	import call from '$lib/assets/svg/call.svg';
	import paralax from '$lib/assets/paralax.jpg';
	import appointmentBanner from '$lib/assets/appointment-banner.jpg';

	import { ChevronsDownIcon } from 'svelte-feather-icons';

	import floatingTitle from '$lib/components/float_in_title.svelte';
	import reviewCard from '$lib/components/review_card.svelte';
	import { enhance } from '$app/forms';

	import { filter, Noir, NoirLight } from '@skeletonlabs/skeleton';

	import { inview } from 'svelte-inview';
	import { fly } from 'svelte/transition';
	import type { PageServerData } from './$types';

	let isInViewAboutTitle: boolean;
	let isInViewContactTitle: boolean = true;
	let isInViewMapTitle: boolean = false;
	let isInViewMap: boolean = false;
	let isHoneypotChecked: boolean = false;
	let isVisibleContactForm: boolean = false;

	let elemCarousel: HTMLDivElement;

	const scrollIntoView = ({ currentTarget }: any) => {
		const scrollToElement = document.querySelector(currentTarget.getAttribute('href'));

		if (!scrollToElement) return;

		scrollToElement.scrollIntoView({
			behavior: 'smooth',
			block: 'nearest'
		});
	};

	const onChangehoneypotCheck = (event: any) => {
		isHoneypotChecked = event.target.checked;
	};

	const carouselLeft = (): void => {
		const x =
			elemCarousel.scrollLeft === 0
				? elemCarousel.clientWidth * elemCarousel.childElementCount // loop
				: elemCarousel.scrollLeft - elemCarousel.clientWidth; // step left
		elemCarousel.scroll(x, 0);
	};

	const carouselRight = (): void => {
		const x =
			elemCarousel.scrollLeft === elemCarousel.scrollWidth - elemCarousel.clientWidth
				? 0 // loop
				: elemCarousel.scrollLeft + elemCarousel.clientWidth; // step right
		elemCarousel.scroll(x, 0);
	};

	const mapsLink =
		'https://www.google.com/maps/place/Lenmed+Ahmed+Kathrada+Private+Hospital/@-26.3277018,27.8615079,17z/data=!3m1!4b1!4m6!3m5!1s0x1e95a89c8b3e01b7:0x3c568d1f019aa946!8m2!3d-26.3277018!4d27.8640828!16s%2Fg%2F1tdv9pdd?entry=ttu';

	export let form: any;
	export let data: PageServerData;
</script>

<Noir />
<NoirLight />

<section class="pb-32 relative w-screen h-screen flex flex-col justify-between items-center">
	<div
		class="absolute w-screen h-screen top-0 left-0 bg-cover bg-center bg-no-repeat bg-fixed bg-blend-color opacity-60 blur-[1px]"
		style="background-image:url({paralax})"
	/>
	<div
		class="sticky flex bg-transparent p-5 md:p-2 lg:flex-row flex-col items-center justify-between z-0 gap-y-8 w-full"
	>
		<div
			class="flex flex-col md:flex-row items-start justify-start md:justify-start md:items-start xs:mt-5 sm:mt-5 md:mt-0 basis-3/5"
		>
			<h4
				class="lg:text-[50px] md:text-[40px] text-[30px] leading-none text-start md:mx-0 uppercase w-full"
			>
				A Specialist Urologist, with a focus on all kinds of prostate, kidney, bladder and
				testicular cancers.
			</h4>
		</div>
		<div class="flex">
			<img class="w-full md:w-[550px] md:h-[550px] mr-2" src={profile} alt="Dr. Ahsan Ahmad" />
		</div>
	</div>
	<div
		class="flex flex-row place-self-center justify-center items-center h-fit w-fit z-2 sticky mb-10 md:mb-0 variant-glass-secondary p-3 rounded-md"
	>
		<div class="flex flex-row items-center mr-4 md:mr-8">
			<a
				class="text-sm md:text-lg text-slate-200"
				href="#about"
				on:click|preventDefault={scrollIntoView}>About</a
			>
			<ChevronsDownIcon size="24" class="text-slate-200" />
		</div>
		<div class="flex flex-row items-center mr-4 md:mr-8">
			<a
				class="text-sm md:text-lg text-slate-200"
				href="#contact"
				on:click|preventDefault={scrollIntoView}>Contact</a
			>
			<ChevronsDownIcon size="24" class="text-slate-200" />
		</div>
		<div class="flex flex-row items-center mr-4 md:mr-8">
			<a
				class="text-sm md:text-lg text-slate-200"
				href="#google_map"
				on:click|preventDefault={scrollIntoView}>Location</a
			>
			<ChevronsDownIcon size="24" class="text-slate-200" />
		</div>
		<div class="flex flex-row items-center">
			<a
				class="text-sm md:text-lg text-slate-200"
				href="#reviews"
				on:click|preventDefault={scrollIntoView}>Reviews</a
			>
			<ChevronsDownIcon size="24" class="text-slate-200" />
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
				isInViewAboutTitle = inView;
			}}
		>
			<svelte:component
				this={floatingTitle}
				title="ABOUT"
				subtitle="Dr. Ahsan Ahmad."
				yOffset={-50}
				isVisible={isInViewAboutTitle}
			/>
		</div>

		<div class="flex flex-col md:flex-row w-full place-content-center items-start px-6 my-4">
			<div class="flex flex-1 md:basis-1/3 justify-center items-center">
				<img class="w-full rounded-md h-[350px]" src={stethoscope} alt="Stethoscope" />
			</div>
			<div class="flex flex-1 md:basis-2/3 justify-center items-start md:px-5 md:mt-0 mt-2">
				<p class="text-lg text-token">
					As a Urologist, Dr. Ahmad is able to assist patients with other conditions of the urinary
					tract system, as well as male reproductive organs. These include, but are not limited to,
					the kidneys, ureters, adrenal glands, bladder, urethra, testes and prostate.
					<br />
					<br />
					He attended the University of Witwatersrand, where he received his post-graduation specialist
					Urological degree in 2005 through The College of Medicine South Africa and since then he is
					practicing both in the Private and Public sector.
					<br />
					<br />
					Dr. Ahsan is based in Lenasia, Johannesburg, South Africa.
				</p>
			</div>
		</div>
	</section>

	<section id="contact" class="flex flex-col h-fit w-screen mt-5">
		<div
			class="sticky flex bg-transparent px-0 md:p-2 mb-2 lg:flex-row flex-col items-center z-0 gap-y-8"
		>
			<div
				class="flex flex-row flex-wrap w-full place-content-start items-start z-2"
				use:inview
				on:inview_change={(event) => {
					const { inView } = event.detail;
					isInViewContactTitle = inView;
				}}
			>
				<svelte:component
					this={floatingTitle}
					title="GET IN TOUCH"
					subtitle="Contact."
					yOffset={-50}
					isVisible={isInViewContactTitle}
				/>
			</div>
		</div>

		<div
			class="sticky w-screen h-fit bg-cover bg-center bg-no-repeat bg-fixed bg-blend-color z-0"
			style="background-image:url({appointmentBanner})"
			use:inview
			on:inview_change={(event) => {
				const { inView } = event.detail;
				isVisibleContactForm = inView;
			}}
		>
			<div class="flex flex-col md:flex-row w-full">
				<div class="static flex flex-1 grow flex-col bg-transparent my-2 md:px-4 z-2">
					<form novalidate class="group" method="POST" action="?/sendEmail" use:enhance>
						<div class="flex flex-col md:flex-row">
							<label class="label m-5 flex-1">
								<span class="text-white">Name</span>
								<input
									name="name"
									class="input peer bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                    focus:outline-none focus:ring-1 focus:ring-sky-500
                                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                                    focus:border-tertiary-500 focus:invalid:border-error-500"
									type="text"
									placeholder="Your name"
									required
								/>
								<span
									class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
								>
									Please enter your name
								</span>
							</label>
							<label class="label m-5 flex-1">
								<span class="text-white">Email</span>
								<input
									name="email"
									class="input peer bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                    focus:outline-none focus:ring-1 focus:ring-sky-500
                                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                                    focus:border-tertiary-500 focus:invalid:border-error-500"
									type="email"
									placeholder="Your email"
									required
								/>
								<span
									class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
								>
									Please enter a valid email address
								</span>
							</label>
						</div>

						<label class="label m-5">
							<span class="text-white">Select your issue</span>
							<select
								name="issue"
								class="select bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                focus:outline-none focus:ring-1 focus:ring-sky-500
                                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                                focus:border-tertiary-500 focus:invalid:border-error-500"
								required
							>
								<option value="Bladder Diseases">Bladder Diseases</option>
								<option value="Prostate Diseases">Prostate Diseases</option>
								<option value="Kidney Diseases">Kidney Diseases</option>
								<option value="Testicular Diseases">Testicular Diseases</option>
								<option value="Male Infertility">Male Infertility</option>
								<option value="Erectile Dysfunction">Erectile Dysfunction</option>
								<option value="STDs">STDs</option>
								<option value="Circumcisions">Circumcisions</option>
								<option value="Other">Other</option>
							</select>
						</label>
						<label class="label m-5">
							<span class="text-white">Message</span>
							<textarea
								class="textarea peer bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                focus:outline-none focus:ring-1 focus:ring-sky-500
                                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                                focus:border-tertiary-500 focus:invalid:border-error-500"
								rows="4"
								required
								placeholder="Briefly describe your current condition..."
								name="message"
							/>
							<span
								class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
							>
								Please enter a message
							</span>
						</label>

						<label class="flex items-center justify-center space-x-2 opacity-0">
							<input class="checkbox" type="checkbox" on:change={onChangehoneypotCheck} />
							<p>Click here to confirm</p>
						</label>

						<div class="w-full flex flex-row items-center justify-center mb-5">
							<button
								type="submit"
								class="btn py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-300 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
								><p class="text-md text-black">Send</p>
								<div class="ml-3">
									<svg
										width="20px"
										viewBox="0 0 33 33"
										version="1.1"
										xmlns="http://www.w3.org/2000/svg"
										xmlns:xlink="http://www.w3.org/1999/xlink"
									>
										<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
											<g id="Icon-Set" transform="translate(-568.000000, -254.000000)" fill="#000">
												<path
													d="M584,283 C584,283 580.872,276.976 580,275 L596.075,259.779 L584,283 L584,283 Z M572,270 L595,259 L579,274 C578.996,273.996 572,270 572,270 L572,270 Z M599,255 C597.844,255.563 568,270 568,270 C568,270 578.052,276.059 578,276 C577.983,275.981 584,287 584,287 C584,287 599.75,256.5 600,256 C600.219,255.375 599.75,254.688 599,255 L599,255 Z"
													id="send-email"
												/>
											</g>
										</g>
									</svg>
								</div>
							</button>
						</div>

						{#if form?.error}
							<aside class="alert variant-filled-error">
								<div class="alert-message">
									<h3 class="h3">Error!</h3>
									<p>{form.description}</p>
								</div>
							</aside>
						{/if}
					</form>
				</div>

				{#if isVisibleContactForm}
					<div
						class="card p-2 mx-4 md:mr-4 my-2 flex flex-col grow-0 flex-none basis-1/4 shrink variant-glass-primary"
						transition:fly={{ duration: 600, x: 500, opacity: 0 }}
					>
						<p class="text-sm md:text-base text-white mb-4">
							If you'd rather make an appointment over the phone, you can do so by calling our
							direct numbers. Our office assistant will help you confirm an appointment.
						</p>

						<div class="flex flex-row items-start justify-start mb-3">
							<img src={mapPin} width="30px" height="30px" alt="map-pin" />
							<a class="text-sm md:text-base text-white px-2" href={mapsLink} target="_blank">
								Room D4, D-block, 2nd floor, Ahmed Kathrada Private Hospital, K43 Highway/Marlin
								Avenue, Extention 8, Lenasia 1820, Johannesburg, Gauteng, South Africa
							</a>
						</div>

						<div class="flex flex-row items-center justify-start mb-3">
							<img src={call} width="30px" height="30px" alt="call" />
							<a class="text-sm md:text-base text-white px-2" href="tel:0118524348">
								(+27) 11 852 4348
							</a>
						</div>

						<div class="flex flex-row items-center justify-start mb-3">
							<img src={call} width="30px" height="30px" alt="call-alt" />
							<a class="text-sm md:text-base text-white px-2" href="tel:0118546029">
								(+27) 11 854 6029
							</a>
						</div>

						<div class="flex flex-row items-center justify-start mb-3">
							<img src={call} width="30px" height="30px" alt="call-whatsapp" />
							<a
								aria-label="Chat on WhatsApp"
								href="https://wa.me/+27870879294"
								class="text-sm md:text-base text-white px-2"
								target="_blank"
							>
								(+27) 87 087 9294
							</a>
						</div>
						<p class="text-sm md:text-base text-white px-2">
							You can call during these working hours:
						</p>

						<ul class="list-none">
							<li class="text-sm md:text-base text-white px-2">
								Monday - Friday:<span class="ml-2">08:00-16:00</span>
							</li>
							<li class="text-sm md:text-base text-white px-2">
								Saturday:<span class="ml-2">08:00-13:00</span>
							</li>
							<li class="text-sm md:text-base text-white px-2">
								Sunday:<span class="ml-2">Closed</span>
							</li>
						</ul>
					</div>
				{/if}
			</div>
		</div>
	</section>

	<section id="google_map" class="flex flex-col h-fit w-screen mt-5">
		<div
			class="flex flex-row flex-wrap w-full place-content-start items-start z-2 mb-3"
			use:inview
			on:inview_change={(event) => {
				const { inView } = event.detail;
				isInViewMapTitle = inView;
				isInViewMap = inView;
			}}
		>
			<svelte:component
				this={floatingTitle}
				title="WHERE CAN YOU FIND US"
				subtitle="Location."
				yOffset={-50}
				isVisible={isInViewMapTitle}
			/>
		</div>
		<iframe
			title="GoogleMap"
			src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14303.745902669874!2d27.8623423!3d-26.3285564!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95a89cea357707%3A0x72e6d95d420b7803!2sDr%20Ahsan%20Ahmad%20-%20Urologist!5e0!3m2!1sen!2sza!4v1691963701615!5m2!1sen!2sza"
			width="100%"
			height="600"
			style="border:0;"
			allowfullscreen={true}
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
		/>
	</section>

	<div class="md:p-4 grid grid-cols-[auto_1fr_auto] md:gap-4 items-center md:my-4 mt-5 mb-20">
		<!-- Button: Left -->
		<button type="button" class="btn-icon variant-ghost" on:click={carouselLeft}>
			<svg width="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M15 6L9 12L15 18"
					stroke="#000000"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
		<!-- Full Images -->
		<div
			bind:this={elemCarousel}
			class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex md:gap-10 overflow-x-auto md:px-5 md:py-10"
		>
			{#each data.reviews as review}
				<svelte:component this={reviewCard} {review} />
			{/each}
		</div>
		<!-- Button: Right -->
		<button type="button" class="btn-icon variant-ghost" on:click={carouselRight}>
			<svg width="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M9 6L15 12L9 18"
					stroke="#000000"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
	</div>

	<div id="reviews" class="invisible mt:10 md:mt-20">Scroll to</div>
</div>
