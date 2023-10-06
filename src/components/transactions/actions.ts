"use server";

import { transactions } from "@/db/schema";
import { authOptions } from "@/lib/auth";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { getServerSession } from "next-auth";
import z from "zod";

const createSchema = z
 .object({
  amount: z.string().min(1),
  accountId: z.string().nonempty(),
  categoryId: z.string().nonempty(),
  description: z.string(),
 })
 .transform((data) => ({
  ...data,
  amount: parseInt(data.amount, 10),
 }));

export const createTransaction = async (date: Date | undefined, formData: FormData) => {
 const db = drizzle(sql);

 const { accountId, amount, categoryId, description } = createSchema.parse({
  amount: formData.get("amount"),
  accountId: formData.get("accountId"),
  categoryId: formData.get("categoryId"),
  description: formData.get("description"),
 });

 const session = await getServerSession(authOptions);
 if (!session) {
  throw new Error("You must be logged in to create Expense");
 }

 await db
  .insert(transactions)
  .values({ description, amount: amount * 100, account_id: accountId, user_id: session.user.id, category_id: categoryId, date });
};
