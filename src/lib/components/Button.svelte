<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	type Props = HTMLButtonAttributes & {
		children: Snippet<[]>;
	};

	let { children, class: className, ...props }: Props = $props();
</script>

<button
	class={twMerge(
		'focus-visible:ring-ring inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap \
    rounded-md border bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors \
    border-surface-200-800 hover:bg-surface-100-900 hover:text-surface-900-100 hover:border-surface-300-700 focus-visible:outline-none \
    focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none \
    [&_svg]:size-4 [&_svg]:shrink-0',
		className
	)}
	{...props}
>
	{@render children()}
</button>
