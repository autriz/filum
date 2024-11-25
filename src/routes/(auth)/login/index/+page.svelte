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

<div class="min-h-screen flex items-center justify-center">
	<div class="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
		<h1 class="text-2xl font-semibold text-center text-gray-800 mb-6">Вход</h1>

		<form method="post" action="?/login" use:enhance class="space-y-4">
			<div>
				<label for="email" class="block text-sm font-medium text-gray-600">Электронная почта</label>
				<input
					id="email"
					type="email"
					bind:value={email}
					placeholder="example@example.com"
					class="mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500"
					required
				/>
			</div>

			<div>
				<label for="password" class="block text-sm font-medium text-gray-600">Пароль</label>
				<input
					id="password"
					type="password"
					bind:value={password}
					placeholder="Введите пароль"
					class="mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500"
					required
				/>
			</div>

			<button
				type="submit"
				class="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
			>
				Войти
			</button>
		</form>

		<p class="mt-4 text-center text-sm text-gray-600">
			Нет аккаунта?
			<a href="/register" class="text-blue-500 hover:underline">Зарегистрируйтесь</a>
		</p>
	</div>
</div>
