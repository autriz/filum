import { db } from '$lib/server/db/index.js';
import { services, putServiceSchema } from '$lib/server/db/schema.js';
import { error, json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function GET({ params, request }) {
	let id = params['serviceId'];

	const [service] = await db.select().from(services).where(eq(services.id, id));

	if (!service) {
		return error(404, { message: 'Service not found' });
	}

	return json(service);
}
