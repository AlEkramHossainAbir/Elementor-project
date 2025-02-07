import Navbar from "../Navbar";
import wordpressImage from "./../../assets/images/wordpress.png";
import editIcon from "./../../assets/svgs/edit-pen.svg";
import settingIcon from "./../../assets/svgs/setting-wheel.svg";
import bucketIcon from "./../../assets/svgs/bucket.svg";
import {  Tabs, TabsProps } from "antd";
import "./style.css";
import { useSelector, useDispatch } from 'react-redux';
// import { toggleContent } from './../../redux/toggleSlice';
import { RootState } from "../../redux/store";
import DropDownWrapper from "../DropDown";
import { setActiveTab } from "../../redux/controllerSlice";
import CollapsibleContainer from "../CollapsibleContainer";
import { useCallback, useMemo } from "react";
import { closeModal } from "../../redux/widgetModalSlice";



const LeftSidebar = () => {
  const dispatch = useDispatch();
  const showContent = useSelector((state: RootState) => state.toggle.showContent);
  const { activeTabKey } = useSelector((state: RootState) => state.controller);
  const { widgetDetails } = useSelector((state: RootState) => state.widgets);
  const {selectedWidgetId} = useSelector((state: RootState) => state.widgetModal)
  console.log( selectedWidgetId && widgetDetails[selectedWidgetId])

  const tabItems: TabsProps["items"] = useMemo(()=> [
    {
      key: "1",
      label: (
        <div className="controller-wrapper">
          <img src={editIcon} alt="Edit Icon" />
          <span className="controller-level">Content</span>
        </div>
      ),
      children: (
        <CollapsibleContainer key={1}/>
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
        <CollapsibleContainer key={2} />
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
      children: <CollapsibleContainer key={3} />,
    },
  ],[])

  const onChange = useCallback((key: string) => {
    dispatch(setActiveTab(key));
  }, [dispatch]);
  

  return (
    <div className="left-sidebar">
      <Navbar>
        <div className="wordpress-logo">
        {!showContent &&( <div className="left-icon-wrapper">
          <img src={wordpressImage} alt="wordpress_image" style={{cursor:'pointer'}} onClick={()=>dispatch(closeModal())} />
          <DropDownWrapper />
          </div>)}
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