import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getBusiness } from '$lib/server/api/business';

export const GET: RequestHandler = async ({ params }) => {
    try {
        const [business] = await getBusiness(params.businessId);

        if (!business) {
            return new Response('Business not found', { status: 404 });
        }

        return json(business);
    } catch (error) {
        return new Response('Server error', { status: 500 });
    }
};