<script lang="ts">
	import Avatar from '$lib/components/Avatar.svelte';
	import BusinessContacts from './BusinessContacts.svelte';
	import Card from '$lib/components/Card.svelte';
	import { ArrowRight, Star } from 'lucide-svelte';

	const { data } = $props();

	const formatter = new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB',
		trailingZeroDisplay: 'stripIfInteger'
	});

	const business = data.business;
</script>

<main
	class="mx-auto flex w-full flex-col gap-6 px-2 pb-3 pt-2 lg:max-w-[1000px] 2xl:max-w-[1320px]"
>
	<div class="grid gap-12 md:grid-cols-[2fr_1fr]">
		<div class="mt-3 space-y-8">
			<section class="flex items-center space-x-6">
				<Avatar
					class="h-24 w-24 rounded-full bg-surface-400 text-3xl text-surface-50"
					src={business.avatarUrl}
					alt={business.name}
				/>
				<div>
					<h1 class="text-3xl font-bold md:text-4xl">{business.name}</h1>
					<div class="mt-2 flex items-center">
						<Star class="h-5 w-5 fill-yellow-500 stroke-yellow-900 stroke-1" />
						<span class="ml-1 text-lg"
							>{business.avgRating.toFixed(1)} ({business.reviewCount} отзыва)</span
						>
					</div>
				</div>
			</section>
			<section>
				<h2 class="mb-4 text-2xl font-semibold">О нас</h2>
				<p class="text-surface-300">{business.about}</p>
			</section>
			<section>
				<h2 class="mb-4 text-2xl font-semibold">Что мы умеем</h2>
				<div class="flex flex-wrap gap-2">
					{#each business.tags as tag}
						<span
							class="w-fit cursor-default rounded-xl border border-surface-400 px-2 text-sm font-semibold"
						>
							{tag}
						</span>
					{/each}
				</div>
			</section>
			<section>
				<h2 class="mb-4 text-2xl font-semibold">Наши услуги</h2>
				<div class="space-y-4">
					{#each business.services as service}
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
								<p class="font-semibold">Price: {formatter.format(service.price)}</p>
								<p class="flex flex-row items-center gap-1">
									Рейтинг: {service.rating.toFixed(1)}/5.0 <Star
										class="h-5 w-5 fill-yellow-500 stroke-yellow-900 stroke-1"
									/>
								</p>
							</div>
							<div class="flex flex-col items-start p-6 pt-0">
								<a
									class="focus-visible:ring-ring inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap
                                    rounded-md border border-surface-200 bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:border-surface-300
                                    hover:bg-surface-100-900 hover:text-surface-900-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                                    disabled:pointer-events-none disabled:opacity-50 dark:border-surface-800 dark:hover:border-surface-700 [&_svg]:pointer-events-none
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
			</section>
		</div>
		<div>
			<BusinessContacts contacts={business.contacts} />
		</div>
	</div>
</main>
