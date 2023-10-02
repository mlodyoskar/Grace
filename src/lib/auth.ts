import { users } from "@/db/schema";
import { sql } from "@vercel/postgres";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { redirect } from "next/navigation";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
 throw new Error("Missing Google Client ID or Client Secret");
}

const db = drizzle(sql);

export const authOptions: AuthOptions = {
 providers: [
  GoogleProvider({
   clientId: GOOGLE_CLIENT_ID,
   clientSecret: GOOGLE_CLIENT_SECRET,
  }),
 ],
 callbacks: {
  async signIn({ user, account, profile }) {
   if (!profile || !profile.email || !account) {
    return false;
   }
   const dbUsers = await db.select().from(users).where(eq(users.email, profile.email));
   const dbUser = dbUsers[0];

   if (account.provider === "google") {
    const email = profile.email;
    if (!dbUser) {
     const result = await db.insert(users).values({ email });
    }
   }

   return true;
  },
  async session({ session, token, user }) {
   if (!session.user?.email) {
    return session;
   }

   const dbUsers = await db.select().from(users).where(eq(users.email, session.user.email));
   const dbUser = dbUsers[0];

   session.user.id = dbUser.id;
   return session;
  },
 },
};
