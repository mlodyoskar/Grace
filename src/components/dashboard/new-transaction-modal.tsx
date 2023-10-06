"use client";

import { useDialogsStore } from "@/lib/store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface Props {
 expenseForm: React.ReactNode;
 incomeForm: React.ReactNode;
}

export const NewTransactionModal = ({ expenseForm, incomeForm }: Props) => {
 const { dialogs, setIsOpen } = useDialogsStore();
 const isOpen = dialogs["new-transaction"];

 const handleOpen = (isOpen: boolean) => {
  setIsOpen("new-transaction", isOpen);
 };

 return (
  <Dialog onOpenChange={handleOpen} open={isOpen}>
   <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
     <DialogTitle className="mb-4">Nowa transakcja</DialogTitle>
     <div className="">
      <Tabs defaultValue="expense" className="w-full">
       <TabsList className="w-full">
        <TabsTrigger className="w-full" value="expense">
         Wydatek
        </TabsTrigger>
        <TabsTrigger className="w-full" value="income">
         Wpływ
        </TabsTrigger>
       </TabsList>
       <TabsContent value="expense">{expenseForm}</TabsContent>
       <TabsContent value="income">{incomeForm}</TabsContent>
      </Tabs>
     </div>
    </DialogHeader>
   </DialogContent>
  </Dialog>
 );
};
