import Styles from "@/styles/Base.module.css"
import { InputProps } from "@/utils/interface"

const Input: React.FC<InputProps> = ({ placeholder, value, type, disabled, onChange }) => {
   return <input type={type} disabled={disabled} value={value} onChange={onChange} placeholder={placeholder} className={Styles.input} />
}
export default Input
