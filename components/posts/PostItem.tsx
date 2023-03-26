import { useRouter } from "next/router"
import { PostItemProps } from "@/utils/interface"
import useLoginModal from "@/hooks/useLoginModal"
import useCurrentUser from "@/hooks/useCurrentUser"
import { useCallback, useMemo } from "react"
import { formatDistanceToNowStrict } from "date-fns"
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai"
import Avatar from "../Avatar"
import useLike from "@/hooks/useLike"
import Styles from "@/styles/Post.module.css"

const PostItem: React.FC<PostItemProps> = ({ userId, data }) => {
   const router = useRouter()
   const loginModal = useLoginModal()

   const { data: currentUser } = useCurrentUser()
   const { hasLiked, toggleLike } = useLike({ postId: data.id, userId })

   const goToUser = useCallback(
      (event: any) => {
         event.stopPropagation()

         router.push(`/users/${data.user.id}`)
      },
      [router, data.user.id]
   )
   const goToPost = useCallback(() => {
      router.push(`/posts/${data.id}`)
   }, [router, data.id])

   const onLike = useCallback(
      (event: any) => {
         event.stopPropagation()

         if (!currentUser) return loginModal.onOpen()

         toggleLike()
      },
      [currentUser, loginModal, toggleLike]
   )

   const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart

   const createdAt = useMemo(() => {
      if (!data?.createdAt) return null
      return formatDistanceToNowStrict(new Date(data.createdAt))
   }, [data?.createdAt])

   return (
      <div onClick={goToPost} className={Styles.post}>
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
                  <span className={Styles.date}>{createdAt}</span>
               </div>
               <div className="text-white mt-1">{data.body}</div>
               <div className={Styles.footer}>
                  <div className={Styles.comment}>
                     <AiOutlineMessage size={20} />
                     <p>{data.comments?.length || 0}</p>
                  </div>
                  <div onClick={onLike} className={Styles.like}>
                     <LikeIcon color={hasLiked ? "red" : ""} size={20} />
                     <p>{data.likeIds?.length}</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
export default PostItem
