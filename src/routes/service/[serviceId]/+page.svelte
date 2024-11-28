<script lang="ts">
	import type { Business, Review, Service, User } from '$lib/server/db/schema';
	import Container from './container.svelte';
	import { Star } from 'lucide-svelte';

	let data: Service = {
		id: '1',
		name: 'Разработка кастомных веб-сайтов',
		businessId: '1',
		description: 'test description',
		isActive: true,
		price: 13000
	};
	// days to complete?

	let business: Business = {
		id: '1',
		name: 'Business',
		about: 'test about',
		accountId: '1',
		address: 'ул. Пушкина, д. Колотушкина',
		avatarUrl: '',
		type: 'company'
	};

	let user: User = {
		id: '1',
		accountId: '2',
		name: 'aboba',
		surname: 'abobovich',
		avatarUrl: ''
	};

	let reviews: Review[] = [
		{
			id: '1',
			serviceId: '1',
			userId: '1',
			comment: 'test1',
			rating: 5.0,
			createdAt: new Date(Date.now()),
			updatedAt: new Date(Date.now())
		},
		{
			id: '2',
			serviceId: '1',
			userId: '1',
			comment: 'test2',
			rating: 4.3,
			createdAt: new Date(Date.now()),
			updatedAt: new Date(Date.now())
		},
		{
			id: '3',
			serviceId: '1',
			userId: '1',
			comment: 'test3',
			rating: 2.3,
			createdAt: new Date(Date.now()),
			updatedAt: new Date(Date.now())
		},
		{
			id: '4',
			serviceId: '1',
			userId: '1',
			comment: 'test4',
			rating: 3.5,
			createdAt: new Date(Date.now()),
			updatedAt: new Date(Date.now())
		}
	];
</script>

<div
	class="mx-auto flex min-h-full w-full flex-col gap-6 pt-6 lg:max-w-[1000px] 2xl:max-w-[1320px]"
>
	<div class="mx-4 flex flex-col gap-8 lg:flex-row">
		<section
			class="w-full rounded-lg border border-surface-600 p-6 bg-surface-200-800 hover:border-surface-400 motion-safe:transition-colors lg:w-[600px] 2xl:w-[800px]"
		>
			<h2 class="text-3xl font-bold">{data.name}</h2>
			<p class="mt-1 text-lg">{data.price}</p>
			<p class="mt-2 text-lg">{data.description}</p>
		</section>
		<section
			class="grow rounded-lg border border-surface-600 p-6 bg-surface-200-800 hover:border-surface-400 motion-safe:transition-colors"
		>
			<h2 class="text-3xl font-bold">{business.name}</h2>
			<p class="mt-1 text-lg">{business.about}</p>
			<p class="mt-1 text-lg">{business.address}</p>
		</section>
	</div>
	<section class="mx-4">
		<h2 class="text-2xl font-semibold text-surface-950-50">Отзывы</h2>
		<div class="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
			{#each reviews as review (review.id)}
				{@const rating = review.rating}
				<div
					class="rounded-lg border border-surface-600 p-6 bg-surface-200-800 hover:border-surface-400 motion-safe:transition-colors"
				>
					<div class="overflow-hidden" style="width: {rating}rem;">
						<span class="sr-only">{rating}</span>
						<span class="flex w-fit flex-row">
							<Star class="h-4 w-4 fill-surface-950-50" />
							<Star class="h-4 w-4 fill-surface-950-50" />
							<Star class="h-4 w-4 fill-surface-950-50" />
							<Star class="h-4 w-4 fill-surface-950-50" />
							<Star class="h-4 w-4 fill-surface-950-50" />
						</span>
					</div>
					<p class="mt-3 text-lg">{review.comment}</p>
					<span class="mt-3 text-sm">{user.name} {user.surname}</span>
				</div>
			{/each}
		</div>
	</section>
	<Container>Похожие услуги</Container>
</div>
