"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

import { Account, CategoryType } from "@/db/schema";
import { createTransaction } from "./actions";
import { DatePicker } from "../ui/date-picker";
import React from "react";

interface Props {
 accounts: Account[];
 categories: CategoryType[];
}

export const IncomeForm = ({ accounts, categories }: Props) => {
 const [date, setDate] = React.useState<Date | undefined>(new Date());
 const createIncomeWithDate = createTransaction.bind(null, date);

 return (
  <form action={createIncomeWithDate} className="mt-4">
   <div className="space-y-6">
    <div className="grid w-full gap-1.5">
     <Label htmlFor="amount" className="ml-2">
      Kwota
     </Label>
     <Input id="amount" name="amount" required placeholder="0" type="number" className="col-span-3" />
    </div>
    <div className="grid w-full gap-1.5">
     <Label htmlFor="accountId" className="ml-2">
      Konto bankowe
     </Label>
     <Select name="accountId" defaultValue={accounts[0].id.toString()}>
      <SelectTrigger className="w-full">
       <SelectValue placeholder="Wybierz" />
      </SelectTrigger>
      <SelectContent>
       {accounts.map(({ id, name }) => (
        <SelectItem value={id.toString()} key={id}>
         {name}
        </SelectItem>
       ))}
      </SelectContent>
     </Select>
    </div>
    <div className="grid w-full gap-1.5">
     <Label htmlFor="categoryId" className="ml-2">
      Kategoria
     </Label>
     <Select name="categoryId" defaultValue={categories[0].id.toString()}>
      <SelectTrigger className="w-full">
       <SelectValue placeholder="Wybierz" />
      </SelectTrigger>
      <SelectContent>
       {categories.map(({ id, name }) => {
        return (
         <SelectItem value={id.toString()} key={id}>
          {name}
         </SelectItem>
        );
       })}
      </SelectContent>
     </Select>
    </div>
    <div className="grid w-full gap-1.5">
     <Label htmlFor="categoryId" className="ml-2">
      Data
     </Label>
     <DatePicker date={date} setDate={setDate} />
    </div>
    <div className="grid w-full gap-1.5">
     <Label htmlFor="amount" className="ml-2">
      Opis (opcjonalnie)
     </Label>
     <Input id="description" name="description" placeholder="Zakupy w biedronce" className="col-span-3" />
    </div>
   </div>
   <Button className="w-full mt-6" size="lg" type="submit">
    Dodaj wpływ
   </Button>
  </form>
 );
};
