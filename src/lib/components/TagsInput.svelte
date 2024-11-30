<script lang="ts">
	import { createTagsInput, melt, type CreateTagsInputProps } from '@melt-ui/svelte';
	import { X } from 'lucide-svelte';

	type Props = CreateTagsInputProps;

	let { ...props }: Props = $props();

	const {
		elements: { root, input, tag, deleteTrigger, edit },
		states: { tags }
	} = createTagsInput({
		...props,
		unique: true,
		add(tag) {
			return { id: tag, value: tag };
		},
		addOnPaste: true
	});
</script>

<div
	use:melt={$root}
	class="flex min-w-[280px] flex-row flex-wrap gap-2.5 rounded-md border border-surface-400 bg-surface-50 px-3 py-2 text-surface-700-300 focus-within:border-primary-400
motion-safe:transition-colors dark:bg-surface-900"
>
	{#each $tags as t}
		<div
			use:melt={$tag(t)}
			class="flex items-center overflow-hidden rounded-md bg-surface-200-800 text-surface-950-50 [word-break:break-word]
    data-[disabled]:bg-surface-300-700 data-[selected]:bg-surface-400-600 data-[disabled]:hover:cursor-default
    data-[disabled]:focus:!outline-none data-[disabled]:focus:!ring-0"
		>
			<span class="flex items-center border-r border-white/10 px-1.5">{t.value}</span>
			<button
				use:melt={$deleteTrigger(t)}
				class="flex h-full items-center px-1 enabled:hover:bg-surface-300-700"
			>
				<X class="size-3" />
			</button>
		</div>
		<div
			use:melt={$edit(t)}
			class="flex items-center overflow-hidden rounded-md px-1.5 [word-break:break-word] data-[invalid-edit]:focus:!ring-red-500"
		></div>
	{/each}
	<input
		use:melt={$input}
		type="text"
		placeholder="Добавьте теги..."
		class="min-w-[4.5rem] shrink grow basis-0 border-0 bg-inherit outline-none text-surface-950-50 focus:!ring-0 data-[invalid]:text-red-500"
	/>
</div>
