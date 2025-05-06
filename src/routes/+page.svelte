<script lang="ts">
	import profile from '$lib/assets/png/dr-ahsan-ahmad.png';
	import stethoscope from '$lib/assets/doctor-stetho.jpg';
	import paralax from '$lib/assets/paralax.jpg';
	import appointmentBanner from '$lib/assets/appointment-banner.jpg';

	import ChevronLeftIcon from '~icons/mdi/chevron-left';
	import ChevronRightIcon from '~icons/mdi/chevron-right';

	import FloatingTitle from '$lib/components/float_in_title.svelte';
	import ReviewCardPlaceholder from '$lib/components/review_card_placeholder.svelte';

	import { inview } from 'svelte-inview';

	import QuickNav from '$lib/components/quick_nav.svelte';
	import ContactForm from '$lib/components/contact_form.svelte';
	import ReviewCard from '$lib/components/review_card.svelte';
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';
	import BookingModal from '$lib/components/modals/booking_modal.svelte';

	let isInViewAboutTitle: boolean = $state(false);
	let isInViewContactTitle: boolean = $state(false);
	let isInViewMapTitle: boolean = $state(false);
	let isInViewMap: boolean = $state(false);
	let isVisibleContactForm: boolean = $state(false);
	let isInViewReviewTitle: boolean = $state(false);

	let { data }: PageProps = $props();

	let email: String = '';

	let loading: Boolean = false;

	let elemCarousel: HTMLDivElement | null = null;
	let elemCarouselLeft: HTMLButtonElement | null = null;
	let elemCarouselRight: HTMLButtonElement | null = null;

	onMount(() => {
		elemCarousel = document.querySelector('[data-carousel]');
		elemCarouselLeft = document.querySelector('[data-carousel-left]');
		elemCarouselRight = document.querySelector('[data-carousel-right]');

		elemCarouselLeft?.addEventListener('click', () => carouselLeft());
		elemCarouselRight?.addEventListener('click', () => carouselRight());

		function carouselLeft() {
			if (!elemCarousel) return;
			const x =
				elemCarousel.scrollLeft === 0
					? elemCarousel.clientWidth * elemCarousel.childElementCount // loop
					: elemCarousel.scrollLeft - elemCarousel.clientWidth; // step left
			elemCarousel.scroll(x, 0);
		}

		/** On navigation right, scroll the container */
		function carouselRight() {
			if (!elemCarousel) return;
			const x =
				elemCarousel.scrollLeft === elemCarousel.scrollWidth - elemCarousel.clientWidth
					? 0 // loop
					: elemCarousel.scrollLeft + elemCarousel.clientWidth; // step right
			elemCarousel.scroll(x, 0);
		}
	});

	let bookingModalState = $state(false);

	function bookingModalClose() {
		bookingModalState = false;
	}

	function bookingModalOpen() {
		bookingModalState = true;
	}

	function onOpenChange(e: any) {
		bookingModalState = e.open;
	}
</script>

<svelte:head>
	<title>Dr. Ahsan Ahmad - Expert Urologist</title>
</svelte:head>

<section class="pb-32 relative w-screen h-dvh flex flex-col justify-between items-center">
	<div
		class="absolute w-screen h-dvh top-0 left-0 bg-cover bg-center bg-no-repeat bg-fixed bg-blend-color opacity-60 blur-[1px]"
		style="background-image:url({paralax})"
	></div>
	<div class="sticky flex bg-transparent p-5 lg:flex-row flex-col items-center z-0 gap-y-8 w-full">
		<div
			class="flex flex-col md:flex-row items-start justify-start md:justify-start md:items-start xs:mt-5 sm:mt-5 md:mt-0 basis-3/5"
		>
			<h1
				class="h1 lg:text-[50px] md:text-[40px] text-[30px] leading-none text-start md:mx-0 uppercase w-full"
			>
				Expert Urologist Specializing in Kidney, Bladder, Testicular, and Penile Disorders
			</h1>
		</div>
		<div class="flex items-center justify-center basis-2/5">
			<img class="w-full md:w-[550px] md:h-[550px] mr-2" src={profile} alt="Dr. Ahsan Ahmad" />
		</div>
	</div>
	<QuickNav />
</section>

<div class="h-fit w-screen">
	<section id="about" class="mt-10 z-1 flex-col md:flex-row">
		<div
			class="flex flex-row flex-wrap w-full place-content-start items-start"
			use:inview
			oninview_change={(event) => {
				const { inView } = event.detail;
				isInViewAboutTitle = inView;
			}}
		>
			<FloatingTitle
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
				<p class="text-lg base-font-color">
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
				oninview_change={(event) => {
					const { inView } = event.detail;
					isInViewContactTitle = inView;
				}}
			>
				<FloatingTitle
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
			oninview_change={(event) => {
				const { inView } = event.detail;
				isVisibleContactForm = inView;
			}}
		>
			<div class="flex flex-row justify-center mt-2">
				<button class="btn preset-filled text-white text-lg" onclick={bookingModalOpen}
					>Book Appointment</button
				>
			</div>
			<BookingModal {bookingModalState} {bookingModalClose} {onOpenChange} />
			<div class="flex flex-row justify-center">
				<p class="text-lg text-white">OR</p>
			</div>
			<ContactForm {loading} {isVisibleContactForm} />
		</div>
	</section>

	<section id="google_map" class="flex flex-col h-fit w-screen mt-5">
		<div
			class="flex flex-row flex-wrap w-full place-content-start items-start z-2 mb-3"
			use:inview
			oninview_change={(event) => {
				const { inView } = event.detail;
				isInViewMapTitle = inView;
				isInViewMap = inView;
			}}
		>
			<FloatingTitle
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
		></iframe>
	</section>

	<div
		class="mt-5"
		use:inview
		oninview_change={(event) => {
			const { inView } = event.detail;
			isInViewReviewTitle = inView;
		}}
	>
		<FloatingTitle
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
			class="btn hover:preset-tonal-primary"
			aria-label="chevron-left"
			data-carousel-left
		>
			<ChevronLeftIcon style="font-size: 1.5em;" class="text-gray-600" />
		</button>
		<!-- Full Images -->
		<div
			data-carousel
			class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex md:gap-10 overflow-x-auto md:px-5 md:py-10 overflow-y-auto"
		>
			{#await data.reviews}
				<ReviewCardPlaceholder />
				<ReviewCardPlaceholder />
			{:then reviewData}
				{#each reviewData as review}
					<ReviewCard {review} />
				{/each}
			{/await}
		</div>
		<!-- Button: Right -->
		<button
			type="button"
			class="btn hover:preset-tonal-primary"
			aria-label="chevron-right"
			data-carousel-right
		>
			<ChevronRightIcon style="font-size: 1.5em;" class="text-gray-600" />
		</button>
	</div>

	<div id="reviews" class="invisible mt:10 md:mt-20">Scroll to</div>
</div>
