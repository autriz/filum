<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
	let email = '';
	let password = '';

	const handleLogin = () => {
		console.log('Email:', email, 'Password:', password);
		// Здесь можно добавить логику для отправки данных на сервер
	};
</script>

<div
	class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors"
>
	<div
		class=" rounded-lg p-6 w-full max-w-md bg-white dark:bg-gray-800 transition-colors"
		style="box-shadow: 0px -2px 62px 19px rgba(34, 60, 80, 0.2)"
	>
		<h1 class="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-6">Вход</h1>

		<form method="post" action="?/login" use:enhance class="space-y-4">
			<div>
				<label for="email" class="block text-sm font-medium text-gray-600 dark:text-gray-300">Электронная почта</label>
				<input
					id="email"
					name="email"
					type="email"
					bind:value={email}
					placeholder="example@example.com"
					class="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-400 dark:text-white"
					required
				/>
			</div>

			<div>
				<label for="password" class="block text-sm font-medium text-gray-600 dark:text-gray-300">Пароль</label>
				<input
					id="password"
					name="password"
					type="password"
					bind:value={password}
					placeholder="Введите пароль"
					class="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-400 dark:text-white"
					required
				/>
			</div>

			<button
				type="submit"
				class="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-500"
			>
				Войти
			</button>
		</form>

		<p class="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
			Нет аккаунта?
			<a href="/register" class="text-blue-500 dark:text-blue-400 hover:underline">Зарегистрируйтесь</a>
		</p>
	</div>
</div>

