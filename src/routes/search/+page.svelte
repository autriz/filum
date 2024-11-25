<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let { data } = $props();
	let { services } = $state(data);

	let q = $page.url.searchParams.get('q') ?? '';

	let searchQuery = $state<string>(q);
	let isLoading = $state<boolean>(false);

	$effect(() => console.log($page.url, searchQuery));

	function handleKeyPress(e: KeyboardEvent) {
		if (e.key === 'Enter' && !isLoading) {
			handleSearch();
		}
	}

	// add filters, i.e. rating, price

	async function handleSearch() {
		isLoading = true;

		if (searchQuery) {
			$page.url.searchParams.set('q', searchQuery);
			goto($page.url);
		}

		try {
			const resp = await fetch(`/api/service?${searchQuery ? `q=${searchQuery}` : ''}`);

			if (!resp.ok) throw new Error('Failed to fetch services');

			services = await resp.json();
		} catch (err) {
			console.error(`Error fetching services: ${err}`);
		} finally {
			isLoading = false;
		}
	}

	onMount(() => {
		if (q) searchQuery = q;
	});
</script>

<div>
	<input
		type="search"
		placeholder="Поиск услуг..."
		bind:value={searchQuery}
		onkeypress={handleKeyPress}
	/>
	<button disabled={isLoading} onclick={handleSearch}>Search</button>
</div>
{#if !isLoading}
	<div>
		{#each services as service}
			<div>{service.id}</div>
		{/each}
	</div>
{:else}
	<div>Загружаем...</div>
{/if}
