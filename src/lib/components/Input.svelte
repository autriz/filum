<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	type Props = HTMLInputAttributes;

	let { value = $bindable(), class: className, ...props }: Props = $props();
</script>

<input
	bind:value
	class={twMerge(
		'peer w-full rounded-lg border px-4 py-2 placeholder-transparent bg-surface-50-950 \
        border-surface-200-800 focus:border-primary-500 focus:outline-none focus:ring \
        focus:ring-primary-300 motion-safe:transition-colors dark:text-surface-950-50 \
        dark:focus:border-primary-400 dark:focus:ring-primary-500',
		className
	)}
/>
{#if props.id && props.placeholder}
	<label
		for={props.id}
		class="absolute -top-5
            left-[17px] select-none text-sm text-surface-950-50 peer-placeholder-shown:top-[9.5px]
            peer-placeholder-shown:text-base peer-placeholder-shown:text-surface-400 peer-focus:-top-5
            peer-focus:text-sm peer-focus:text-primary-400 motion-safe:transition-all"
	>
		{props.placeholder}
	</label>
{/if}

<style>
	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus,
	input:-webkit-autofill:active {
		-webkit-background-clip: text;
		transition: background-color 5000s ease-in-out 0s;
		box-shadow: inset 0 0 20px 20px #00000000;
	}
</style>
