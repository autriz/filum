<script lang="ts">
	import Avatar from '$lib/components/Avatar.svelte';
	import Card from '$lib/components/Card.svelte';
	import type { User } from '$lib/server/db/schema';
	import { Star } from 'lucide-svelte';

	const { data } = $props();

	console.log(data);

	const user = data.user;
</script>

<main
	class="mx-auto flex w-full flex-col gap-6 px-2 pb-3 pt-2 lg:max-w-[1000px] 2xl:max-w-[1320px]"
>
	<div class="flex flex-col gap-12">
		<div class="mt-3 space-y-8">
			<section class="flex items-center space-x-6">
				<Avatar
					class="h-24 w-24 rounded-full bg-surface-400 text-3xl text-surface-50"
					src={user.avatarUrl}
					alt="{user.name} {user.surname}"
				/>
				<div>
					<h1 class="text-3xl font-bold md:text-4xl">{user.name}</h1>
					<h1 class="text-3xl font-bold md:text-4xl">{user.surname}</h1>
					<!-- <h1 class="text-3xl font-bold md:text-4xl">{user.createdAt}</h1> -->
				</div>
		</div>
		<div class="flex flex-col gap-4 ">
			<h1 class="text-3xl font-bold">Мои отзывы</h1>
			{#each user.reviews as review (review.id)}
			{@const rating = review.rating}
					<div
						class="rounded-lg border border-surface-200 p-6 hover:border-surface-400 motion-safe:transition-colors dark:border-surface-700 dark:bg-surface-900"
					>
						<div class="flex w-fit items-center justify-center gap-4">
							<div>
								<a class="text-ellipsis text-2xl font-bold" href="/service/{review.service.id}">
									{review.service.title}
								</a>
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
	</div>
</main>



