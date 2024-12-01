<script lang="ts">
	import { createRadioGroup, melt, type CreateRadioGroupProps } from '@melt-ui/svelte';

	type Props = CreateRadioGroupProps & {
		options: {
			value: string;
			label: string;
		}[];
	};

	let { options, ...props }: Props = $props();

	const {
		elements: { root, item, hiddenInput },
		helpers: { isChecked }
	} = createRadioGroup(props);
</script>

<div
	use:melt={$root}
	class="flex flex-col gap-3 data-[orientation=horizontal]:flex-row"
	aria-label="View density"
>
	{#each options as option}
		<div class="flex items-center gap-3">
			<button
				use:melt={$item(option.value)}
				class="grid h-6 w-6 cursor-default place-items-center rounded-full shadow-sm bg-surface-50-950
      hover:bg-surface-100-900"
				id={option.value}
				aria-labelledby="{option}-label"
			>
				{#if $isChecked(option.value)}
					<div class="h-3 w-3 rounded-full bg-primary-500"></div>
				{/if}
			</button>
			<label
				class="font-medium capitalize leading-none text-surface-950-50"
				for={option.value}
				id="{option.value}-label"
			>
				{option.label}
			</label>
		</div>
	{/each}
	<input name="line-height" use:melt={$hiddenInput} />
</div>
