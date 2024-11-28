import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const account = sqliteTable('account', {
	id: text('id').primaryKey(),
	email: text('email').notNull(),
	passwordHash: text('password_hash').notNull(),
	createdAt: integer('created_at', { 
		mode: 'timestamp' 
	}).notNull()
	.default(sql`(strftime('%s', 'now'))`),
	type: text('type').notNull()
})

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	surname: text('surname').notNull(),
	avatarUrl: text('avatar_url')
		.notNull()
		.default(""),
	accountId: text('account_id')
		.notNull()
		.references(() => account.id, { onDelete: "cascade" })
});

export const businessContact = sqliteTable('business_contact', {
	id: text('id').primaryKey(),
	businessId: text('business_id')
		.notNull()
		.references(() => business.id, { onDelete: "cascade" }),
	type: text('type').notNull(), // email, phone, telegram, whatsapp, viber, etc.
	contact: text('contact').notNull()
});

export const businessTag = sqliteTable('business_tag', {

})

export const business = sqliteTable('business', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	avatarUrl: text('avatar_url')
		.notNull()
		.default(""),
	about: text('about').notNull(),
	address: text('address').notNull(),
	
	type: text('type').notNull(),
	accountId: text('account_id')
		.notNull()
		.references(() => account.id, { onDelete: "cascade" })
});

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	accountId: text('account_id')
		.notNull()
		.references(() => account.id, { onDelete: "cascade" }),
	expiresAt: integer('expires_at', { 
		mode: 'timestamp' 
	}).notNull()
});

export const service = sqliteTable('service', {
	id: text('id').primaryKey(),
	businessId: text('business_id')
		.notNull()
		.references(() => business.id, { onDelete: "cascade" }),
	name: text('name').notNull(),
	description: text('description').notNull(),
	price: integer('price').notNull(),
	isActive: integer('is_active', { 
		mode: 'boolean' 
	}).notNull().default(true)
});

export const review = sqliteTable('review', {
	id: text('id').primaryKey(),
	serviceId: text('service_id')
		.notNull()
		.references(() => service.id, { onDelete: "cascade" }),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: "set null" }),
	rating: integer('rating').notNull(),
	comment: text('comment').notNull(),
	createdAt: integer('created_at', { 
		mode: 'timestamp' 
	}).notNull()
	.default(sql`(strftime('%s', 'now'))`),
	updatedAt: integer('updated_at', {
		mode: "timestamp"
	}).notNull()
	.default(sql`(strftime('%s', 'now'))`),
});

export const selectReviewSchema = createSelectSchema(review);
export const insertReviewSchema = createInsertSchema(review, {
	id: z.string().uuid(),
	userId: z.string().uuid(),
	serviceId: z.string().uuid(),
	comment: z.string(),
	rating: z.number().min(0.0).max(5.0),
}).omit({ createdAt: true, updatedAt: true });
export const updateReviewSchema = insertReviewSchema.pick({ comment: true, rating: true });

export type Review = typeof review.$inferSelect;

export type ReviewInsert = typeof review.$inferInsert;

export type Business = typeof business.$inferSelect;

export type Service = typeof service.$inferSelect;

export type ServiceInsert = typeof service.$inferInsert;

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
