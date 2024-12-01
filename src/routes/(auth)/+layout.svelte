<script lang="ts">
	const { children } = $props();
</script>

<main class="relative isolate flex h-full items-center justify-center overflow-hidden">
	<div
		class="absolute inset-x-0 -top-60 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 lg:-top-10"
		aria-hidden="true"
	>
		<div
			class="pulse relative left-[calc(50%-11rem)] aspect-[1155/678] w-[72.1875rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] lg:w-[120rem]"
			style="clip-path: polygon(81% 37%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 76% 73%, 75% 73%, 60.2% 62.4%, 56% 45%, 42% 51%, 36% 20%, 22% 66%, 12% 9%, 0 45%, 27% 48%, 46% 79%, 69% 47%);"
		></div>
	</div>
	{@render children()}
	<div
		class="absolute inset-x-0 left-20 top-[calc(100%-17rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-60"
		aria-hidden="true"
	>
		<div
			class="pulse relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
			style="clip-path: polygon(99% 38%, 97% 27%, 97% 27%, 85.5% 0.1%, 76% 73%, 97% 64%, 79% 51%, 71% 44%, 46% 60%, 55% 36%, 25% 67%, 27% 35%, 0 45%, 46% 60%, 62% 69%, 82% 27%);"
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
</style>
