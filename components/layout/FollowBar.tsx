import useUsers from "@/hooks/useUsers"
import Avatar from "../Avatar"
import Styles from "@/styles/Followbar.module.css"

const FollowBar = () => {
   const { data: users = [] } = useUsers()

   if (users.length === 0) return null

   return (
      <div className={Styles.base}>
         <div className={Styles.containes}>
            <h2 className={Styles.title}>Who to follow</h2>
            <div className={Styles.card}>
               {users.map((user: Record<string, any>) => (
                  <div key={user.id} className={Styles.cardWrap}>
                     <Avatar userId={user.id} />
                     <div className={Styles.cardContain}>
                        <p className={Styles.firstText}>{user.name}</p>
                        <p className={Styles.secoundText}>@{user.username}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}
export default FollowBar
