"use client";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuGroup,
 DropdownMenuItem,
 DropdownMenuLabel,
 DropdownMenuSeparator,
 DropdownMenuShortcut,
 DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";

export function UserNav() {
 const { data } = useSession();
 const avatarUrl = data?.user?.image;
 const avatarFallback = data?.user?.name
  ?.split(" ")
  .map((n) => n[0])
  .join("");

 return (
  <DropdownMenu>
   <DropdownMenuTrigger asChild>
    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
     <Avatar className="h-8 w-8">
      <AvatarImage src={avatarUrl || ""} alt="User avatar" />
      <AvatarFallback>{avatarFallback}</AvatarFallback>
     </Avatar>
    </Button>
   </DropdownMenuTrigger>
   <DropdownMenuContent className="w-56" align="end" forceMount>
    <DropdownMenuLabel className="font-normal">
     <div className="flex flex-col space-y-1">
      <p className="text-sm font-medium leading-none">{data?.user?.name}</p>
      <p className="text-xs leading-none text-muted-foreground">{data?.user?.email}</p>
     </div>
    </DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
     <DropdownMenuItem>
      Billing
      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
     </DropdownMenuItem>
     <DropdownMenuItem asChild>
      <Link href="/settings">Ustawienia</Link>
     </DropdownMenuItem>
     <DropdownMenuItem>New Team</DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={() => signOut()}>
     Wyloguj się
     <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
   </DropdownMenuContent>
  </DropdownMenu>
 );
}
