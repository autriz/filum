import {
	selectBusinessSchema,
	selectReviewSchema,
	services,
	type Service
} from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { count, like, or, sql } from 'drizzle-orm';
import { businesses } from '$lib/server/db/schema';
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
			.from(services)
			.leftJoin(businesses, eq(businesses.id, services.businessId))
			.where(
				or(
					like(services.title, `%${query}%`),
					like(services.description, `%${query}%`),
					like(businesses.name, `%${query}%`)
				)
			)
	).at(0) ?? { count: 0 };

	const serviceList = await db
		.select({
			id: services.id,
			businessId: services.businessId,
			title: services.title,
			businessName: businesses.name,
			price: services.price
		})
		.from(services)
		.leftJoin(businesses, eq(businesses.id, services.businessId))
		.limit(15)
		.offset((page - 1) * 15)
		.where(
			or(
				like(services.title, `%${query}%`),
				like(services.description, `%${query}%`),
				like(businesses.name, `%${query}%`)
			)
		);

	return { services: serviceList, servicesCount };
};
