"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { createGoal } from "./actions";
import { DatePicker } from "../ui/date-picker";
import { useDialogsStore } from "@/lib/store";

export const NewGoalDialog = () => {
 const [date, setDate] = React.useState<Date>();
 const createGoalWithDate = createGoal.bind(null, date);

 const { dialogs, setIsOpen } = useDialogsStore();
 const isOpen = dialogs["new-goal"];

 const handleOnOpenChange = (isOpen: boolean) => {
  setIsOpen("new-goal", isOpen);
 };

 return (
  <Dialog onOpenChange={handleOnOpenChange} open={isOpen}>
   <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
     <DialogTitle>Dodaj nowy cel</DialogTitle>
     <DialogDescription>Nadaj mu nazwę, aktualny stan konta oraz opisz jakie środki na nim przetrzymujesz.</DialogDescription>
    </DialogHeader>
    <form onSubmit={() => setIsOpen("new-goal", false)} action={createGoalWithDate}>
     <div className="space-y-4">
      <div className="grid w-full max-w-sm  gap-1.5">
       <Label htmlFor="name" className="ml-2">
        Nazwa
       </Label>
       <Input id="name" name="name" required placeholder="Wycieczka do Grecji" className="col-span-3" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
       <Label htmlFor="ammount" className="ml-2">
        Cena
       </Label>
       <Input type="number" name="ammount" id="ammount" defaultValue="0" className="col-span-3" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
       <Label htmlFor="description" className="ml-2">
        Data planowanego zakupu
       </Label>
       <DatePicker date={date} setDate={setDate} />
      </div>
     </div>
     <DialogFooter className="mt-4">
      <Button type="submit">Dodaj cel</Button>
     </DialogFooter>
    </form>
   </DialogContent>
  </Dialog>
 );
};
