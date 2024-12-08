import { reviews, services, type Service } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { and, asc, count, desc, gte, like, lte, or, sql } from 'drizzle-orm';
import { businesses } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ url }) => {
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
			order = asc(services.id);
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

	const [{ limits }] = await db
		.select({
			limits: {
				maxPrice: sql<number>`cast(max(${services.price}) as int)`,
				minPrice: sql<number>`cast(min(${services.price}) as int)`,
				minRating: sql<number>`cast(min(coalesce(${reviews.rating}, 0)) as int)`,
				maxRating: sql<number>`cast(max(coalesce(${reviews.rating}, 0)) as int)`
			}
		})
		.from(services)
		.leftJoin(reviews, eq(reviews.serviceId, services.id))
		.innerJoin(businesses, eq(businesses.id, services.businessId))
		.where(eq(services.isActive, true));

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
		.innerJoin(businesses, eq(businesses.id, services.businessId))
		.groupBy(services.id)
		.orderBy(order)
		.limit(15)
		.offset((page - 1) * 15)
		.where(filters);

	return { services: serviceList, servicesCount, limits };
};
