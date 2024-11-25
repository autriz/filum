<script lang="ts">
	import type { Service } from '$lib/server/db/schema';

	let { data }: { data: Service[] } = $props();

	let searchQuery = $state<string>('');
	let isLoading = $state<boolean>(false);
	let services = $state<Service[]>(data ? data : []);

	function handleKeyPress(e: KeyboardEvent) {
		if (e.key === 'Enter' && !isLoading) {
			handleSearch();
		}
	}

	async function handleSearch() {
		isLoading = true;

		try {
			const resp = await fetch(`/api/services/${searchQuery ? `q=${searchQuery}` : ''}`);

			if (!resp.ok) throw new Error('Failed to fetch services');

			services = await resp.json();
		} catch (err) {
			console.error(`Error fetching services: ${err}`);
		} finally {
			isLoading = true;
		}
	}
</script>

<div>
	<input
		type="search"
		placeholder="Поиск услуг..."
		bind:value={searchQuery}
		onkeypress={handleKeyPress}
	/>
	<button disabled={isLoading}>Search</button>
</div>
{#if isLoading}
	<div>
		{#each services as service}
			<div>{service.id}</div>
		{/each}
	</div>
{:else}
	<div>Загружаем...</div>
{/if}
