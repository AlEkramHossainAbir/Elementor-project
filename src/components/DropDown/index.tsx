import { Dropdown, MenuProps } from "antd";
import plusIcon from "./../../assets/svgs/plus.svg";
import controllerDataJson from "./../../assets/controller.json";
import { useDispatch } from "react-redux";
import { controllerContent } from "../../redux/controllerSlice";

type ControlField = {
    name: string;
    type: string;
    default?: string | boolean | number;
    options?: Record<string, string>;
};

type Control = {
    type: string;
    control_name: string;
    has_selector?: boolean;
    has_selectors?: boolean;
    control_category: string;
    fields: ControlField[];
};

type ControllerData = Record<string, Control>;

const controllerData = controllerDataJson as ControllerData;
const DropDownWrapper = ()=>{
    const dispatch = useDispatch()
    
    const items: MenuProps['items'] = Object.keys(controllerData).map((key, index) => ({
        label: <div onClick={()=>{
            dispatch(controllerContent(controllerData[key].control_name))
        }}>{ controllerData[key].control_name}</div>, // Display `control_name`
        key: String(index), // Use a unique key for each menu item
    }));
 return (
    <>
    
    <Dropdown menu={{ items }} trigger={['click']} className="controller-dropdown-wrapper">
        <img src={plusIcon} alt="plus icon" />
    </Dropdown>
    </>
 )
 
}
export default DropDownWrapper;