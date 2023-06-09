import useCurrentUser from "@/hooks/useCurrentUser"
import useNotificatin from "@/hooks/useNotifications"
import { useEffect } from "react"
import { BsTwitter } from "react-icons/bs"
import Styles from "@/styles/Base.module.css"

const NotificationsFeed = () => {
   const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser()
   const { data: fetchedNotifications = [] } = useNotificatin(currentUser?.id)
   useEffect(() => {
      mutateCurrentUser
   }, [mutateCurrentUser])

   if (fetchedNotifications.length === 0) {
      return <div className="text-neutral-600 text-center p-6 text-xl">No notifications</div>
   }

   return (
      <div className="">
         {fetchedNotifications.map((notification: Record<string, any>) => (
            <div className={Styles.notification} key={notification.id}>
               <BsTwitter color="white" size={32} />
               <p className="text-white">{notification.body}</p>
            </div>
         ))}
      </div>
   )
}
export default NotificationsFeed
