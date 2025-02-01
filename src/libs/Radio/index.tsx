

import { Radio } from "antd"

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    float: 'right',
  };


const AntRadio = ({ options = [], ...restProps }) => {
 return (
  <>
  <Radio.Group
      onChange={()=>{}}
      options={options}
      {...restProps}
      style={style}
    />
  </>
 )
}

export default AntRadio