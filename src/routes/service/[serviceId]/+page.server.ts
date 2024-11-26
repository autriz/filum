import { getBusiness } from "$lib/server/api/business";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    const serviceId = params["serviceId"];

    // const service = await getService(serviceId);
    const service = {};

    return {
        service
    }
};