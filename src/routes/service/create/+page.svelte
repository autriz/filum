<script>
	import TagsInput from "$lib/components/TagsInput.svelte";
</script>
<form class="container w-1/2 mx-auto bg-surface-100-900 form rounded-[15px] mt-20">
    <div class="form__title p-4 br-15 bg-tertiary-100-900 rounded-tl-[15px] rounded-tr-[15px]">
        <h1>Создание услуги</h1>
    </div>
    <div class="form__content p-4">
        <div class="form__content__item">
            <label for="service_name">Наименование услуги</label>
            <input class="peer w-full rounded-lg border px-4 py-2 placeholder-transparent transition-colors bg-surface-50-950
                        border-surface-200-800 focus:border-primary-500 focus:outline-none focus:ring
                        focus:ring-tertiary-100-900 dark:text-surface-950-50 dark:focus:border-primary-400 dark:focus:ring-primary-500" type="text" id="service_name" required/>
        </div>
        <div class="form__content__item">
            <label for="service_name">Короткое описание</label>
            <input class="peer w-full rounded-lg border px-4 py-2 placeholder-transparent transition-colors bg-surface-50-950
                        border-surface-200-800 focus:border-primary-500 focus:outline-none focus:ring
                        focus:ring-tertiary-100-900 dark:text-surface-950-50 dark:focus:border-primary-400 dark:focus:ring-primary-500" type="text" id="service_name" />
        </div>
        <div class="form__content__item">
            <label for="service_name">Описание</label>
            <textarea id="message" rows="4" 
            class="peer w-full rounded-lg border px-4 py-2 placeholder-transparent transition-colors bg-surface-50-950
                        border-surface-200-800 focus:border-primary-500 focus:outline-none focus:ring
                        focus:ring-primary-300 dark:text-surface-950-50 dark:focus:border-primary-400 dark:focus:ring-primary-500" required></textarea>
        </div>
        <TagsInput />
        <div class="form__content__item">
            <label for="service_name">Цена</label>
            <input class="peer w-full rounded-lg border px-4 py-2 placeholder-transparent transition-colors bg-surface-50-950
                        border-surface-200-800 focus:border-primary-500 focus:outline-none focus:ring
                        focus:ring-tertiary-100-900 dark:text-surface-950-50 dark:focus:border-primary-400 dark:focus:ring-primary-500" type="text" id="service_name" required/>
        </div>
        <button class="mt-2 p-4 rounded-[10px] hover:rounded-[15px] bg-tertiary-100-900 rounded-10 text-black"
            type="submit">
            <p class="hover:text-white">Создать</p>
        </button>
    </div>
</form>