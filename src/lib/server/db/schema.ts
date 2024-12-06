import { sql, type $Type } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const accounts = sqliteTable('account', {
	id: text('id').primaryKey(),
	email: text('email').notNull(),
	passwordHash: text('password_hash').notNull(),
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
	type: text('type').notNull(),
	isAdmin: integer('is_admin', {
		mode: 'boolean'
	})
		.notNull()
		.default(false)
});

export const users = sqliteTable('user', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	surname: text('surname').notNull(),
	avatarUrl: text('avatar_url').notNull().default(''),
	accountId: text('account_id')
		.notNull()
		.references(() => accounts.id, { onDelete: 'cascade' }),
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
		.references(() => businesses.id, { onDelete: 'cascade' }),
	type: text('type').notNull(), // email, phone, telegram, whatsapp, viber, etc.
	contact: text('contact').notNull()
});

export const tag = sqliteTable('tag', {
	id: text('id').primaryKey(),
	text: text('text').notNull()
});

export const businessTag = sqliteTable('business_tag', {
	businessId: text('business_id')
		.notNull()
		.references(() => businesses.id, { onDelete: 'cascade' }),
	tagId: text('tag_id')
		.notNull()
		.references(() => tag.id, { onDelete: 'cascade' })
});

export const businesses = sqliteTable('business', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	avatarUrl: text('avatar_url').notNull().default(''),
	about: text('about').notNull(),
	address: text('address').notNull(),
	// company, freelance, etc.
	type: text('type').notNull(),
	accountId: text('account_id')
		.notNull()
		.references(() => accounts.id, { onDelete: 'cascade' })
});

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	accountId: text('account_id')
		.notNull()
		.references(() => accounts.id, { onDelete: 'cascade' }),
	expiresAt: integer('expires_at', {
		mode: 'timestamp'
	}).notNull()
});

export const services = sqliteTable('service', {
	id: text('id').primaryKey(),
	businessId: text('business_id')
		.notNull()
		.references(() => businesses.id, { onDelete: 'cascade' }),
	title: text('title').notNull(),
	shortDescription: text('short_description').notNull(),
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

export const serviceTag = sqliteTable('service_tag', {
	serviceId: text('service_id')
		.notNull()
		.references(() => services.id, { onDelete: 'cascade' }),
	tag_id: text('tag_id')
		.notNull()
		.references(() => tag.id, { onDelete: 'cascade' })
});

export const reviews = sqliteTable('review', {
	id: text('id').primaryKey(),
	serviceId: text('service_id')
		.notNull()
		.references(() => services.id, { onDelete: 'cascade' }),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'set null' }),
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
export const selectReviewSchema = createSelectSchema(reviews, {
	id: z.string({ message: 'Review ID must be a string' }).uuid('Review ID must be UUID v4'),
	userId: z.string({ message: 'User ID must be a string' }).uuid('User ID must be UUID v4'),
	serviceId: z
		.string({ message: 'Service ID must be a string' })
		.uuid('Service ID must be UUID v4'),
	comment: z.string({ message: 'Review comment must be a string' }),
	rating: z
		.number()
		.min(0.0, 'Rating must be larger than 0')
		.max(5.0, 'Rating must be smaller than 5'),
	createdAt: z.coerce.date({ message: 'Created At must be a Date' }).optional(),
	updatedAt: z.coerce.date({ message: 'Updated At must be a Date' }).optional()
});
export const insertReviewSchema = selectReviewSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true
});
export const updateReviewSchema = insertReviewSchema.pick({ comment: true, rating: true });
export type Review = z.infer<typeof selectReviewSchema>;
export type ReviewInsert = z.infer<typeof insertReviewSchema>;
export type ReviewUpdate = z.infer<typeof updateReviewSchema>;

/* Business */
export const selectBusinessSchema = createSelectSchema(businesses, {
	id: z.string({ message: 'Business ID must be a string' }).uuid('Business ID must be UUID v4'),
	accountId: z
		.string({ message: 'Account ID must be a string' })
		.uuid('Account ID must be a string'),
	name: z.string({ message: 'Business name must be a string' }),
	about: z.string({ message: "Business' about must be a string" }),
	address: z.string({ message: "Business' address must be a string" }),
	type: z.enum(['company', 'freelancer'], {
		message: 'Type must be either `company` or `freelancer`'
	}),
	avatarUrl: z.string({ message: 'Avatar URL must be a string' }).url('Avatar URL must be an URL')
});
export const insertBusinessSchema = selectBusinessSchema.omit({ id: true });
export const updateBusinessSchema = insertBusinessSchema.pick({
	name: true,
	about: true,
	address: true,
	type: true
});
export type Business = z.infer<typeof selectBusinessSchema>;
export type BusinessInsert = z.infer<typeof insertBusinessSchema>;
export type BusinessUpdate = z.infer<typeof updateBusinessSchema>;

/* Business contact */
const businessContactIds = z.object({
	id: z
		.string({ message: 'Business contact ID must be a string' })
		.uuid('Business contact ID must be UUID v4'),
	businessId: z
		.string({ message: 'Business ID must be a string' })
		.uuid('Business ID must be UUID v4')
});
const businessContactEmail = z.object({
	contact: z.string({ message: 'Contact must be a string' }).email('Contact must be an email'),
	type: z.enum(['email'])
});
const businessContactWebsite = z.object({
	contact: z.string({ message: 'Contact must be a string' }).url('Contact must be URL'),
	type: z.enum(['website'])
});
const businessContactOther = z.object({
	contact: z.string({ message: 'Contact must be a string' }),
	type: z.enum(['phone', 'telegram', 'whatsapp', 'viber'])
});
export const businessContactSchema = businessContactIds.and(
	businessContactOther.or(businessContactWebsite).or(businessContactEmail)
);

/* Service */
export const selectServiceSchema = createSelectSchema(services, {
	id: z.string({ message: 'Service ID must be a string' }).uuid('Service ID must be UUID v4'),
	businessId: z
		.string({ message: 'Business ID must be a string' })
		.uuid('Business ID must be UUID v4'),
	title: z.string({ message: 'Service title must be a string' }),
	description: z.string({ message: "Service's description must be a string" }),
	price: z.number({ message: "Service's price must be a number" }),
	isActive: z.boolean({ message: "Service's isActive must be a boolean" }).optional(),
	createdAt: z.coerce.date({ message: 'Created At must be a Date' }).optional(),
	updatedAt: z.coerce.date({ message: 'Updated At must be a Date' }).optional()
});
export const insertServiceSchema = selectServiceSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true
});
export const putServiceSchema = insertServiceSchema.pick({
	title: true,
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
export const selectUserSchema = createSelectSchema(users, {
	id: z.string({ message: 'User ID must be a string' }).uuid('User ID must be UUID v4'),
	accountId: z
		.string({ message: 'Account ID must be a string' })
		.uuid('Account ID must be a string'),
	name: z.string({ message: "User's name must be a string" }),
	surname: z.string({ message: "User's surname must be a string" }),
	avatarUrl: z.string({ message: 'Avatar URL must be a string' }).url('Avatar URL must be an URL'),
	createdAt: z.coerce.date({ message: 'Created At must be a Date' }).optional(),
	updatedAt: z.coerce.date({ message: 'Updated At must be a Date' }).optional()
});
export const insertUserSchema = selectUserSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true
});
export const patchUserSchema = insertUserSchema.pick({
	name: true,
	surname: true,
	avatarUrl: true
});

export type User = z.infer<typeof selectUserSchema>;
export type UserInsert = z.infer<typeof insertUserSchema>;
export type UserUpdate = z.infer<typeof patchUserSchema>;

/* Account */
export const selectAccountSchema = createSelectSchema(accounts, {
	id: z.string({ message: 'Account ID must be a string' }).uuid('Account ID must be a string'),
	email: z
		.string({ message: "Account's email must be a string" })
		.email("Account's email must be an email"),
	passwordHash: z.string({ message: "Account's password hash must be a string" }),
	type: z.enum(['user', 'business'], {
		message: 'Type must be either `user` or `business`'
	}),
	createdAt: z.coerce.date({ message: 'Created At must be a Date' }),
	updatedAt: z.coerce.date({ message: 'Updated At must be a Date' }),
	isAdmin: z.coerce.boolean({ message: 'isAdmin must be boolean' })
});
export const insertAccountSchema = selectAccountSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true
});

export type Account = z.infer<typeof selectAccountSchema>;
export type AccountInsert = z.infer<typeof insertAccountSchema>;

export type Session = typeof session.$inferSelect;

export type BusinessWithRating = Business & {
	averageRating: number;
};

export const tables = {
	session: session,
	accounts: accounts,
	users: users,
	businesses: businesses,
	businessContact: businessContact,
	tag: tag,
	// businessTag: businessTag,
	services: services,
	// serviceTag: serviceTag,
	reviews: reviews
};
