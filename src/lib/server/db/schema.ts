import { sql, type $Type } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const account = sqliteTable('account', {
	id: text('id').primaryKey(),
	email: text('email').notNull(),
	passwordHash: text('password_hash').notNull(),
	createdAt: integer('created_at', { 
		mode: 'timestamp' 
	}).notNull(),
	updatedAt: integer('updated_at', {
		mode: "timestamp"
	})
	.notNull()
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
		.references(() => account.id, { onDelete: "cascade" }),
	createdAt: integer('created_at', { 
			mode: 'timestamp' 
		})
		.notNull()
		.default(sql`(strftime('%s', 'now'))`),
	updatedAt: integer('updated_at', {
		mode: "timestamp"
		})
		.notNull()
		.default(sql`(strftime('%s', 'now'))`),
});

export const businessContact = sqliteTable('business_contact', {
	id: text('id').primaryKey(),
	businessId: text('business_id')
		.notNull()
		.references(() => business.id, { onDelete: "cascade" }),
	type: text('type').notNull(), // email, phone, telegram, whatsapp, viber, etc.
	contact: text('contact').notNull()
});

// export const businessTag = sqliteTable('business_tag', {

// })

export const business = sqliteTable('business', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	avatarUrl: text('avatar_url')
		.notNull()
		.default(""),
	about: text('about').notNull(),
	address: text('address').notNull(),
	// company, freelance, etc.
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
	createdAt: integer('created_at', { 
		mode: 'timestamp' 
	}).notNull()
	.default(sql`(strftime('%s', 'now'))`),
	updatedAt: integer('updated_at', {
		mode: "timestamp"
	}).notNull()
	.default(sql`(strftime('%s', 'now'))`),
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

/* Review */
export const selectReviewSchema = createSelectSchema(review);
export const insertReviewSchema = createInsertSchema(review, {
	id: z.string().uuid(),
	userId: z.string().uuid(),
	serviceId: z.string().uuid(),
	comment: z.string(),
	rating: z.number().min(0.0).max(5.0),
}).omit({ createdAt: true, updatedAt: true });
export const updateReviewSchema = insertReviewSchema.pick({ comment: true, rating: true });
export type Review  = typeof selectReviewSchema._type;
export type ReviewInsert = typeof insertReviewSchema._type;
export type ReviewUpdate = typeof updateReviewSchema._type;

/* Business */
export const selectBusinessSchema = createSelectSchema(business);
export const insertBusinessSchema = createInsertSchema(business, {
	id: z.string().uuid(),
	accountId: z.string().uuid(),
	name: z.string(),
	about: z.string(),
	address: z.string(),
	type: z.string(),
	avatarUrl: z.string()
});
export const updateBusinessSchema = insertBusinessSchema.pick({ name: true, about: true, address: true, type: true });
export type Business = typeof selectBusinessSchema._type;
export type BusinessInsert = typeof insertBusinessSchema._type;
export type BusinessUpdate = typeof updateBusinessSchema._type;

/* Service */
export const selectServiceSchema = createSelectSchema(service);
export const insertServiceSchema = createInsertSchema(service, {
	id: z.string().uuid(),
	businessId: z.string().uuid(),
	name: z.string(),
	description: z.string(),
	price: z.number(),
	isActive: z.boolean()
}).omit({ createdAt: true, updatedAt: true });
export const updateServiceSchema = insertServiceSchema.pick({ name: true, description: true, price: true, isActive: true });
export type Service = typeof selectServiceSchema._type;
export type ServiceInsert = typeof insertServiceSchema._type;
export type ServiceUpdate = typeof updateServiceSchema._type;

/* User */
export const selectUserSchema = createSelectSchema(user);
export const insertUserSchema = createInsertSchema(user, {
	id: z.string().uuid(),
	accountId: z.string().uuid(),
	name: z.string(),
	surname: z.string(),
	avatarUrl: z.string()
}).omit({ createdAt: true, updatedAt: true });
export const updateUserSchema = insertUserSchema.pick({ name: true, surname: true, avatarUrl: true });
export type User = typeof selectUserSchema._type;
export type UserInsert = typeof insertUserSchema._type;
export type UserUpdate = typeof updateUserSchema._type;

/* Account */
export const selectAccountSchema = createSelectSchema(account);
export const insertAccountSchema = createInsertSchema(account, {
	id: z.string().uuid(),
	email: z.string().email(),
	type: z.string(),
}).omit({ createdAt: true, updatedAt: true });
export const updateAccountSchema = insertAccountSchema.pick({ email: true, type: true });
export type Account = typeof selectAccountSchema._type;
export type AccountInsert = typeof insertAccountSchema._type;
export type AccountUpdate = typeof updateAccountSchema._type;

export type Session = typeof session.$inferSelect;