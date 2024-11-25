import { db } from '$lib/server/db/index.js';
import { service } from '$lib/server/db/schema.js';
import { json } from '@sveltejs/kit';
import { like, or } from 'drizzle-orm';

export async function GET({ url }) {
    const query = url.searchParams.get("q");

    if (!query
        // || query.length < 3 add later
    ) return json([]);

    const services = await db.select({ 
        id: service.id, 
        businessId: service.businessId, 
        name: service.name, 
        price: service.price 
    }).from(service)
    .where(or(
        like(service.name, `%${query}%`), 
        like(service.description, `%${query}%`)
    ));

    return json(services);
}