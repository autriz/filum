<script lang="ts">
	import { Star } from 'lucide-svelte';
	import type { BusinessWithRating } from '$lib/server/db/schema';
	import Avatar from './Avatar.svelte';

	type Props = {
		business: BusinessWithRating;
	};

	let { business }: Props = $props();
</script>

<div
	class="card transform rounded-lg border bg-surface-50 p-4 shadow-md transition-all border-surface-200-800 hover:scale-105 hover:shadow-xl dark:bg-surface-800"
>
	<Avatar
		src={business.avatarUrl}
		alt={business.name}
		class="mx-auto h-24 w-24 rounded-full bg-surface-400 object-cover text-3xl text-surface-50"
	/>
	<h3 class="mt-4 text-center text-xl font-semibold text-surface-950-50">{business.name}</h3>
	<p class="text-center text-sm text-surface-300">{business.type}</p>
	<p class="mt-2 text-center text-sm text-surface-400">{business.about}</p>
	<div class="rating mt-4 text-center">
		<span class="flex justify-center gap-1 text-sm">
			Средняя оценка: {business.averageRating}
			<Star class="h-5 w-5 fill-yellow-500 stroke-yellow-900 stroke-1" />
		</span>
	</div>
</div>
