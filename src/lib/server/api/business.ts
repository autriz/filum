import { and, avg, count, desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { db } from '../db';
import { randomUUID } from 'crypto';
import {
	businessContact,
	businesses,
	businessTag,
	reviews,
	tags,
	type Business,
	type BusinessInsert
} from '../db/schema';
import { services } from '../db/schema';
import { union, unionAll } from 'drizzle-orm/sqlite-core';

export async function getBusinesses() {
	return await db.select().from(businesses).limit(15);
}

export async function getBusiness(id: string) {
	return await db.select().from(businesses).where(eq(businesses.id, id));
}

export async function createBusiness(newBusiness: BusinessInsert) {
	const newBusinessData = {
		...newBusiness,
		id: randomUUID()
	};
	await db.insert(businesses).values(newBusinessData);
	return newBusinessData;
}

export async function updateBusiness(
	id: string,
	updatedFields: Partial<Omit<Business, 'type' | 'id'>>
) {
	let updatedBusiness = await db
		.update(businesses)
		.set(updatedFields)
		.returning()
		.where(eq(businesses.id, id));

	return updatedBusiness.at(0);
}

export async function deleteBusiness(id: string) {
	return await db.delete(businesses).where(eq(businesses.id, id));
}

export async function getBusinessServices(businessId: string) {
	return await db.select().from(services).where(eq(services.businessId, businessId));
}

export async function getBusinessAverageRating(businessId: string) {
	const [{ rating }] = await db
		.select({ rating: avg(reviews.rating) })
		.from(reviews)
		.innerJoin(services, eq(services.id, reviews.serviceId))
		.where(eq(services.businessId, businessId));

	return Number(rating);
}

export async function getBusinessReviewsCount(businessId: string) {
	const [{ count: reviewCount }] = await db
		.select({ count: count() })
		.from(reviews)
		.innerJoin(services, eq(services.id, reviews.serviceId))
		.where(eq(services.businessId, businessId));

	return reviewCount;
}

export async function getBusinessData(businessId: string) {
	const contacts = await db
		.select({
			type: businessContact.type,
			contact: businessContact.contact
		})
		.from(businessContact)
		.where(eq(businessContact.businessId, businessId));

	const reviewCols = getTableColumns(reviews);

	const [{ avgRating, reviewCount }] = await db
		.select({
			avgRating: sql<number>`cast(avg(coalesce(${reviews.rating}, 0)) as int)`,
			reviewCount: count()
		})
		.from(reviews)
		.innerJoin(services, eq(services.id, reviews.serviceId))
		.where(eq(services.businessId, businessId));

	const reviewList = await db
		.select({ ...reviewCols })
		.from(reviews)
		.leftJoin(services, eq(services.id, reviews.serviceId))
		.where(eq(services.businessId, businessId))
		.limit(6)
		.orderBy(desc(reviews.createdAt));

	const { isActive, description, businessId: _, updatedAt, ...rest } = getTableColumns(services);

	const serviceList = await db
		.select({ ...rest, rating: sql<number>`cast(avg(coalesce(${reviews.rating}, 0)) as int)` })
		.from(services)
		.where(and(eq(services.businessId, businessId), eq(services.isActive, true)))
		.leftJoin(reviews, eq(reviews.serviceId, services.id))
		.groupBy(services.id)
		.limit(6);

	console.log(serviceList);

	const businessTags = await db
		.select({ tag: tags.text })
		.from(businessTag)
		.leftJoin(tags, eq(tags.id, businessTag.tagId))
		.where(eq(businessTag.businessId, businessId));
	const tagList = businessTags.map((tag) => tag.tag);

	const [business] = await db.select().from(businesses).where(eq(businesses.id, businessId));

	return {
		...business,
		contacts,
		avgRating,
		reviewCount,
		tags: tagList,
		services: serviceList,
		reviews: reviewList
	};
}
