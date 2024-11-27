import { json, type RequestHandler } from "@sveltejs/kit";
import { getService } from "$lib/server/api/services";
export const GET: RequestHandler = async ({ params }) => {
    try {
        const [service] = await getService(params.serviceId);

        if (!service) {
            return json({ message: 'Service not found' }, { status: 404 });
        }

        return json(service);
    } catch (error) {
        return json({ message: 'Server error' }, { status: 500 });
    }
};