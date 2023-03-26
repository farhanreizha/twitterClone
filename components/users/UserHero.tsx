import Image from "next/image"
import useUser from "@/hooks/useUser"
import Avatar from "../Avatar"
import Styles from "@/styles/User.module.css"
import { UserProps } from "@/utils/interface"

const UserHero: React.FC<UserProps> = ({ userId }) => {
   const { data: fetchUser } = useUser(userId)
   return (
      <div>
         <div className={Styles.hero}>
            {fetchUser?.coverImage && <Image src={fetchUser.coverImage} fill alt="Cover Image" style={{ objectFit: "cover" }} />}
            <div className={Styles.avatar}>
               <Avatar userId={userId} isLarge hasBorder />
            </div>
         </div>
      </div>
   )
}
export default UserHero
