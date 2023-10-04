"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import { signIn } from "next-auth/react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
 const [isLoading, setIsLoading] = React.useState(false);

 return (
  <div className={cn("grid", className)} {...props}>
   <div className="relative"></div>
   <Button
    onClick={() => {
     setIsLoading(true);
     signIn("google");
    }}
    variant="default"
    type="button"
    disabled={isLoading}
   >
    {isLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : <Icons.google className="mr-2 h-4 w-4" />} Google
   </Button>
  </div>
 );
}
