import { getUserData } from '$lib/server/api/users';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const userId = params['userId'];

	return { user: await getUserData(userId) };
};



