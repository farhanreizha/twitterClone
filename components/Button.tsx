import Styles from "@/styles/Base.module.css"
import { ButtonProps } from "@/utils/interface"

const Button: React.FC<ButtonProps> = ({ label, large, secondary, fullWidth, onClick, disabled, outline }) => {
   return (
      <button
         disabled={disabled}
         onClick={onClick}
         className={`${Styles.button} ${fullWidth ? "w-full" : "w-fit"} ${secondary ? Styles.secondary : Styles.primary} ${
            large ? "text-xl px-5 py-3" : "text-md px-4 py-2"
         } ${outline ? Styles.outline : ""} `}
      >
         {label}
      </button>
   )
}
export default Button
