import { and, count, eq } from 'drizzle-orm';
import { db } from '../db';
import { randomUUID } from 'crypto';
import { reviews, services, type ReviewInsert, type ReviewUpdate } from '../db/schema';
import type type from 'lucide-svelte/icons/type';

export async function getReviews() {
	return await db.select().from(reviews);
}

export async function getReviewsForService(serviceId: string) {
	return await db.select().from(reviews).where(eq(reviews.serviceId, serviceId));
}

export async function getReviewsByUser(userId: string) {
	return await db.select().from(reviews).where(eq(reviews.userId, userId));
}

export async function saveReviewForService(newReview: ReviewInsert) {
	// Проверка на то, что пользователь ещё не писал отзыв на эту услугу
	const [{ rowCount }] = await db
		.select({ rowCount: count() })
		.from(reviews)
		.where(and(eq(reviews.userId, newReview.userId), eq(services.id, newReview.serviceId)));

	if (rowCount != 0) {
		throw new Error('A user has already left a review for this service');
	}

	return await db.insert(reviews).values({ id: randomUUID(), ...newReview });
}

export async function updateReviewForService(
	reviewToUpdate: ReviewUpdate,
	reviewId: string,
	userId: string
) {
	// Получить отзыв по нужному id и сравнить его userId с userId
	const checkReview = (await db.select().from(reviews).where(eq(reviews.id, reviewId))).at(0);

	if (checkReview && checkReview.userId != userId) {
		throw Error('User does not own this comment');
	}

	return await db.update(reviews).set(reviewToUpdate).where(eq(reviews.id, reviewId));
}

export async function deleteReviewForService(reviewId: string, userId: string) {
	// Получить отзыв по нужному id и сравнить его userId с userId
	const checkReview = (await db.select().from(reviews).where(eq(reviews.id, reviewId))).at(0);

	if (checkReview && checkReview.userId != userId) {
		throw Error('User does not own this comment');
	}

	return db.delete(reviews).where(eq(reviews.id, reviewId));
}
