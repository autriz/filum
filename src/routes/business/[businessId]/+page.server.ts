import { getBusiness } from "$lib/server/api/business";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    const businessId = params["businessId"];

    const business = await getBusiness(businessId);

    return {
        business
    }
};