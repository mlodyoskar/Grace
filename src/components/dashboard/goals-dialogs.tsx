"use client";

import React from "react";
import { GoalWithDate, ManageGoalsDialog } from "./manage-goals-dialog";
import { NewGoalDialog } from "./new-goal-dialog";
import { DeleteGoalDialog } from "./delete-goal-dialog";

interface Props {
 goals: GoalWithDate[];
}

export const GoalsDialogs = ({ goals }: Props) => {
 const [selectedGoalId, setSelectedGoalId] = React.useState<string | null>(null);
 return (
  <>
   <ManageGoalsDialog setSelectedGoalId={setSelectedGoalId} goals={goals} />
   <NewGoalDialog />
   <DeleteGoalDialog goalId={selectedGoalId} />
  </>
 );
};
