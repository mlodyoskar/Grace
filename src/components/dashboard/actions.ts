"use server";

import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { goals } from "@/db/schema";
import z from "zod";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

const createSchema = z
 .object({
  name: z.string().min(1).max(255),
  amount: z.string().min(1).max(255),
 })
 .transform((data) => ({
  ...data,
  amount: parseFloat(data.amount),
 }));

export const createGoal = async (date: Date | undefined, formData: FormData) => {
 const db = drizzle(sql);

 const { name, amount } = createSchema.parse({
  name: formData.get("name"),
  amount: formData.get("amount"),
 });

 const session = await getServerSession(authOptions);
 if (!session) {
  throw new Error("You must be logged in to delete an account");
 }

 const formattedDate = date ? date.toISOString().split("T")[0] : null;

 await db.insert(goals).values({ name, amount: amount * 100, user_id: session.user.id, date: formattedDate });
 revalidatePath("/dashboard");
};

export const deleteGoal = async (goalId: string) => {
 const db = drizzle(sql);

 const session = await getServerSession(authOptions);
 if (!session) {
  throw new Error("You must be logged in to delete an account");
 }

 await db.delete(goals).where(eq(goals.id, Number(goalId)));
 revalidatePath("/dashboard");
};
