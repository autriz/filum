import { eq } from 'drizzle-orm';
import { db } from '../db';
import { randomUUID } from 'crypto';
import { businesses, type Business, type BusinessInsert } from '../db/schema';
import { services } from '../db/schema';

export async function getBusinesses() {
	return await db.select().from(businesses).limit(15);
}

export async function getBusiness(id: string) {
	return await db.select().from(businesses).where(eq(businesses.id, id));
}

export async function createBusiness(newBusiness: BusinessInsert) {
	const newBusinessData = {
		...newBusiness,
		id: randomUUID()
	};
	await db.insert(businesses).values(newBusinessData);
	return newBusinessData;
}

export async function updateBusiness(
	id: string,
	updatedFields: Partial<Omit<Business, 'type' | 'id'>>
) {
	let updatedBusiness = await db
		.update(businesses)
		.set(updatedFields)
		.returning()
		.where(eq(businesses.id, id));

	return updatedBusiness.at(0);
}

export async function deleteBusiness(id: string) {
	return await db.delete(businesses).where(eq(businesses.id, id));
}

export async function getBusinessServices(businessId: string) {
	return await db.select().from(services).where(eq(services.businessId, businessId));
}
