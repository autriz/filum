<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Editable from '$lib/components/Editable.svelte';
	import { Edit, Trash } from 'lucide-svelte';

	const { data } = $props();

	function generateValue(type: string) {
		switch (type) {
			case 'string':
				return '';
			case 'number':
				return 0;
			case 'boolean':
				return false;
			case 'object':
				return new Date();
		}
	}
</script>

<main class="m-auto">
	<form method="POST" use:enhance>
		<table>
			{#each data.columns as column}
				<!-- svelte-ignore node_invalid_placement_ssr -->
				<tr>
					<td class="px-10 py-4 text-lg font-semibold">{column.column}</td>
					<td class="text-md text-surface-800-200">
						<Editable value={generateValue(column.type)} columnName={column.column} />
					</td>
				</tr>
			{/each}
		</table>
		<div class="flex items-center justify-end gap-4 text-surface-200">
			<button
				class="rounded-md border px-4 py-2 text-center border-surface-200-800 hover:text-surface-50 hover:bg-surface-100-900 hover:border-surface-300-700 motion-safe:transition-colors"
				>Сохранить</button
			>
			<button
				class="rounded-md border px-4 py-2 text-center border-surface-200-800 hover:text-surface-50 hover:border-error-300-700 hover:bg-surface-100-900 motion-safe:transition-colors"
				>Отмена</button
			>
		</div>
	</form>
</main>
