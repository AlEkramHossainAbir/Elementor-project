import Navbar from "../Navbar";
import wordpressImage from "./../../assets/images/wordpress.png";
import collapseIcon from "./../../assets/svgs/collapse.svg";
import editIcon from "./../../assets/svgs/edit-pen.svg";
import settingIcon from "./../../assets/svgs/setting-wheel.svg";
import bucketIcon from "./../../assets/svgs/bucket.svg";
import chevronUp from "./../../assets/svgs/chevronUp.svg";
import chevronDown from "./../../assets/svgs/chevronDown.svg";
import cancelCrossIcon from "./../../assets/svgs/cancelCross.svg";
import { Collapse, CollapseProps, Popconfirm, Tabs, TabsProps } from "antd";
import "./style.css";
import { useSelector, useDispatch } from 'react-redux';
import { toggleContent } from './../../redux/toggleSlice';
import { RootState } from "../../redux/store";
import DropDownWrapper from "../DropDown";
import { useEffect, useState } from "react";
import controllerDataJson from "./../../assets/controller.json";

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

const LeftSidebar = () => {
  const dispatch = useDispatch();
  const showContent = useSelector((state: RootState) => state.toggle.showContent);
  const showController = useSelector((state: RootState)=>state.controller.selectedController )
  const [activeKey, setActiveKey] = useState<string>("1");
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const collapseOnChange = (key: string | string[]) => {
    console.log(key);
  };

  const collapseItems: CollapseProps["items"] = [
    {
      key: "1",
      label: "Control 1",
      children: <p>{text}</p>,
    },
    {
      key: "2",
      label: "Control 2",
      children: <p>{text}</p>,
    },
    {
      key: "3",
      label: "Control 3",
      children: <p>{text}</p>,
    },
  ];

  const customProps: CollapseProps = {
    className: "custom-controller-collapse",
    expandIcon: (panelProps) => {
      return (
        <div className="collapse-controller-expand-icon">
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            okText="Yes"
            cancelText="No"
            onConfirm={(e) => e?.stopPropagation()}
            onCancel={(e) => e?.stopPropagation()}
            className="controller-custom-popconfirm"
          >
            <img
              src={cancelCrossIcon}
              alt="cancel icon"
              className="delete-icon"
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </Popconfirm>

          {panelProps.isActive ? (
            <img src={chevronUp} alt="chevron up" />
          ) : (
            <img src={chevronDown} alt="Chevron down" />
          )}
        </div>
      );
    },
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <div className="controller-wrapper">
          <img src={editIcon} alt="Edit Icon" />
          <span className="controller-level">Content</span>
        </div>
      ),
      children: (
        <Collapse
          items={collapseItems}
          expandIconPosition="end"
          defaultActiveKey={["1"]}
          onChange={collapseOnChange}
          {...customProps}
        />
      ),
    },
    {
      key: "2",
      label: (
        <div className="controller-wrapper">
          <img src={bucketIcon} alt="Bucket Icon" />
          <span className="controller-level">Style</span>
        </div>
      ),
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: (
        <div className="controller-wrapper">
          <img src={settingIcon} alt="Settings Icon" />
          <span className="controller-level">Advanced</span>
        </div>
      ),
      children: "Content of Tab Pane 3",
    },
  ];

  const findKeyByControlName = (controlName: string): string | undefined => {
    // Loop through the keys of the JSON and find the matching control_name
    return Object.keys(controllerData).find(
        (key) => controllerData[key].control_name === controlName
    );
};
 useEffect(()=>{
  console.log(showController,activeKey)
   // Find the key based on the control name
   const key = findKeyByControlName(showController);

   if (key) {
       // Access the full object using the key
       const controlObject = controllerData[key];
       console.log(controlObject.fields); // Access the "fields" property or any other property
   } else {
       console.log("No matching control_name found.");
   }

 },[showController])

  return (
    <div className="left-sidebar">
      <Navbar>
        <div className="wordpress-logo">
        {!showContent && <img src={wordpressImage} alt="wordpress_image" />}
        </div>
        <div className="extra-icons">
        {!showContent && <DropDownWrapper />}
          <img src={collapseIcon} alt="collapse icon" onClick={()=>{dispatch(toggleContent())}} />
        </div>
      </Navbar>
      <div className="left-sidebar-container">
        {/* Sidebar content */}
        <div className="header-text-container">
          <span className="header-text">Accordion</span>
        </div>
        <div>
          <Tabs defaultActiveKey={activeKey} items={items} onChange={onChange} />
        </div>
      </div>
    </div>
  );
};
export default LeftSidebar;
