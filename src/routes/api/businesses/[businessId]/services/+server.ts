import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getBusinessServices } from '$lib/server/api/business';
import { createServiceForBusiness } from '$lib/server/api/services';

export const GET: RequestHandler = async ({ params }) => {
    try {
        const services = await getBusinessServices(params.businessId);
        
        return json(services, { status: 200 });

    } catch (error) {
        console.error(error);
        
        return json({ message: 'Server error' }, { status: 500 });
    }
};

export const POST: RequestHandler = async ({ params, request }) => {
    try {
        const newService = await request.json();

        if (!newService.name || typeof newService.name !== 'string') {
            return json({ message: 'Name is required' }, { status: 400 });
        }
        
        if (!newService.price || typeof newService.price !== 'number' || newService.price <= 0) {
            return json({ message: 'Price is required and must be a positive number' }, { status: 400 });
        }

        if (!newService.description || typeof newService.description !== 'string') {
            return json({ message: 'Description is required' }, { status: 400 });
        }

        newService.businessId = params.businessId;

        const service = await createServiceForBusiness(newService);
        return json(service);
    } catch (error) {
        console.error(error);
        return json({ message: 'Server error' }, { status: 500 });
    }
};
