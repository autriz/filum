import { getAverageRating, getBusinesses } from '$lib/server/api/business';
import type { BusinessWithRating } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const businesses = (await getBusinesses()) as BusinessWithRating[];

	for (let business of businesses) {
		business.averageRating = (await getAverageRating(business.id)) ?? 0;
	}

	return {
		businesses
	};
};
