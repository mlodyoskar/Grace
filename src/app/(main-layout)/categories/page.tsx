import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryType, categories as category } from "@/db/schema";

import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { eq } from "drizzle-orm";

import { NewCategoryForm } from "./new-category-form";
import { CategoriesSummary } from "./categories";

const getUserCategories = async (userId: number) => {
 const db = drizzle(sql);
 const categories = await db.select().from(category).where(eq(category.user_id, userId));
 return categories.reduce<{ income: CategoryType[]; expense: CategoryType[] }>(
  (acc, curr) => {
   if (curr.is_income) {
    return { ...acc, income: [...acc.income, curr] };
   } else {
    return { ...acc, expense: [...acc.expense, curr] };
   }
  },
  { income: [], expense: [] }
 );
};

const CategoriesPage = async () => {
 const session = await getServerSession(authOptions);
 const categories = await getUserCategories(session?.user.id as number);

 return (
  <div className="hidden bg-gray-50 flex-col md:flex">
   <div className="flex-1 space-y-4 p-8 pt-6">
    <div className="">
     <h2 className="text-3xl font-bold tracking-tight">Kategorie</h2>
     <div className="w-full grid gap-4 grid-cols-12 mt-8">
      <div className="col-span-3">
       <Card>
        <CardHeader className="p-4 pb-0">
         <CardTitle className="text-xl">Dodaj nową kategorie</CardTitle>
        </CardHeader>
        <NewCategoryForm />
       </Card>
      </div>
      <Card className="col-span-9 px-4">
       <CategoriesSummary title="Kategorie wydatków" categories={categories.expense} />
       <CategoriesSummary title="Kategorie przychodów" categories={categories.income} />
      </Card>
     </div>
    </div>
   </div>
   <div className="grid grid-cols-4 gap-4 p-8"></div>
   <div className="flex-1 space-y-4 p-8 pt-6"></div>
  </div>
 );
};

export default CategoriesPage;
