import { ExpenseForm } from "@/components/dashboard/new-expense-form";
import { NewTransactionModal } from "@/components/dashboard/new-transaction-modal";

export const Dialogs = () => {
 return (
  <>
   <NewTransactionModal incomeForm={<ExpenseForm />} expenseForm={<ExpenseForm />} />
  </>
 );
};
