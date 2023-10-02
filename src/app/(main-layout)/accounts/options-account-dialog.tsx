import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon } from "lucide-react";
import { deleteAccount } from "./actions";

interface Props {
 accountId: string;
}

export const OptionsAccountDialog = ({ accountId }: Props) => {
 const deleteAccountWithId = deleteAccount.bind(null, accountId);
 return (
  <Dialog>
   <DropdownMenu>
    <DropdownMenuTrigger asChild>
     <Button className="absolute top-2 right-2" variant="ghost" size="icon">
      <MoreVerticalIcon />
     </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
     <DialogTrigger asChild>
      <DropdownMenuItem className="text-red-600">Usuń</DropdownMenuItem>
     </DialogTrigger>
    </DropdownMenuContent>
   </DropdownMenu>
   <DialogContent>
    <form action={deleteAccountWithId}>
     <DialogHeader>
      <DialogTitle>Czy jesteś pewny/a?</DialogTitle>
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
