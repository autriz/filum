import { db } from '$lib/server/db/index.js';
import { service as service_table } from '$lib/server/db/schema.js';
import { error, json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function GET({ params }) {
    let id = params["serviceId"];

    const [service] = await db.select()
        .from(service_table)
        .where(eq(service_table.id, id));

    if (!service) {
        return error(404, { message: "Service not found" });
    }

    return json(service);
}