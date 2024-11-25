import type { Service } from "$lib/server/db/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ request }) => {
    return {
        data: [] as Service[]
    }
};