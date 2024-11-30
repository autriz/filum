<script>
	let { children, class: className = '' } = $props();
</script>

<div
	class="{className} rounded-md border border-surface-100 shadow-sm dark:border-surface-800 dark:bg-surface-900/60"
>
	{@render children()}
</div>
