import { sql } from "@vercel/postgres";
import { asc, sql as drizzleSql } from "drizzle-orm";
import { authOptions } from "@/lib/auth";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { accounts, categories, transactions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatMoney } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { MonthlySpendings } from "./monthly-spendings";

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
   icon: categories.icon,
   color: categories.color,
   amount: drizzleSql<number>`sum(${transactions.amount})`,
  })
  .from(categories)
  .leftJoin(transactions, eq(categories.id, transactions.category_id))
  .where(drizzleSql`(${transactions.user_id}) = ${userId} and ${categories.is_income} = false`)
  .groupBy(categories.name, categories.icon, categories.color)
  .orderBy(asc(categories.name));

 const totalSum = sumsByCategory.reduce((acc, curr) => acc + Number(curr.amount), 0);

 const expenseByCategory = sumsByCategory.map((category) => ({
  ...category,
  amount: Number(category.amount),
  percentOfTotal: category.amount / totalSum,
 }));

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
 console.log(expenseByCategory);
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
      <CardHeader className="">
       <CardTitle className="font-semibold tracking-tight">Twoje miesięczne wydatki</CardTitle>
      </CardHeader>
      <CardContent className="">
       {/* <ExpensesChart data={expenses} /> */}
       <MonthlySpendings expenses={expenseByCategory} />
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
