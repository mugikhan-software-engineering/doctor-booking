<script lang="ts">
	import { DatePicker } from 'bits-ui';
	import CalendarBlank from 'phosphor-svelte/lib/CalendarBlank';
	import CaretLeft from 'phosphor-svelte/lib/CaretLeft';
	import CaretRight from 'phosphor-svelte/lib/CaretRight';
	import { getLocalTimeZone, type DateValue } from '@internationalized/date';

	let { getSelectedDate, setSelectedDate, minValue } = $props();
	let errorMessage = $state('');

	function isSunday(date: DateValue) {
		return date.toDate(getLocalTimeZone()).getDay() === 0;
	}

	function validate(date: DateValue) {
		return isSunday(date)
			? 'Sundays are not available as they are outside of business hours'
			: undefined;
	}

	function handleInvalid(reason: string, msg?: string | string[]) {
		console.log('Invalid date', reason, msg);
		if (reason === 'custom' && msg && typeof msg === 'string') {
			errorMessage = msg as string;
		} else if (reason === 'custom' && msg && Array.isArray(msg)) {
			errorMessage = msg[0] as string;
		} else {
			errorMessage = 'Please select a valid date';
		}
	}

	function handleValueChange() {
		errorMessage = '';
	}
</script>

<label class="label flex-1">
	<span class="text-base">Date</span>
	<DatePicker.Root
		bind:value={getSelectedDate, setSelectedDate}
		hideTimeZone={true}
		locale="en-GB"
		{minValue}
		{validate}
		onInvalid={handleInvalid}
		onValueChange={handleValueChange}
	>
		<!-- <DatePicker.Label>Date</DatePicker.Label> -->
		<DatePicker.Input
			name="date"
			class="input w-full text-black flex select-none items-center text-md tracking-[0.01em]
        bg-white border-2 border-slate-300 rounded-md shadow-sm placeholder-slate-400
        focus:valid:border-success-500
        focus:invalid:border-error-500
        data-[invalid]:border-error-500"
		>
			{#snippet children({ segments })}
				{#each segments as { part, value }}
					<DatePicker.Segment {part} class="px-1 data-[invalid]:text-error-500">
						{value}
					</DatePicker.Segment>
				{/each}
				<DatePicker.Trigger
					class="text-black hover:bg-muted active:bg-dark-10 ml-auto inline-flex items-center justify-center rounded-[5px] transition-all"
				>
					<CalendarBlank class="size-4" />
				</DatePicker.Trigger>
			{/snippet}
		</DatePicker.Input>
		{#if errorMessage}
			<span class="mt-2 text-sm text-red-500">
				{errorMessage}
			</span>
		{/if}
		<DatePicker.Content sideOffset={6} class="z-50">
			<DatePicker.Calendar
				class="border-dark-10 bg-surface-100-900 shadow-popover rounded-[15px] border p-[22px]"
			>
				{#snippet children({ months, weekdays })}
					<DatePicker.Header class="flex items-center justify-between">
						<DatePicker.PrevButton
							class="rounded-9px bg-background-alt hover:bg-muted inline-flex size-10 items-center justify-center transition-all active:scale-[0.98]"
						>
							<CaretLeft class="size-6" />
						</DatePicker.PrevButton>
						<DatePicker.Heading class="text-[15px] font-medium" />
						<DatePicker.NextButton
							class="rounded-9px bg-background-alt hover:bg-muted inline-flex size-10 items-center justify-center transition-all active:scale-[0.98]"
						>
							<CaretRight class="size-6" />
						</DatePicker.NextButton>
					</DatePicker.Header>
					<div class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0">
						{#each months as month}
							<DatePicker.Grid class="w-full border-collapse select-none space-y-1">
								<DatePicker.GridHead>
									<DatePicker.GridRow class="mb-1 flex w-full justify-between">
										{#each weekdays as day}
											<DatePicker.HeadCell
												class="text-muted-foreground font-normal! w-10 rounded-md text-xs"
											>
												<div>{day.slice(0, 2)}</div>
											</DatePicker.HeadCell>
										{/each}
									</DatePicker.GridRow>
								</DatePicker.GridHead>
								<DatePicker.GridBody>
									{#each month.weeks as weekDates}
										<DatePicker.GridRow class="flex w-full">
											{#each weekDates as date}
												<DatePicker.Cell
													{date}
													month={month.value}
													class="p-0! relative size-10 text-center text-sm"
												>
													<DatePicker.Day
														class="rounded-9px text-foreground hover:border-foreground data-selected:bg-foreground data-disabled:text-foreground/30 data-selected:text-background data-unavailable:text-muted-foreground data-disabled:pointer-events-none data-outside-month:pointer-events-none data-selected:font-medium data-unavailable:line-through group relative inline-flex size-10 items-center justify-center whitespace-nowrap border border-transparent bg-transparent p-0 text-sm font-normal transition-all"
													>
														<div
															class="bg-foreground group-data-selected:bg-background group-data-today:block absolute top-[5px] hidden size-1 rounded-full transition-all"
														></div>
														{date.day}
													</DatePicker.Day>
												</DatePicker.Cell>
											{/each}
										</DatePicker.GridRow>
									{/each}
								</DatePicker.GridBody>
							</DatePicker.Grid>
						{/each}
					</div>
				{/snippet}
			</DatePicker.Calendar>
		</DatePicker.Content>
	</DatePicker.Root>
	<!-- <input
        name="date"
        type="date"
        bind:value={selectedDate}
        onchange={(e: Event) => {
            const target = e.target as HTMLInputElement;
            fetchAvailableSlots(target.value);
        }}
        class="input peer text-md
        bg-white border-2 border-slate-300 rounded-md shadow-sm placeholder-slate-800
        focus:valid:border-success-500
        focus:invalid:border-error-500"
        required
        min={new Date().toISOString().split('T')[0]}
        placeholder="Select a date"
    /> -->
</label>
