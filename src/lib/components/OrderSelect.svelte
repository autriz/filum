<script lang="ts">
	import { createSelect, melt, type CreateSelectProps } from '@melt-ui/svelte';
	import { Check, ChevronsUpDown } from 'lucide-svelte';

	type Props = CreateSelectProps & {
		options: { label: string; value: string }[];
		value: { label: string; value: string };
	};

	const { options, value = $bindable(options[0]), ...props }: Props = $props();

	const {
		elements: { trigger, menu, option, label },
		states: { selectedLabel, open, selected },
		helpers: { isSelected }
	} = createSelect({ ...props, defaultSelected: value });
	// forceVisible: true,
	// positioning: {
	//     placement: 'bottom',
	//     fitViewport: true,
	//     sameWidth: true
	// }
</script>

<!-- svelte-ignore a11y_label_has_associated_control -->
<label class="sr-only block text-surface-900-100" use:melt={$label}>Сортировка</label>
<!-- svelte-ignore event_directive_deprecated -->
<button
	class="flex min-w-[220px] items-center justify-between rounded-lg border border-surface-600 px-3
py-2 shadow transition-opacity bg-surface-50-950 text-surface-700-300 hover:opacity-90"
	use:melt={$trigger}
	on:m-keydown={(e) => {
		e.preventDefault(); // Cancel default builder behabiour
		e.detail.originalEvent.preventDefault(); // Cancel page scroll

		const { key } = e.detail.originalEvent;

		if (!['ArrowDown', 'ArrowUp', 'Space', 'Enter'].includes(key)) return;

		const allOptions = Object.values(options).flat();
		const index = allOptions.map((v) => v.label).indexOf(`${$selectedLabel}`);

		if (key === 'ArrowDown') {
			const nextIndex = index + 1;
			const { value, label } = allOptions[nextIndex] || allOptions[0];
			selected.set({ value, label });
		} else if (key === 'ArrowUp') {
			const prevIndex = index - 1;
			const { value, label } = allOptions[prevIndex] || allOptions[allOptions.length - 1];
			selected.set({ value, label });
		} else if (key === 'Enter') {
			open.set(!$open);
		} else {
			open.set(true);
		}
	}}
	aria-label="Selector"
>
	{$selectedLabel || 'Select a flavor'}
	<ChevronsUpDown class="size-5" />
</button>
{#if $open}
	<div
		class=" z-10 flex max-h-[300px] flex-col
			overflow-y-auto rounded-lg p-1 shadow
			bg-surface-100-900 focus:!ring-0"
		use:melt={$menu}
	>
		{#each Object.entries(options) as [key, { value, label }]}
			<div
				class="data-[highlighted]:bg-magnum-50 data-[selected]:bg-magnum-100 data-[highlighted]:text-magnum-900
				data-[selected]:text-magnum-900 relative cursor-pointer rounded-lg
				py-1 pl-8 pr-4 text-surface-800-200 focus:z-10 focus:text-surface-700-300"
				use:melt={$option({ value, label })}
			>
				<div
					class="absolute left-2 top-[50%] z-20 translate-y-[calc(-50%_+_1px)] text-primary-400 {$isSelected(
						value
					)
						? 'block'
						: 'hidden'}"
				>
					<Check class="size-4" />
				</div>

				{label}
			</div>
		{/each}
	</div>
{/if}
