import useLoginModal from "@/hooks/useLoginModal"
import { useCallback, useState } from "react"
import Input from "../Input"
import Modal from "../Modal"
import useRegisterModal from "@/hooks/useRegisterModal"
import { signIn } from "next-auth/react"
import { toast } from "react-hot-toast"
import Styles from "@/styles/Modal.module.css"

const LoginModal = () => {
   const loginModal = useLoginModal()
   const registerModal = useRegisterModal()

   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [isLoading, setIsLoading] = useState(false)

   const onToggle = useCallback(() => {
      if (isLoading) return

      loginModal.onClose()
      registerModal.onOpen()
   }, [isLoading, registerModal, loginModal])

   const onSubmit = useCallback(async () => {
      try {
         setIsLoading(true)

         await signIn("credentials", {
            email,
            password,
         })

         toast.success("Logged in")

         loginModal.onClose()

         setEmail("")
         setPassword("")
      } catch (err) {
         console.error(err)
      } finally {
         setIsLoading(false)
      }
   }, [email, loginModal, password])

   const bodyContent = (
      <div className={Styles.form}>
         <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} disabled={isLoading} />
         <Input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} disabled={isLoading} />
      </div>
   )

   const footerContent = (
      <div className={Styles.footerContent}>
         <p>
            First time using Twitter?{" "}
            <span onClick={onToggle} className={Styles.footerLink}>
               Create an account
            </span>
         </p>
      </div>
   )

   return (
      <Modal
         disabled={isLoading}
         isOpen={loginModal.isOpen}
         title="Login"
         actionLabel="Sign in"
         onClose={loginModal.onClose}
         onSubmit={onSubmit}
         body={bodyContent}
         footer={footerContent}
      />
   )
}
export default LoginModal
