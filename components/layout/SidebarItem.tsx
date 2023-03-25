import { useRouter } from "next/router"
import { useCallback } from "react"
import { IconType } from "react-icons"
import useCurrentUser from "@/hooks/useCurrentUser"
import useLoginModal from "@/hooks/useLoginModal"
import Link from "next/link"

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
      <Link href={`${href}`} onClick={handleClick} className="flex flex-row items-center">
         <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer xl:hidden">
            <Icon size={20} color="white" />
         </div>
         <div className="relative hidden xl:flex gap-4 p-4 rounded-full items-center hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer">
            <Icon size={24} color="white" />
            <p className="hidden xl:block text-white text-xl">{label}</p>
         </div>
      </Link>
   )
}
export default SidebarItem
