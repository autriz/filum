import { getBusinessAverageRating } from '$lib/server/api/business';
import { json } from '@sveltejs/kit';

export const GET = async ({ params }) => {
	const { businessId } = params;

	try {
		const averageRating = await getBusinessAverageRating(businessId);

		if (averageRating === null) {
			return json({ message: 'No reviews found for this business' }, { status: 404 });
		}

		return json({ averageRating });
	} catch (error) {
		console.error(error);
		return json({ message: 'Internal server error' }, { status: 500 });
	}
};
