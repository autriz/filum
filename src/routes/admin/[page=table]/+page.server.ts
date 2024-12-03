import type { PageServerLoad } from './$types';
import * as tables from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { count } from 'drizzle-orm';

export const load: PageServerLoad = async ({ url, params }) => {
	const tableName = params['page'] as 'accounts' | 'businesses' | 'users' | 'services';
	const page = Number(url.searchParams.get('page')) || 1;
	const limit = Number(url.searchParams.get('limit')) || 15;

	const table = tables[tableName];

	const rows = await db
		.select()
		.from(table)
		.offset((page - 1) * limit)
		.limit(limit);
	const [{ rows: rowsCount }] = await db.select({ rows: count() }).from(table);
	const columns = Object.keys(rows[0] || {}) as unknown[] as (keyof (typeof rows)[number])[];

	return {
		columns,
		rows,
		limit,
		page,
		rowsCount
	};
};
