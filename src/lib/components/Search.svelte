<script lang="ts">
	import type { KeyEvents } from 'lucide-svelte/icons/key';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	type Props = HTMLInputAttributes;

	let { value = $bindable(''), class: className, ...props }: Props = $props();
</script>

<label for="search" class="sr-only">Search</label>
<div class="relative w-full">
	<input
		type="text"
		id="search"
		name="q"
		class={twMerge(
			'text-md block w-full rounded-lg border border-surface-300 bg-surface-50 p-2.5 pe-10 outline-none \
			ring-transparent transition-colors text-surface-950-50 focus:border-primary-500 focus:ring-primary-500 \
			dark:border-surface-600 dark:bg-surface-900 dark:placeholder-surface-300 dark:focus:border-primary-500 \
			dark:focus:ring-primary-500',
			className
		)}
		placeholder="Поиск услуг, бизнесов..."
		bind:value
		{...props}
	/>
</div>
