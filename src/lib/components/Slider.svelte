<script lang="ts">
	import { createSlider, melt, type CreateSliderProps } from '@melt-ui/svelte';
	import { writable } from 'svelte/store';
	import { twMerge } from 'tailwind-merge';

	type Props = CreateSliderProps & {
		class?: string;
		addTicks?: boolean;
	};

	let { class: className, addTicks, ...props }: Props = $props();

	const {
		elements: { root, range, thumbs, ticks }
	} = createSlider(props);
</script>

<span use:melt={$root} class={twMerge(' relative flex items-center', className)}>
	<span class="bg-surface-950-50/40 h-[3px] w-full">
		<span use:melt={$range} class="h-[3px] bg-primary-400"></span>
	</span>

	{#if addTicks}
		{#each $ticks as tick}
			<span
				use:melt={tick}
				class="data-[bounded]:bg-magnum-800/75 h-[3px] w-[3px] rounded-full bg-white/50"
			></span>
		{/each}
	{/if}

	{#each $thumbs as thumb}
		<span
			use:melt={thumb}
			class="h-5 w-5 rounded-full bg-primary-400 focus:ring-4 focus:!ring-surface-950/40 dark:focus:!ring-surface-50/40"
		></span>
	{/each}
</span>
