<script lang="ts">
	import { createSwitch, melt, type CreateSwitchProps } from '@melt-ui/svelte';
	import { next } from '@melt-ui/svelte/internal/helpers';
	import { twMerge } from 'tailwind-merge';

	type Props = Omit<CreateSwitchProps, 'value'> & {
		id: string;
		class?: string;
		value?: boolean;
		label?: string;
		labelClass?: string;
	};

	let {
		id,
		labelClass,
		value = $bindable(false),
		label,
		class: className,
		...props
	}: Props = $props();

	const {
		elements: { root, input }
	} = createSwitch({
		...props,
		defaultChecked: value,
		onCheckedChange: ({ curr, next }) => {
			value = next;
			return next;
		}
	});
</script>

{#if label}
	<label class={labelClass} for={id} id="{id}-label"> {label} </label>
{/if}
<button
	use:melt={$root}
	class={twMerge(
		'relative h-6 cursor-default rounded-full bg-surface-400 transition-colors data-[state=checked]:bg-surface-600-400 dark:bg-surface-200',
		className
	)}
	{id}
	aria-labelledby="{id}-label"
>
	<span class="thumb block rounded-full bg-white transition"></span>
</button>
<input use:melt={$input} />

<style>
	button {
		--w: 2.75rem;
		--padding: 0.125rem;
		width: var(--w);
	}

	.thumb {
		--size: 1.25rem;
		width: var(--size);
		height: var(--size);
		transform: translateX(var(--padding));
	}

	:global([data-state='checked']) .thumb {
		transform: translateX(calc(var(--w) - var(--size) - var(--padding)));
	}
</style>
