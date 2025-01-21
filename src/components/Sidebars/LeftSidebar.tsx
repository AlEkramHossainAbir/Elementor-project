import Navbar from "../Navbar";
import wordpressImage from "./../../assets/images/wordpress.png";
import plusIcon from "./../../assets/svgs/plus.svg";
import collapseIcon from "./../../assets/svgs/collapse.svg";
import editIcon from "./../../assets/svgs/edit-pen.svg";
import settingIcon from "./../../assets/svgs/setting-wheel.svg";
import bucketIcon from "./../../assets/svgs/bucket.svg";
import chevronUp from "./../../assets/svgs/chevronUp.svg";
import chevronDown from "./../../assets/svgs/chevronDown.svg";
import cancelCrossIcon from "./../../assets/svgs/cancelCross.svg";
import { Collapse, CollapseProps, Popconfirm, Tabs, TabsProps } from "antd";
import "./style.css";

const LeftSidebar = () => {
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

  const onChange = (key: string) => {
    console.log(key);
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

  return (
    <div className="left-sidebar">
      <Navbar>
        <div className="wordpress-logo">
          <img src={wordpressImage} alt="wordpress_image" />
        </div>
        <div className="extra-icons">
          <img src={plusIcon} alt="plus icon" />
          <img src={collapseIcon} alt="collapse icon" />
        </div>
      </Navbar>
      <div className="left-sidebar-container">
        {/* Sidebar content */}
        <div className="header-text-container">
          <span className="header-text">Accordion</span>
        </div>
        <div>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      </div>
    </div>
  );
};
export default LeftSidebar;
