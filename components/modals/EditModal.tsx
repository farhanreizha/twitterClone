import axios from "axios"
import { toast } from "react-hot-toast"
import { useCallback, useEffect, useState } from "react"

import useCurrentUser from "@/hooks/useCurrentUser"
import useUser from "@/hooks/useUser"
import useEditModal from "@/hooks/useEditModal"
import Styles from "@/styles/Modal.module.css"

import Input from "../Input"
import Modal from "../Modal"
import ImageUpload from "../ImageUpload"

const EditModal = () => {
   const { data: currentUser } = useCurrentUser()
   const { mutate: mutateFetchUser } = useUser(currentUser?.id)
   const editModal = useEditModal()

   const [profileImage, setProfileImage] = useState("")
   const [coverImage, setCoverImage] = useState("")
   const [name, setName] = useState("")
   const [username, setUsername] = useState("")
   const [bio, setBio] = useState("")

   useEffect(() => {
      setProfileImage(currentUser?.profileImage)
      setCoverImage(currentUser?.coverImage)
      setName(currentUser?.name)
      setUsername(currentUser?.username)
      setBio(currentUser?.bio)
   }, [currentUser])

   const [isLoading, setIsLoading] = useState(false)

   const onSubmit = useCallback(async () => {
      try {
         setIsLoading(true)

         await axios.patch("/api/edit", {
            name,
            username,
            bio,
            profileImage,
            coverImage,
         })

         mutateFetchUser()
         toast.success("Updated")
         editModal.onClose()

         setProfileImage("")
         setCoverImage("")
      } catch (error) {
         toast.error("Something went wrong")
      } finally {
         setIsLoading(false)
      }
   }, [name, username, bio, profileImage, coverImage, mutateFetchUser, editModal])

   const bodyContent = (
      <div className={Styles.form}>
         <ImageUpload value={profileImage} disabled={isLoading} onChange={(image) => setProfileImage(image)} label="Upload profile image" />
         <ImageUpload value={coverImage} disabled={isLoading} onChange={(image) => setCoverImage(image)} label="Upload cover image" />
         <Input disabled={isLoading} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
         <Input disabled={isLoading} placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
         <Input disabled={isLoading} placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} />
      </div>
   )

   return (
      <Modal
         disabled={isLoading}
         isOpen={editModal.isOpen}
         title="Edit your Profile"
         actionLabel="Save"
         onClose={editModal.onClose}
         onSubmit={onSubmit}
         body={bodyContent}
      />
   )
}

export default EditModal
