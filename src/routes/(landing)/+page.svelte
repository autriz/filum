<script>
	import Search from '$lib/components/Search.svelte';
</script>

<main class="relative isolate h-full overflow-hidden px-6 pt-14 lg:px-8">
	<div
		class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 lg:-top-60"
		aria-hidden="true"
	>
		<div
			class="pulse relative left-[calc(50%-11rem)] aspect-[1155/678] w-[72.1875rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] lg:w-[120rem]"
			style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
		></div>
	</div>
	<div class="m-auto max-w-2xl py-32 sm:py-48 lg:py-64">
		<svg aria-hidden="true" class="mask absolute inset-0 -z-10 h-full w-full stroke-surface-600/30">
			<defs>
				<pattern
					x="50%"
					y="-1"
					id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
					width="200"
					height="200"
					patternUnits="userSpaceOnUse"
				>
					<path d="M.5 200V.5H200" fill="none"></path>
				</pattern>
			</defs>
			<rect
				fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
				width="100%"
				height="100%"
				stroke-width="0"
			></rect>
		</svg>
		<div class="text-center">
			<h1
				class="select-none text-balance text-5xl font-semibold tracking-tight text-tertiary-400-600 sm:text-7xl"
			>
				Filum
			</h1>
			<!-- <p class="mt-8 text-pretty text-lg font-medium sm:text-xl/8">TODO</p> -->
			<form class="mx-auto mt-6 flex max-w-lg items-center" action="/search">
				<Search />
				<button
					type="submit"
					class="text-md ms-2 flex flex-row items-center justify-center gap-3 rounded-lg border border-primary-700 bg-primary-700 p-2.5 font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 motion-safe:transition-colors dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
				>
					<svg
						class="h-4 w-4"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 20"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
						/>
					</svg>
					<span>Поиск</span>
				</button>
			</form>
		</div>
	</div>
	<div
		class="absolute inset-x-0 top-[calc(100%-17rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
		aria-hidden="true"
	>
		<div
			class="pulse relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
			style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
		></div>
	</div>
</main>

<style>
	@media (prefers-reduced-motion) {
		.pulse {
			animation: none;
		}
	}

	@keyframes pulse {
		50% {
			opacity: 0.27;
		}
	}
	.pulse {
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	.mask {
		-webkit-mask-image: radial-gradient(50% 50% at center, white, transparent);
		mask-image: radial-gradient(50% 50% at center, white, transparent);
	}
</style>
