<script lang="ts">
	import { createAvatar, melt, type CreateAvatarProps } from '@melt-ui/svelte';

	type Props = CreateAvatarProps & { class?: string; alt?: string };

	let { src = $bindable(''), alt = $bindable(''), class: className, ...props }: Props = $props();

	let shortenedAlt = alt
		?.split(' ')
		.map((s) => s[0])
		.join('')
		.toUpperCase();

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
