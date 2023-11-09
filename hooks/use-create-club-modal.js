import { create } from "zustand";

const useCreateClubModal = create((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useCreateClubModal;
