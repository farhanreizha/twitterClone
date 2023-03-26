import { IconType } from "react-icons"

export interface AvatarProps {
   userId: string
   isLarge?: boolean
   hasBorder?: boolean
}

export interface ButtonProps {
   label: string
   large?: boolean
   secondary?: boolean
   fullWidth?: boolean
   onClick?: () => void
   disabled?: boolean
   outline?: boolean
}

export interface ImageUploadProps {
   onChange: (base64: string) => void
   label?: string
   value?: string
   disabled?: boolean
}

export interface InputProps {
   placeholder?: string
   value?: string
   type?: string
   disabled?: boolean
   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface LayoutProps {
   children: React.ReactNode
}

export interface HeaderProps {
   label: string
   showBackArrow?: boolean
}

export interface ModalProps {
   isOpen?: boolean
   onClose: () => void
   onSubmit: () => void
   title?: string
   body?: React.ReactElement
   footer?: React.ReactElement
   actionLabel: string
   disabled?: boolean
}

export interface UserProps {
   userId: string
}

export interface SidebarItemProps {
   label: string
   href?: string
   icon: IconType
   onClick?: () => void
   auth?: boolean
}

export interface ModalStore {
   isOpen: boolean
   onOpen: () => void
   onClose: () => void
}

export interface FormProps {
   placeholder: string
   isComment?: boolean
   postId?: string
}

export interface PostFeedProps {
   userId?: string
}

export interface PostItemProps extends PostFeedProps {
   data: Record<string, any>
}
