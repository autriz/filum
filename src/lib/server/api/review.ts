import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { review, service, type ReviewInsert, type ReviewUpdate } from "../db/schema";
import type type from "lucide-svelte/icons/type";

export async function getReviewsForService(serviceId: string) {
    return await db.select()
        .from(review)
        .where(eq(review.serviceId, serviceId))
}

export async function getReviewsByUser(userId:string) {
    return await db.select()
        .from(review)
        .where(eq(review.userId, userId))
}

export async function saveReviewForService(newReview: ReviewInsert) {
    // Проверка на то, что пользователь ещё не писал отзыв на эту услугу
    const checkQuery = db.select().from(review).where(and(eq(review.userId, newReview.userId), eq(service.id, newReview.serviceId)));

    if((await checkQuery).length != 0){
        throw new Error('A user has already left a review for this service');
    }

    return await db.insert(review)
        .values(newReview);
}

export async function updateReviewForService(reviewToUpdate: ReviewUpdate, reviewId: string, userId: string) {
    // Получить отзыв по нужному id и сравнить его userId с userId
    const checkReview = (await db.select().from(review).where(eq(review.id, reviewId))).at(0);
    
    if(checkReview && checkReview.userId != userId){
        throw Error('User does not own this comment');
    }

    return await db.update(review).set(reviewToUpdate).where(eq(review.id, reviewId));

}

export async function deleteReviewForService(reviewId : string, userId: string) {
    // Получить отзыв по нужному id и сравнить его userId с userId
    const checkReview = (await db.select().from(review).where(eq(review.id, reviewId))).at(0);

    if(checkReview && checkReview.userId != userId){
        throw Error('User does not own this comment');
    }

    return db.delete(review).where(eq(review.id, reviewId));
}