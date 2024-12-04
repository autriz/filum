import { db } from '../db';
import { eq } from 'drizzle-orm';
import { users } from '../db/schema';

export async function getUsers() {
	return db.select().from(users);
}

export async function deleteUserById(userId: string) {
	return db.delete(users).where(eq(users.id, userId));
}
