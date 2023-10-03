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
 const date = new Date("1999-01-08");

 // Format the date as 'YYYY-MM-DD'
 const formattedDate = date.toISOString().split("T")[0];
 const result = await db.insert(goals).values({ name: "Trenażer", amount: 250000, user_id: session.user.id, category_id: 1, date: formattedDate });
 //  const data = await db.select().from(categories);

 return new Response(JSON.stringify({ categories: result }));
};
