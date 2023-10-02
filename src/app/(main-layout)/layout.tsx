"use client";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useState } from "react";
import Grace from "@/public/grace.png";

export default function RootLayout({ children }: { children: React.ReactNode }) {
 const session = useSession();
 if (session.status === "loading") {
  return (
   <div className="max-w-xl text-center w-fit m-auto mt-20">
    <Image src={"/grace.png"} width={80} height={80} alt="Grace." className="rounded-full mx-auto" />

    <h1 className=" text-2xl font-bold ">Grace</h1>
    <p>Your personal AI assistant</p>
    <Icons.spinner className="animate-spin w-16 h-16 mt-40 mx-auto " />
   </div>
  );
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
