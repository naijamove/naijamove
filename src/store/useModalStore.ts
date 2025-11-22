// store/modalStore.ts
import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  content?: React.ReactNode;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  content: undefined,
  openModal: (content) => set({ isOpen: true, content }),
  closeModal: () => set({ isOpen: false, content: undefined }),
}));
