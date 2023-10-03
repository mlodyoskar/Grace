import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { deleteGoal } from "./actions";
import { useDialogsStore } from "@/lib/store";

interface Props {
 goalId: string | null;
}

export const DeleteGoalDialog = ({ goalId }: Props) => {
 const deleteGoalWithId = deleteGoal.bind(null, goalId || "-1");
 const { dialogs, setIsOpen } = useDialogsStore();
 const isOpen = dialogs["delete-goal"];

 const onOpenChangeHandler = (isOpen: boolean) => {
  setIsOpen("delete-goal", isOpen);
 };

 return (
  <Dialog open={isOpen} onOpenChange={onOpenChangeHandler}>
   <DialogContent>
    <form onSubmit={() => onOpenChangeHandler(false)} action={deleteGoalWithId}>
     <DialogHeader>
      <DialogTitle>Czy na pewno chcesz usunąć cel?</DialogTitle>
      <DialogDescription>Ta akcja jest nieodwracalna. Na pewno chcesz usunąć te dane z naszych serwerów?</DialogDescription>
     </DialogHeader>
     <DialogFooter>
      <Button type="submit">Usuń</Button>
     </DialogFooter>
    </form>
   </DialogContent>
  </Dialog>
 );
};
