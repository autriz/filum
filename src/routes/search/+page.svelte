<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Filters, { type Filters as TFilters } from '$lib/components/filter/Filters.svelte';
	import { ArrowRight, ChevronLeft, ChevronRight, Menu, Star, X } from 'lucide-svelte';
	import { Drawer } from 'vaul-svelte';
	import { fly } from 'svelte/transition';
	import Search from '$lib/components/Search.svelte';
	import OrderSelect from '$lib/components/OrderSelect.svelte';
	import Card from '$lib/components/Card.svelte';
	import { writable } from 'svelte/store';
	import { createPagination, melt } from '@melt-ui/svelte';

	const formatter = new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB',
		trailingZeroDisplay: 'stripIfInteger'
	});

	const orderList = [
		{
			label: 'По соответствию',
			value: 'relevance'
		},
		{
			label: 'По дате',
			value: 'publication_time'
		},
		{
			label: 'По возрастанию цены',
			value: 'price_asc'
		},
		{
			label: 'По убыванию цены',
			value: 'price_desc'
		}
	];

	let { data } = $props();
	let { servicesCount, limits } = $state(data);

	const query = $page.url.searchParams.get('q') ?? '';
	const currentPage = writable(Number($page.url.searchParams.get('page')) ?? 1);
	const minPrice = Number($page.url.searchParams.get('minPrice') ?? limits.minPrice);
	const maxPrice = Number($page.url.searchParams.get('maxPrice') ?? limits.maxPrice);
	const minRating = Number($page.url.searchParams.get('minRating') ?? limits.minRating);
	const maxRating = Number($page.url.searchParams.get('maxRating') ?? limits.maxRating);
	const includeTags = $page.url.searchParams.get('includeTags');
	const excludeTags = $page.url.searchParams.get('excludeTags');
	const searchIn = $page.url.searchParams.getAll('searchIn');
	const orderBy =
		($page.url.searchParams.get('orderBy') as
			| 'relevance'
			| 'publication_time'
			| 'price_asc'
			| 'price_desc') ?? 'relevance';

	let searchQuery = $state<string>('');
	let isLoading = $state<boolean>(false);

	const {
		elements: { root, pageTrigger, prevButton, nextButton },
		states: { pages, range }
	} = createPagination({
		count: servicesCount,
		perPage: 15,
		page: currentPage,
		siblingCount: 1,
		onPageChange: ({ curr, next }) => {
			$page.url.searchParams.set('page', next.toString());
			goto($page.url, { invalidateAll: true });

			return next;
		}
	});

	function handleKeyPress(e: KeyboardEvent) {
		if (e.key === 'Enter' && !isLoading) {
			handleSearch();
		}
	}

	let filters: TFilters = $state({
		minPrice,
		maxPrice,

		minRating,
		maxRating,

		includeTags: [],
		excludeTags: [],

		orderBy,

		searchInServiceName: writable(searchIn.length ? searchIn.includes('business_name') : true),
		searchInBusinessName: writable(searchIn.length ? searchIn.includes('service_name') : true),
		searchInServiceDescription: writable(
			searchIn.length ? searchIn.includes('service_description') : true
		)
	});

	// svelte-ignore state_referenced_locally
	const { searchInServiceName, searchInBusinessName, searchInServiceDescription } = filters;

	const selectedOrder = writable(orderList.find((value) => value.value === filters.orderBy));
	selectedOrder.subscribe(
		({ value }) =>
			(filters.orderBy = value as 'relevance' | 'publication_time' | 'price_asc' | 'price_desc')
	);

	async function handleSearch() {
		isLoading = true;

		let searchParams = new URLSearchParams();

		searchParams.set('q', searchQuery);
		filters.minPrice != limits.minPrice
			? searchParams.set('minPrice', `${filters.minPrice}`)
			: undefined;
		filters.maxPrice != limits.maxPrice
			? searchParams.set('maxPrice', `${filters.maxPrice}`)
			: undefined;
		filters.minRating != limits.minRating
			? searchParams.set('minRating', `${filters.minRating}`)
			: undefined;
		filters.maxRating != limits.maxRating
			? searchParams.set('maxRating', `${filters.maxRating}`)
			: undefined;
		if (!($searchInBusinessName && $searchInServiceDescription && $searchInServiceName)) {
			if (!($searchInBusinessName || $searchInServiceDescription || $searchInServiceName)) {
				$searchInBusinessName = true;
				$searchInServiceDescription = true;
				$searchInServiceName = true;
			} else {
				$searchInBusinessName ? searchParams.append('searchIn', `business_name`) : undefined;
				$searchInServiceDescription
					? searchParams.append('searchIn', `service_description`)
					: undefined;
				$searchInServiceName ? searchParams.append('searchIn', `service_name`) : undefined;
			}
		}
		if (filters.orderBy != 'relevance') {
			searchParams.set('orderBy', filters.orderBy);
		}

		goto(`/search?${searchParams.toString()}`);

		try {
			const resp = await fetch(`/api/services?${searchParams.toString()}`);

			if (!resp.ok) throw new Error('Failed to fetch services');

			let respData = await resp.json();

			data.services = respData.services;
			servicesCount = respData.servicesCount;
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

<main class="mx-auto px-4 py-12">
	<div class="space-y-6">
		<div class="flex flex-col justify-between gap-1 sm:flex-row">
			<div class="mb-3 flex flex-grow flex-row gap-3 sm:mb-0 sm:mr-3">
				<div class="flex-grow">
					<Search bind:value={searchQuery} onkeypress={handleKeyPress} />
				</div>
				<button
					type="submit"
					class="text-md ms-2 flex flex-row items-center justify-center gap-3 rounded-lg border border-primary-700 bg-primary-700 p-2.5 px-4 font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 disabled:bg-primary-900 motion-safe:transition-colors dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
			<OrderSelect selected={selectedOrder} options={orderList} />
		</div>
		<div>
			<span class="mt-4 flex max-w-md items-center text-2xl font-bold text-surface-950-50">
				Найдено {servicesCount} услуг
			</span>
		</div>
	</div>
	<div class="mt-4 grid gap-8 md:grid-cols-[300px_1fr]">
		<div class="md:hidden">
			<Drawer.Root direction="left" openFocus={null}>
				<Drawer.Trigger
					class="inline-flex w-full items-center justify-center rounded-xl border px-4 py-3 font-medium leading-none
					shadow text-surface-950-50 border-surface-200-800 hover:bg-surface-100/60 motion-safe:transition-colors dark:hover:bg-surface-900/60"
				>
					<Menu class="mr-3 h-6 w-6" />
					Фильтры
				</Drawer.Trigger>
				<Drawer.Portal>
					<Drawer.Overlay class="fixed inset-0 z-50 bg-black/40"></Drawer.Overlay>
					<Drawer.Content
						class="fixed left-0 top-0 z-50 h-screen w-full max-w-[350px] p-6 shadow-lg
						bg-surface-50-950 focus:outline-none"
					>
						<div
							in:fly={{
								x: -350,
								duration: 300,
								opacity: 1
							}}
						>
							<Drawer.Title class="mb-0 text-lg font-medium text-surface-950-50">
								Фильтры
							</Drawer.Title>
							<Drawer.Description class="mb-5 mt-2 leading-normal text-surface-800-200">
								Настройте поиск под свои нужды.
							</Drawer.Description>
							<Filters bind:filters {limits} />
						</div>
					</Drawer.Content>
				</Drawer.Portal>
			</Drawer.Root>
		</div>
		<aside class="hidden space-y-6 md:block">
			<h2 class="mb-2 text-lg font-semibold">Фильтры</h2>
			<Filters bind:filters {limits} />
		</aside>
		<div class="space-y-6">
			{#if isLoading}
				<div class="flex h-full w-full items-center justify-center">
					<h1 class="text-3xl">Загрузка...</h1>
				</div>
			{:else}
				<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each data.services as service (service.id)}
						<Card>
							<div class="flex flex-col space-y-1.5 p-6">
								<a
									class="text-2xl font-semibold leading-none tracking-tight"
									href="/service/{service.id}"
								>
									{service.title}
								</a>
							</div>
							<div class="p-6 pt-0">
								<p class="mb-2 text-surface-300">
									{service.shortDescription}
								</p>
								<p class="font-semibold">Цена: {formatter.format(service.price)}</p>
								<p class="flex flex-row items-center gap-1">
									Рейтинг: {service.rating.toFixed(1)}/5.0 <Star
										class="h-5 w-5 fill-yellow-500 stroke-yellow-900 stroke-1"
									/>
								</p>
								<p class="mt-2 text-sm text-surface-300">
									Предоставляется: <a href="/business/{service.business.id}"
										>{service.business.name}</a
									>
								</p>
							</div>
							<div class="flex flex-col items-start p-6 pt-0">
								<a
									class="focus-visible:ring-ring inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap
									rounded-md border bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors
									border-surface-200-800 hover:bg-surface-100-900 hover:text-surface-900-100 hover:border-surface-300-700 focus-visible:outline-none
									focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none
									[&_svg]:size-4 [&_svg]:shrink-0"
									href="/service/{service.id}"
								>
									Узнать больше
									<ArrowRight />
								</a>
							</div>
						</Card>
					{/each}
				</div>
			{/if}
			<nav
				class="flex w-full flex-col flex-wrap items-center justify-center border-t px-4 py-4 border-surface-200-800 md:flex-row"
				aria-label="Table navigation"
				use:melt={$root}
			>
				<div class="flex items-center gap-2">
					<button
						class="h-8 rounded-md border px-4 text-center border-surface-200-800 hover:bg-surface-100-900 hover:border-surface-300-700 motion-safe:transition-colors"
						use:melt={$prevButton}
					>
						<ChevronLeft class="size-4" />
					</button>
					{#each $pages as page (page.key)}
						{#if page.type === 'ellipsis'}
							<span>...</span>
						{:else}
							<button
								class="h-8 rounded-md border px-4 text-center border-surface-200-800 hover:bg-surface-100-900 hover:border-surface-300-700 motion-safe:transition-colors"
								use:melt={$pageTrigger(page)}
								disabled={$currentPage === page.value}
							>
								{page.value}
							</button>
						{/if}
					{/each}
					<button
						class="h-8 rounded-md border px-4 text-center border-surface-200-800 hover:bg-surface-100-900 hover:border-surface-300-700 motion-safe:transition-colors"
						use:melt={$nextButton}
					>
						<ChevronRight class="size-4" />
					</button>
				</div>
			</nav>
		</div>
	</div>
</main>

<style>
	@media (min-width: 1400px) {
		main {
			max-width: 1400px !important;
		}
	}

	main {
		width: 100% !important;
	}
</style>
