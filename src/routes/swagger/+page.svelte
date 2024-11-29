<script>
	import SwaggerUI from 'swagger-ui';
	import 'swagger-ui/dist/swagger-ui.css';
	import { onMount } from 'svelte';

	onMount(() => {
		SwaggerUI({
			dom_id: '#swagger-container',
			url: '/openapi.json'
		});
	});
</script>

<h3 class="my-5 text-center text-2xl font-bold">API Documentation for Filum</h3>

<div id="swagger-container" class="min-h-full bg-surface-50 pt-8"></div>
