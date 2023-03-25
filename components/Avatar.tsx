import useUser from "@/hooks/useUser"
import Image from "next/image"
import { useRouter } from "next/router"
import { useCallback } from "react"
import Styles from "@/styles/Base.module.css"

interface AvatarProps {
   userId: string
   isLarge?: boolean
   hasBorder?: boolean
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
   const { data: fetchUser } = useUser(userId)
   const router = useRouter()
   const onClick = useCallback(
      (event: any) => {
         event.stopPropagation()
         const url = `/users/${userId}`

         router.push(url)
      },
      [router, userId]
   )
   return (
      <div className={` ${hasBorder ? Styles.border : ""} ${isLarge ? "w-32 h-32" : "h-12 w-12"} ${Styles.avatar}`}>
         <Image
            fill
            style={{
               objectFit: "cover",
               borderRadius: "100%",
            }}
            alt="Avatar"
            onClick={onClick}
            src={fetchUser?.profileImage || "/images/placeholder.png"}
         />
      </div>
   )
}
export default Avatar
