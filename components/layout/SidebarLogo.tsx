import { useRouter } from "next/router"
import { BsTwitter } from "react-icons/bs"
import Styles from "@/styles/Sidebar.module.css"

const SidebarLogo = () => {
   const router = useRouter()
   return (
      <div onClick={() => router.push("/")} className={Styles.logo}>
         <BsTwitter size={20} color="white" />
      </div>
   )
}
export default SidebarLogo
