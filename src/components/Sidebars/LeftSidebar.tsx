import Navbar from "../Navbar";
import wordpressImage from "./../../assets/images/wordpress.png";
import collapseIcon from "./../../assets/svgs/collapse.svg";
import editIcon from "./../../assets/svgs/edit-pen.svg";
import settingIcon from "./../../assets/svgs/setting-wheel.svg";
import bucketIcon from "./../../assets/svgs/bucket.svg";
import {  Tabs, TabsProps } from "antd";
import "./style.css";
import { useSelector, useDispatch } from 'react-redux';
import { toggleContent } from './../../redux/toggleSlice';
import { RootState } from "../../redux/store";
import DropDownWrapper from "../DropDown";
import { setActiveTab } from "../../redux/collapseItemSlice";
import CollapsibleContainer from "../CollapsibleContainer";



const LeftSidebar = () => {
  const dispatch = useDispatch();
  const showContent = useSelector((state: RootState) => state.toggle.showContent);
  const { activeTabKey } = useSelector((state: RootState) => state.collapseItem);

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <div className="controller-wrapper">
          <img src={editIcon} alt="Edit Icon" />
          <span className="controller-level">Content</span>
        </div>
      ),
      children: (
        <CollapsibleContainer items={[]} />
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
      children: (
        <CollapsibleContainer items={[]} />
      ),
    },
    {
      key: "3",
      label: (
        <div className="controller-wrapper">
          <img src={settingIcon} alt="Settings Icon" />
          <span className="controller-level">Advanced</span>
        </div>
      ),
      children: <CollapsibleContainer items={[]} />,
    },
  ]

  const onChange = (key: string) => {
    dispatch(setActiveTab(key))
  };

  

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
          <Tabs defaultActiveKey={activeTabKey} items={tabItems} onChange={onChange} />
        </div>
      </div>
    </div>
  );
};
export default LeftSidebar;
