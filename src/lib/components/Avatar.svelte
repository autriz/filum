<script lang="ts">
	import { createAvatar, melt, type CreateAvatarProps } from '@melt-ui/svelte';

	type Props = CreateAvatarProps & { class?: string; alt?: string };

	let { src = $bindable(''), alt = $bindable(''), class: className, ...props }: Props = $props();

	let shortenedAlt = $state('');

	if (alt.length > 0) {
		let words = alt.split(' ');

		if (words.length > 1) {
			let symbols = words.map((s) => s[0]);
			let firstAndLastSymbols = [symbols.at(0), symbols.at(-1)];

			shortenedAlt = firstAndLastSymbols.join('').toUpperCase();
		} else {
			shortenedAlt = words.at(0)![0].toUpperCase();
		}
	}

	const {
		elements: { image, fallback }
	} = createAvatar({
		...props,
		src
	});
</script>

<div class="{className} flex items-center justify-center">
	<img use:melt={$image} alt="Avatar" class="h-full w-full rounded-[inherit]" />
	<span use:melt={$fallback} class="font-medium text-[inherit]">
		{shortenedAlt}
	</span>
</div>
