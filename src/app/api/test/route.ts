import { accounts, categories, goals, users } from "@/db/schema";
import { authOptions } from "@/lib/auth";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
 const session = await getServerSession(authOptions);

 if (!session?.user) {
  return new Response(null, { status: 401 });
 }

 console.log(session);
 const db = drizzle(sql);
 const result = await db.insert(categories).values({ name: "Kosmetyczne", user_id: 1, is_income: false, is_recurring: true });
 const data = await db.select().from(categories);

 return new Response(JSON.stringify({ categories: data }));
};
