<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<svelte:head>
	<title>Filum</title>
	<meta property="og:title" content="Filum" />
	<meta property="og:description" content="Filum - это агрегатор IT услуг по Самарской области" />
</svelte:head>

<div class="bg-surface-50-950 text-surface-950-50">
	<Header />
	<div class="mt-[3.5rem] h-[calc(100vh_-_3.5rem)]">
		{@render children()}
	</div>
</div>

<ModeWatcher defaultMode={'system'} />
