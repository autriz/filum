<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import type { ActionData } from './$types';
	import Card from '$lib/components/Card.svelte';
	import RadioGroup from '$lib/components/RadioGroup.svelte';

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
	let confirmPasswordValue = $state('');
	let businessType = $state<'freelancer' | 'company'>('freelancer');
	let usernameValue = $state('');

	let allowed = $derived(passwordValue === confirmPasswordValue && !!emailValue && !!passwordValue);

	let options = [
		{ label: 'Я заказчик', value: 'user' },
		{ label: 'Я исполнитель', value: 'business' }
	];
	let businessOptions = [
		{ label: 'Фрилансер', value: 'freelancer' },
		{ label: 'Компания', value: 'company' }
	];

	onMount(() => (ready = true));
</script>

{#if ready}
	<div transition:fly={{ y: -50, duration: 300, delay: 0 }} class="w-full">
		<Card
			class="z-10 m-auto w-full max-w-md rounded-lg bg-surface-50 p-6 shadow-md transition-colors dark:bg-surface-900"
		>
			<form class="mx-10 flex flex-col items-center p-5" method="post" use:enhance>
				<h1 class="text-2xl">Регистрация</h1>
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
						autocomplete="email"
						placeholder="Почта"
					/>
					<label
						for="email"
						class="absolute -top-5
                            left-[17px] select-none text-sm text-surface-950-50 peer-placeholder-shown:top-[9.5px]
                            peer-placeholder-shown:text-base peer-placeholder-shown:text-surface-400 peer-focus:-top-5
                            peer-focus:text-sm peer-focus:text-primary-400 motion-safe:transition-all"
					>
						Почта
					</label>
				</div>
				<section class="w-ful mt-10">
					<RadioGroup {options} defaultValue={'user'} orientation="horizontal" />
				</section>
				<div class="relative mt-10 w-full">
					<input
						bind:value={usernameValue}
						id="username"
						type="text"
						name="username"
						minlength="4"
						maxlength="60"
						class="peer w-full rounded-lg border px-4 py-2 placeholder-transparent transition-colors bg-surface-50-950
                            border-surface-200-800 focus:border-primary-500 focus:outline-none focus:ring
                            focus:ring-primary-300 dark:text-surface-950-50 dark:focus:border-primary-400 dark:focus:ring-primary-500"
						autocomplete="username"
						placeholder="Никнейм"
					/>
					<label
						for="username"
						class="absolute -top-5
                            left-[17px] select-none text-sm text-surface-950-50 peer-placeholder-shown:top-[9.5px]
                            peer-placeholder-shown:text-base peer-placeholder-shown:text-surface-400 peer-focus:-top-5
                            peer-focus:text-sm peer-focus:text-primary-400 motion-safe:transition-all"
					>
						Никнейм
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
						autocomplete="new-password"
						placeholder="Пароль"
					/>
					<label
						for="password"
						class="absolute -top-5
                            left-[17px] select-none text-sm text-surface-950-50 peer-placeholder-shown:top-[9.5px]
                            peer-placeholder-shown:text-base peer-placeholder-shown:text-surface-400 peer-focus:-top-5
                            peer-focus:text-sm peer-focus:text-primary-400 motion-safe:transition-all"
					>
						Пароль
					</label>
				</div>
				<div class="relative mt-10 w-full">
					<input
						bind:value={confirmPasswordValue}
						id="confirmPassword"
						type="password"
						minlength="6"
						maxlength="255"
						class="peer w-full rounded-lg border px-4 py-2 placeholder-transparent transition-colors bg-surface-50-950
                            border-surface-200-800 focus:border-primary-500 focus:outline-none focus:ring
                            focus:ring-primary-300 dark:text-surface-950-50 dark:focus:border-primary-400 dark:focus:ring-primary-500"
						autocomplete="new-password"
						placeholder="Повторить пароль"
					/>
					<label
						for="confirmPassword"
						class="absolute -top-5
                            left-[17px] select-none text-sm text-surface-950-50 peer-placeholder-shown:top-[9.5px]
                            peer-placeholder-shown:text-base peer-placeholder-shown:text-surface-400 peer-focus:-top-5
                            peer-focus:text-sm peer-focus:text-primary-400 motion-safe:transition-all"
					>
						Повторить пароль
					</label>
				</div>
				<button
					class="focus-visible:ring-ring mt-10 inline-flex h-10 items-center justify-center gap-2
                        whitespace-nowrap rounded-md border bg-background px-8 py-2 text-sm font-medium ring-offset-background
                        transition-colors border-surface-200-800 hover:bg-surface-100-900 hover:text-surface-900-100 hover:border-surface-300-700
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
					disabled={!allowed}
					type="submit">Зарегистрироваться</button
				>
			</form>
			<span transition:fade={{ duration: 300 }} class="mt-2 flex flex-col text-center">
				<p>Есть аккаунт?</p>
				<a class="text-primary-400" href="/login">Войти</a>
			</span>
		</Card>
	</div>
{/if}

<style>
	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus,
	input:-webkit-autofill:active {
		-webkit-background-clip: text;
		transition: background-color 5000s ease-in-out 0s;
		box-shadow: inset 0 0 20px 20px #00000000;
	}
</style>
