import Image from "next/image"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import Styles from "@/styles/Base.module.css"

interface ImageUploadProps {
   onChange: (base64: string) => void
   label?: string
   value?: string
   disabled?: boolean
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, label, value, disabled }) => {
   const [base64, setBase64] = useState(value)

   const handleChange = useCallback(
      (base64: string) => {
         onChange(base64)
      },
      [onChange]
   )
   const handleDrop = useCallback(
      (files: any) => {
         const file = files[0]
         const reader = new FileReader()

         reader.onload = (event: any) => {
            setBase64(event.target.result)
            handleChange(event.target.result)
         }

         reader.readAsDataURL(file)
      },
      [handleChange]
   )

   const { getRootProps, getInputProps } = useDropzone({
      maxFiles: 1,
      onDrop: handleDrop,
      disabled,
      accept: {
         "image/jpeg": [],
         "image/png": [],
      },
   })

   return (
      <div
         {...getRootProps({
            className: Styles.wrap,
         })}
      >
         <input {...getInputProps()} />

         {base64 ? (
            <div className={Styles.image}>
               <Image src={base64} height={200} width={200} alt="Uploaded image" />
            </div>
         ) : (
            <p className={Styles.label}>{label}</p>
         )}
      </div>
   )
}
export default ImageUpload
