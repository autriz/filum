<script lang="ts">
	const { data, children } = $props();
</script>

<div class="flex h-full w-full flex-col md:flex-row">
	<aside
		class="flex h-full w-full flex-col gap-2 border-r px-4 border-surface-200-800 md:w-[160px]"
	>
		<h1 class="text-semibold text-2xl">Таблицы</h1>
		{#each data.tables as table}
			<a
				class="rounded-md border px-4 py-2 text-center border-surface-200-800 hover:bg-surface-100-900 hover:border-surface-300-700 motion-safe:transition-colors"
				href="/admin/{table}">{table}</a
			>
		{/each}
	</aside>
	{@render children()}
</div>
