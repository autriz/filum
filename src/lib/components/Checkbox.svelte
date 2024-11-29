<script lang="ts">
	import { createCheckbox, melt } from '@melt-ui/svelte';
	import { Check } from 'lucide-svelte';

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

<button class="{className} flex appearance-none items-center justify-center" use:melt={$root} {id}>
	{#if $isChecked}
		<Check class="size-5" />
	{/if}
	<input use:melt={$input} />
</button>
