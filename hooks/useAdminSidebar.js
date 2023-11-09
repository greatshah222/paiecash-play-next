import { create } from "zustand";

const useAdminSidebar = create((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useAdminSidebar;
