import { Collapse, CollapseProps, Popconfirm } from "antd";
import chevronUp from "./../../assets/svgs/chevronUp.svg";
import chevronDown from "./../../assets/svgs/chevronDown.svg";
import cancelCrossIcon from "./../../assets/svgs/cancelCross.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import controllerDataJson from "./../../assets/controller.json";
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


  interface CollapsibleContainerProps {
    items: CollapseProps["items"];
  }
  const collapseItems1: CollapseProps["items"] = [
    {
      key: "1",
      label: "Control 1",
      children: <p>Content for Control 1</p>,
    },
    {
      key: "2",
      label: "Control 2",
      children: <p>Content for Control 2</p>,
    },
    {
      key: "3",
      label: "Control 3",
      children: <p>Content for Control 3</p>,
    },
  ];
  
  const collapseItems2: CollapseProps["items"] = [
    {
      key: "1",
      label: "Style 1",
      children: <p>Content for Style 1</p>,
    },
    {
      key: "2",
      label: "Style 2",
      children: <p>Content for Style 2</p>,
    },
    {
      key: "3",
      label: "Style 3",
      children: <p>Content for Style 3</p>,
    },
  ];
  
  const collapseItems3: CollapseProps["items"] = [
    {
      key: "1",
      label: "Advanced 1",
      children: <p>Content for Advanced 1</p>,
    },
    {
      key: "2",
      label: "Advanced 2",
      children: <p>Content for Advanced 2</p>,
    },
    {
      key: "3",
      label: "Advanced 3",
      children: <p>Content for Advanced 3</p>,
    },
  ];
  const getCollapseItems = (activeTabKey: string): CollapseProps["items"] => {
    switch (activeTabKey) {
      case "1":
        return collapseItems1;
      case "2":
        return collapseItems2;
      case "3":
        return collapseItems3;
      default:
        return [];
    }
  };
const CollapsibleContainer: React.FC<CollapsibleContainerProps> = ()=>{
  const dispatch = useDispatch()
  const { activeTabKey } = useSelector((state:RootState) => state.activeTabKey);
  const showController = useSelector((state: RootState)=>state.controller.selectedController )
  const [currentCollapseItems, setCurrentCollapseItems] = useState<CollapseProps["items"]>(
    getCollapseItems(activeTabKey)
  );
 
  const findKeyByControlName = (controlName: string): string | undefined => {
    return Object.keys(controllerData).find(
        (key) => controllerData[key].control_name === controlName
    );
};
 
useEffect(() => {
  // Find the key based on the control name
  const key = findKeyByControlName(showController);

  if (key) {
    // Access the full object using the key
    const controlObject = controllerData[key];

    // Dynamically add a new collapse item
    const newCollapseItem = {
      key: new Date().toISOString(), // Ensure key is unique
      label: controlObject.control_name || "New Item",
      children: <p>No content available</p>,
    };

    setCurrentCollapseItems((prevItems) => {
      // Ensure `prevItems` is properly typed and initialized
      const items = prevItems || [];
      const isKeyExists = items.some((item) => item.key === newCollapseItem.key);
      return isKeyExists ? items : [...items, newCollapseItem];
    });
    dispatch(controllerContent(''))
  } else {
    console.log("No matching control_name found.");
  }
}, [showController]);

useEffect(() => {
  // Update the collapse items when the active tab changes
  setCurrentCollapseItems(getCollapseItems(activeTabKey));
}, [activeTabKey]);
  
    const collapseOnChange = (key: string | string[]) => {
        console.log(key);
      };
    
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
    return (
        <>
        <Collapse
          items={currentCollapseItems}
          expandIconPosition="end"
          defaultActiveKey={["1"]}
          onChange={collapseOnChange}
          {...customProps}
        />
        </>
    )
}

export default CollapsibleContainer;