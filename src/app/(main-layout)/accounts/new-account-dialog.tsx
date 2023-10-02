"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { PlusIcon } from "lucide-react";
import { createAccount } from "./actions";
import React from "react";

export const NewAccountDialog = () => {
 const [isOpen, setIsOpen] = React.useState(false);
 return (
  <Dialog onOpenChange={setIsOpen} open={isOpen}>
   <DialogTrigger asChild>
    <Button onClick={() => setIsOpen(true)} variant="outline" size="icon">
     <PlusIcon />
    </Button>
   </DialogTrigger>
   <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
     <DialogTitle>Dodaj nowe konto bankowe</DialogTitle>
     <DialogDescription>Nadaj mu nazwę, aktualny stan konta oraz opisz jakie środki na nim przetrzymujesz.</DialogDescription>
    </DialogHeader>
    <form onSubmit={() => setIsOpen(false)} action={createAccount}>
     <div className="space-y-4">
      <div className="grid w-full max-w-sm  gap-1.5">
       <Label htmlFor="name" className="ml-2">
        Nazwa
       </Label>
       <Input id="name" name="name" required placeholder="Santander" className="col-span-3" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
       <Label htmlFor="balance" className="ml-2">
        Stan konta
       </Label>
       <Input type="number" name="balance" id="balance" defaultValue="0" className="col-span-3" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
       <Label htmlFor="description" className="ml-2">
        Opis konta
       </Label>
       <Textarea name="description" id="description" placeholder="Trzymam na tym koncie oszczędności i zbieram na moje cele" className="col-span-3" />
      </div>
     </div>
     <DialogFooter className="mt-4">
      <Button type="submit">Dodaj konto</Button>
     </DialogFooter>
    </form>
   </DialogContent>
  </Dialog>
 );
};
