<script module lang="ts">
	export type Filters = {
		minPrice: number;
		maxPrice: number;

		minRating: number;
		maxRating: number;

		includeTags: string[];
		excludeTags: string[];

		orderBy: 'relevance' | 'publication_time' | 'price_asc' | 'price_desc';

		searchInServiceName: Writable<boolean>;
		searchInBusinessName: Writable<boolean>;
		searchInServiceDescription: Writable<boolean>;
	};
</script>

<script lang="ts">
	import Checkbox from '$lib/components/Checkbox.svelte';
	import Slider from '$lib/components/Slider.svelte';
	import TagsInput from '$lib/components/TagsInput.svelte';
	import { Star } from 'lucide-svelte';
	import FilterSection from './FilterSection.svelte';
	import { writable, type Writable } from 'svelte/store';

	let {
		filters = $bindable({
			minPrice: 0,
			maxPrice: 0,

			minRating: 0,
			maxRating: 5,

			includeTags: [],
			excludeTags: [],

			orderBy: 'relevance',

			searchInServiceName: writable(true),
			searchInBusinessName: writable(true),
			searchInServiceDescription: writable(true)
		}),
		limits
	}: {
		filters: Filters;
		limits: {
			minPrice: number;
			maxPrice: number;

			minRating: number;
			maxRating: number;
		};
	} = $props();
</script>

<FilterSection title="Цена" class="mt-2">
	<Slider
		class="mt-2"
		step={1}
		min={limits.minPrice}
		max={limits.maxPrice}
		defaultValue={[filters.minPrice, filters.maxPrice]}
		onValueChange={(v) => {
			[filters.minPrice, filters.maxPrice] = v.next;

			return v.next;
		}}
	/>
	<div class="mt-2 flex justify-between">
		<span>{filters.minPrice}₽</span>
		<span>{filters.maxPrice}₽</span>
	</div>
</FilterSection>
<FilterSection title="Рейтинг" class="mt-2">
	<Slider
		class="mt-2"
		step={0.1}
		min={limits.minRating}
		max={limits.maxRating}
		defaultValue={[filters.minRating, filters.maxRating]}
		onValueChange={(v) => {
			[filters.minRating, filters.maxRating] = v.next;

			return v.next;
		}}
	/>
	<div class="mt-2 flex justify-between">
		<span class="flex flex-row items-center gap-1">
			<p>{filters.minRating}</p>
			<Star class="h-5 w-5 fill-yellow-500 stroke-yellow-900 stroke-1" />
		</span>
		<span class="flex flex-row items-center gap-1">
			<p>{filters.maxRating}</p>
			<Star class="h-5 w-5 fill-yellow-500 stroke-yellow-900 stroke-1" />
		</span>
	</div>
</FilterSection>
<FilterSection title="Добавить теги" class="mt-2">
	<TagsInput
		defaultTags={filters.includeTags}
		onTagsChange={(v) => {
			filters.includeTags = v.next.map((val) => val.value);

			return v.next;
		}}
	/>
</FilterSection>
<FilterSection title="Исключить теги" class="mt-2">
	<TagsInput
		defaultTags={filters.excludeTags}
		onTagsChange={(v) => {
			filters.excludeTags = v.next.map((val) => val.value);

			return v.next;
		}}
	/>
</FilterSection>
<FilterSection title="Ключевые слова" class="flex flex-col gap-1">
	<div class="flex items-center">
		<Checkbox
			id="service-name"
			class="size-5 rounded-md shadow bg-surface-950-50 text-surface-50-950 hover:bg-surface-900-100 motion-safe:transition-colors"
			checked={filters.searchInServiceName}
		/>
		<label class="select-none pl-4 font-medium text-surface-950-50" for="service-name">
			В названии услуги
		</label>
	</div>
	<div class="flex items-center">
		<Checkbox
			id="business-name"
			class="size-5 rounded-md shadow bg-surface-950-50 text-surface-50-950 hover:bg-surface-900-100 motion-safe:transition-colors"
			checked={filters.searchInBusinessName}
		/>
		<label class="select-none pl-4 font-medium text-surface-950-50" for="business-name">
			В названии бизнеса
		</label>
	</div>
	<div class="flex items-center">
		<Checkbox
			id="service-description"
			class="size-5 rounded-md shadow bg-surface-950-50 text-surface-50-950 hover:bg-surface-900-100 motion-safe:transition-colors"
			checked={filters.searchInServiceDescription}
		/>
		<label class="select-none pl-4 font-medium text-surface-950-50" for="service-description">
			В описании услуги
		</label>
	</div>
</FilterSection>
