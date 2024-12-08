<script lang="ts">
	import Card from '../../../lib/components/Card.svelte';
	import { Globe, Mail, MapPin, Phone } from 'lucide-svelte';
	import Telegram from '../../../lib/components/icons/Telegram.svelte';
	import Viber from '../../../lib/components/icons/Viber.svelte';
	import Whatsapp from '../../../lib/components/icons/Whatsapp.svelte';

	const { contacts } = $props();

	function getIcon(contactType: 'phone' | 'telegram' | 'viber' | 'whatsapp' | 'email' | 'address') {
		switch (contactType) {
			case 'phone':
				return Phone;
			case 'telegram':
				return Telegram;
			case 'viber':
				return Viber;
			case 'whatsapp':
				return Whatsapp;
			case 'email':
				return Mail;
			case 'address':
				return MapPin;
		}
	}
</script>

<Card class="sticky top-24">
	<div class="flex flex-col space-y-1.5 p-6">
		<h3 class="text-2xl font-semibold leading-none tracking-tight">Контакты</h3>
	</div>
	<div class="space-y-4 p-6 pt-0">
		{#each contacts as contact}
			<div class="flex items-center space-x-2">
				{#if contact.type === 'website'}
					<Globe class="h-5 w-5 text-surface-300" />
					<a
						href={contact.contact}
						target="_blank"
						rel="noopener noreferrer"
						class="text-primary hover:underline">{contact.contact}</a
					>
				{:else}
					{@const Icon = getIcon(contact.type)}
					<div class="flex items-center space-x-2">
						<Icon class="h-5 w-5 text-surface-300" />
						<span class="text-surface-950-50">
							{contact.contact}
						</span>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</Card>
