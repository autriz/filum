import { getServices } from "$lib/server/api/services";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
    try {
        const services = await getServices();
        return json(services);
    } catch (error) {
        console.error(error);
        return json({ message: 'Server error' }, { status: 500 });
    }
};