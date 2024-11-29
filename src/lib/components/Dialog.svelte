<script lang="ts">
	import { createDialog, melt, type CreateDialogProps } from '@melt-ui/svelte';
	import { X } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import { fade, slide } from 'svelte/transition';

	type CreateDialogElements = ReturnType<typeof createDialog>['elements'];

	type Props = CreateDialogProps & {
		triggerEl: Snippet<[CreateDialogElements['trigger']['arguments']]>;
		portalEl: Snippet<
			[
				CreateDialogElements['close']['arguments'],
				CreateDialogElements['content']['arguments'],
				CreateDialogElements['description']['arguments'],
				CreateDialogElements['overlay']['arguments'],
				CreateDialogElements['portalled']['arguments'],
				CreateDialogElements['title']['arguments']
			]
		>;
		children?: Snippet<[]>;
	};

	let { triggerEl, portalEl, children, ...props }: Props = $props();

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog(props);
</script>

{@render triggerEl($trigger)}
{#if $open}
	{@render portalEl($close, $content, $description, $overlay, $portalled, $title)}
{/if}
