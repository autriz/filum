<script lang="ts">
	import { createDatePicker, melt } from '@melt-ui/svelte';
	import { ChevronRight, ChevronLeft, Calendar } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { fromDate } from '@internationalized/date';

	let { name, value = $bindable(Date.now()), ...props } = $props();

	const {
		elements: {
			hiddenInput,
			calendar,
			cell,
			content,
			field,
			grid,
			heading,
			label,
			nextButton,
			prevButton,
			segment,
			trigger
		},
		states: { months, headingValue, weekdays, segmentContents, open },
		helpers: { isDateDisabled, isDateUnavailable },
		options: { locale }
	} = createDatePicker({
		forceVisible: true,
		defaultValue: fromDate(value, 'Europe/Samara'),
		locale: 'ru',
		name
	});
</script>

<section>
	<div class="bg-surface-50-950 text-surface-950-50">
		<div use:melt={$field}>
			{#key $locale}
				{#each $segmentContents as seg}
					<div use:melt={$segment(seg.part)}>
						{seg.value}
					</div>
				{/each}
			{/key}
			<div>
				<button use:melt={$trigger}>
					<Calendar size={16} />
				</button>
			</div>
			<input use:melt={$hiddenInput} />
		</div>
	</div>
	{#if $open}
		<div
			class="bg-surface-50-950 text-surface-950-50"
			transition:fade={{ duration: 100 }}
			use:melt={$content}
		>
			<div use:melt={$calendar}>
				<header>
					<button use:melt={$prevButton}>
						<ChevronLeft size={24} />
					</button>
					<div use:melt={$heading}>
						{$headingValue}
					</div>
					<button use:melt={$nextButton}>
						<ChevronRight size={24} />
					</button>
				</header>
				<div>
					{#each $months as month}
						<table use:melt={$grid}>
							<thead aria-hidden="true">
								<tr>
									{#each $weekdays as day}
										<th>
											<div>
												{day}
											</div>
										</th>
									{/each}
								</tr>
							</thead>
							<tbody>
								{#each month.weeks as weekDates}
									<tr>
										{#each weekDates as date}
											<td
												role="gridcell"
												aria-disabled={$isDateDisabled(date) || $isDateUnavailable(date)}
											>
												<div use:melt={$cell(date, month.value)}>
													{date.day}
												</div>
											</td>
										{/each}
									</tr>
								{/each}
							</tbody>
						</table>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</section>

<style lang="postcss">
	section {
		@apply flex w-full flex-col items-center gap-3;
	}

	[data-melt-datefield-field] div:last-of-type {
		@apply ml-4 flex w-full items-center justify-end;
	}

	[data-melt-popover-content] {
		@apply z-10 min-w-[320px] rounded-lg border border-surface-300 shadow-sm;
	}

	[data-melt-popover-trigger] {
		@apply rounded-md bg-primary-700 p-1 transition-all text-surface-50-950 hover:bg-primary-700/90;
	}

	[data-melt-datefield-label] {
		@apply select-none font-medium text-primary-800;
	}

	[data-melt-datefield-label][data-invalid] {
		@apply text-red-500;
	}

	[data-melt-datefield-field] {
		@apply mt-0.5 flex w-full min-w-[160px] items-center rounded-lg border border-surface-400/60 p-1.5 shadow-md;
	}

	[data-melt-datefield-field][data-invalid] {
		@apply border-red-400;
	}

	[data-melt-datefield-segment][data-invalid] {
		@apply text-red-500;
	}

	[data-melt-datefield-segment]:not([data-segment='literal']) {
		@apply px-0.5;
	}

	[data-melt-datefield-validation] {
		@apply self-start text-red-500;
	}

	[data-melt-calendar] {
		@apply w-full rounded-lg p-3 shadow-sm;
	}

	header {
		@apply flex items-center justify-between pb-2;
	}

	header + div {
		@apply flex items-center gap-6;
	}

	[data-melt-calendar-prevbutton] {
		@apply rounded-lg p-1 hover:bg-surface-500/20 motion-safe:transition-all;
	}

	[data-melt-calendar-nextbutton] {
		@apply rounded-lg p-1 hover:bg-surface-500/20 motion-safe:transition-all;
	}

	[data-melt-calendar-prevbutton][data-disabled] {
		@apply pointer-events-none rounded-lg p-1 opacity-40;
	}

	[data-melt-calendar-nextbutton][data-disabled] {
		@apply pointer-events-none rounded-lg p-1 opacity-40;
	}

	[data-melt-calendar-heading] {
		@apply font-semibold;
	}

	th {
		@apply text-sm font-semibold;

		& div {
			@apply flex h-6 w-6 items-center justify-center p-4;
		}
	}

	[data-melt-calendar-grid] {
		@apply w-full;
	}

	[data-melt-calendar-cell] {
		@apply flex h-6 w-6 cursor-pointer select-none items-center justify-center rounded-lg p-4 hover:bg-primary-500/20 focus:ring focus:ring-primary-400;
	}

	[data-melt-calendar-cell][data-disabled] {
		@apply pointer-events-none opacity-40;
	}
	[data-melt-calendar-cell][data-unavailable] {
		@apply pointer-events-none text-red-400 line-through;
	}

	[data-melt-calendar-cell][data-selected] {
		@apply bg-primary-300 text-primary-700;
	}

	[data-melt-calendar-cell][data-outside-visible-months] {
		@apply pointer-events-none cursor-default opacity-40 hover:bg-transparent;
	}

	[data-melt-calendar-cell][data-outside-month] {
		@apply pointer-events-none cursor-default opacity-0 hover:bg-transparent;
	}
</style>
