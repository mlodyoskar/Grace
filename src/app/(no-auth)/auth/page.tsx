"use client";

import { LoginButton } from "@/components/login-button";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const LoginPage = () => {
 const { data } = useSession();

 if (data) {
  redirect("/");
 }

 return (
  <div>
   <h1>Login</h1>
   <LoginButton />
  </div>
 );
};

export default LoginPage;
