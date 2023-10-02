"use client";

import { LoginButton } from "@/components/login-button";
import { UserAuthForm } from "@/components/user-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";

const LoginPage = () => {
 const { data } = useSession();

 if (data) {
  redirect("/");
 }

 return (
  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="lg:p-8">
   <div className="mx-auto flex w-full mt-[20%] flex-col justify-center space-y-6 sm:w-[350px]">
    <div className="flex flex-col space-y-2 text-center">
     <h1 className="text-2xl font-semibold tracking-tight">Zaloguj się na Twoje konto</h1>
     <p className="text-sm text-muted-foreground">Zaloguj się, aby zarządzać swoim budżetem domowym przy pomocy Grace. Twojej AI asystentki.</p>
    </div>
    <UserAuthForm />
    {/* <p className="px-8 text-center text-sm text-muted-foreground">
     By clicking continue, you agree to our{" "}
     <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
      Terms of Service
     </Link>{" "}
     and{" "}
     <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
      Privacy Policy
     </Link>
     .
    </p> */}
   </div>
  </motion.div>
 );
};

export default LoginPage;
