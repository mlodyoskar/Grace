import { sql } from "@vercel/postgres";
import { authOptions } from "@/lib/auth";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { getServerSession } from "next-auth";
import { goals } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatDate } from "@/lib/utils";
import { GoalIcon } from "lucide-react";
import { GoalsDialogs } from "./goals-dialogs";

const getUserGoals = async (userId: number) => {
 const db = drizzle(sql);
 const userGoals = await db.select().from(goals).where(eq(goals.user_id, userId));
 const userGoalsWithMultipliedAmount = userGoals.map((goal) => ({
  ...goal,
  amount: goal.amount / 100,
  date: goal.date ? new Date(goal.date) : null,
 }));

 return userGoalsWithMultipliedAmount;
};

export const Dashboard = async () => {
 const session = await getServerSession(authOptions);
 //  const userFirstName = session?.user?.name?.split(" ")[0];
 const goals = await getUserGoals(session?.user.id as number);

 return (
  <div className="hidden flex-col md:flex">
   <div className="flex-1 grid grid-cols-3 space-y-4 p-8 pt-6">
    <div className="flex  justify-between space-y-4">
     <h2 className="text-3xl font-bold tracking-tight">Twoje wydatki w tym miesiącu</h2>
     <div className="flex items-center space-x-2">{/* <CalendarDateRangePicker /> */}</div>
    </div>
    {/* <p className="text-xl  tracking-tight">Witaj ponownie, {userFirstName}!</p> */}
    <div className="col-span-2">
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
    </div>
   </div>
  </div>
 );
};
