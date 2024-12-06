import type { PageServerLoad } from './$types';
import { tables } from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params }) => {
	const tableName = params['page'] as keyof typeof tables;
	const id = params['id'];

	const table = tables[tableName];

	const [row] = await db.select().from(table).where(eq(table.id, id));
	const columns = Object.keys(row) as unknown[] as (keyof typeof row)[];

	return {
		row,
		columns
	};
};
