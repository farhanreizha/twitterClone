import { Toaster } from "react-hot-toast"
import LoginModal from "@/components/modals/LoginModal"
import EditModal from "@/components/modals/EditModal"
import RegisterModal from "@/components/modals/RegisterModal"
import FollowBar from "./layout/FollowBar"
import Sidebar from "./layout/Sidebar"
import Styles from "@/styles/Layout.module.css"
import { LayoutProps } from "@/utils/interface"

const Popup = () => (
   <>
      <Toaster />
      <EditModal />
      <RegisterModal />
      <LoginModal />
   </>
)

const Layout: React.FC<LayoutProps> = ({ children }) => {
   return (
      <>
         <Popup />
         <div className={Styles.base}>
            <div className={Styles.containes}>
               <div className={Styles.grids}>
                  <Sidebar />
                  <div className={Styles.main}>{children}</div>
                  <FollowBar />
               </div>
            </div>
         </div>
      </>
   )
}
export default Layout
