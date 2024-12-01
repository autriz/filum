<script lang="ts">
	import { createCheckbox, melt } from '@melt-ui/svelte';
	import { Check } from 'lucide-svelte';
	import { twMerge } from 'tailwind-merge';

	type Props = {
		id: string;
		checked?: boolean;
		class?: string;
	};

	const { checked = $bindable(false), class: className, id }: Props = $props();

	const {
		elements: { root, input },
		helpers: { isChecked }
	} = createCheckbox({
		defaultChecked: checked
	});
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
