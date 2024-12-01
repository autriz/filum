<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<div class="bg-surface-50-950 text-surface-950-50">
	<header
		class="fixed top-0 z-10 flex h-14 w-full flex-row gap-3 border-b border-surface-800 px-3 py-2 text-lg dark:bg-surface-50-950"
	>
		<a
			href="/"
			class="my-auto px-6 font-bold text-tertiary-400-600 hover:text-tertiary-300 motion-safe:transition-colors dark:hover:text-tertiary-500"
		>
			<span class="sr-only">Filum</span>
			Filum
		</a>
		<!-- <nav>
			<a>Бизнес</a>
			<a>Услуги</a>
		</nav> -->
		<span class="grow"></span>
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
	</header>
	<div class="mt-[3.5rem] h-[calc(100vh_-_3.5rem)]">
		{@render children()}
	</div>
</div>

<ModeWatcher defaultMode={'system'} />
