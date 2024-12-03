import type { Actions, PageServerLoad } from './$types';
import * as tables from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { eq, getTableColumns } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params, parent }) => {
	const tableName = params['page'] as 'accounts' | 'businesses' | 'users' | 'services';
	const id = params['id'];

	const table = tables[tableName];

	const { id: _id, ...rest } = getTableColumns(table);

	const [row] = await db
		.select({ ...rest })
		.from(table)
		.where(eq(table.id, id));
	const columns = Object.keys(row) as unknown[] as (keyof typeof row)[];

	return {
		row,
		columns
	};
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const formData = await request.formData();

		let data = {};
		/** @ts-ignore */
		formData.forEach((value, key) => (data[key] = value));

		const tableName = params['page'] as 'accounts' | 'businesses' | 'users' | 'services';
		const id = params['id'];

		const table = tables[tableName];

		console.log(data);

		// await db.insert(table).values(formData)
	}
};
