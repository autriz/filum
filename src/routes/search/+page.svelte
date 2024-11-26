<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let { data } = $props();
	let { services } = $state(data);

	let searchQuery = $state<string>('');
	let isLoading = $state<boolean>(false);

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
		searchQuery = $page.url.searchParams.get('q') ?? '';
	});
</script>

<div class="mx-auto flex max-w-md items-center">
	<label for="simple-search" class="sr-only">Search</label>
	<div class="relative w-full">
		<input
			type="text"
			id="simple-search"
			name="q"
			class="block w-full rounded-lg border border-surface-300 bg-surface-50 p-2.5 pe-10 text-sm outline-none ring-transparent transition-colors text-surface-950-50 focus:border-primary-500 focus:ring-primary-500 dark:border-surface-600 dark:bg-surface-900 dark:placeholder-surface-300 dark:focus:border-primary-500 dark:focus:ring-primary-500"
			placeholder="Поиск услуг, бизнесов..."
			bind:value={searchQuery}
			onkeypress={handleKeyPress}
		/>
	</div>
	<button
		type="submit"
		class="ms-2 flex flex-row items-center justify-center gap-3 rounded-lg border border-primary-700 bg-primary-700 p-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 disabled:bg-primary-900 motion-safe:transition-colors dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
		disabled={isLoading}
		onclick={handleSearch}
	>
		<svg
			class="h-4 w-4"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 20 20"
		>
			<path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
			/>
		</svg>
		<span>Поиск</span>
	</button>
</div>
<div class="mx-auto mt-8 flex max-w-md flex-col items-center gap-3">
	{#if !isLoading}
		{#each services as service}
			<button
				class="w-full rounded-md border border-secondary-900 p-2.5 shadow-md hover:bg-primary-300"
				onclick={() => goto(`/service/${service.id}`)}
				aria-label="service card"
			>
				<h2 class="text-2xl font-bold">{service.name}</h2>
				<h3 class="text-xl">{service.price}</h3>
				<div>
					<a href="/business/{service.businessId}">{service.businessName}</a>
				</div>
			</button>
		{/each}
	{:else}
		<span>Загружаем...</span>
	{/if}
</div>
