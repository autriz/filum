<script lang="ts">
    import { Trash, Edit } from "lucide-svelte"; 

    let isLoading = true;

    let caption = '';
    
    let tableId = '';

    let options = [
        { id: 1, text: `Пользователи` },
        { id: 2, text: `Услуги` },
        { id: 3, text: `Комментарии` }
    ];

    type User = {
        id: string,
        name: string,
        surname: string,
        avatarUrl: string,
        accountId: string,
        createdAt: string,
        updatedAt: string
    }
    let users:User[] = [];

    async function fetchUsers() {
        isLoading = true;
        try {
            const response = await fetch('/api/users');
            if(!response.ok){
                throw new Error(`Failed to fetch users`);
            }
            users = await response.json();
        } catch(error) {
            console.error(`Error fetching users: ${error}`);
        } finally {
            isLoading = false;
        }
    }

    async function deleteUserById(userId:string) {
        let c = confirm(`Вы уверенны что хотите удалить пользователя с id ${userId}?`);
        if(c){
            await fetch(`/api/users/${userId}`, {method: 'DELETE'});
            alert(`Пользователь с id ${userId} успешно удалён`);
            fetchUsers()
        }
    }

    type Service = {
        id: string,
        businessId: string,
        title: string,
        description: string,
        price: number,
        createdAt: string,
        updatedAt: string,
        isActive: boolean,
        shortDescription: string
    }

    let services:Service[] = [];

    async function fetchServices() {
        isLoading = true;
        try {
            const response = await fetch('/api/services');
            if(!response.ok){
                throw new Error(`Failed to fetch services`);
            }
            services = await response.json();
        } catch(error) {
            console.error(`Error fetching services: ${error}`);
        } finally {
            isLoading = false;
        }
    }

    type Review = {
        id: string,
        businessId: string,
        title: string,
        description: string,
        price: number,
        createdAt: string,
        updatedAt: string,
        isActive: boolean,
        shortDescription: string
    }

    let reviews:Review[] = [];

    async function fetchReviews() {
        isLoading = true;
        try {
            const response = await fetch('/api/reviews');
            if(!response.ok){
                throw new Error(`Failed to fetch reviews`);
            }
            reviews = await response.json();
        } catch(error) {
            console.error(`Error fetching reviews: ${error}`);
        } finally {
            isLoading = false;
        }
    }


    function handleSubmit() {
        tableId = caption;
        if(tableId == '1'){
            fetchUsers()
        }
        if(tableId == '2'){
            fetchServices()
        }
        if(tableId == '3'){
            fetchReviews()
        }
    }
</script>

<div class="w-full">
    <header class="p-5 flex bg-surface-100-900">
        <h1>Admin</h1>
    </header>
    <div class="p-5 w-full grid grid-cols-[1fr_10fr] gap-2">
        <section class="p-5 bg-surface-100-900">
            <form on:submit|preventDefault={handleSubmit}>
                <select bind:value={caption}>
                  <option value="">Выберите опцию</option>
                  {#each options as option}
                    <option value={option.id}>
                      {option.text}
                    </option>
                  {/each}
                </select>
              
                <button type="submit">Выбрать</button>
              </form>
        </section>
        <section class="bg-surface-100-900">
            {#if !tableId}
                <h1>Выберите таблицу</h1>
            {:else}
                {#if isLoading}
                    <h1>Загрузка...</h1>
                {:else}
                    {#if tableId == '1'}
                        {#if users.length > 0}
                            <table class="w-full">
                                <caption class="p-2">
                                    {#if caption}
                                        {#each options as option}
                                            {#if option.id === parseInt(caption)}
                                                <h2>{option.text}</h2>
                                            {/if}
                                        {/each}
                                    {:else}
                                        <h2 class="text-xl">Выберите опцию</h2>
                                    {/if}
                                </caption>
                                <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Имя</th>
                                    <th scope="col">Фамилия</th>
                                    <th scope="col">Аватар</th>
                                    <th scope="col">ID Аккауна</th>
                                    <th scope="col">Создано</th>
                                    <th scope="col">Обновлено</th>
                                    <th scope="col">Ред.</th>
                                    <th scope="col">Удалить</th>
                                </tr>
                                </thead>
                                <tbody>
                                {#each users as user}
                                    <tr class="hover:bg-surface-200-800 hover:cursor-pointer">
                                        <th scope="row">{user.id}</th>
                                        <td class="p-1">{user.name}</td>
                                        <td class="p-1">{user.surname}</td>
                                        <td class="p-1">{user.avatarUrl}</td>
                                        <td class="p-1">{user.accountId}</td>
                                        <td class="p-1">{user.createdAt}</td>
                                        <td class="p-1">{user.updatedAt}</td>
                                        <td class="p-1"><Edit /></td>
                                        <td class="p-1" on:click={()=>{deleteUserById(user.id)}}><Trash /></td>
                                    </tr>
                                {/each}
                                </tbody>
                                <tfoot>
                                <tr>
                                    <th scope="row" colspan="2" class="text-xl">Кол-во записей</th>
                                    <td class="text-xl">{users.length}</td>
                                </tr>
                                </tfoot>
                            </table>
                        {:else}
                            <h1>Данные не найдены</h1>
                        {/if}
                    {/if}
                    {#if tableId == '2'}
                        {#if services.length > 0}
                            <table class="w-full">
                                <caption class="p-2">
                                    {#if caption}
                                        {#each options as option}
                                            {#if option.id === parseInt(caption)}
                                                <h2>{option.text}</h2>
                                            {/if}
                                        {/each}
                                    {:else}
                                        <h2 class="text-xl">Выберите опцию</h2>
                                    {/if}
                                </caption>
                                <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">ID Бизнеса</th>
                                    <th scope="col">Название</th>
                                    <th scope="col">Описание</th>
                                    <th scope="col">Краткое описание</th>
                                    <th scope="col">Цена</th>
                                    <th scope="col">Создано</th>
                                    <th scope="col">Обновлено</th>
                                    <th scope="col">Активно</th>
                                    <th scope="col">Ред.</th>
                                    <th scope="col">Удалить</th>
                                </tr>
                                </thead>
                                <tbody>
                                {#each services as service}
                                    <tr class="hover:bg-surface-200-800 hover:cursor-pointer">
                                        <th scope="row">{service.id}</th>
                                        <td class="p-1">{service.businessId}</td>
                                        <td class="p-1">{service.title}</td>
                                        <td class="p-1">{service.description}</td>
                                        <td class="p-1">{service.shortDescription}</td>
                                        <td class="p-1">{service.price}</td>
                                        <td class="p-1">{service.createdAt}</td>
                                        <td class="p-1">{service.updatedAt}</td>
                                        {#if service.isActive}
                                            <td class="p-1 text-success-900">{service.isActive}</td>
                                        {:else}
                                            <td class="p-1 text-error-900">{service.isActive}</td>
                                        {/if}
                                        <td class="p-1"><Edit /></td>
                                        <td class="p-1"><Trash /></td>
                                    </tr>
                                {/each}
                                </tbody>
                                <tfoot>
                                <tr>
                                    <th scope="row" colspan="2" class="text-xl">Кол-во записей</th>
                                    <td class="text-xl">{users.length}</td>
                                </tr>
                                </tfoot>
                            </table>
                        {:else}
                            <h1>Данные не найдены</h1>
                        {/if}
                    {/if}
                    {#if tableId == '3'}
                        {#if reviews.length > 0}
                            <h2>Отзывы</h2>
                        {:else}
                            <h1>Данные не найдены</h1>
                        {/if}
                    {/if}
                {/if}
            {/if}
        </section>
    </div>
</div>
