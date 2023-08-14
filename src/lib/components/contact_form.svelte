<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from '../../routes/$types';

	let isHoneypotChecked: boolean = false;

	const onChangehoneypotCheck = (event: any) => {
		isHoneypotChecked = event.target.checked;
	};

	export let form: any;
</script>

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
</form>

{#if form?.error}
	<aside class="alert variant-filled-error">
		<div class="alert-message">
			<h3 class="h3">Error!</h3>
			<p>{form.description}</p>
		</div>
	</aside>
{/if}
