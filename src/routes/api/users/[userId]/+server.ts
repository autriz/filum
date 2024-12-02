import { deleteUserById } from "$lib/server/api/users";
import { json } from "@sveltejs/kit";

export async function DELETE({params}) {
    let userId = params["userId"];
    await deleteUserById(userId);
    return json(`User with ${userId} successfully deleted`);
}