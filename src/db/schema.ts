import { createPool } from "@vercel/postgres";
import { boolean, date, integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";
// import { migrate } from "drizzle-orm/vercel-postgres/migrator";
import { sql } from "@vercel/postgres";

export const accounts = pgTable("accounts", {
 id: serial("id").primaryKey(),
 name: varchar("name", { length: 256 }),
 balance: integer("balance").default(0),
 user_id: integer("user_id").references(() => users.id),
 description: varchar("description", { length: 256 }),
});

export const categories = pgTable("categories", {
 id: serial("id").primaryKey(),
 name: varchar("name", { length: 256 }),
 user_id: integer("user_id").references(() => users.id),
 is_income: boolean("is_income"),
 is_recurring: boolean("is_recurring"),
});

export const transactions = pgTable("transactions", {
 id: serial("id").primaryKey(),
 name: varchar("name", { length: 256 }),
 user_id: integer("user_id").references(() => users.id),
 category_id: integer("category_id").references(() => categories.id),
 account_id: integer("account_id").references(() => accounts.id),
 amount: integer("amount"),
 date: date("date"),
});

export const goals = pgTable("goals", {
 id: serial("id").primaryKey(),
 name: varchar("name", { length: 256 }),
 amount: integer("amount"),
 date: date("date"),

 user_id: integer("user_id").references(() => users.id),
 category_id: integer("category_id").references(() => categories.id),
});

export const users = pgTable("users", {
 id: serial("id").primaryKey(),
 email: varchar("email", { length: 256 }),
});

// const db = drizzle(sql);
// const mig = async () => {
//  await migrate(db, { migrationsFolder: "./drizzle" });
// };

// mig();
