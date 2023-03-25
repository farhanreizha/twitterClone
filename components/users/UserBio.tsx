import { format } from "date-fns"
import useCurrentUser from "@/hooks/useCurrentUser"
import useUser from "@/hooks/useUser"
import { useMemo } from "react"
import Button from "../Button"
import { BiCalendar } from "react-icons/bi"
import useEditModal from "@/hooks/useEditModal"
import Styles from "@/styles/User.module.css"

interface UserBioProps {
   userId: string
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
   const { data: currentUser } = useCurrentUser()
   const { data: fetchUser } = useUser(userId)
   const editModal = useEditModal()

   const createdAt = useMemo(() => {
      if (!fetchUser?.createdAt) return null
      return format(new Date(fetchUser.createdAt), "MMMM yyyy")
   }, [fetchUser.createdAt])

   return (
      <div className={Styles.bio}>
         <div className={Styles.user}>
            {currentUser?.id === userId ? (
               <Button secondary label="Edit" onClick={editModal.onOpen} />
            ) : (
               <Button onClick={() => {}} label="Follow" secondary />
            )}
         </div>
         <div className={Styles.wraps}>
            <div className={Styles.wrap}>
               <div className={Styles.col}>
                  <p className={Styles.primText}>{fetchUser?.name}</p>
                  <p className={Styles.secText}>@{fetchUser?.username}</p>
               </div>
               <div className={Styles.col}>
                  <p className="text-white">{fetchUser?.bio}</p>
                  <div className={Styles.joined}>
                     <BiCalendar size={24} />
                     <p>Joined {createdAt}</p>
                  </div>
               </div>
            </div>
            <div className={Styles.rows}>
               <div className={Styles.info}>
                  <p className="text-white">{fetchUser?.followingIds?.length}</p>
                  <p className={Styles.secText}>Following</p>
               </div>
               <div className={Styles.info}>
                  <p className="text-white">{fetchUser?.followersCount || 0}</p>
                  <p className={Styles.secText}>Followers</p>
               </div>
            </div>
         </div>
      </div>
   )
}
export default UserBio
