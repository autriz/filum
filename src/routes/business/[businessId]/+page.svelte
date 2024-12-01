<script lang="ts">
	import Avatar from '$lib/components/Avatar.svelte';
	import Card from '$lib/components/Card.svelte';
	import { ArrowRight, Globe, Mail, MapPin, Phone, Star } from 'lucide-svelte';

	const formatter = new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB',
		trailingZeroDisplay: 'stripIfInteger'
	});

	const business = {
		id: '1',
		name: 'WebCraft Solutions',
		logo: '/logos/webcraft-solutions.png',
		description:
			"WebCraft Solutions is a leading web development agency specializing in creating bespoke digital experiences. With a team of skilled developers, designers, and project managers, we've been delivering high-quality web solutions to businesses of all sizes since 2010. Our commitment to innovation, attention to detail, and customer satisfaction sets us apart in the industry.",
		rating: 4.8,
		reviewCount: 127,
		website: 'https://webcraftsolutions.com',
		email: 'contact@webcraftsolutions.com',
		phone: '+1 (555) 123-4567',
		address: '123 Tech Lane, Silicon Valley, CA 94000',
		services: [
			{
				id: 1,
				title: 'Custom Web Development',
				description:
					'Tailor-made websites designed to meet your specific business needs and goals.',
				price: 5000,
				rating: 4.8
			},
			{
				id: 2,
				title: 'E-commerce Solutions',
				description: 'Robust online stores with secure payment gateways and inventory management.',
				price: 3500,
				rating: 4.6
			},
			{
				id: 3,
				title: 'Web Application Development',
				description:
					'Scalable and responsive web applications built with cutting-edge technologies.',
				price: 7000,
				rating: 4.9
			}
		],
		expertise: [
			'Full-Stack Development',
			'UI/UX Design',
			'E-commerce',
			'Web Applications',
			'API Integration',
			'Cloud Hosting'
		],
		reviews: [
			{
				id: 1,
				author: 'John Doe',
				avatar: '/avatars/john-doe.png',
				rating: 5,
				comment:
					'Exceptional service! The team delivered a website that perfectly captures our brand and meets all our functional requirements.'
			},
			{
				id: 2,
				author: 'Jane Smith',
				avatar: '/avatars/jane-smith.png',
				rating: 4,
				comment:
					'Great experience working with WebCraft Solutions. They were responsive, professional, and delivered on time.'
			},
			{
				id: 3,
				author: 'Mike Johnson',
				avatar: '/avatars/mike-johnson.png',
				rating: 5,
				comment:
					'The custom features they developed for our website have significantly improved our user engagement and conversion rates.'
			}
		]
	};
</script>

<main
	class="mx-auto flex w-full flex-col gap-6 px-2 pb-3 pt-2 lg:max-w-[1000px] 2xl:max-w-[1320px]"
>
	<div class="grid gap-12 md:grid-cols-[2fr_1fr]">
		<div class="space-y-8">
			<section class="flex items-center space-x-6">
				<Avatar src={business.logo} alt={business.name} />
				<div>
					<h1 class="text-3xl font-bold md:text-4xl">{business.name}</h1>
					<div class="mt-2 flex items-center">
						<Star class="h-5 w-5 fill-yellow-500 stroke-yellow-900 stroke-1" />
						<span class="ml-1 text-lg"
							>{business.rating.toFixed(1)} ({business.reviewCount} reviews)</span
						>
					</div>
				</div>
			</section>
			<section>
				<h2 class="mb-4 text-2xl font-semibold">About us</h2>
				<p class="text-surface-300">{business.description}</p>
			</section>
			<section>
				<h2 class="mb-4 text-2xl font-semibold">Area of Expertise</h2>
				<div class="flex flex-wrap gap-2">
					{#each business.expertise as area}
						<span
							class="w-fit cursor-default rounded-xl border border-surface-400 px-2 text-sm font-semibold"
						>
							{area}
						</span>
					{/each}
				</div>
			</section>
			<section>
				<h2 class="mb-4 text-2xl font-semibold">Our services</h2>
				<div class="space-y-4">
					{#each business.services as service}
						<Card>
							<div class="flex flex-col space-y-1.5 p-6">
								<a class="text-2xl font-semibold leading-none tracking-tight" href="/service/{1}">
									{service.title}
								</a>
							</div>
							<div class="p-6 pt-0">
								<p class="mb-2 text-surface-300">
									{service.description}
								</p>
								<p class="font-semibold">Price: {formatter.format(service.price)}</p>
								<p class="flex flex-row items-center gap-1">
									Rating: {service.rating.toFixed(1)}/5.0 <Star
										class="h-5 w-5 fill-yellow-500 stroke-yellow-900 stroke-1"
									/>
								</p>
							</div>
							<div class="flex flex-col items-start p-6 pt-0">
								<a
									class="focus-visible:ring-ring inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap
                                    rounded-md border border-surface-200 bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:border-surface-300
                                    hover:bg-surface-100-900 hover:text-surface-900-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                                    disabled:pointer-events-none disabled:opacity-50 dark:border-surface-800 dark:hover:border-surface-700 [&_svg]:pointer-events-none
                                    [&_svg]:size-4 [&_svg]:shrink-0"
									href="/service/{service.id}"
								>
									Узнать больше
									<ArrowRight />
								</a>
							</div>
						</Card>
					{/each}
				</div>
			</section>
		</div>
		<div>
			<Card class="sticky top-16">
				<div class="flex flex-col space-y-1.5 p-6">
					<h3 class="text-2xl font-semibold leading-none tracking-tight">Contact Information</h3>
				</div>
				<div class="space-y-4 p-6 pt-0">
					<div class="flex items-center space-x-2">
						<Globe class="h-5 w-5 text-surface-300" />
						<a
							href={business.website}
							target="_blank"
							rel="noopener noreferrer"
							class="text-primary hover:underline">{business.website}</a
						>
					</div>
					<div class="flex items-center space-x-2">
						<Mail class="h-5 w-5 text-surface-300" />
						<span class="text-surface-950-50">
							{business.email}
						</span>
					</div>
					<div class="flex items-center space-x-2">
						<Phone class="h-5 w-5 text-surface-300" />
						<span class="text-surface-950-50">
							{business.phone}
						</span>
					</div>
					<div class="flex items-center space-x-2">
						<MapPin class="h-5 w-5 text-surface-300" />
						<span class="text-surface-950-50">
							{business.address}
						</span>
					</div>
				</div>
			</Card>
		</div>
	</div>
</main>
