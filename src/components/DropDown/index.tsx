import { Dropdown, MenuProps } from "antd";
import plusIcon from "./../../assets/svgs/plus.svg";
import controllerDataJson from "./../../assets/controller.json";
import { useDispatch, useSelector } from "react-redux";
import { controllerContent } from "../../redux/controllerSlice";
import { RootState } from "../../redux/store";

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
    const { activeTabKey, tabItems } = useSelector((state:RootState) => state.collapseItem);
    
    const items: MenuProps['items'] = Object.keys(controllerData).map((key, index) => ({
        label: <div onClick={()=>{
            const newItem = {
                key: new Date().toISOString(),
                label: `New Control ${Math.random().toFixed(2)}`,
                children: controllerData[key].control_name,
              };
              
            dispatch(controllerContent(controllerData[key].control_name))
        }}>{ controllerData[key].control_name}</div>, // Display `control_name`
        key: String(index), // Use a unique key for each menu item
    }));
 return (
    <>
    
    <Dropdown menu={{ items }} trigger={['click']}>
        <img src={plusIcon} alt="plus icon" />
    </Dropdown>
    </>
 )
 
}
export default DropDownWrapper;