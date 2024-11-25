<main class="relative isolate grid h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
	<div
		class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 lg:-top-60"
		aria-hidden="true"
	>
		<div
			class="pulse relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] lg:w-[120rem]"
			style="clip-path: polygon(85% 46%, 94% 42%, 100% 16%, 80% 0, 70% 15%, 79% 31%, 66% 41%, 63% 65%, 53% 74%, 45% 57%, 36% 71%, 23% 83%, 42% 96%, 69% 96%, 83% 83%, 95% 58%);"
		></div>
	</div>
	<div class="text-center">
		<p class="text-3xl font-semibold text-primary-400 dark:text-primary-200">404</p>
		<h1
			class="mt-3 text-balance text-5xl font-semibold tracking-tight text-surface-900-100 sm:text-7xl"
		>
			Страница не найдена
		</h1>
		<p class="mt-6 text-pretty text-lg font-medium sm:text-xl/8">
			Мы не нашли страницу, которую вы искали.
		</p>
		<div class="mt-10 flex items-center justify-center gap-x-6">
			<a
				href="/"
				class="text-md rounded-md bg-primary-600 px-4 py-3 font-semibold text-surface-50 shadow-sm transition-colors hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
			>
				На главную
			</a>
		</div>
	</div>
</main>

<style>
	@keyframes pulse {
		50% {
			opacity: 0.27;
		}
	}
	.pulse {
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}
</style>
