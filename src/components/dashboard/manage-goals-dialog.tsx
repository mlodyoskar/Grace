"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Goal } from "@/db/schema";
import React from "react";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./goals-table";
import { GoalIcon, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import { useDialogsStore } from "@/lib/store";

export type GoalWithDate = Omit<Goal, "date"> & { date: Date | null };

interface Props {
 goals: GoalWithDate[];
 setSelectedGoalId: (id: string) => void;
}

export const ManageGoalsDialog = ({ goals, setSelectedGoalId }: Props) => {
 const [isOpen, setIsOpen] = React.useState(false);
 const { setIsOpen: setIsDialogOpen } = useDialogsStore();

 const goalsWithDelete = goals.map<ColumnGoal>((goal) => ({
  ...goal,
  delete: () => {
   setIsDialogOpen("delete-goal", true);
   setIsOpen(false);
   setSelectedGoalId(goal.id.toString());
  },
 }));

 return (
  <Dialog onOpenChange={setIsOpen} open={isOpen}>
   <DialogTrigger asChild>
    <Button onClick={() => setIsOpen(true)} variant="outline" size="sm">
     Zarządzaj celami
    </Button>
   </DialogTrigger>
   <DialogContent className="sm:max-w-[525px]">
    <DialogHeader>
     <DialogTitle>Zarządzaj swoimi celami</DialogTitle>
     <DialogDescription>Nadaj mu nazwę, aktualny stan konta oraz opisz jakie środki na nim przetrzymujesz.</DialogDescription>
    </DialogHeader>

    <DataTable columns={columns} data={goalsWithDelete} />
    <Button
     className="w-fit gap-2"
     onClick={() => {
      setIsOpen(false);
      setIsDialogOpen("new-goal", true);
     }}
    >
     Dodaj nowy cel <GoalIcon className="w-6 h-6" />
    </Button>
   </DialogContent>
  </Dialog>
 );
};

export type ColumnGoal = {
 id: number;
 amount: number;
 date: Date | null;
 name: string;
 delete: () => void;
};

export const columns: ColumnDef<ColumnGoal>[] = [
 {
  accessorKey: "name",
  header: "Nazwa",
 },
 {
  accessorKey: "amount",
  header: () => <div className="text-right">Kwota</div>,
  cell: ({ row }) => {
   const amount = parseFloat(row.getValue("amount"));
   const formatted = new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
   }).format(amount);

   return <div className="text-right font-medium">{formatted}</div>;
  },
 },
 {
  accessorKey: "date",
  header: "Planowana data",
  cell: ({ row }) => {
   const amount = new Date(row.getValue("date") as string);
   const formatedDate = formatDate(amount);

   return <div className=" font-medium">{formatedDate}</div>;
  },
 },
 {
  id: "actions",
  cell: ({ row }) => {
   const goal = row.original;
   console.log(goal);

   return (
    <DropdownMenu>
     <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="h-8 w-8 p-0">
       <span className="sr-only">Otwórz menu</span>
       <MoreHorizontal className="h-4 w-4" />
      </Button>
     </DropdownMenuTrigger>
     <DropdownMenuContent align="end">
      <DropdownMenuItem onClick={() => goal.delete()}>Usuń cel</DropdownMenuItem>
     </DropdownMenuContent>
    </DropdownMenu>
   );
  },
 },
];
