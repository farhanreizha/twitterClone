import { useRouter } from "next/router"
import { useCallback } from "react"
import { FaFeather } from "react-icons/fa"

import useLoginModal from "@/hooks/useLoginModal"
import useCurrentUser from "@/hooks/useCurrentUser"
import { AiOutlineLogin } from "react-icons/ai"

const SidebarTweetButton = () => {
   const loginModal = useLoginModal()
   const { data: currentUser } = useCurrentUser()

   const onClick = useCallback(() => {
      loginModal.onOpen()
   }, [loginModal])

   return (
      <div onClick={onClick}>
         {currentUser ? (
            <>
               <div className="mt-6 xl:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-700 hover:bg-opacity-80 transition cursor-pointer">
                  <FaFeather size={24} color="white" />
               </div>
               <div className="mt-6 hidden xl:block rounded-full px-4 py-2 bg-sky-700 hover:bg-opacity-90 transition cursor-pointer">
                  <p className="hidden xl:block text-center font-semibold text-white text-[20px]">Tweet</p>
               </div>
            </>
         ) : (
            <>
               <div className="mt-6 xl:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-700 hover:bg-opacity-80 transition cursor-pointer">
                  <AiOutlineLogin size={24} color="white" />
               </div>
               <div className="mt-6 hidden xl:block rounded-full px-4 py-2 bg-sky-700 hover:bg-opacity-90 transition cursor-pointer">
                  <p className="hidden xl:block text-center font-semibold text-white text-[20px]">Sign in</p>
               </div>
            </>
         )}
      </div>
   )
}
export default SidebarTweetButton
