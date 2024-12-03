import type { Actions, PageServerLoad } from './$types';
import * as tables from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { eq, getTableColumns } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params, parent }) => {
	const tableName = params['page'] as 'accounts' | 'businesses' | 'users' | 'services';

	let schema;
	switch (tableName) {
		case 'accounts':
			schema = tables.insertAccountSchema;
			break;
		case 'businesses':
			schema = tables.insertBusinessSchema;
			break;
		case 'services':
			schema = tables.insertServiceSchema;
			break;
		case 'users':
			schema = tables.insertUserSchema;
			break;
	}
	const columns = Object.entries(schema.shape).map(([key, value]) => ({
		column: key,
		type: coerceType(value._def.typeName)
	}));

	return {
		columns
	};
};

function coerceType(typeName: string): string {
	switch (typeName) {
		case 'ZodString':
			return 'string';
		case 'ZodDate':
			return 'object';
		case 'ZodNumber':
			return 'number';
		case 'ZodBoolean':
			return 'boolean';
		case 'ZodEnum':
			return 'string';
	}

	return 'object';
}

export const actions: Actions = {
	default: async ({ request, params }) => {
		const formData = await request.formData();

		let data = {};
		/** @ts-ignore */
		formData.forEach((value, key) => (data[key] = value));

		const tableName = params['page'] as 'accounts' | 'businesses' | 'users' | 'services';

		const table = tables[tableName];

		console.log(data);

		// await db.insert(table).values(formData)
	}
};
