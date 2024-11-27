import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getBusinessServices } from '$lib/server/api/business';

export const GET: RequestHandler = async ({ params }) => {
    try {
        const services = await getBusinessServices(params.businessId);
        
        return json(services, { status: 200 });

    } catch (error) {
        console.error(error);
        
        return json({ message: 'Server error' }, { status: 500 });
    }
};