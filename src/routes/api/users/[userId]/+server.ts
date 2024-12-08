import { deleteUserById } from "$lib/server/api/users";
import { db } from '$lib/server/db/index.js';
import { services, putServiceSchema, users } from '$lib/server/db/schema.js';
import { error, json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function DELETE({params}) {
    let userId = params["userId"];
    await deleteUserById(userId);
    return json(`User with ${userId} successfully deleted`);
}

