import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getBusiness, updateBusiness, deleteBusiness } from '$lib/server/api/business';

export const GET: RequestHandler = async ({ params }) => {
    try {
        const [business] = await getBusiness(params.businessId);

        if (!business) {
            return json({ message: 'Business not found' }, { status: 404 });
        }

        return json(business);
    } catch (error) {
        return json({ message: 'Server error' }, { status: 500 });
    }
};

export const PUT: RequestHandler = async ({ params, request }) => {
    try {
        const body = await request.json();
        
        if (!body || typeof body !== 'object') {
            return json({ message: 'Invalid request body' }, { status: 400 });
        }

        const requiredFields = ['name']; // Обязательные поля
        const missingFields = requiredFields.filter(field => !(field in body));
        
        if (missingFields.length > 0) {
            return json(
                `Missing required fields: ${missingFields.join(', ')}`, 
                { status: 400 }
            );
        }

        const updatedBusiness = await updateBusiness(params.businessId, body);
        return json(updatedBusiness);
    } catch (error) {
        console.error('Error updating business:', error);
        return json({ message: 'Server error' }, { status: 500 });
    }
};

export const DELETE: RequestHandler = async ({ params }) => {
    await deleteBusiness(params.businessId);
    return json(null, { status: 204 });
};
