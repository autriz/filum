import { db } from '$lib/server/db/index.js';
import { businesses, services } from '$lib/server/db/schema.js';
import { error, json } from '@sveltejs/kit';
import { count, eq, like, or, sql } from 'drizzle-orm';

export async function GET({ url, locals }) {
	if (!locals.profile || locals.session) {
		return error(403, 'Unauthorized');
	}

	const query = url.searchParams.get('q');
	const page = Number(url.searchParams.get('page')) ?? 1;

	// if (!query
	//     // || query.length < 3 add later
	// ) return json([]);

	const sqlQuery = db
		.select({
			id: services.id,
			businessId: services.businessId,
			title: services.title,
			businessName: businesses.name,
			price: services.price
		})
		.from(services)
		.leftJoin(businesses, eq(businesses.id, services.businessId))
		.limit(15)
		.offset((page - 1) * 15)
		// Работает, но чуствителен к регистру
		.where(
			or(
				like(services.title, `%${query}%`),
				like(services.description, `%${query}%`),
				like(businesses.name, `%${query}%`)
			)
		);
	// Работает, должен быть не чуствителен к регистру, но нет
	// lower(x) не работает
	// .where(
	//     sql.raw(`((lower(service.name) like lower('%${query}%')) or (lower(service.description) like lower('%${query}%')) or (lower(business.name) like lower('%${query}%')))`,
	// ));

	// console.log(sqlQuery.getSQL().toQuery({ escapeName: (name) => name, escapeParam: (num, value) => value as string, escapeString: (str) => str }).sql);

	const serviceList = await sqlQuery;

	return json({ services: serviceList });
}
