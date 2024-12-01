<script lang="ts">
	import { enhance } from '$app/forms';
	import Card from '$lib/components/Card.svelte';
	import { fade, fly } from 'svelte/transition';
	import type { ActionData } from './$types';
	import { onMount } from 'svelte';

	let { form }: { form: ActionData } = $props();
	let email = '';
	let password = '';

	const handleLogin = () => {
		console.log('Email:', email, 'Password:', password);
		// Здесь можно добавить логику для отправки данных на сервер
	};

	let ready = $state(false);

	let emailValue = $state('');
	let passwordValue = $state('');

	let allowed = $derived(!!emailValue && !!passwordValue);

	onMount(() => (ready = true));
</script>

{#if ready}
	<div transition:fly={{ y: -50, duration: 300, delay: 0 }} class="w-full">
		<Card
			class="z-10 m-auto w-full max-w-md rounded-lg bg-white p-6 shadow-md transition-colors dark:bg-gray-800"
		>
			<form class="mx-10 flex flex-col items-center p-5" method="post" use:enhance>
				<h1 class="text-2xl">Вход</h1>
				<div class="relative mt-10 w-full">
					<input
						bind:value={emailValue}
						id="email"
						type="email"
						name="email"
						minlength="6"
						maxlength="60"
						class="peer w-full rounded-lg border px-4 py-2 placeholder-transparent transition-colors bg-surface-50-950
						border-surface-200-800 focus:border-primary-500 focus:outline-none focus:ring
						focus:ring-primary-300 dark:text-surface-950-50 dark:focus:border-primary-400 dark:focus:ring-primary-500"
						placeholder="Почта"
						required
					/>
					<label
						for="email"
						class="absolute -top-5
						left-[17px] text-sm text-surface-950-50 peer-placeholder-shown:top-[9.5px] peer-placeholder-shown:text-base
						peer-placeholder-shown:text-surface-400 peer-focus:-top-5 peer-focus:text-sm
						peer-focus:text-primary-400 motion-safe:transition-all"
					>
						Почта
					</label>
				</div>
				<div class="relative mt-10 w-full">
					<input
						bind:value={passwordValue}
						id="password"
						type="password"
						name="password"
						minlength="6"
						maxlength="255"
						class="peer w-full rounded-lg border px-4 py-2 placeholder-transparent transition-colors bg-surface-50-950
						border-surface-200-800 focus:border-primary-500 focus:outline-none focus:ring
						focus:ring-primary-300 dark:text-surface-950-50 dark:focus:border-primary-400 dark:focus:ring-primary-500"
						placeholder="Пароль"
						required
					/>
					<label
						for="password"
						class="absolute -top-5
						left-[17px] text-sm text-surface-950-50 peer-placeholder-shown:top-[9.5px] peer-placeholder-shown:text-base
						peer-placeholder-shown:text-surface-400 peer-focus:-top-5 peer-focus:text-sm
						peer-focus:text-primary-400 motion-safe:transition-all"
					>
						Пароль
					</label>
				</div>
				<button
					class="focus-visible:ring-ring mt-10 inline-flex h-10 items-center justify-center gap-2
						whitespace-nowrap rounded-md border bg-background px-8 py-2 text-sm font-medium ring-offset-background
						transition-colors border-surface-200-800 hover:bg-surface-100-900 hover:text-surface-900-100 hover:border-surface-300-700
						focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
					disabled={!allowed}
					type="submit">Войти</button
				>
			</form>
			<span transition:fade={{ duration: 300 }} class="mt-2 flex flex-col text-center">
				<p>Нет аккаунта?</p>
				<a class="text-primary-400" href="/register">Зарегистрируйтесь</a>
			</span>
		</Card>
	</div>
{/if}
