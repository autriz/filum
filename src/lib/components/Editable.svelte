<script lang="ts">
	import { z } from 'zod';
	import Switch from './Switch.svelte';
	import DatePicker from './DatePicker.svelte';

	let { value = $bindable(), columnName } = $props();

	const valueType = typeof value;
</script>

{#if valueType === 'string'}
	<textarea
		id={columnName}
		name={columnName}
		aria-label={columnName}
		class="rounded-md border border-surface-400 p-1"
		bind:value
	>
		{value}
	</textarea>
{:else if valueType === 'number'}
	<input bind:value />
{:else if valueType === 'boolean'}
	<Switch bind:value id={columnName} name={columnName} />
{:else}
	<!-- Date -->
	<DatePicker bind:value name={columnName} />
{/if}
