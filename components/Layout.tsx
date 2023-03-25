import { Toaster } from "react-hot-toast"

import LoginModal from "@/components/modals/LoginModal"
import EditModal from "@/components/modals/EditModal"
import RegisterModal from "@/components/modals/RegisterModal"
import FollowBar from "./layout/FollowBar"
import Sidebar from "./layout/Sidebar"

interface LayoutProps {
   children: React.ReactNode
}

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
         <div className="h-screen bg-black">
            <div className="container h-full mx-auto xl:px-30 max-w-6xl">
               <div className="grid grid-cols-12 h-full">
                  <Sidebar />
                  <div className="col-span-11 xl:col-span-7 border-x-[1px] border-neutral-800">{children}</div>
                  <FollowBar />
               </div>
            </div>
         </div>
      </>
   )
}
export default Layout
