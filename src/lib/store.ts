import { useCallback } from "react";
import { create } from "zustand";

type DialogType = "delete-goal" | "new-goal" | "delete-category" | "new-transaction";

interface DialogsState {
 dialogs: Record<DialogType, boolean>;
 setIsOpen: (dialogId: DialogType, open: boolean) => void;
}

export const useDialogsStore = create<DialogsState>((set) => ({
 dialogs: {
  "delete-goal": false,
  "new-goal": false,
  "delete-category": false,
  "new-transaction": false,
 }, // An object to store modal states by their IDs
 setIsOpen: (dialogId, open) => set((state) => ({ dialogs: { ...state.dialogs, [dialogId]: open } })),
}));

export const useDialog = (dialogId: DialogType) => {
 const { dialogs, setIsOpen } = useDialogsStore();
 const isOpen = dialogs[dialogId];

 const openHandler = useCallback(
  (open: boolean) => {
   setIsOpen(dialogId, open);
  },
  [dialogId, setIsOpen]
 );

 return { isOpen, openHandler };
};
