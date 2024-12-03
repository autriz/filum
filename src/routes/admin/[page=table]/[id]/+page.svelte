<script lang="ts">
	import { page } from '$app/stores';
	import { Edit, Trash } from 'lucide-svelte';

	const { data } = $props();

	async function handleDelete(id: string) {
		alert('todo delete');
	}
</script>

<main class="m-auto">
	<table>
		{#each data.columns as column}
			<!-- svelte-ignore node_invalid_placement_ssr -->
			<tr>
				<td class="px-10 py-4 text-lg font-semibold">{column}</td>
				<td class="text-md text-surface-800-200">{data.row[column]}</td>
			</tr>
		{/each}
	</table>
</main>
