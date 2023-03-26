import usePosts from "@/hooks/usePosts"
import PostItem from "./PostItem"
import { PostFeedProps } from "@/utils/interface"

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
   const { data: posts = [] } = usePosts(userId)

   return (
      <>
         {posts.map((post: Record<string, any>) => (
            <PostItem userId={userId} key={post.id} data={post} />
         ))}
      </>
   )
}

export default PostFeed
