import { hash } from '@node-rs/argon2';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';

export const load: PageServerLoad = async (event) => {
	if (event.locals.profile || event.locals.session) {
		throw redirect(302, '/');
	}
	return {};
};

const registerUserSchema = z.object({
	email: z.string().email(),
	password: z.string(),
	name: z.string(),
	surname: z.string(),
	type: z.enum(['user'])
});

const registerBusinessSchema = z.object({
	email: z.string().email(),
	password: z.string(),
	name: z.string(),
	type: z.enum(['business']),
	businessType: z.enum(['freelancer', 'company'])
});

const registerAccountSchema = registerUserSchema.or(registerBusinessSchema);

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email');
		const password = formData.get('password');
		const type = formData.get('type');

		if (type === "user") {
			const name = formData.get('name');
			const surname = formData.get('surname');

			let userData = registerUserSchema.parse({
				email,
				password,
				name,
				surname,
				type
			});

			const accountId = generateUUID()
			const userId = generateUUID();
			const passwordHash = await hash(userData.password, {
				// recommended minimum parameters
				memoryCost: 19456,
				timeCost: 2,
				outputLen: 32,
				parallelism: 1
			});

			try {
				await db.insert(table.accounts).values({ 
					id: accountId, 
					email: userData.email, 
					passwordHash, 
					type, 
					isAdmin: false 
				});
				await db.insert(table.users).values({
					id: userId,
					accountId: accountId,
					name: userData.name,
					surname: userData.surname
				});
	
				const sessionToken = auth.generateSessionToken();
				const session = await auth.createSession(sessionToken, userId);
				auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
			} catch (e) {
				return fail(500, { message: 'An error has occurred' });
			}
			throw redirect(302, '/profile');
		} else if (type === "business") {
			const name = formData.get('name');

			let businessData = registerBusinessSchema.parse({
				email,
				password,
				name,
				type,
				businessType: 'company'
			});

			const accountId = generateUUID()
			const businessId = generateUUID();
			const passwordHash = await hash(businessData.password, {
				// recommended minimum parameters
				memoryCost: 19456,
				timeCost: 2,
				outputLen: 32,
				parallelism: 1
			});

			try {
				await db.insert(table.accounts).values({ 
					id: accountId, 
					email: businessData.email, 
					passwordHash, 
					type, 
					isAdmin: false 
				});
				await db.insert(table.businesses).values({
					id: businessId,
					accountId: accountId,
					name: businessData.name,
					about: '',
					type: 'company'
				})

				const sessionToken = auth.generateSessionToken();
				const session = await auth.createSession(sessionToken, accountId);
				auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
			} catch (e) {
				return fail(500, { message: 'An error has occurred' });
			}
			throw redirect(302, '/profile');
		} else {
			return fail(405, { message: "Неверный тип аккаунта" });
		}
	}
};

function generateUUID() {
	return crypto.randomUUID();
}

function validateEmail(email: unknown): email is string {
	return (
		typeof email === 'string' &&
		email.length >= 3 &&
		email.length <= 255 &&
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
	);
}

function validatePassword(password: unknown): password is string {
	return typeof password === 'string' && password.length >= 6 && password.length <= 255;
}

function validateType(type: unknown): type is 'user' | 'business' {
	return typeof type === 'string' && (type === 'user' || type === 'business');
}
