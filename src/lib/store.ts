import { create } from "zustand";

type DialogType = "delete-goal" | "new-goal";

interface DialogsState {
 dialogs: Record<DialogType, boolean>;
 setIsOpen: (dialogId: DialogType, open: boolean) => void;
}

export const useDialogsStore = create<DialogsState>((set) => ({
 dialogs: {
  "delete-goal": false,
  "new-goal": false,
 }, // An object to store modal states by their IDs
 setIsOpen: (dialogId, open) => set((state) => ({ dialogs: { ...state.dialogs, [dialogId]: open } })),
}));
