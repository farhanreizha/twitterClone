import axios from "axios"
import { toast } from "react-hot-toast"
import { useCallback, useState } from "react"
import { signIn } from "next-auth/react"

import useLoginModal from "@/hooks/useLoginModal"
import useRegisterModal from "@/hooks/useRegisterModal"
import Styles from "@/styles/Modal.module.css"

import Input from "../Input"
import Modal from "../Modal"

const RegisterModal = () => {
   const loginModal = useLoginModal()
   const registerModal = useRegisterModal()

   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [username, setUsername] = useState("")
   const [name, setName] = useState("")

   const [isLoading, setIsLoading] = useState(false)

   const onToggle = useCallback(() => {
      if (isLoading) return

      registerModal.onClose()
      loginModal.onOpen()
   }, [loginModal, registerModal, isLoading])

   const onSubmit = useCallback(async () => {
      try {
         setIsLoading(true)

         await axios.post("/api/register", {
            email,
            password,
            username,
            name,
         })

         setIsLoading(false)

         toast.success("Account created.")

         signIn("credentials", {
            email,
            password,
         })

         registerModal.onClose()

         setEmail("")
         setPassword("")
         setName("")
         setUsername("")
      } catch (error) {
         toast.error("Something went wrong")
      } finally {
         setIsLoading(false)
      }
   }, [email, password, registerModal, username, name])

   const bodyContent = (
      <div className={Styles.form}>
         <Input disabled={isLoading} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
         <Input disabled={isLoading} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
         <Input disabled={isLoading} placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
         <Input disabled={isLoading} placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
   )

   const footerContent = (
      <div className={Styles.footerContent}>
         <p>
            Already have an account?{" "}
            <span onClick={onToggle} className={Styles.footerLink}>
               Sign in
            </span>
         </p>
      </div>
   )

   return (
      <Modal
         disabled={isLoading}
         isOpen={registerModal.isOpen}
         title="Create an account"
         actionLabel="Register"
         onClose={registerModal.onClose}
         onSubmit={onSubmit}
         body={bodyContent}
         footer={footerContent}
      />
   )
}

export default RegisterModal
