import { migrate } from "drizzle-orm/vercel-postgres/migrator";
import { boolean, date, integer, pgEnum, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";

export const accounts = pgTable("accounts", {
 id: serial("id").primaryKey(),
 name: varchar("name", { length: 256 }).notNull(),
 balance: integer("balance").default(0),
 user_id: integer("user_id").references(() => users.id),
 description: varchar("description", { length: 256 }),
});

export type Account = typeof accounts.$inferSelect; // return type when queried

const icons = [
 "transport",
 "home",
 "food",
 "health",
 "entertainment",
 "education",
 "clothes",
 "sport",
 "salary",
 "gift",
 "travel",
 "book",
 "electronic",
 "tool",
 "furniture",
 "car",
 "party",
 "coffe",
 "other",
] as const;

export const colors = ["red", "green", "blue", "yellow", "orange", "purple", "pink", "gray", "indigo", "sky"] as const;

export const iconEnum = pgEnum("icon", icons);
export const colorEnum = pgEnum("color", colors);

export type CategoryIcon = (typeof icons)[number];
export type Color = (typeof colors)[number];

export const categories = pgTable("categories", {
 id: serial("id").primaryKey(),
 name: varchar("name", { length: 256 }).notNull(),
 user_id: integer("user_id").references(() => users.id),
 is_income: boolean("is_income"),
 icon: iconEnum("icon").notNull().default("other"),
 color: colorEnum("color").notNull().default("red"),
});

export type CategoryType = typeof categories.$inferSelect; // return type when queried

export const transactions = pgTable("transactions", {
 id: serial("id").primaryKey(),
 name: varchar("name", { length: 256 }).notNull(),
 user_id: integer("user_id").references(() => users.id),
 category_id: integer("category_id").references(() => categories.id),
 account_id: integer("account_id").references(() => accounts.id),
 amount: integer("amount").notNull(),
 date: date("date"),
});

export const goals = pgTable("goals", {
 id: serial("id").primaryKey(),
 name: varchar("name", { length: 256 }).notNull(),
 amount: integer("amount").notNull(),
 date: date("date"),

 user_id: integer("user_id").references(() => users.id),
 category_id: integer("category_id").references(() => categories.id),
});

export type Goal = typeof goals.$inferSelect; // return type when queried

export const users = pgTable("users", {
 id: serial("id").primaryKey(),
 email: varchar("email", { length: 256 }),
});

const db = drizzle(sql);
// const mig = async () => {
// await migrate(db, { migrationsFolder: "./drizzle" });
// };

// mig();
