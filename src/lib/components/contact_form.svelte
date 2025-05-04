<script lang="ts">
	import { fly } from 'svelte/transition';
	import { SyncLoader } from 'svelte-loading-spinners';
	import { showSuccessToast, showErrorToast, showHoneypotErrorToast } from '$lib/components/toasts/toaster-svelte';
	import { enhance, applyAction } from '$app/forms';

	import PhoneNumber from '$lib/components/phone_number.svelte';
	import LogosWhatsappIcon from '~icons/logos/whatsapp-icon';
	import PhoneInTalkRoundedIcon from '~icons/material-symbols/phone-in-talk-rounded';
	import MapPinIcon from '~icons/tabler/map-2'
;
	let isHoneypotChecked: boolean = $state(false);
	let email: string = $state('');
	const onChangeCheck = (event: any) => {
		isHoneypotChecked = event.target.checked;
	};

	const mapsLink =
		'https://www.google.com/maps/place/Dr+Ahsan+Ahmad+-+Urologist/@-26.3285516,27.8597674,17z/data=!3m1!4b1!4m6!3m5!1s0x1e95a89cea357707:0x72e6d95d420b7803!8m2!3d-26.3285564!4d27.8623423!16s%2Fg%2F11b5yzxp5m?entry=ttu';

	let { loading, isVisibleContactForm } = $props();

	let active_class = $derived(loading ? 'opacity-50 pointer-events-none' : '');
</script>

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
				if(isHoneypotChecked) {
					showHoneypotErrorToast();
					return;
				}
				loading = true;
				return async ({ result, update }) => {
					loading = false;
					if (result.type === 'success') {
						formElement.reset();
						if (result.data) {
							showSuccessToast(result.data['description'] as string);
						}
					} else if (result.type === 'failure') {
						if (result.data) {
							showErrorToast(result.data['description'] as string);
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
						class="input peer text-md
						bg-white border-2 border-slate-300 rounded-md shadow-sm placeholder-slate-400
						focus:valid:border-success-500
						focus:invalid:border-error-500"
						type="text"
						placeholder="Your name"
						required
						pattern="^[a-zA-Z ]+$"
						minlength="3"
					/>
					<span
						class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
					>
						Please enter a name longer than 3 characters
					</span>
				</label>
			</div>

			<div class="flex flex-col md:flex-row mb-3">
				<label class="label px-5 flex-1 mb-3 md:mb-0">
					<span class="text-white">Contact number</span>
					<input
						name="contact"
						class="input peer text-md
						bg-white border-2 border-slate-300 rounded-md shadow-sm placeholder-slate-400
						focus:valid:border-success-500
						focus:invalid:border-error-500"
						type="text"
						placeholder="Your phone number"
						required
						pattern="^(\+27|0|27)[0-9]&#123;9&#125;$"
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
						class="input peer text-md
						bg-white border-2 border-slate-300 rounded-md shadow-sm placeholder-slate-400
						focus:valid:border-success-500
						focus:invalid:border-error-500"
						type="email"
						placeholder="Your email"
						required
						pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]&#123;2,&#125;$"
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
				<span class="text-white text-md">Select your issue</span>
				<select
					name="issue"
					class="select  text-md
					bg-white border-2 border-slate-300 rounded-md shadow-sm placeholder-slate-400
					focus:valid:border-success-500
					focus:invalid:border-error-500"
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
					class="textarea peer text-md
					bg-white border-2 border-slate-300 rounded-md shadow-sm placeholder-slate-400
					focus:valid:border-success-500
					focus:invalid:border-error-500"
					rows="4"
					required
					placeholder="Briefly describe your current condition..."
					name="message"
				></textarea>
				<span
						class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
					>
						Please enter a message
					</span>
			</label>

			<label class="flex items-center justify-center space-x-2 opacity-0">
				<input class="checkbox" type="checkbox" name="confirm" onchange={onChangeCheck} />
				<p>Click here to confirm</p>
			</label>

			<div class="w-full flex flex-row items-center justify-center md:mb-2">
				<button
					type="submit"
					class="btn preset-filled-surface-500 bg-surface-200 text-black text-lg group-invalid:pointer-events-none group-invalid:opacity-50 {active_class}"
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
			class="card py-2 pr-2 pl-4 mx-4 md:mr-4 my-2 gap-y-5 flex flex-col grow-0 flex-none basis-1/4 shrink backdrop-blur-md bg-surface-500/20"
			transition:fly={{ duration: 600, x: 500, opacity: 0 }}
		>
			<p class="text-base md:text-lg text-white">
				Prefer to book by phone? Call us directly, and our assistant will arrange your
				appointment.
			</p>

			<div class="flex flex-row items-start justify-start gap-x-2">
				<div class="flex justify-center items-center">
					<MapPinIcon style="width: 24px; height: 24px;" class="text-white" />
				</div>
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
				<div class="flex justify-center items-center gap-x-2">
					<PhoneInTalkRoundedIcon style="width: 24px; height: 24px;" class="text-white" />
					<PhoneNumber number="(+27) 11 852 4348" url="tel:0118524348" />
				</div>
				<div class="flex justify-center items-center gap-x-2">
					<PhoneInTalkRoundedIcon style="width: 24px; height: 24px;" class="text-white" />
					<PhoneNumber number="(+27) 87 087 9294" url="tel:0870879294" />
				</div>
			</div>

			<div class="flex flex-row flex-wrap items-center justify-start gap-y-4 gap-x-8">
				<div class="flex justify-center items-center gap-x-2">
					<PhoneInTalkRoundedIcon style="width: 24px; height: 24px;" class="text-white" />
					<PhoneNumber number="(+27) 11 854 6029" url="tel:0118546029" />
				</div>
				<div class="flex justify-center items-center gap-x-2">
					<LogosWhatsappIcon class="text-white mr-2" />
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