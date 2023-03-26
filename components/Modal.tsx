import { useCallback } from "react"
import { AiOutlineClose } from "react-icons/ai"
import Button from "./Button"
import Styles from "@/styles/Modal.module.css"
import { ModalProps } from "@/utils/interface"

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, title, body, footer, actionLabel, disabled }) => {
   const handleClose = useCallback(() => {
      if (disabled) return
      onClose()
   }, [disabled, onClose])

   const handleSubmit = useCallback(() => {
      if (disabled) return
      onSubmit()
   }, [disabled, onSubmit])

   if (!isOpen) return null

   return (
      <>
         <div className={Styles.container}>
            <div className={Styles.overlay}>
               {/* Content */}
               <div className={Styles.background}>
                  {/* Header */}
                  <div className={Styles.header}>
                     <h3 className={Styles.title}>{title}</h3>
                     <button onClick={handleClose} className={Styles.closeButton}>
                        <AiOutlineClose size={20} />
                     </button>
                  </div>
                  {/* Body */}
                  <div className={Styles.content}>{body}</div>
                  {/* Footer */}
                  <div className={Styles.footer}>
                     <Button disabled={disabled} label={actionLabel} secondary fullWidth large onClick={handleSubmit} />
                     {footer}
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}
export default Modal
