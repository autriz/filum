<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	let showCookieBanner = false;
	onMount(() => {
		const accepted = localStorage.getItem('cookiesAccepted');
		showCookieBanner = !accepted;
	});
	function acceptCookies() {
		localStorage.setItem('cookiesAccepted', 'true');
		showCookieBanner = false;
	}
</script>

{#if showCookieBanner}
	<div
		transition:fly={{ y: '50%', duration: 500, opacity: 0 }}
		class="cookie-banner fixed bottom-5 left-[50%] flex -translate-x-[50%] items-center justify-between rounded-md bg-surface-50 p-4 shadow-md dark:bg-surface-900"
	>
		<div>Мы используем файлы Cookie для работы сайта.</div>
		<button
			on:click={acceptCookies}
			class="ml-4 h-10 w-full rounded-md bg-primary-600 px-2 py-2 text-base font-semibold text-surface-50 hover:bg-primary-800 motion-safe:transition-colors"
		>
			Разрешить
		</button>
	</div>
{/if}
