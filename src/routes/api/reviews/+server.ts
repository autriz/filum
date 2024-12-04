import { getReviews, saveReviewForService } from '$lib/server/api/review';
import { insertReviewSchema, type ReviewInsert } from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import { randomUUID } from 'crypto';

type ReviewPost = {
	serviceId: string;
	userId: string;
	rating: number;
	comment: string;
};
export async function POST(review: ReviewPost) {
	try {
		const validatedReview = insertReviewSchema.parse({ id: randomUUID(), ...review });
		return await saveReviewForService(validatedReview);
	} catch (error) {
		console.error(error);
		return json({ message: 'Server error' }, { status: 500 });
	}
}
/*
type ReviewInsert = {
    id: string;
    serviceId: string;
    userId: string;
    rating: number;
    comment: string;
}
*/

export async function GET() {
	const reviews = getReviews();
	return await json(reviews);
}
