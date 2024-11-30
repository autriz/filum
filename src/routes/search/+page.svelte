<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Filters, { type Filters as TFilters } from '$lib/components/filter/Filters.svelte';
	import type { Business, Service } from '$lib/server/db/schema';
	import { ArrowRight, Menu, Star, X } from 'lucide-svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import { Drawer } from 'vaul-svelte';
	import { melt } from '@melt-ui/svelte';
	import { fade, fly } from 'svelte/transition';
	import Search from '$lib/components/Search.svelte';
	import OrderSelect from '$lib/components/OrderSelect.svelte';
	import Card from '$lib/components/Card.svelte';

	let { data } = $props();
	let { services, servicesCount } = $state(data);

	let searchQuery = $state<string>('');
	let isLoading = $state<boolean>(false);

	function handleKeyPress(e: KeyboardEvent) {
		if (e.key === 'Enter' && !isLoading) {
			handleSearch();
		}
	}

	type NewService = Service & { shortDescription: string; rating: number; tags?: string[] };

	let business: Business = {
		id: '1',
		accountId: '1',
		name: 'SecureWeb',
		avatarUrl: '',
		about: 'test about',
		address: '',
		type: 'company'
	};

	let new_services: NewService[] = [
		{
			id: '1',
			businessId: '1',
			name: 'Разработка API и интеграция',
			description: '',
			shortDescription:
				'Custom API solutions to connect your web applications with external services.',
			price: 40000,
			rating: 4.8,
			isActive: true,
			createdAt: new Date(Date.now()),
			updatedAt: new Date(Date.now())
		},
		{
			id: '2',
			businessId: '1',
			name: 'Cloud Hosting Solutions',
			description: '',
			shortDescription:
				'Reliable and scalable cloud hosting services for your web applications and databases.',
			price: 10000,
			rating: 4.6,
			isActive: true,
			createdAt: new Date(Date.now()),
			updatedAt: new Date(Date.now())
		},
		{
			id: '1',
			businessId: '1',
			name: 'Разработка API и интеграция',
			description: '',
			shortDescription:
				'Custom API solutions to connect your web applications with external services.',
			price: 40000,
			rating: 4.8,
			isActive: true,
			createdAt: new Date(Date.now()),
			updatedAt: new Date(Date.now())
		},
		{
			id: '1',
			businessId: '1',
			name: 'Разработка API и интеграция',
			description: '',
			shortDescription:
				'Custom API solutions to connect your web applications with external services.',
			price: 40000,
			rating: 4.8,
			isActive: true,
			createdAt: new Date(Date.now()),
			updatedAt: new Date(Date.now())
		},
		{
			id: '1',
			businessId: '1',
			name: 'Разработка API и интеграция',
			description: '',
			shortDescription:
				'Custom API solutions to connect your web applications with external services.',
			price: 40000,
			rating: 4.8,
			isActive: true,
			createdAt: new Date(Date.now()),
			updatedAt: new Date(Date.now())
		},
		{
			id: '1',
			businessId: '1',
			name: 'Разработка API и интеграция',
			description: '',
			shortDescription:
				'Custom API solutions to connect your web applications with external services.',
			price: 40000,
			rating: 4.8,
			isActive: true,
			createdAt: new Date(Date.now()),
			updatedAt: new Date(Date.now())
		},
		{
			id: '1',
			businessId: '1',
			name: 'Разработка API и интеграция',
			description: '',
			shortDescription:
				'Custom API solutions to connect your web applications with external services.',
			price: 40000,
			rating: 4.8,
			isActive: true,
			createdAt: new Date(Date.now()),
			updatedAt: new Date(Date.now())
		},
		{
			id: '1',
			businessId: '1',
			name: 'Разработка API и интеграция',
			description: '',
			shortDescription:
				'Custom API solutions to connect your web applications with external services.',
			price: 40000,
			rating: 4.8,
			isActive: true,
			createdAt: new Date(Date.now()),
			updatedAt: new Date(Date.now())
		},
		{
			id: '1',
			businessId: '1',
			name: 'Разработка API и интеграция',
			description: '',
			shortDescription:
				'Custom API solutions to connect your web applications with external services.',
			price: 40000,
			rating: 4.8,
			isActive: true,
			createdAt: new Date(Date.now()),
			updatedAt: new Date(Date.now())
		},
		{
			id: '1',
			businessId: '1',
			name: 'Разработка API и интеграция',
			description: '',
			shortDescription:
				'Custom API solutions to connect your web applications with external services.',
			price: 40000,
			rating: 4.8,
			isActive: true,
			createdAt: new Date(Date.now()),
			updatedAt: new Date(Date.now())
		},
		{
			id: '1',
			businessId: '1',
			name: 'Разработка API и интеграция',
			description: '',
			shortDescription:
				'Custom API solutions to connect your web applications with external services.',
			price: 40000,
			rating: 4.8,
			isActive: true,
			createdAt: new Date(Date.now()),
			updatedAt: new Date(Date.now())
		}
	];

	let filters: TFilters = $state({
		minPrice: 0,
		maxPrice: 10000,

		minRating: 0,
		maxRating: 5,

		includeTags: [],
		excludeTags: [],

		searchInServiceName: true,
		searchInBusinessName: true,
		searchInServiceDescription: true
	});

	let orderList = [
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

	let selectedOrder = $state(orderList[0]);

	async function handleSearch() {
		isLoading = true;

		$page.url.searchParams.set('q', searchQuery);
		goto($page.url);

		try {
			const resp = await fetch(`/api/service?q=${searchQuery}`);

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
			<OrderSelect
				bind:value={selectedOrder}
				options={orderList}
				onSelectedChange={(v) => {
					return v.next;
				}}
			/>
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
							<Filters bind:filters />
						</div>
					</Drawer.Content>
				</Drawer.Portal>
			</Drawer.Root>
		</div>
		<aside class="hidden space-y-6 md:block">
			<h2 class="mb-2 text-lg font-semibold">Фильтры</h2>
			<Filters bind:filters />
		</aside>
		<div class="space-y-6">
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				<!-- {#each services as service}
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
				{/each} -->
				{#each new_services as service}
					<Card>
						<div class="flex flex-col space-y-1.5 p-6">
							<a class="text-2xl font-semibold leading-none tracking-tight" href="/service/{1}">
								Cloud hosting solutions
							</a>
						</div>
						<div class="p-6 pt-0">
							<p class="mb-2 text-surface-300">
								Reliable and scalable cloud hosting services for your web applications and
								databases.
							</p>
							<p class="font-semibold">Price: $1000</p>
							<p class="flex flex-row items-center gap-1">
								Rating: 4.6/5.0 <Star class="h-5 w-5 fill-yellow-500 stroke-yellow-900 stroke-1" />
							</p>
							<p class="mt-2 text-sm text-surface-300">Offered by: CloudNine Hosting</p>
						</div>
						<div class="flex flex-col items-start p-6 pt-0">
							<button
								class="focus-visible:ring-ring inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap
								rounded-md border border-surface-200 bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:border-surface-300
								hover:bg-surface-100-900 hover:text-surface-900-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
								disabled:pointer-events-none disabled:opacity-50 dark:border-surface-800 dark:hover:border-surface-700 [&_svg]:pointer-events-none
								[&_svg]:size-4 [&_svg]:shrink-0"
							>
								Узнать больше
								<ArrowRight />
							</button>
						</div>
					</Card>
				{/each}
			</div>
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
