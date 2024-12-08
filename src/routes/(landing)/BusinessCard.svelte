<script lang="ts">
	import { Star } from 'lucide-svelte';
	import type { BusinessWithRating } from '$lib/server/db/schema';
	import Avatar from '../../lib/components/Avatar.svelte';

	type Props = {
		business: BusinessWithRating;
	};

	let { business }: Props = $props();
</script>

<div
	class="card transform rounded-lg border bg-surface-50 px-8 py-4 shadow-md transition-all border-surface-200-800 hover:scale-105 hover:shadow-xl dark:bg-surface-800"
>
	<Avatar
		src={business.avatarUrl}
		alt={business.name}
		class="mx-auto h-24 w-24 select-none rounded-full bg-surface-400 object-cover text-3xl text-surface-50"
	/>
	<div class="flex w-full items-center justify-center">
		<a
			class="mx-auto mt-4 text-center text-xl font-semibold text-surface-950-50"
			href="/business/{business.id}"
		>
			{business.name}
		</a>
	</div>
	<p class="mt-2 text-center text-sm text-surface-400">{business.about}</p>
	<div class="rating mt-4 text-center">
		<span class="flex flex-row flex-nowrap justify-center gap-1 text-sm">
			Средняя оценка:
			<p class="flex flex-row">
				{business.averageRating}
				<Star class="h-5 w-5 fill-yellow-500 stroke-yellow-900 stroke-1" />
			</p>
		</span>
	</div>
</div>
