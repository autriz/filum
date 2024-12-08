<script lang="ts">
	import { createCheckbox, melt, type CreateCheckboxProps } from '@melt-ui/svelte';
	import { Check } from 'lucide-svelte';
	import { writable } from 'svelte/store';
	import { twMerge } from 'tailwind-merge';

	type Props = CreateCheckboxProps & {
		id: string;
		class?: string;
	};

	let { defaultChecked = $bindable(false), class: className, id, ...props }: Props = $props();

	const {
		elements: { root, input },
		helpers: { isChecked }
	} = createCheckbox({ ...props, defaultChecked });
</script>

<button
	aria-label="checkbox"
	class={twMerge('flex appearance-none items-center justify-center', className)}
	use:melt={$root}
	{id}
>
	{#if $isChecked}
		<Check class="size-5" />
	{/if}
	<input use:melt={$input} />
</button>
