<script>
	import TagsInput from '$lib/components/TagsInput.svelte';
</script>

<form class="form container mx-auto mt-20 w-1/2 rounded-[15px] bg-surface-100-900">
	<div class="form__title br-15 rounded-tl-[15px] rounded-tr-[15px] p-4 bg-tertiary-100-900">
		<h1>Создание услуги</h1>
	</div>
	<div class="form__content p-4">
		<div class="mt-4">
			<label for="service_name">Наименование услуги</label>
			<input
				class="peer w-full rounded-lg border px-4 py-2 placeholder-transparent transition-colors bg-surface-50-950
                        border-surface-200-800 focus:border-primary-500 focus:outline-none focus:ring
                        focus:ring-tertiary-100-900 dark:text-surface-950-50 dark:focus:border-primary-400 dark:focus:ring-primary-500"
				type="text"
				id="service_name"
				required
			/>
		</div>
		<div class="mt-4">
			<label for="service_short_desc">Короткое описание</label>
			<input
				class="peer w-full rounded-lg border px-4 py-2 placeholder-transparent transition-colors bg-surface-50-950
                        border-surface-200-800 focus:border-primary-500 focus:outline-none focus:ring
                        focus:ring-tertiary-100-900 dark:text-surface-950-50 dark:focus:border-primary-400 dark:focus:ring-primary-500"
				type="text"
				id="service_short_desc"
			/>
		</div>
		<div class="mt-4">
			<label for="service_desc">Описание</label>
			<textarea
				id="service_desc"
				rows="4"
				class="peer w-full rounded-lg border px-4 py-2 placeholder-transparent transition-colors bg-surface-50-950
                        border-surface-200-800 focus:border-primary-500 focus:outline-none focus:ring
                        focus:ring-primary-300 dark:text-surface-950-50 dark:focus:border-primary-400 dark:focus:ring-primary-500"
				required
			></textarea>
		</div>
		<TagsInput class="mt-10" />
		<div class="mt-4">
			<label for="service_price">Цена</label>
			<input
				class="peer w-full rounded-lg border px-4 py-2 placeholder-transparent transition-colors bg-surface-50-950
                        border-surface-200-800 focus:border-primary-500 focus:outline-none focus:ring
                        focus:ring-tertiary-100-900 dark:text-surface-950-50 dark:focus:border-primary-400 dark:focus:ring-primary-500"
				type="text"
				id="service_price"
				required
			/>
		</div>
		<button
			class="rounded-10 mt-2 rounded-[10px] p-4 text-black bg-tertiary-100-900 hover:rounded-[15px] hover:text-white"
			type="submit"
		>
			<p class="hover:text-white">Создать</p>
		</button>
	</div>
</form>
