import { db } from '../db';
import { asc, eq } from 'drizzle-orm';
import { reviews, services, users } from '../db/schema';

export async function getUsers() {
	return db.select().from(users);
}

export async function deleteUserById(userId: string) {
	return db.delete(users).where(eq(users.id, userId));
}

export async function getUserData(userId: string) {
	const reviewList = await db
		.select({
			id: reviews.id,
			comment: reviews.comment,
			rating: reviews.rating,
			service: {
				id: services.id,
				title: services.title
			}
		})
		.from(reviews)
		.where(eq(reviews.userId, userId))
		.innerJoin(services, eq(services.id, reviews.serviceId))
		.orderBy(asc(reviews.createdAt));
	
	const [user] = await db.select().from(users).where(eq(users.id, userId));
	
	return {
		...user,
		reviews: reviewList
	};
}