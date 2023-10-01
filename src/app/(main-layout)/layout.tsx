"use client";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
 const session = useSession();

 if (session.status === "loading") {
  return <div>Loading...</div>;
 }

 if (!session.data) {
  redirect("/auth");
 }

 return (
  <div>
   <div className="border-b">
    <div className="flex h-16 items-center px-4">
     <MainNav className="mx-6" />
     <div className="ml-auto flex items-center space-x-4">
      <UserNav />
     </div>
    </div>
   </div>
   {children}
  </div>
 );
}
