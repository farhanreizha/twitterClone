import { BsBellFill, BsHouseFill } from "react-icons/bs"
import { FaUser } from "react-icons/fa"
import { BiLogOut } from "react-icons/bi"
import { signOut } from "next-auth/react"

import SidebarLogo from "./SidebarLogo"
import SidebarItem from "./SidebarItem"
import SidebarTweetButton from "./SidebarTweetButton"
import useCurrentUser from "@/hooks/useCurrentUser"

const Sidebar = () => {
   const { data: currentUser } = useCurrentUser()
   const items = [
      { label: "Home", href: "/", icon: BsHouseFill },
      { label: "Notifications", href: "/notifications", icon: BsBellFill, auth: true, alert: currentUser?.hasNotification },
      { label: "Profile", href: `/users/${currentUser?.id}`, icon: FaUser, auth: true },
   ]
   return (
      <div className="col-span-1 xl:col-span-2 h-full pr-4 xl:pr-6">
         <div className="flex flex-col items-end">
            <div className="space-y-2 xl:w-[230px]">
               <SidebarLogo />
               {items.map((item) => (
                  <SidebarItem key={item.href} href={item.href} label={item.label} icon={item.icon} auth={item.auth} />
               ))}
               {currentUser && <SidebarItem onClick={() => signOut()} icon={BiLogOut} label="Logout" />}
               <SidebarTweetButton />
            </div>
         </div>
      </div>
   )
}
export default Sidebar
