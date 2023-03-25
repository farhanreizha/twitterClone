import { useRouter } from "next/router"
import { useCallback } from "react"
import { IconType } from "react-icons"
import useCurrentUser from "@/hooks/useCurrentUser"
import useLoginModal from "@/hooks/useLoginModal"
import Link from "next/link"
import Styles from "@/styles/Sidebar.module.css"

interface SidebarItemProps {
   label: string
   href?: string
   icon: IconType
   onClick?: () => void
   auth?: boolean
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, href, onClick, auth }) => {
   const loginModal = useLoginModal()
   const { data: currentUser } = useCurrentUser()
   const router = useRouter()
   const handleClick = useCallback(() => {
      if (onClick) return onClick()

      if (auth && !currentUser) loginModal.onOpen()
      else if (href) router.push(href)
   }, [auth, currentUser, href, loginModal, onClick, router])

   return (
      <Link href={`${href}`} onClick={handleClick} className={Styles.items}>
         <div className={Styles.itemIcon}>
            <Icon size={20} color="white" />
         </div>
         <div className={Styles.itemList}>
            <Icon size={24} color="white" />
            <p className={Styles.itemLabel}>{label}</p>
         </div>
      </Link>
   )
}
export default SidebarItem
