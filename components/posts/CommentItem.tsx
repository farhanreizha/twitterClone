import { CommentItemProps } from "@/utils/interface"
import { formatDistanceToNowStrict } from "date-fns"
import { useRouter } from "next/router"
import { useCallback, useMemo } from "react"
import Avatar from "../Avatar"
import Styles from "@/styles/Comment.module.css"

const CommentItem: React.FC<CommentItemProps> = ({ data }) => {
   const router = useRouter()

   const goToUser = useCallback(
      (event: any) => {
         event.stopPropagation()
         router.push(`/users/${data.user.id}`)
      },
      [data.user.id, router]
   )

   const createdAt = useMemo(() => {
      if (!data?.createdAt) return null

      return formatDistanceToNowStrict(new Date(data.createdAt))
   }, [data?.createdAt])

   return (
      <div className={Styles.comment}>
         <div className={Styles.rows}>
            <Avatar userId={data.user.id} />
            <div>
               <div className={Styles.header}>
                  <p onClick={goToUser} className={Styles.primLink}>
                     {data.user.name}
                  </p>
                  <span onClick={goToUser} className={Styles.secLink}>
                     @{data.user.username}
                  </span>
                  <span className={Styles.createdAt}>{createdAt}</span>
               </div>
               <div className="text-white mt-1">{data.body}</div>
            </div>
         </div>
      </div>
   )
}
export default CommentItem
