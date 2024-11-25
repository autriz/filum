<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<div class="bg-surface-50-950">
	{@render children()}
</div>

<ModeWatcher defaultMode={'system'} />
