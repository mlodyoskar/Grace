import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { deleteCategory } from "./actions";

interface Props {
 isOpen: boolean;
 handleOpen: (isOpen: boolean) => void;
 categoryId: number | undefined;
}

export const DeleteCategoryDialog = ({ isOpen, handleOpen, categoryId }: Props) => {
 const deleteCategoryWithId = deleteCategory.bind(null, categoryId);

 return (
  <Dialog open={isOpen} onOpenChange={handleOpen}>
   <DialogContent>
    <form action={deleteCategoryWithId}>
     <DialogHeader>
      <DialogTitle>Czy na pewno chcesz usunąć kategorie?</DialogTitle>
      <DialogDescription>Ta akcja jest nieodwracalna. Na pewno chcesz usunąć te dane z naszych serwerów?</DialogDescription>
     </DialogHeader>
     <DialogFooter>
      <Button type="button" variant="secondary" onClick={() => handleOpen(false)}>
       Anuluj
      </Button>
      <Button onClick={() => handleOpen(false)} type="submit">
       Usuń
      </Button>
     </DialogFooter>
    </form>
   </DialogContent>
  </Dialog>
 );
};
