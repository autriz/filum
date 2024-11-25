import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	age: integer('age'),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
});

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export const business = sqliteTable('business', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description').notNull(),
	address: text('address').notNull(),
	phone: text('phone').notNull(),
	email: text('email').notNull(),
	passwordHash: text('password_hash').notNull(),
	type: text('type').notNull(),
});

export const service = sqliteTable('service', {
	id: text('id').primaryKey(),
	businessId: text('business_id')
		.notNull()
		.references(() => business.id),
	name: text('name').notNull(),
	description: text('description').notNull(),
	price: integer('price').notNull(),
	duration: integer('duration').notNull(),
	isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true)
});

export const review = sqliteTable('review', {
	id: text('id').primaryKey(),
	serviceId: text('service_id')
		.notNull()
		.references(() => service.id),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	rating: integer('rating').notNull(),
	comment: text('comment').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(strftime('%s', 'now'))`),
});

export type Review = typeof review.$inferSelect;

export type Business = typeof business.$inferSelect;

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
