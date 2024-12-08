import { getServiceData } from '$lib/server/api/services';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const serviceId = params['serviceId'];

	return { service: await getServiceData(serviceId) };
};
