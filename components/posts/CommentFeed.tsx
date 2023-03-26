import { CommentFeedProps } from "@/utils/interface"
import CommentItem from "./CommentItem"

const CommentFeed: React.FC<CommentFeedProps> = ({ comments }) => {
   return (
      <>
         {comments?.map((comment) => (
            <CommentItem key={comment?.id} data={comment} />
         ))}
      </>
   )
}
export default CommentFeed
