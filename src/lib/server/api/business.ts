import { eq } from "drizzle-orm";
import { db } from "../db";
import { business, type Business } from "../db/schema";
import { randomUUID } from 'crypto';

export async function getBusinesses() {
    return await db.select()
        .from(business)
        .limit(15);
}

export async function getBusiness(id: string) {
    return await db.select()
        .from(business)
        .where(eq(business.id, id));
}

export async function createBusiness(newBusiness: Business) {
    const newBusinessData = {
        ...newBusiness,
        id: randomUUID()
    };
    await db.insert(business).values(newBusinessData);
    return newBusinessData;
}

export async function updateBusiness(id: string, updatedFields: Partial<Business>) {
    return await db.update(business)
        .set(updatedFields)
        .where(eq(business.id, id));
}

export async function deleteBusiness(id: string) {
    return await db.delete(business)
        .where(eq(business.id, id));
}