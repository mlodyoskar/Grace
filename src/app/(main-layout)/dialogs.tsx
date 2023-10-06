import { ExpenseForm } from "@/components/transactions/new-expense-form";
import { NewTransactionModal } from "@/components/dashboard/new-transaction-modal";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserAccounts } from "@/app/(main-layout)/accounts/page";
import { eq } from "drizzle-orm";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { CategoryType, categories } from "@/db/schema";
import { IncomeForm } from "@/components/transactions/new-income.form";

const getUserCategories = async (userId: number) => {
 const db = drizzle(sql);
 const userCategories = await db.select().from(categories).where(eq(categories.user_id, userId));
 return userCategories;
};

export const Dialogs = async () => {
 const session = await getServerSession(authOptions);
 const userId = session?.user.id;
 if (!userId) return null;

 const accounts = await getUserAccounts(userId);
 const categories = await getUserCategories(userId);

 const { expense, income } = categories.reduce<{ income: CategoryType[]; expense: CategoryType[] }>(
  ({ income, expense }, category) => {
   if (category.is_income) {
    income.push(category);
   } else {
    expense.push(category);
   }
   return { income, expense };
  },
  { income: [], expense: [] }
 );

 return (
  <>
   <NewTransactionModal
    incomeForm={<IncomeForm accounts={accounts} categories={income} />}
    expenseForm={<ExpenseForm accounts={accounts} categories={expense} />}
   />
  </>
 );
};
