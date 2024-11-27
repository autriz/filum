import { db } from "../db";
import { eq } from "drizzle-orm";
import { randomUUID } from 'crypto';
import { service, type Service } from "../db/schema";

export async function getServices() {
    return await db.select()
        .from(service);
}

export async function getService(id: string) {
    return await db.select()
        .from(service)
        .where(eq(service.id, id));
}

export async function createServiceForBusiness(newService: Service) {

    if (!newService.name?.trim()) {
        throw new Error('Name is required');
    }
    
    if (!newService.businessId) {
        throw new Error('Business ID is required');
    }
    
    if (typeof newService.price !== 'number' || newService.price < 0) {
        throw new Error('Price is required and must be a positive number');
    }

    const newServiceData = {
        ...newService,
        id: randomUUID()
    };
    await db.insert(service).values(newServiceData);
    return newServiceData;
}