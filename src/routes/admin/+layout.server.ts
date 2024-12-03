import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	const tables = ['accounts', 'businesses', 'users', 'services'];

	return {
		tables
	};
};
