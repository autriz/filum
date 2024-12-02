import { getUsers } from "$lib/server/api/users";
import { json } from "@sveltejs/kit";

export async function GET() {
    const users = await getUsers();
    return json(users);
}