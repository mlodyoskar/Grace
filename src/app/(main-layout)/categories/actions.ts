"use server";

import { Color, CategoryIcon, categories } from "@/db/schema";
import { authOptions } from "@/lib/auth";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import z from "zod";

const createSchema = z.object({
 name: z.string().nonempty(),
 type: z.enum(["income", "expense"]),
});

export const createCategory = async (icon: CategoryIcon, color: Color, formData: FormData) => {
 const db = drizzle(sql);

 const { name, type } = createSchema.parse({
  name: formData.get("name"),
  type: formData.get("type"),
 });

 const session = await getServerSession(authOptions);
 if (!session) {
  throw new Error("You must be logged in to delete an account");
 }

 await db.insert(categories).values({ name, is_income: type === "income", icon, color, user_id: session.user.id });
 revalidatePath("/categories");
};
