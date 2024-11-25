import { eq } from "drizzle-orm";
import { db } from "../db";
import { business, type Business } from "../db/schema";

export async function getBusiness(id: string) {
    return await db.select()
        .from(business)
        .where(eq(business.id, id));
}
export async function getBusinesses() {
    return await db.select()
        .from(business)
        .limit(15);
}
export async function updateBusiness(id: string, newBusiness: Business) {}