import type { RequestEvent } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase64url, encodeHexLowerCase } from '@oslojs/encoding';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { businesses } from '$lib/server/db/schema';

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const sessionCookieName = 'auth-session';

export function generateSessionToken() {
	const bytes = crypto.getRandomValues(new Uint8Array(18));
	const token = encodeBase64url(bytes);
	return token;
}

export async function createSession(token: string, accountId: string) {
	if (!accountId) {
		throw new Error('accountId is required to create a session');
	}
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: table.Session = {
		id: sessionId,
		accountId,
		expiresAt: new Date(Date.now() + DAY_IN_MS * 30)
	};
	await db.insert(table.session).values(session);
	return session;
}

export async function validateSessionToken(token: string) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

	const [session] = await db
		.select({
			id: table.session.id,
			accountId: table.session.accountId,
			expiresAt: table.session.expiresAt
		})
		.from(table.session)
		.where(eq(table.session.id, sessionId)); // Проверяем sessionId с id

	if (!session) {
		return { session: null, profile: null };
	}

	const sessionExpired = Date.now() >= session.expiresAt.getTime();
	if (sessionExpired) {
		await db.delete(table.session).where(eq(table.session.id, session.id));
		return { session: null, profile: null };
	}

	const renewSession = Date.now() >= session.expiresAt.getTime() - DAY_IN_MS * 15;
	if (renewSession) {
		session.expiresAt = new Date(Date.now() + DAY_IN_MS * 30);
		await db
			.update(table.session)
			.set({ expiresAt: session.expiresAt })
			.where(eq(table.session.id, session.id));
	}

	const [account] = await db
		.select({
			id: table.accounts.id,
			email: table.accounts.email,
			isAdmin: table.accounts.isAdmin,
			type: table.accounts.type
		})
		.from(table.accounts)
		.where(eq(table.accounts.id, session.accountId));

	if (account.type === 'user') {
		const [user] = await db
			.select({
				id: table.users.id,
				name: table.users.name,
				surname: table.users.surname,
				avatarUrl: table.users.avatarUrl
			})
			.from(table.users)
			.where(eq(table.users.accountId, account.id));

		if (!user) return { session: null, profile: null };

		return {
			session,
			profile: {
				...account,
				...user
			}
		};
	} else if (account.type === 'business') {
		const [business] = await db
			.select({
				id: table.businesses.id,
				name: table.businesses.name,
				avatarUrl: table.businesses.avatarUrl
			})
			.from(table.businesses)
			.where(eq(table.businesses.accountId, account.id));

		if (!business) return { session: null, profile: null };

		return {
			session,
			profile: {
				...account,
				...business
			}
		};
	} else {
		throw new Error('invalid account type');
	}
}

export async function authorize(event: RequestEvent) {
	const token = event.cookies.get(sessionCookieName); // Получаем токен из cookies

	if (!token) {
		throw fail(401, { message: 'Unauthorized: No session token provided' });
	}

	const { session, profile } = await validateSessionToken(token);

	if (!session || !profile) {
		throw fail(401, { message: 'Unauthorized: Invalid or expired session' });
	}

	// Добавляем данные пользователя в event.locals для доступа в роуте
	event.locals.profile = profile;

	return event;
}

export type SessionValidationResult = Awaited<ReturnType<typeof validateSessionToken>>;

export async function invalidateSession(sessionId: string) {
	await db.delete(table.session).where(eq(table.session.id, sessionId));
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date) {
	event.cookies.set(sessionCookieName, token, {
		expires: expiresAt,
		path: '/'
	});
}

export function deleteSessionTokenCookie(event: RequestEvent) {
	event.cookies.delete(sessionCookieName, {
		path: '/'
	});
}
