import { db } from '../db';
import { eq } from 'drizzle-orm';
import { users } from '../db/schema';

export async function getUsers() {
	return db.select().from(user);
}

export async function deleteUserById(userId: string) {
	return db.delete(user).where(eq(user.id, userId));
}
