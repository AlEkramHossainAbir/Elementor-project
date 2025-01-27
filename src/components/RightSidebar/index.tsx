import Navbar from "../Navbar";

import desktopIcon from "./../../assets/svgs/desktop.svg";
import tabIcon from "./../../assets/svgs/tab.svg";
import mobileIcon from "./../../assets/svgs/mobile.svg";
import { Button, Collapse, CollapseProps } from "antd";
import plusIcon from "./../../assets/svgs/plus_icon.svg";
import minusIcon from "./../../assets/svgs/minus_icon.svg";
import previewIcon from "./../../assets/svgs/preview-icon.svg";
import infoIcon from "./../../assets/svgs/info-icon.svg";
import "./style.css";
import { useState } from "react";

const RightSidebar = () => {
    const [activeTab, setActiveTab] = useState<"desktop" | "tab" | "mobile">(
        "desktop"
      );
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "What is a design system?",
      children: (
        <p>
          A design system is a collection of reusable components, patterns, and
          guidelines that are assembled to build a consistent and user-friendly
          user interface for a product.
        </p>
      ),
    },
    {
      key: "2",
      label: "Why is a design system important?",
      children: (
        <p>
          A design system is a collection of reusable components, patterns, and
          guidelines that are assembled to build a consistent and user-friendly
          user interface for a product.
        </p>
      ),
    },
    {
      key: "3",
      label: "Are design systems only for large organizations?",
      children: (
        <p>
          No, design systems are beneficial for teams of all sizes, as they
          ensure consistency and efficiency.
        </p>
      ),
    },
    {
      key: "4",
      label: "How does it benefit a development team?",
      children: (
        <p>
          It reduces redundancy, encourages collaboration between designers and
          developers, and accelerates project timelines.
        </p>
      ),
    },
    {
      key: "5",
      label: "How do you implement a design system?",
      children: (
        <p>
          By defining reusable components, establishing guidelines, and ensuring
          adoption across all teams in the project.
        </p>
      ),
    },
  ];

  return (
    <div className="right-sidebar">
      <Navbar>
        <div className="responsive-icons">
        <img
            src={desktopIcon}
            alt="desktop Icon"
            className={activeTab === "desktop" ? "active-icon" : ""}
            onClick={() => setActiveTab("desktop")}
          />
          <img
            src={tabIcon}
            alt="Tab Icon"
            className={activeTab === "tab" ? "active-icon" : ""}
            onClick={() => setActiveTab("tab")}
          />
          <img
            src={mobileIcon}
            alt="Mobile Icon"
            className={activeTab === "mobile" ? "active-icon" : ""}
            onClick={() => setActiveTab("mobile")}
          />
        </div>
        <div className="right-sidebar-extra-icons">
            <img src={infoIcon} alt="info icon" />
            <img src={previewIcon} alt="preview icon" />
          <Button className="save-btn">Save Changes</Button>
        </div>
      </Navbar>
      <div className="right-sidebar-container">
        <div className="block-elements custom-collapse">
         
          {activeTab === "desktop" && (
             <Collapse
             items={items}
             expandIconPosition="end"
             bordered={false}
             defaultActiveKey={["1"]}
             onChange={onChange}
             expandIcon={(panelProps) =>
               panelProps.isActive ? (
                 <img src={minusIcon} alt="minus icon" />
               ) : (
                 <img src={plusIcon} alt="plus icon" />
               )
             }
           />
          )}
          {activeTab === "tab" && (
            <div>
              <h3>Tab Content</h3>
              <p>This content is displayed when the "Tab Icon" is active.</p>
            </div>
          )}
          {activeTab === "mobile" && (
            <p>
              This is a simple paragraph displayed when the "Mobile Icon" is
              active.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default RightSidebar;
