import { db } from '../db';
import { asc, count, eq, getTableColumns, sql } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import {
	businesses,
	insertServiceSchema,
	reviews,
	services,
	serviceTag,
	tags,
	users,
	type Service,
	type ServiceInsert
} from '../db/schema';

export async function getServices() {
	return await db.select().from(services);
}

export async function getService(id: string) {
	return await db.select().from(services).where(eq(services.id, id));
}

export async function createServiceForBusiness(newServiceData: ServiceInsert) {
	const newService = insertServiceSchema.parse(newServiceData);

	await db.insert(services).values({ id: randomUUID(), ...newService });

	return newService;
}

export async function getServiceData(serviceId: string) {
	const reviewList = await db
		.select({
			id: reviews.id,
			comment: reviews.comment,
			rating: reviews.rating,
			user: {
				id: users.id,
				name: users.name,
				surname: users.surname,
				avatarUrl: users.avatarUrl
			}
		})
		.from(reviews)
		.where(eq(reviews.serviceId, serviceId))
		.innerJoin(users, eq(users.id, reviews.userId))
		.orderBy(asc(reviews.createdAt));

	const [service] = await db.select().from(services).where(eq(services.id, serviceId));

	const serviceTags = await db
		.select({ tag: tags.text })
		.from(serviceTag)
		.leftJoin(tags, eq(tags.id, serviceTag.tagId))
		.where(eq(serviceTag.serviceId, serviceId));
	const tagList = serviceTags.map((tag) => tag.tag);

	const [business] = await db
		.select()
		.from(businesses)
		.where(eq(businesses.id, service.businessId));

	const [{ avgRating, reviewCount }] = await db
		.select({
			avgRating: sql<number>`cast(avg(${reviews.rating}) as int)`,
			reviewCount: count()
		})
		.from(reviews)
		.innerJoin(services, eq(services.id, reviews.serviceId))
		.where(eq(services.businessId, business.id));

	return {
		...service,
		tags: tagList,
		business: {
			...business,
			avgRating,
			reviewCount
		},
		reviews: reviewList
	};
}


