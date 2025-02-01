import { Dropdown, Flex, MenuProps } from "antd";
import plusIcon from "./../../assets/svgs/plus.svg";
import dragDropIcon from "./../../assets/svgs/drag&drop.svg";
import controllerDataJson from "./../../assets/controller.json";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addCollapseItem } from "../../redux/controllerSlice";
import "./style.css"
import ComponentRender from "../ComponentRender";
import { controllerContent } from "../../redux/controllerNameSlice";

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
  const activeTabKey = useSelector((state: RootState) => state.controller.activeTabKey);

    const findKeyByControlName = (controlName: string): string | undefined => {
        return Object.keys(controllerData).find(
            (key) => controllerData[key].control_name === controlName
        );
    };
    const items: MenuProps['items'] = Object.keys(controllerData).map((key, index) => ({
        label: <div className="controller-label" onClick={()=>{
            const controllerKeyName = findKeyByControlName(controllerData[key].control_name);
            dispatch(controllerContent(controllerKeyName || "test"));
            if (!controllerKeyName) {
                console.log("No matching control_name found.");
                return;
              }
              const controlObject = controllerData[controllerKeyName];
              const newCollapseItem = {
                key: `${activeTabKey}-${new Date().getTime()}`, // More unique and predictable key
                label: <Flex gap={10}>
                  <img src={dragDropIcon} alt="drag and drop icon" className="draggable-icon" />
                {controlObject.control_name || "New Item"}
                </Flex>,
                children: <ComponentRender controlObject={controlObject} />
              };
            
            dispatch(
                addCollapseItem({
                  tabKey: activeTabKey,
                  newItem: newCollapseItem,
                })
              );

        }}>{ controllerData[key].control_name}</div>, // Display `control_name`
        key: String(index), // Use a unique key for each menu item
    }));
 return (
    <>
    <Dropdown menu={{ items }} overlayClassName="controller-select-dropdown" trigger={['click']} className="controller-dropdown-wrapper">
        <img src={plusIcon} alt="plus icon" />
    </Dropdown>
    </>
 )
 
}
export default DropDownWrapper;