import { useRouter } from "next/router"
import { useCallback } from "react"
import { FaFeather } from "react-icons/fa"

import useLoginModal from "@/hooks/useLoginModal"
import useCurrentUser from "@/hooks/useCurrentUser"
import { AiOutlineLogin } from "react-icons/ai"
import Styles from "@/styles/Sidebar.module.css"

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
               <div className={Styles.button}>
                  <FaFeather size={24} color="white" />
               </div>
               <div className={Styles.buttonLarge}>
                  <p className={Styles.text}>Tweet</p>
               </div>
            </>
         ) : (
            <>
               <div className={Styles.button}>
                  <AiOutlineLogin size={24} color="white" />
               </div>
               <div className={Styles.buttonLarge}>
                  <p className={Styles.text}>Sign in</p>
               </div>
            </>
         )}
      </div>
   )
}
export default SidebarTweetButton
