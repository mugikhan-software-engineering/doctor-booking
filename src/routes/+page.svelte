<script lang="ts">
	import profile from '$lib/assets/png/dr-ahsan-ahmad.png';
	import stethoscope from '$lib/assets/doctor-stetho.jpg';
	import paralax from '$lib/assets/paralax.jpg';
	import appointmentBanner from '$lib/assets/appointment-banner.jpg';

	import {
		ChevronsDownIcon,
		PhoneCallIcon,
		MapIcon,
		ChevronLeftIcon,
		ChevronRightIcon
	} from 'svelte-feather-icons';

	import floatingTitle from '$lib/components/float_in_title.svelte';
	import reviewCard from '$lib/components/review_card.svelte';
	import PhoneNumber from '$lib/components/phone_number.svelte';
	import ReviewCardPlaceholder from '$lib/components/review_card_placeholder.svelte';
	import { enhance, applyAction } from '$app/forms';

	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';

	import { inview } from 'svelte-inview';
	import { fly } from 'svelte/transition';

	import { SyncLoader } from 'svelte-loading-spinners';

	const toastStore = getToastStore();

	let isInViewAboutTitle: boolean;
	let isInViewContactTitle: boolean = true;
	let isInViewMapTitle: boolean = false;
	let isInViewMap: boolean = false;
	let isHoneypotChecked: boolean = false;
	let isVisibleContactForm: boolean = false;
	let isInViewReviewTitle: boolean = false;

	const loadReviews = async () => {
		const response = await fetch(`/reviews`);
		return await response.json();
	};

	let reviewsPromise = loadReviews();

	let elemCarousel: HTMLDivElement;

	const scrollIntoView = ({ currentTarget }: any) => {
		const scrollToElement = document.querySelector(currentTarget.getAttribute('href'));

		if (!scrollToElement) return;

		scrollToElement.scrollIntoView({
			behavior: 'smooth',
			block: 'center'
		});
	};

	const onChangeCheck = (event: any) => {
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
		'https://www.google.com/maps/place/Dr+Ahsan+Ahmad+-+Urologist/@-26.3285516,27.8597674,17z/data=!3m1!4b1!4m6!3m5!1s0x1e95a89cea357707:0x72e6d95d420b7803!8m2!3d-26.3285564!4d27.8623423!16s%2Fg%2F11b5yzxp5m?entry=ttu';

	const showSuccessToast = (message: any) => {
		const t: ToastSettings = {
			message: message as string,
			background: 'variant-filled-success',
			timeout: 2000,
			hideDismiss: true,
			classes: 'text-white'
		};
		toastStore.trigger(t);
	};

	const showErrorToast = (message: any) => {
		const t: ToastSettings = {
			message: message as string,
			background: 'variant-filled-error',
			timeout: 2000,
			hideDismiss: true,
			classes: 'text-white'
		};
		toastStore.trigger(t);
	};

	let email: String = '';

	let loading: Boolean = false;

	$: active_class = loading ? 'loading pointer-events-none opacity-50' : '';
</script>

<svelte:head>
	<title>Dr. Ahsan Ahmad - Expert Urologist</title>
</svelte:head>

<section class="pb-32 relative w-screen h-screen flex flex-col justify-between items-center">
	<div
		class="absolute w-screen h-screen top-0 left-0 bg-cover bg-center bg-no-repeat bg-fixed bg-blend-color opacity-60 blur-[1px]"
		style="background-image:url({paralax})"
	/>
	<div
		class="sticky flex bg-transparent p-5 lg:flex-row flex-col items-center justify-between z-0 gap-y-8 w-full"
	>
		<div
			class="flex flex-col md:flex-row items-start justify-start md:justify-start md:items-start xs:mt-5 sm:mt-5 md:mt-0 basis-3/5"
		>
			<h1
				class="h1 lg:text-[50px] md:text-[40px] text-[30px] leading-none text-start md:mx-0 uppercase w-full"
			>
				Expert Urologist Specializing in Kidney, Bladder, Testicular, and Penile Disorders
			</h1>
		</div>
		<div class="flex">
			<img class="w-full md:w-[550px] md:h-[550px] mr-2" src={profile} alt="Dr. Ahsan Ahmad" />
		</div>
	</div>
	<div
		class="flex flex-row place-self-center justify-center items-center h-fit w-fit z-2 sticky mb-10 md:mb-0 variant-glass-secondary p-2 md:p-3 rounded-md xs:space-x-1 space-x-4 md:space-x-8"
	>
		<div class="flex flex-row items-center">
			<a
				class="text-sm md:text-lg text-slate-200"
				href="#about"
				on:click|preventDefault={scrollIntoView}>About</a
			>
			<ChevronsDownIcon size="24" class="text-slate-200" />
		</div>
		<div class="flex flex-row items-center">
			<a
				class="text-sm md:text-lg text-slate-200"
				href="#contact"
				on:click|preventDefault={scrollIntoView}>Contact</a
			>
			<ChevronsDownIcon size="24" class="text-slate-200" />
		</div>
		<div class="flex flex-row items-center">
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
				subtitle="Dr. Ahsan Ahmad"
				yOffset={-50}
				isVisible={isInViewAboutTitle}
			/>
		</div>

		<div
			class="flex flex-col md:flex-row w-full place-content-center items-start px-6 my-4 md:gap-y-4 gap-y-4"
		>
			<div class="flex md:basis-3/12 justify-center items-center">
				<img
					class="rounded-md aspect-square drop-shadow-md"
					src={stethoscope}
					alt="Stethoscope"
					loading="lazy"
				/>
			</div>
			<div class="flex md:basis-9/12 justify-center items-start md:pl-5">
				<p class="text-lg text-token">
					Dr. Ahmad is a dedicated Urologist, specializing in the health of the urinary system and
					male reproductive organs. If you have concerns related to your kidneys, bladder, prostate,
					or other related organs, he's here to help!
					<br />
					<br />
					Educated at the renowned University of Witwatersrand, Dr. Ahmad earned his advanced Urology
					degree in 2005 from The College of Medicine South Africa. With years of experience in both
					private and public healthcare sectors, he ensures the best care for his patients.
					<br />
					<br />
					Located conveniently in Lenasia, Johannesburg, Dr. Ahmad is ready to assist you. Reach out
					today to book an appointment!
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
					subtitle="Contact"
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
			<div class="flex flex-col md:flex-row w-full gap-y-5">
				<div
					class="static flex flex-1 grow flex-col justify-center bg-transparent mt-5 md:px-4 z-2"
				>
					<form
						novalidate
						class="group"
						method="POST"
						action="?/sendEmail"
						use:enhance={({ formElement, formData }) => {
							loading = true;
							return async ({ result, update }) => {
								loading = false;
								if (result.type === 'success') {
									formElement.reset();
									if (result.data) {
										showSuccessToast(result.data['description']);
									}
								} else if (result.type === 'failure') {
									if (result.data) {
										showErrorToast(result.data['description']);
									}
								}
								await applyAction(result);
								update();
							};
						}}
					>
						<div class="flex flex-col md:flex-row mb-3">
							<label class="label px-5 flex-1 md:mb-0">
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
						</div>

						<div class="flex flex-col md:flex-row mb-3">
							<label class="label px-5 flex-1 mb-3 md:mb-0">
								<span class="text-white">Contact number</span>
								<input
									name="contact"
									class="input peer bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                    focus:outline-none focus:ring-1 focus:ring-sky-500
                                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                                    focus:border-tertiary-500 focus:invalid:border-error-500"
									type="text"
									placeholder="Your phone number"
									required
									pattern="^(\+27|0)[0-9]&#123;9&#125;$"
								/>
								<span
									class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
								>
									Please enter a valid contact number
								</span>
							</label>
							<label class="label px-5 flex-1">
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
									bind:value={email}
								/>
								<span
									class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
								>
									Please enter a valid email address
								</span>
							</label>
						</div>

						<label class="label px-5 mb-3">
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
						<label class="label px-5 my-3">
							<span class="text-white">Message</span>
							<textarea
								class="textarea peer bg-white border border-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                focus:outline-none focus:ring-1 focus:ring-sky-500
                                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                                focus:border-tertiary-500 focus:invalid:border-error-500"
								rows="5"
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
							<input class="checkbox" type="checkbox" name="confirm" on:change={onChangeCheck} />
							<p>Click here to confirm</p>
						</label>

						<div class="w-full flex flex-row items-center justify-center md:mb-2">
							<button
								type="submit"
								class="btn variant-filled-surface bg-surface-200 text-black text-lg group-invalid:pointer-events-none group-invalid:opacity-50 {active_class}"
							>
								{#if loading}
									<p>Sending</p>
									<SyncLoader size="30" color="#000" unit="px" duration="2s" />
								{:else}
									Send
									<div class="ml-3">
										<svg
											width="20px"
											viewBox="0 0 33 33"
											version="1.1"
											xmlns="http://www.w3.org/2000/svg"
											xmlns:xlink="http://www.w3.org/1999/xlink"
										>
											<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
												<g
													id="Icon-Set"
													transform="translate(-568.000000, -254.000000)"
													fill="#000000"
												>
													<path
														d="M584,283 C584,283 580.872,276.976 580,275 L596.075,259.779 L584,283 L584,283 Z M572,270 L595,259 L579,274 C578.996,273.996 572,270 572,270 L572,270 Z M599,255 C597.844,255.563 568,270 568,270 C568,270 578.052,276.059 578,276 C577.983,275.981 584,287 584,287 C584,287 599.75,256.5 600,256 C600.219,255.375 599.75,254.688 599,255 L599,255 Z"
														id="send-email"
													/>
												</g>
											</g>
										</svg>
									</div>
								{/if}
							</button>
						</div>
					</form>
				</div>

				{#if isVisibleContactForm}
					<div
						class="card py-2 pr-2 pl-4 mx-4 md:mr-4 my-2 gap-y-5 flex flex-col grow-0 flex-none basis-1/4 shrink variant-glass-surface"
						transition:fly={{ duration: 600, x: 500, opacity: 0 }}
					>
						<p class="text-base md:text-lg text-white">
							Prefer to book by phone? Call us directly, and our assistant will arrange your
							appointment.
						</p>

						<div class="flex flex-row items-start justify-start">
							<div class="flex"><MapIcon size="24" class="text-white mr-2" /></div>
							<a
								class="text-sm md:text-base text-primary-400 md:text-white sm:underline xs:underline md:no-underline md:hover:underline underline-offset-2"
								href={mapsLink}
								target="_blank"
							>
								Room D4, D-block, 2nd floor, Ahmed Kathrada Private Hospital, 71 Marlin Avenue,
								Lenasia, Johannesburg, Gauteng, South Africa
							</a>
						</div>

						<div class="flex flex-row flex-wrap items-center justify-start gap-y-4 gap-x-8">
							<div class="flex">
								<PhoneCallIcon size="24" class="text-white mr-2" />
								<PhoneNumber number="(+27) 11 852 4348" url="tel:0118524348" />
							</div>
							<div class="flex">
								<PhoneCallIcon size="24" class="text-white mr-2" />
								<PhoneNumber number="(+27) 87 087 9294" url="tel:0870879294" />
							</div>
						</div>

						<div class="flex flex-row flex-wrap items-center justify-start gap-y-4 gap-x-8">
							<div class="flex">
								<PhoneCallIcon size="24" class="text-white mr-2" />
								<PhoneNumber number="(+27) 11 854 6029" url="tel:0118546029" />
							</div>
							<div class="flex flex-row items-center justify-start">
								<svg
									width="24px"
									height="24px"
									viewBox="0 0 48 48"
									xmlns="http://www.w3.org/2000/svg"
									class=" mr-2"
								>
									<g id="Layer_2" data-name="Layer 2">
										<g id="invisible_box" data-name="invisible box">
											<rect width="48" height="48" fill="none" />
										</g>
										<g id="Icons">
											<g>
												<path
													d="M38.9,8.1A20.9,20.9,0,0,0,3.2,22.8,19.8,19.8,0,0,0,6,33.2L3,44l11.1-2.9a20.3,20.3,0,0,0,10,2.5A20.8,20.8,0,0,0,38.9,8.1Zm-14.8,32a17.1,17.1,0,0,1-9.5-2.8L8,39.1l1.8-6.4a17.9,17.9,0,0,1-3.1-9.9A17.4,17.4,0,1,1,24.1,40.1Z"
													fill="#fff"
												/>
												<path
													d="M33.6,27.2A29.2,29.2,0,0,0,30,25.5c-.4-.2-.8-.3-1.1.2s-1.4,1.7-1.7,2.1a.8.8,0,0,1-1.1.1,15.2,15.2,0,0,1-4.2-2.6A15,15,0,0,1,19,21.7a.7.7,0,0,1,.2-1l.8-1a3.5,3.5,0,0,0,.5-.8.9.9,0,0,0,0-.9c-.2-.3-1.2-2.8-1.6-3.9s-.9-.9-1.2-.9h-1a1.7,1.7,0,0,0-1.4.7,5.5,5.5,0,0,0-1.8,4.3,10.4,10.4,0,0,0,2.1,5.4c.3.3,3.7,5.6,8.9,7.8a16.4,16.4,0,0,0,3,1.1,6.4,6.4,0,0,0,3.3.2c1-.1,3.1-1.2,3.5-2.4s.5-2.3.3-2.5A2.1,2.1,0,0,0,33.6,27.2Z"
													fill="#fff"
												/>
											</g>
										</g>
									</g>
								</svg>
								<a
									aria-label="Chat on WhatsApp"
									href="https://wa.me/+27737881600"
									class="text-sm md:text-base text-primary-400 md:text-white sm:underline xs:underline md:no-underline link link-underline-thin link-underline-white py-[2px]"
									target="_blank"
								>
									(+27) 73 788 1600
								</a>
							</div>
						</div>

						<div>
							<p class="text-sm md:text-base font-bold text-white px-2">Our working hours:</p>
							<ul class="list-none">
								<li class="text-sm md:text-base text-white px-2">
									Monday - Friday:<span class="ml-2">9:00 AM - 4:00 PM</span>
								</li>
								<li class="text-sm md:text-base text-white px-2">
									Saturday:<span class="ml-2">8:30 AM - 1:00 PM</span>
								</li>
								<li class="text-sm md:text-base text-white px-2">
									Sunday:<span class="ml-2">Closed</span>
								</li>
							</ul>
						</div>
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
				subtitle="Location"
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
			allow="fullscreen"
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
		/>
	</section>

	<div
		class="mt-5"
		use:inview
		on:inview_change={(event) => {
			const { inView } = event.detail;
			isInViewReviewTitle = inView;
		}}
	>
		<svelte:component
			this={floatingTitle}
			title="WHAT OUR PATIENTS ARE SAYING"
			subtitle="Reviews"
			yOffset={-50}
			isVisible={isInViewReviewTitle}
		/>
	</div>
	<div class="md:p-4 grid grid-cols-[auto_1fr_auto] md:gap-4 items-center md:my-4 mt-5 mb-20">
		<!-- Button: Left -->
		<button
			type="button"
			class="btn-icon variant-ghost"
			on:click={carouselLeft}
			aria-label="chevron-left"
		>
			<ChevronLeftIcon size="32" class="text-slate-600" />
		</button>
		<!-- Full Images -->
		<div
			bind:this={elemCarousel}
			class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex md:gap-10 overflow-x-auto md:px-5 md:py-10 overflow-y-auto"
		>
			{#await reviewsPromise}
				<ReviewCardPlaceholder />
				<ReviewCardPlaceholder />
			{:then reviewData}
				{#each reviewData.reviews as review}
					<svelte:component this={reviewCard} {review} />
				{/each}
			{/await}
		</div>
		<!-- Button: Right -->
		<button
			type="button"
			class="btn-icon variant-ghost"
			on:click={carouselRight}
			aria-label="chevron-right"
		>
			<ChevronRightIcon size="32" class="text-slate-600" />
		</button>
	</div>

	<div id="reviews" class="invisible mt:10 md:mt-20">Scroll to</div>
</div>
