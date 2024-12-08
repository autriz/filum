<script lang="ts">
	import { page } from '$app/stores';
	import Avatar from './Avatar.svelte';
	import { slide } from 'svelte/transition';

	const profile = $page.data.profile;

	let inAdminRoute = $derived($page.route.id?.startsWith('/admin'));
</script>

<header
	class="fixed top-0 z-10 flex h-14 w-full flex-row gap-3 border-b border-surface-800 px-3 py-2 text-lg dark:bg-surface-50-950"
>
	{#if inAdminRoute}
		<a
			href="/admin"
			class="my-auto flex items-center justify-center px-6 font-bold text-tertiary-400-600
            hover:text-tertiary-300 motion-safe:transition-colors dark:hover:text-tertiary-500"
		>
			<span class="sr-only">Filum Admin</span>
			<h1 class="mr-1 text-xl">Filum</h1>
			<span class="text-surface-950-50">
				<span class="h-full border border-surface-950-50"></span>
				<span>Admin</span>
			</span>
		</a>
		<span class="grow"></span>
	{:else}
		<a
			href="/"
			class="my-auto px-6 font-bold text-tertiary-400-600 hover:text-tertiary-300 motion-safe:transition-colors dark:hover:text-tertiary-500"
		>
			<span class="sr-only">Filum</span>
			<h1 class="text-xl">Filum</h1>
		</a>
		<span class="grow"></span>
		{#if profile}
			<a href="/profile">
				{#if profile.type === "user"}
					<Avatar src={profile.avatarUrl} alt="{profile.name} {profile.surname}" />
				{:else}
					<Avatar src={profile.avatarUrl} alt="{profile.name}" />
				{/if}
			</a>
		{:else}
			<div class="flex gap-4 px-6">
				<a
					href="/login"
					class="flex items-center justify-center rounded-md border px-4 py-2 border-tertiary-400-600 hover:border-tertiary-300 motion-safe:transition-colors dark:hover:border-tertiary-500"
				>
					Войти
				</a>
				<a
					href="/register"
					class="flex items-center justify-center rounded-md border px-4 py-2 border-tertiary-400-600 hover:border-tertiary-300 hover:bg-tertiary-400-600 motion-safe:transition-colors dark:hover:border-tertiary-500"
				>
					Регистрация
				</a>
			</div>
		{/if}
	{/if}
</header>
