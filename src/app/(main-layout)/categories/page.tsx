import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { categories as categorieSchema } from "@/db/schema";
import { PiggyBankIcon } from "lucide-react";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { eq } from "drizzle-orm";

const getUserCategories = async (userId: number) => {
 const db = drizzle(sql);
 const accounts = await db.select().from(categorieSchema).where(eq(categorieSchema.user_id, userId));
 return accounts;
};

const CategoriesPage = async () => {
 const session = await getServerSession(authOptions);
 const categories = await getUserCategories(session?.user.id as number);

 return (
  <div className="hidden flex-col md:flex">
   <div className="flex-1 space-y-4 p-8 pt-6">
    <div className="flex items-center justify-between space-y-2">
     <h2 className="text-3xl font-bold tracking-tight">Kategorie wydatków</h2>
    </div>
   </div>
   <div className="grid grid-cols-4 gap-4 p-8">
    {categories.map(({ id, name, is_income, is_recurring }) => {
     return (
      <Card key={id}>
       <CardHeader className="flex flex-row items-center gap-1 space-y-0 pb-2">
        <PiggyBankIcon className="h-4 w-4 text-muted-foreground" />

        <CardTitle className="text-sm font-medium">{name}</CardTitle>
       </CardHeader>
       <CardContent>
        {/* <div className="text-2xl font-bold">{balanceInPLN} PLN</div> */}
        {/* <p className="text-xs text-muted-foreground">{description}</p> */}
       </CardContent>
      </Card>
     );
    })}
   </div>
   <div className="flex-1 space-y-4 p-8 pt-6">
    <div className="flex items-center justify-between space-y-2">
     <h2 className="text-3xl font-bold tracking-tight">Kategorie przychodów</h2>
    </div>
   </div>
  </div>
 );
};

export default CategoriesPage;
