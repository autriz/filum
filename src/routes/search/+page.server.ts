import { service, type Service } from "$lib/server/db/schema";
import { json } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { like, or, sql } from "drizzle-orm";
import { business } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

export const load: PageServerLoad = async ({ url }) => {
    const query = url.searchParams.get("q");

    // if (!query 
    //     //|| query.length > 3 add later
    // ) return { services: [] };

    const services = await db.select({ 
        id: service.id, 
        businessId: service.businessId, 
        name: service.name, 
        businessName: business.name,
        price: service.price 
    }).from(service)
    .leftJoin(business, eq(business.id, service.businessId))
    .where(or(
        like(service.name, `%${query}%`), 
        like(service.description, `%${query}%`),
        like(business.name, `%${query}%`)
    ))

    return { services };
};