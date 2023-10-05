import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { accounts as accountSchema } from "@/db/schema";
import { PiggyBankIcon } from "lucide-react";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { NewAccountDialog } from "./new-account-dialog";
import { OptionsAccountDialog } from "./options-account-dialog";

export const getUserAccounts = async (userId: number) => {
 const db = drizzle(sql);
 const accounts = await db.select().from(accountSchema).where(eq(accountSchema.user_id, userId));
 return accounts;
};

const AccountsPage = async () => {
 const session = await getServerSession(authOptions);
 const accounts = await getUserAccounts(session?.user.id as number);

 return (
  <div className="hidden flex-col md:flex">
   <div className="flex-1 space-y-4 p-8 pt-6">
    <div className="flex items-center space-x-2  space-y-2">
     <h2 className="text-3xl font-bold tracking-tight">Konta bankowe</h2>
     <NewAccountDialog />
    </div>
   </div>
   <div className="grid grid-cols-4 gap-4 p-8">
    {accounts.map(({ id, name, balance, description }) => {
     const balanceInPLN = (balance || 0) / 100;
     return (
      <Card className="relative" key={id}>
       <CardHeader className="flex flex-row items-center gap-1 space-y-0 pb-2">
        <PiggyBankIcon className="h-6 w-6 text-muted-foreground" />
        <CardTitle className="text-md font-medium">{name}</CardTitle>
        <OptionsAccountDialog accountId={id.toString()} />
       </CardHeader>
       <CardContent>
        <div className="text-2xl font-bold">{balanceInPLN} PLN</div>
        <p className="text-xs text-muted-foreground">{description}</p>
       </CardContent>
      </Card>
     );
    })}
   </div>
  </div>
 );
};

export default AccountsPage;
