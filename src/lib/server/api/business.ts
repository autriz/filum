import { eq } from "drizzle-orm";
import { db } from "../db";
import { randomUUID } from 'crypto';
import { business, type Business, type BusinessInsert } from "../db/schema";
import { service } from "../db/schema";

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

export async function createBusiness(newBusiness: BusinessInsert) {
    const newBusinessData = {
        ...newBusiness,
        id: randomUUID()
    };
    await db.insert(business).values(newBusinessData);
    return newBusinessData;
}

export async function updateBusiness(id: string, updatedFields: Partial<Omit<Business, "type" | "id">>) {
    return (await db.update(business)
        .set(updatedFields)
        .returning()
        .where(eq(business.id, id))).at(0);
}

export async function deleteBusiness(id: string) {
    return await db.delete(business)
        .where(eq(business.id, id));
}

export async function getBusinessServices(businessId: string) {
    return await db.select()
        .from(service)
        .where(eq(service.businessId, businessId));
}