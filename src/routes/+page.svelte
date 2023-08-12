<script lang="ts">
	import profile from '$lib/assets/png/dr-ahsan-ahmad.png';
	import stethoscope from '$lib/assets/stethoscope.jpg';
	import mapPin from '$lib/assets/svg/map-pin.svg';
	import call from '$lib/assets/svg/call.svg';
	import whatsappIcon from '$lib/assets/svg/whatsapp-icon.svg';

	import floatingTitle from '$lib/components/float_in_title.svelte';
	import { enhance } from '$app/forms';

	import { filter, Noir, NoirLight } from '@skeletonlabs/skeleton';

	import { inview } from 'svelte-inview';
	import { fly } from 'svelte/transition';

	let isInViewAboutTitle: boolean;
	let isInViewContactTitle: boolean = true;
	let isInViewMapTitle: boolean = false;
	let isHoneypotChecked: boolean = false;
	let isVisibleContactForm: boolean = false;

	const onChangehoneypotCheck = (event: any) => {
		isHoneypotChecked = event.target.checked;
	};

	const mapsLink =
		'https://www.google.com/maps/place/Lenmed+Ahmed+Kathrada+Private+Hospital/@-26.3277018,27.8615079,17z/data=!3m1!4b1!4m6!3m5!1s0x1e95a89c8b3e01b7:0x3c568d1f019aa946!8m2!3d-26.3277018!4d27.8640828!16s%2Fg%2F1tdv9pdd?entry=ttu';

	export let form;
</script>

<Noir />
<NoirLight />

<section
	class="pb-32 relative w-screen h-screen flex flex-col md:flex-row justify-center items-center"
>
	<div
		class="absolute w-screen h-screen top-0 left-0 bg-cover bg-center bg-no-repeat bg-fixed bg-blend-color opacity-60 blur-[1px]"
		style="background-image:url(src/lib/assets/paralax.jpg)"
	/>
	<div class="sticky flex bg-transparent p-5 md:p-2 lg:flex-row flex-col items-center z-0 gap-y-8">
		<div class="flex flex-col flex-1 justify-center items-center lg:h-full xs:mt-5 sm: mt-5">
			<h4
				class="md:text-[60px] text-[20px] leading-none xs:text-center md:px-6 md:mx-0 lg:mt-2 uppercase w-full"
			>
				A Specialist Urologist, with a focus on all kinds of prostate, kidney, bladder and
				testicular cancers.
			</h4>
		</div>
		<div class="flex flex-2 justify-center items-center lg:h-full">
			<img class="w-full" src={profile} alt="mugi" />
		</div>
	</div>
</section>

<div class="h-fit w-screen">
	<section id="about" class="mt-10 z-1">
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
			<div class="flex flex-2 justify-center items-center blur-[2px]">
				<img class="w-full rounded-md" src={stethoscope} alt="Stethoscope" use:filter={'#Noir'} />
			</div>
			<div class="flex flex-2 justify-center items-start md:px-5 md:mt-0 mt-2">
				<p class="text-lg">
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
			style="background-image:url(src/lib/assets/appointment-banner.jpg)"
			use:inview
			on:inview_change={(event) => {
				const { inView } = event.detail;
				isVisibleContactForm = inView;
			}}
		>
			<div class="flex flex-col md:flex-row w-full">
				{#if isVisibleContactForm}
					<div
						class="static flex flex-1 grow flex-col bg-transparent my-2 md:px-4 z-2"
						transition:fly={{ duration: 600, x: -500, opacity: 0 }}
					>
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
												<g
													id="Icon-Set"
													transform="translate(-568.000000, -254.000000)"
													fill="#000"
												>
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
				{/if}

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
			class="flex flex-row flex-wrap w-full place-content-start items-start z-2 mb-2"
			use:inview
			on:inview_change={(event) => {
				const { inView } = event.detail;
				isInViewMapTitle = inView;
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
			title="Maps"
			src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3575.9628699412565!2d27.861507876162566!3d-26.327701777000765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95a89c8b3e01b7%3A0x3c568d1f019aa946!2sLenmed%20Ahmed%20Kathrada%20Private%20Hospital!5e0!3m2!1sen!2sza!4v1691874840718!5m2!1sen!2sza"
			width="100%"
			height="600"
			style="border:0;"
			allowfullscreen={true}
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
		/>
	</section>
</div>
