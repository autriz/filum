import type { RequestHandler } from '@sveltejs/kit';
import { getBusinesses, createBusiness } from '$lib/server/api/business';

export const GET: RequestHandler = async () => {
    try {
        const businesses = await getBusinesses();
        return new Response(JSON.stringify(businesses), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error(error);
        
        return new Response(JSON.stringify({ message: 'Server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};

export const POST: RequestHandler = async ({ request }) => {
    const body = await request.json();
    const newBusiness = await createBusiness(body);
    return new Response(JSON.stringify(newBusiness), { status: 201 });
};
