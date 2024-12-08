<script lang="ts">
	import Avatar from '$lib/components/Avatar.svelte';
	// import Card from '$lib/components/Card.svelte';
	import type { Business, Review, Service, User } from '$lib/server/db/schema';
	import { ArrowLeft, Star } from 'lucide-svelte';
	import Button from '$lib/components/Button.svelte';

	const { data } = $props();

	const service = data.service;

	type NewService = Service & { shortDescription: string; rating: number; tags?: string[] };

	const formatter = new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB',
		trailingZeroDisplay: 'stripIfInteger'
	});
</script>

<main
	class="mx-auto flex w-full flex-col gap-6 px-2 pb-3 pt-2 lg:max-w-[1000px] 2xl:max-w-[1320px]"
>
	<a class="mt-2 flex w-fit items-center justify-center gap-2 [&_svg]:size-4" href="/search">
		<ArrowLeft />
		К услугам
	</a>
	<div class="grid gap-12 md:grid-cols-[2fr_1fr]">
		<section>
			<h1 class="mb-4 text-3xl font-bold md:text-4xl">{service.title}</h1>
			<h2 class="text-2xl font-semibold text-surface-300">{formatter.format(service.price)}</h2>
			<div class="mt-4">
				<pre class="whitespace-break-spaces break-words font-sans">
					{service.description}
				</pre>
			</div>
		</section>
		<section
			class="rounded-md border h-fit border-surface-200 p-6 shadow-md dark:border-surface-700 dark:bg-surface-900"
		>
			<div class="flex flex-row gap-3">
				<a href="/business/{service.business.id}">
					<Avatar
						class="h-16 w-16 rounded-full bg-surface-400 text-3xl"
						src={service.business.avatarUrl}
						alt={service.business.name}
					/>
				</a>
				<span>
					<a class="text-2xl font-semibold" href="/business/{service.business.id}"
						>{service.business.name}</a
					>
					<div class="flex flex-row items-center justify-center gap-2">
						<span class="flex items-center justify-center gap-2">
							{service.business.avgRating.toFixed(1)}/5.0
							<Star class="h-5 w-5 fill-yellow-500 stroke-yellow-900 stroke-1" />
						</span>
						<p class="text-surface-400">{service.business.reviewCount} отзыва</p>
					</div>
				</span>
			</div>
			<p class="text-md mt-3 text-surface-300">{service.business.about}</p>
		</section>
	</div>
	<section class="space-y-6">
		<h2 class="text-2xl font-semibold text-surface-950-50">Теги</h2>
		<div class="mt-3 flex gap-3">
			{#if service.tags}
				{#each service.tags as tag}
					<span
						class="w-fit cursor-default rounded-xl border border-surface-400 px-2 text-sm font-semibold"
						>{tag}</span
					>
				{/each}
			{/if}
		</div>
	</section>
	<section class="space-y-6">
		<h2 class="text-2xl font-semibold text-surface-950-50">Отзывы</h2>
		<form method="post">
			<Button class="block mb-2 mt-10" type="submit">Оставить отзыв</Button>
			<textarea id="newComment" rows="4" class="rounded-lg border border-surface-200 p-6 hover:border-surface-400 motion-safe:transition-colors dark:border-surface-700 dark:bg-surface-900 " placeholder="Leave a comment..."></textarea>
		</form>
		<div class="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
			{#each service.reviews as review (review.id)}
				{@const rating = review.rating}
				<div
					class="rounded-lg border border-surface-200 p-6 hover:border-surface-400 motion-safe:transition-colors dark:border-surface-700 dark:bg-surface-900"
				>
					<div class="flex w-fit items-center justify-center gap-4">
						<a href="/user/{review.user.id}">
							<Avatar
								class="h-10 w-10 rounded-full bg-surface-400"
								src={review.user.avatarUrl}
								alt="{review.user.name} {review.user.surname}"
							/>
						</a>
						<div>
							<h3 class="text-ellipsis text-2xl font-bold">
								{review.user.name}
								{review.user.surname}
							</h3>
							<div class="overflow-hidden" style="width: {rating}rem;">
								<span class="sr-only">{rating} звёзд</span>
								<span class="flex w-fit flex-row">
									<Star class="h-4 w-4 fill-yellow-500 stroke-yellow-900 stroke-1" />
									<Star class="h-4 w-4 fill-yellow-500 stroke-yellow-900 stroke-1" />
									<Star class="h-4 w-4 fill-yellow-500 stroke-yellow-900 stroke-1" />
									<Star class="h-4 w-4 fill-yellow-500 stroke-yellow-900 stroke-1" />
									<Star class="h-4 w-4 fill-yellow-500 stroke-yellow-900 stroke-1" />
								</span>
							</div>
						</div>
					</div>
					<p class="mt-3 text-surface-400 dark:text-surface-200">{review.comment}</p>
				</div>
			{/each}
		</div>
	</section>
	<!-- <section class="space-y-6">
		<h2 class="text-2xl font-semibold text-surface-950-50">Похожие услуги</h2>
	</section> -->
</main>
