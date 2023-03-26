import useCurrentUser from "@/hooks/useCurrentUser"
import useLoginModal from "@/hooks/useLoginModal"
import usePosts from "@/hooks/usePosts"
import useRegisterModal from "@/hooks/useRegisterModal"
import { FormProps } from "@/utils/interface"
import axios from "axios"
import { useCallback, useState } from "react"
import { toast } from "react-hot-toast"
import Avatar from "./Avatar"
import Button from "./Button"
import Styles from "@/styles/Form.module.css"
import usePost from "@/hooks/usePost"

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
   const registerModal = useRegisterModal()
   const loginModal = useLoginModal()

   const { data: currentUser } = useCurrentUser()
   const { mutate: mutatePosts } = usePosts()
   const { mutate: mutatePost } = usePost(postId as string)

   const [body, setBody] = useState("")
   const [isLoading, setIsLoading] = useState(false)

   const onSubmit = useCallback(async () => {
      try {
         setIsLoading(true)

         const url = isComment ? `/api/comments?postId=${postId}` : "/api/posts"

         await axios.post(url, { body })

         toast.success("Tweet created")
         setBody("")
         mutatePosts()
         mutatePost()
      } catch (error) {
         toast.error("Something went wrong")
      } finally {
         setIsLoading(false)
      }
   }, [body, mutatePosts, isComment, postId, mutatePost])
   return (
      <div className={Styles.base}>
         {currentUser ? (
            <div className={Styles.form}>
               <div>
                  <Avatar userId={currentUser?.id} />
               </div>
               <div className="w-full">
                  <textarea
                     disabled={isLoading}
                     onChange={(event) => setBody(event.target.value)}
                     value={body}
                     className={`${Styles.textArea} peer`}
                     placeholder={placeholder}
                  ></textarea>
                  {/* <hr className={Styles.divider} /> */}
                  <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />
                  <div className="mt-4 flex flex-row justify-end">
                     <Button disabled={isLoading || !body} onClick={onSubmit} label="Tweet" />
                  </div>
               </div>
            </div>
         ) : (
            <div className="py-8">
               <h1 className={Styles.headerText}>Welcome to Twitter</h1>
               <div className={Styles.wrapButton}>
                  <Button label="Login" onClick={loginModal.onOpen} />
                  <Button label="Register" onClick={registerModal.onOpen} secondary />
               </div>
            </div>
         )}
      </div>
   )
}
export default Form
