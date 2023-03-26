import { create } from "zustand"
import { ModalStore } from "@/utils/interface"

const useRegisterModal = create<ModalStore>((set) => ({
   isOpen: false,
   onOpen: () => set({ isOpen: true }),
   onClose: () => set({ isOpen: false }),
}))

export default useRegisterModal
