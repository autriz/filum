import type { RequestHandler } from '@sveltejs/kit';
import { getBusinesses, createBusiness } from '$lib/server/api/business';
import { json } from "@sveltejs/kit";
export const GET: RequestHandler = async () => {
    try {
        const businesses = await getBusinesses();
        return json(businesses);
    } catch (error) {
        console.error(error);
        return json({ message: 'Server error' }, { status: 500 });
    }
};

export const POST: RequestHandler = async ({ request }) => {
    const body = await request.json();
    const newBusiness = await createBusiness(body);
    return json(newBusiness, { status: 201 });
};
