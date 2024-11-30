<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		title: string;
		class?: string;
		children?: Snippet<[]>;
	};

	const { children, title, class: className }: Props = $props();
</script>

<div class="flex flex-col" data-vaul-no-drag>
	<span class="text-lg font-bold">{title}</span>
	<span class="{className} ml-2">
		{#if children}
			{@render children()}
		{/if}
	</span>
</div>
