<script lang="ts">
	import { page } from '$app/stores';
	import { Edit, Eye, Trash, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { createPagination, melt } from '@melt-ui/svelte';
	import { goto } from '$app/navigation';

	const { data } = $props();

	const {
		elements: { root, pageTrigger, prevButton, nextButton },
		states: { pages, range }
	} = createPagination({
		count: data.rowsCount,
		perPage: data.limit,
		defaultPage: data.page,
		siblingCount: 1,
		onPageChange: ({ curr, next }) => {
			$page.url.searchParams.set('page', next.toString());
			if (data.limit != 15) {
				$page.url.searchParams.set('limit', data.limit.toString());
			}
			goto($page.url, { invalidateAll: true });

			return next;
		}
	});

	async function handleDelete(id: string) {
		alert('todo delete');
	}
</script>

<main class="relative flex flex-col">
	<div class="h-full grow overflow-auto md:w-fit">
		<table class="relative table-fixed text-left text-sm text-surface-900-100 md:w-full">
			<thead class="sticky top-0 uppercase bg-surface-200-800 text-surface-700-300">
				<tr>
					{#each data.columns as column}
						<th scope="col" class="px-6 py-3">{column}</th>
					{/each}
					<th></th>
				</tr>
			</thead>
			<tbody class="overflow-auto">
				{#each data.rows as row}
					<tr class="border-b bg-surface-50-950 border-surface-200-800 hover:bg-surface-100-900">
						{#each data.columns as column}
							<td class="min-w-[120px] whitespace-nowrap text-wrap break-all px-6 py-4"
								>{row[column]}</td
							>
						{/each}
						<td>
							<a
								class="flex w-fit gap-1 hover:underline"
								href="/admin/{$page.params['page']}/{row.id}"
							>
								Просмотр
								<Eye />
							</a>
							<a
								class="flex w-fit gap-1 hover:underline"
								href="/admin/{$page.params['page']}/{row.id}/edit"
							>
								Изменить
								<Edit />
							</a>
							<button class="flex gap-1 hover:underline" onclick={() => handleDelete(row.id)}>
								Удалить
								<Trash />
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<nav
		class="flex w-full flex-col flex-wrap items-center justify-between border-t px-4 py-4 border-surface-200-800 md:flex-row"
		aria-label="Table navigation"
		use:melt={$root}
	>
		<span class="text-md text-surface-800-200"
			>Показ <span class="font-semibold text-surface-900-100">{$range.start}-{$range.end}</span>
			из
			<span class="font-semibold text-surface-900-100">{data.rowsCount}</span></span
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
						disabled={data.page === page.value}
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
</main>
