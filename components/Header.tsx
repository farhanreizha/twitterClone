import { useRouter } from "next/router"
import { useCallback } from "react"
import { BiArrowBack } from "react-icons/bi"
import Styles from "@/styles/Header.module.css"
import { HeaderProps } from "@/utils/interface"

const Header: React.FC<HeaderProps> = ({ label, showBackArrow }) => {
   const router = useRouter()
   const handleBack = useCallback(() => {
      router.back()
   }, [router])

   return (
      <div className={Styles.base}>
         <div className={Styles.wrap}>
            {showBackArrow && <BiArrowBack onClick={handleBack} color="white" size={20} className={Styles.arrow} />}
            <h1 className={Styles.label}>{label}</h1>
         </div>
      </div>
   )
}
export default Header
