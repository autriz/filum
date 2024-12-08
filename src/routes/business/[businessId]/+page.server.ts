import {
	getBusiness,
	getBusinessAverageRating,
	getBusinessData,
	getBusinessReviewsCount
} from '$lib/server/api/business';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const businessId = params['businessId'];

	return { business: await getBusinessData(businessId) };
};
