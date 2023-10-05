import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserAccounts } from "@/app/(main-layout)/accounts/page";
import { eq } from "drizzle-orm";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { categories } from "@/db/schema";
import { iconSet } from "@/app/(main-layout)/categories/new-category-form";

const getUserCategories = async (userId: number) => {
 const db = drizzle(sql);
 const userCategories = await db.select().from(categories).where(eq(categories.user_id, userId));
 return userCategories;
};

export const ExpenseForm = async () => {
 const session = await getServerSession(authOptions);
 const userId = session?.user.id;
 if (!userId) return null;

 const accounts = await getUserAccounts(userId);
 const categories = await getUserCategories(userId);

 return (
  <form className="mt-6">
   <div className="space-y-6">
    <div className="grid w-full gap-1.5">
     <Label htmlFor="amount" className="ml-2">
      Kwota
     </Label>
     <Input id="amount" name="amount" required placeholder="0" type="number" className="col-span-3" />
    </div>
    <div className="grid w-full gap-1.5">
     <Label htmlFor="account" className="ml-2">
      Konto bankowe
     </Label>
     <Select defaultValue={accounts[0].id.toString()}>
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
     <Label htmlFor="account" className="ml-2">
      Kategoria
     </Label>
     <Select defaultValue={categories[0].id.toString()}>
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
   </div>
   <Button className="w-full mt-6" size="lg" type="submit">
    Dodaj transakcję
   </Button>
  </form>
 );
};
