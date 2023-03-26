import { BsBellFill, BsHouseFill } from "react-icons/bs"
import { FaUser } from "react-icons/fa"
import { BiLogOut } from "react-icons/bi"
import { signOut } from "next-auth/react"

import SidebarLogo from "./SidebarLogo"
import SidebarItem from "./SidebarItem"
import SidebarTweetButton from "./SidebarTweetButton"
import useCurrentUser from "@/hooks/useCurrentUser"
import Styles from "@/styles/Sidebar.module.css"

const Sidebar = () => {
   const { data: currentUser } = useCurrentUser()
   const items = [
      { label: "Home", href: "/", icon: BsHouseFill },
      { label: "Notifications", href: "/notifications", icon: BsBellFill, auth: true, alert: currentUser?.hasNotification },
      { label: "Profile", href: `/users/${currentUser?.id}`, icon: FaUser, auth: true },
   ]
   return (
      <div className={Styles.base}>
         <div className={Styles.containes}>
            <div className={Styles.wrap}>
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
