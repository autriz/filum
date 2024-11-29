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
		mode: 'timestamp'
	})
		.notNull()
		.default(sql`(strftime('%s', 'now'))`),
	type: text('type').notNull()
});

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	surname: text('surname').notNull(),
	avatarUrl: text('avatar_url').notNull().default(''),
	accountId: text('account_id')
		.notNull()
		.references(() => account.id, { onDelete: 'cascade' }),
	createdAt: integer('created_at', {
		mode: 'timestamp'
	})
		.notNull()
		.default(sql`(strftime('%s', 'now'))`),
	updatedAt: integer('updated_at', {
		mode: 'timestamp'
	})
		.notNull()
		.default(sql`(strftime('%s', 'now'))`)
});

export const businessContact = sqliteTable('business_contact', {
	id: text('id').primaryKey(),
	businessId: text('business_id')
		.notNull()
		.references(() => business.id, { onDelete: 'cascade' }),
	type: text('type').notNull(), // email, phone, telegram, whatsapp, viber, etc.
	contact: text('contact').notNull()
});

// export const businessTag = sqliteTable('business_tag', {

// })

export const business = sqliteTable('business', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	avatarUrl: text('avatar_url').notNull().default(''),
	about: text('about').notNull(),
	address: text('address').notNull(),
	// company, freelance, etc.
	type: text('type').notNull(),
	accountId: text('account_id')
		.notNull()
		.references(() => account.id, { onDelete: 'cascade' })
});

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	accountId: text('account_id')
		.notNull()
		.references(() => account.id, { onDelete: 'cascade' }),
	expiresAt: integer('expires_at', {
		mode: 'timestamp'
	}).notNull()
});

export const service = sqliteTable('service', {
	id: text('id').primaryKey(),
	businessId: text('business_id')
		.notNull()
		.references(() => business.id, { onDelete: 'cascade' }),
	name: text('name').notNull(),
	description: text('description').notNull(),
	price: integer('price').notNull(),
	createdAt: integer('created_at', {
		mode: 'timestamp'
	})
		.notNull()
		.default(sql`(strftime('%s', 'now'))`),
	updatedAt: integer('updated_at', {
		mode: 'timestamp'
	})
		.notNull()
		.default(sql`(strftime('%s', 'now'))`),
	isActive: integer('is_active', {
		mode: 'boolean'
	})
		.notNull()
		.default(true)
});

export const review = sqliteTable('review', {
	id: text('id').primaryKey(),
	serviceId: text('service_id')
		.notNull()
		.references(() => service.id, { onDelete: 'cascade' }),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'set null' }),
	rating: integer('rating').notNull(),
	comment: text('comment').notNull(),
	createdAt: integer('created_at', {
		mode: 'timestamp'
	})
		.notNull()
		.default(sql`(strftime('%s', 'now'))`),
	updatedAt: integer('updated_at', {
		mode: 'timestamp'
	})
		.notNull()
		.default(sql`(strftime('%s', 'now'))`)
});

/* Review */
export const selectReviewSchema = createSelectSchema(review, {
	id: z.string().uuid(),
	userId: z.string().uuid(),
	serviceId: z.string().uuid(),
	comment: z.string(),
	rating: z.number().min(0.0).max(5.0),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date()
});
export const insertReviewSchema = selectReviewSchema.omit({ createdAt: true, updatedAt: true });
export const updateReviewSchema = insertReviewSchema.pick({ comment: true, rating: true });
export type Review = z.infer<typeof selectReviewSchema>;
export type ReviewInsert = z.infer<typeof insertReviewSchema>;
export type ReviewUpdate = z.infer<typeof updateReviewSchema>;

/* Business */
export const selectBusinessSchema = createSelectSchema(business, {
	id: z.string().uuid(),
	accountId: z.string().uuid(),
	name: z.string(),
	about: z.string(),
	address: z.string(),
	type: z.enum(['company', 'freelancer']),
	avatarUrl: z.string()
});
export const insertBusinessSchema = selectBusinessSchema;
export const updateBusinessSchema = insertBusinessSchema.pick({
	name: true,
	about: true,
	address: true,
	type: true
});
export type Business = z.infer<typeof selectBusinessSchema>;
export type BusinessInsert = z.infer<typeof insertBusinessSchema>;
export type BusinessUpdate = z.infer<typeof updateBusinessSchema>;

/* Service */
export const selectServiceSchema = createSelectSchema(service, {
	id: z.string().uuid(),
	businessId: z.string().uuid(),
	name: z.string(),
	description: z.string(),
	price: z.number(),
	isActive: z.boolean(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date()
});
export const insertServiceSchema = selectServiceSchema.omit({ createdAt: true, updatedAt: true });
export const putServiceSchema = insertServiceSchema.pick({
	name: true,
	description: true,
	price: true,
	isActive: true
});
export const patchServiceSchema = putServiceSchema.partial();
export type Service = z.infer<typeof selectServiceSchema>;
export type ServiceInsert = z.infer<typeof insertServiceSchema>;
export type ServicePut = z.infer<typeof putServiceSchema>;
export type ServicePatch = z.infer<typeof patchServiceSchema>;

/* User */
export const selectUserSchema = createSelectSchema(user, {
	id: z.string().uuid(),
	accountId: z.string().uuid(),
	name: z.string(),
	surname: z.string(),
	avatarUrl: z.string().url(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date()
});
export const insertUserSchema = selectUserSchema.omit({ createdAt: true, updatedAt: true });
export const patchUserSchema = insertUserSchema.pick({
	name: true,
	surname: true,
	avatarUrl: true
});

export type User = z.infer<typeof selectUserSchema>;
export type UserInsert = z.infer<typeof insertUserSchema>;
export type UserUpdate = z.infer<typeof patchUserSchema>;

/* Account */
export const selectAccountSchema = createSelectSchema(account, {
	id: z.string().uuid(),
	email: z.string().email(),
	passwordHash: z.string(),
	type: z.enum(['user', 'company']),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date()
});
export const insertAccountSchema = selectAccountSchema.omit({ createdAt: true, updatedAt: true });

export type Account = z.infer<typeof selectAccountSchema>;
export type AccountInsert = z.infer<typeof insertAccountSchema>;

export type Session = typeof session.$inferSelect;
