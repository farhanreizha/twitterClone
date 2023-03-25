import Styles from "@/styles/Base.module.css"
interface InputProps {
   placeholder?: string
   value?: string
   type?: string
   disabled?: boolean
   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({ placeholder, value, type, disabled, onChange }) => {
   return <input type={type} disabled={disabled} value={value} onChange={onChange} placeholder={placeholder} className={Styles.input} />
}
export default Input
