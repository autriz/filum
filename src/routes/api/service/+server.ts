import { db } from '$lib/server/db/index.js';
import { business, service } from '$lib/server/db/schema.js';
import { json } from '@sveltejs/kit';
import { eq, like, or, sql } from 'drizzle-orm';

export async function GET({ url }) {
    const query = url.searchParams.get("q");

    if (!query
        // || query.length < 3 add later
    ) return json([]);

    const sqlQuery = db.select({ 
        id: service.id, 
        businessId: service.businessId, 
        name: service.name, 
        businessName: business.name,
        price: service.price 
    }).from(service)
    .innerJoin(business, eq(business.id, service.businessId))
    // Работает, но чуствителен к регистру
    .where(or(
        like(service.name, `%${query}%`), 
        like(service.description, `%${query}%`),
        like(business.name, `%${query}%`)
    ))
    // Работает, должен быть не чуствителен к регистру, но нет
    // lower(x) не работает
    // .where(
    //     sql.raw(`((lower(service.name) like lower('%${query}%')) or (lower(service.description) like lower('%${query}%')) or (lower(business.name) like lower('%${query}%')))`,
    // ));

    console.log(sqlQuery.getSQL().toQuery({ escapeName: (name) => name, escapeParam: (num, value) => value as string, escapeString: (str) => str }).sql);

    const services = await sqlQuery;

    console.log(services);

    return json(services);
}