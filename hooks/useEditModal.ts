import { ModalStore } from "@/utils/interface"
import { create } from "zustand"

const useEditModal = create<ModalStore>((set) => ({
   isOpen: false,
   onOpen: () => set({ isOpen: true }),
   onClose: () => set({ isOpen: false }),
}))

export default useEditModal
