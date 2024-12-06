import { tables } from '$lib/server/db/schema';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	let tableNames = Object.keys(tables);

	return {
		tables: tableNames
	};
};
