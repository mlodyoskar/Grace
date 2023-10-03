"use server";

import { sql } from "@vercel/postgres";
import { accounts as accountSchema } from "@/db/schema";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";
import { eq } from "drizzle-orm";

const createSchema = z
 .object({
  name: z.string().min(1).max(255),
  balance: z.string().min(1).max(255),
  description: z.string().optional(),
 })
 .transform((data) => ({
  ...data,
  balance: parseFloat(data.balance),
 }));

export const createAccount = async (formData: FormData) => {
 const db = drizzle(sql);

 const session = await getServerSession(authOptions);
 if (!session) {
  throw new Error("You must be logged in to create an account");
 }

 const { name, balance, description } = createSchema.parse({
  name: formData.get("name"),
  balance: formData.get("balance"),
  description: formData.get("description"),
 });

 const balanceInPLN = balance * 100;
 await db.insert(accountSchema).values({ name: name, balance: balanceInPLN, description, user_id: session.user.id });
 revalidatePath("/accounts");
};

export const deleteAccount = async (account_id: string) => {
 const db = drizzle(sql);

 const session = await getServerSession(authOptions);
 if (!session) {
  throw new Error("You must be logged in to delete an account");
 }

 await db.delete(accountSchema).where(eq(accountSchema.id, Number(account_id)));
 revalidatePath("/accounts");
};
