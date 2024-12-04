import { deleteReviewForService, updateReviewForService } from '$lib/server/api/review';
import { updateReviewSchema, type ReviewUpdate } from '$lib/server/db/schema';

import { json } from '@sveltejs/kit';

export async function PUT({ params, request, locals }) {
	if (!locals.session || !locals.profile) {
		return json({ message: 'Forbidden' }, { status: 403 });
	}

	const review = await request.json();
	const reviewId = params['reviewId'];
	const reviewToUpdate: ReviewUpdate = { ...review };

	try {
		const validatedReview = updateReviewSchema.parse(reviewToUpdate);
		const [updatedReview] = await updateReviewForService(
			validatedReview,
			reviewId,
			locals.profile.id
		);

		return json(updatedReview);
	} catch (error) {
		console.log(error);
		return json({ message: 'Server error' }, { status: 500 });
	}
}

export async function DELETE({ params, locals }) {
	if (!locals.session || !locals.profile) {
		return json({ message: 'Forbidden' }, { status: 403 });
	}

	const reviewId = params['reviewId'];

	try {
		await deleteReviewForService(reviewId, locals.profile.id);

		return new Response('', { status: 203 });
	} catch (error) {
		console.log(error);
		return json({ message: 'Server error' }, { status: 500 });
	}
}
