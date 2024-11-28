<script lang="ts">
	const { children } = $props();
</script>

<div
	class="shadow-surface-400-800 mx-4 rounded-lg border border-surface-400 p-3 shadow-sm drop-shadow-md"
>
	{@render children()}
</div>
