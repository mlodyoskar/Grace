import GoogleProvider from "next-auth/providers/google";
import { redirect } from "next/navigation";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
 throw new Error("Missing Google Client ID or Client Secret");
}

export const authOptions = {
 providers: [
  GoogleProvider({
   clientId: GOOGLE_CLIENT_ID,
   clientSecret: GOOGLE_CLIENT_SECRET,
  }),
 ],
};
