import { sql } from "@vercel/postgres";
import { asc, sql as drizzleSql } from "drizzle-orm";
import { authOptions } from "@/lib/auth";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { accounts, categories, transactions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Card, CardContent, CardHeader } from "../ui/card";
import { formatMoney } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NewTransactionModal } from "./new-transaction-modal";

// const getUserGoals = async (userId: number) => {
//  const db = drizzle(sql);
//  const userGoals = await db.select().from(goals).where(eq(goals.user_id, userId));
//  const userGoalsWithMultipliedAmount = userGoals.map((goal) => ({
//   ...goal,
//   amount: goal.amount / 100,
//   date: goal.date ? new Date(goal.date) : null,
//  }));

//  return userGoalsWithMultipliedAmount;
// };

const getUserExpensesByCategory = async (userId: number) => {
 const db = drizzle(sql);

 const sumsByCategory = await db
  .select({
   name: categories.name,
   amount: drizzleSql<number>`sum(${transactions.amount})`,
  })
  .from(categories)
  .leftJoin(transactions, eq(categories.id, transactions.category_id))
  .where(drizzleSql`(${transactions.user_id}) = ${userId}`)
  .groupBy(categories.name)
  .orderBy(asc(categories.name));

 const totalSum = sumsByCategory.reduce((acc, curr) => acc + Number(curr.amount), 0);

 const expenseByCategory = sumsByCategory.map((category) => ({
  ...category,
  amount: Number(category.amount),
  percentOfTotal: category.amount / totalSum,
 }));

 console.log(expenseByCategory, totalSum);

 return { expenseByCategory, totalSum };
};
const getUserOverview = async (userId: number) => {
 const db = drizzle(sql);

 const balanceSum = await db
  .select({
   sum: drizzleSql<number>`sum(${accounts.balance})`,
  })
  .from(accounts)
  .where(drizzleSql`(${accounts.user_id}) = ${userId}`);

 return { sum: balanceSum.reduce((acc, curr) => acc + Number(curr.sum), 0) };
};

export const Dashboard = async () => {
 const session = await getServerSession(authOptions);
 const userId = session?.user.id;
 if (!userId) return null;
 //  const userFirstName = session?.user?.name?.split(" ")[0];
 //  const goals = await getUserGoals(userId);
 const { expenseByCategory } = await getUserExpensesByCategory(userId);
 const { sum } = await getUserOverview(userId);

 return (
  <div className="hidden flex-col md:flex bg-gray-100">
   <div className="grid grid-cols-12  gap-2 p-8 pt-6">
    <div className="col-span-6 grid grid-cols-6 gap-2">
     <Card className=" space-y-2 bg-white col-span-3">
      <CardHeader className="p-4 pb-0">Twoje środki</CardHeader>
      <CardContent className="text-gray-800">
       <p className="text-2xl tracking-wide font-medium">{formatMoney(sum)}</p>
      </CardContent>
     </Card>
     <Card className=" space-y-2 bg-white col-span-2">
      <CardHeader className="p-4 ">Suma wydatków</CardHeader>
      <CardContent>
       <p>1000zł</p>
      </CardContent>
     </Card>
    </div>
    <div className="col-span-9">
     <Card className=" space-y-2  bg-white ">
      <CardHeader className="font-semibold p-4 tracking-tight">Twoje miesięczne wydatki</CardHeader>
      <CardContent className="">
       {/* <ExpensesChart data={expenses} /> */}
       <div className="flex flex-col gap-2">
        {expenseByCategory.map(({ name, amount, percentOfTotal }) => {
         const percent = Number((percentOfTotal * 100).toFixed());
         const amountFormatted = formatMoney(amount);

         return (
          <div className="flex items-center justify-between" key={name}>
           <div className="flex items-center gap-1">
            <div className="h-2 w-2 bg-indigo-600 rounded-full" />
            <p className="text-sm">{name}</p>
           </div>
           <div className="flex gap-2 justify-between">
            <p className="text-sm text-gray-700 text-left">{amountFormatted}</p>
            <p className="text-sm font-semibold">{percent}%</p>
           </div>
          </div>
         );
        })}
       </div>
      </CardContent>
     </Card>
    </div>

    {/* <p className="text-xl  tracking-tight">Witaj ponownie, {userFirstName}!</p> */}
    {/* <div className="col-span-2">
     <div className="flex items-center justify-between gap-2">
      <h2 className="text-3xl font-semibold tracking-tight">Cele</h2>
      <GoalsDialogs goals={goals} />
     </div>
     <div className="grid grid-cols-3 gap-2 mt-2">
      {goals.map(({ id, amount, name, date }) => {
       const formattedDate = formatDate(date);

       return (
        <Card className="relative" key={id}>
         <CardHeader className="flex flex-row items-center gap-1 space-y-0 pb-2">
          <GoalIcon className="text-muted-foreground w-4 h-4" />
          <CardTitle className="text-md font-medium">{name}</CardTitle>
         </CardHeader>
         <CardContent>
          <div className="text-xl font-bold">{amount} PLN</div>
          <p className="text-xs text-muted-foreground">Planowany zakup</p>
          <p className="text-xs ">{formattedDate}</p>
         </CardContent>
        </Card>
       );
      })}
     </div>
    </div> */}
   </div>
  </div>
 );
};
