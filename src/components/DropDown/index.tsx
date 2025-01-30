// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Dropdown, Form, MenuProps, Radio } from "antd";
import plusIcon from "./../../assets/svgs/plus.svg";
import controllerDataJson from "./../../assets/controller.json";
import { useDispatch, useSelector } from "react-redux";
import { fieldTypeComponents } from "../FieldTypeMap";
import { RootState } from "../../redux/store";
import React from "react";
import { addCollapseItem } from "../../redux/controllerSlice";
import "./style.css"

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
            if (!controllerKeyName) {
                console.log("No matching control_name found.");
                return;
              }
              const controlObject = controllerData[controllerKeyName];
              const newCollapseItem = {
                key: `${activeTabKey}-${new Date().getTime()}`, // More unique and predictable key
                label: controlObject.control_name || "New Item",
                children: (
                  <Form layout="horizontal">
                    {controlObject.fields.map((field) => {
                      const Component = fieldTypeComponents[field.type] as React.ElementType;
                      if (!Component) {
                        return <p key={field.name}>Unsupported field type: {field.type}</p>;
                      }
            
                      return (
                        <Form.Item label={field.name} key={field.name}>
                          {field.type === "radio" ? (
                            <Radio.Group
                              defaultValue={field.default as string}
                              onChange={(e) => console.log(field.name, e.target.value)}
                              options={[]} // Should be populated dynamically
                            />
                          ) : (
                            React.cloneElement(Component, {
                              defaultValue: field.default,
                              onChange: (e) => {
                                const value = field.type === "switch" ? e : e.target.value;
                                console.log(field.name, value);
                              },
                            })
                          )}
                        </Form.Item>
                      );
                    })}
                  </Form>
                ),
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