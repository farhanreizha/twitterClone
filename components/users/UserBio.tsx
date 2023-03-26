import { useMemo } from "react"
import { BiCalendar } from "react-icons/bi"
import { format } from "date-fns"

import useCurrentUser from "@/hooks/useCurrentUser"
import useUser from "@/hooks/useUser"
import useFollow from "@/hooks/useFollow"
import useEditModal from "@/hooks/useEditModal"

import Button from "../Button"
import Styles from "@/styles/User.module.css"
import { UserProps } from "@/utils/interface"

const UserBio: React.FC<UserProps> = ({ userId }) => {
   const { data: currentUser } = useCurrentUser()
   const { data: fetchedUser } = useUser(userId)

   const editModal = useEditModal()

   const { isFollowing, toggleFollow } = useFollow(userId)

   const createdAt = useMemo(() => {
      if (!fetchedUser?.createdAt) {
         return null
      }

      return format(new Date(fetchedUser.createdAt), "MMMM yyyy")
   }, [fetchedUser?.createdAt])

   return (
      <div className={Styles.bio}>
         <div className={Styles.user}>
            {currentUser?.id === userId ? (
               <Button secondary label="Edit" onClick={editModal.onOpen} />
            ) : (
               <Button onClick={toggleFollow} label={isFollowing ? "Unfollow" : "Follow"} secondary={!isFollowing} outline={isFollowing} />
            )}
         </div>
         <div className={Styles.wraps}>
            <div className={Styles.col}>
               <p className={Styles.primText}>{fetchedUser?.name}</p>
               <p className={Styles.secText}>@{fetchedUser?.username}</p>
            </div>
            <div className={Styles.wrap}>
               <p className="text-white">{fetchedUser?.bio}</p>
               <div className={Styles.joined}>
                  <BiCalendar size={24} />
                  <p>Joined {createdAt}</p>
               </div>
            </div>
            <div className={Styles.rows}>
               <div className={Styles.info}>
                  <p className="text-white">{fetchedUser?.followingIds?.length}</p>
                  <p className={Styles.secText}>Following</p>
               </div>
               <div className={Styles.info}>
                  <p className="text-white">{fetchedUser?.followersCount || 0}</p>
                  <p className={Styles.secText}>Followers</p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default UserBio
