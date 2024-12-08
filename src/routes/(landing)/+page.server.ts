import { getBusinessAverageRating, getBusinesses } from '$lib/server/api/business';
import { db } from '$lib/server/db';
import { businesses, type BusinessWithRating } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	let businessList = (await db.select().from(businesses).limit(5)) as BusinessWithRating[];

	businessList = businessList.map((business) => ({
		...business,
		about: `${business.about.substring(0, 50)}...`
	}));

	for (let business of businessList) {
		business.averageRating = await getBusinessAverageRating(business.id);
	}

	return {
		businesses: businessList
	};
};
