import { Switch } from "antd"
import { SwitchProps } from "antd/lib"

type SwitchPropsWithoutOnChange = Omit<SwitchProps, 'onChange'>

interface TogglerProps extends SwitchPropsWithoutOnChange {
 onChange?: (value: boolean) => void
}

const Toggler: React.FC<TogglerProps> = ({ value, ...restProps }) => {
 
 return (
  <>
   <Switch checked={value} {...restProps} />
  </>
 )
}

export default Toggler