import { db } from '../db';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { insertServiceSchema, services, type Service, type ServiceInsert } from '../db/schema';

export async function getServices() {
	return await db.select().from(services);
}

export async function getService(id: string) {
	return await db.select().from(services).where(eq(services.id, id));
}

export async function createServiceForBusiness(newServiceData: ServiceInsert) {
	const newService = insertServiceSchema.parse(newServiceData);

	await db.insert(services).values({ id: randomUUID(), ...newService });

	return newService;
}
