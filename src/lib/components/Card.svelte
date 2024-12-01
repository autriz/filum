<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children?: Snippet<[]>;
		class?: string;
	};

	let { children, class: className = '' }: Props = $props();
</script>

<div
	class="{className} rounded-md border border-surface-100 shadow-sm dark:border-surface-800 dark:bg-surface-900/60"
>
	{#if children}
		{@render children()}
	{/if}
</div>
