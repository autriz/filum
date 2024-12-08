import { db } from '$lib/server/db/index.js';
import { businesses, reviews, services } from '$lib/server/db/schema.js';
import { json } from '@sveltejs/kit';
import { desc } from 'drizzle-orm';
import { asc } from 'drizzle-orm';
import { and, count, eq, gte, like, lte, or, sql } from 'drizzle-orm';

export async function GET({ url, locals }) {
	// if (!locals.profile || locals.session) {
	// 	return error(403, 'Unauthorized');
	// }
	const query = url.searchParams.get('q') ?? '';
	const page = Number(url.searchParams.get('page')) ?? 1;
	const minPrice = Number(url.searchParams.get('minPrice'));
	const maxPrice = Number(url.searchParams.get('maxPrice'));
	const minRating = Number(url.searchParams.get('minRating'));
	const maxRating = Number(url.searchParams.get('maxRating'));
	const includeTags = url.searchParams.get('includeTags');
	const excludeTags = url.searchParams.get('excludeTags');
	const searchIn = url.searchParams.getAll('searchIn');
	const orderBy =
		(url.searchParams.get('orderBy') as
			| 'relevance'
			| 'publication_time'
			| 'price_asc'
			| 'price_desc') ?? 'relevance';

	const searchInBusinessName = searchIn.length ? searchIn.includes('business_name') : true;
	const searchInServiceName = searchIn.length ? searchIn.includes('service_name') : true;
	const searchInServiceDescription = searchIn.length
		? searchIn.includes('service_description')
		: true;

	let order;

	switch (orderBy) {
		case 'relevance':
			order = asc(services);
			break;
		case 'publication_time':
			order = desc(services.createdAt);
			break;
		case 'price_asc':
			order = asc(services.price);
			break;
		case 'price_desc':
			order = desc(services.price);
	}

	let filters = and(
		or(
			searchInServiceName ? like(services.title, `%${query}%`) : undefined,
			searchInServiceDescription ? like(services.description, `%${query}%`) : undefined,
			searchInBusinessName ? like(businesses.name, `%${query}%`) : undefined
		),
		and(
			minPrice ? gte(services.price, minPrice) : undefined,
			maxPrice ? lte(services.price, maxPrice) : undefined,
			minRating ? gte(reviews.rating, minRating) : undefined,
			maxRating ? lte(reviews.rating, maxRating) : undefined
		),
		eq(services.isActive, true)
	);

	const [{ count: servicesCount }] = await db
		.select({ count: count() })
		.from(services)
		.leftJoin(reviews, eq(reviews.serviceId, services.id))
		.innerJoin(businesses, eq(businesses.id, services.businessId))
		.where(filters);

	const serviceList = await db
		.select({
			id: services.id,
			title: services.title,
			shortDescription: services.shortDescription,
			price: services.price,
			rating: sql<number>`cast(avg(coalesce(reviews.rating, '0')) as int)`,
			business: {
				id: businesses.id,
				name: businesses.name
			}
		})
		.from(services)
		.leftJoin(reviews, eq(reviews.serviceId, services.id))
		.leftJoin(businesses, eq(businesses.id, services.businessId))
		.groupBy(services.id)
		.limit(15)
		.offset((page - 1) * 15)
		.where(filters);

	return json({ services: serviceList, servicesCount });
}
