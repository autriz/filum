import {
	selectBusinessSchema,
	selectReviewSchema,
	service,
	type Service
} from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { count, like, or, sql } from 'drizzle-orm';
import { business } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ url }) => {
	const query = url.searchParams.get('q');
	const page = Number(url.searchParams.get('page')) ?? 1;

	// if (!query
	//     //|| query.length > 3 add later
	// ) return { services: [] };

	const { count: servicesCount } = (
		await db
			.select({ count: count() })
			.from(service)
			.leftJoin(business, eq(business.id, service.businessId))
			.where(
				or(
					like(service.title, `%${query}%`),
					like(service.description, `%${query}%`),
					like(business.name, `%${query}%`)
				)
			)
	).at(0) ?? { count: 0 };

	const services = await db
		.select({
			id: service.id,
			businessId: service.businessId,
			title: service.title,
			businessName: business.name,
			price: service.price
		})
		.from(service)
		.leftJoin(business, eq(business.id, service.businessId))
		.limit(15)
		.offset((page - 1) * 15)
		.where(
			or(
				like(service.title, `%${query}%`),
				like(service.description, `%${query}%`),
				like(business.name, `%${query}%`)
			)
		);

	return { services, servicesCount };
};
