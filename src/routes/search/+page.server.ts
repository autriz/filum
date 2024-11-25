import { service, type Service } from "$lib/server/db/schema";
import { json } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { like, or } from "drizzle-orm";

export const load: PageServerLoad = async ({ url }) => {
    const query = url.searchParams.get("q");

    if (!query 
        //|| query.length > 3 add later
    ) return { services: [] };

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

    return { services };
};