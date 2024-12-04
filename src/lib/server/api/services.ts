import { db } from '../db';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { insertServiceSchema, services, type Service, type ServiceInsert } from '../db/schema';

export async function getServices() {
	return await db.select().from(service);
}

export async function getService(id: string) {
	return await db.select().from(service).where(eq(service.id, id));
}

export async function createServiceForBusiness(newServiceData: ServiceInsert) {
	const newService = insertServiceSchema.parse(newServiceData);

	await db.insert(service).values({ id: randomUUID(), ...newService });

	return newService;
}
