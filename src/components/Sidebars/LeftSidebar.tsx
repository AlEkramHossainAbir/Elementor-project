import Navbar from "../Navbar"
import wordpressImage from "./../../assets/images/wordpress.png"
import plusIcon from "./../../assets/svgs/plus.svg"
import collapseIcon from "./../../assets/svgs/collapse.svg"
import editIcon from "./../../assets/svgs/edit-pen.svg"
import settingIcon from "./../../assets/svgs/setting-wheel.svg"
import bucketIcon from "./../../assets/svgs/bucket.svg"
import { Tabs, TabsProps } from "antd"
import "./style.css"

const LeftSidebar = () =>{
    const items: TabsProps['items'] = [
        {
          key: '1',
          label: <div className="controller-wrapper">
          <img src={editIcon} alt="Edit Icon" />
          <span>Content</span>
        </div>,
          children: 'Content of Tab Pane 1',
        },
        {
          key: '2',
          label: <div className="controller-wrapper">
            <img src={bucketIcon} alt="Bucket Icon" />
            <span>Style</span>
          </div>,
          children: 'Content of Tab Pane 2',
        },
        {
          key: '3',
          label: <div className="controller-wrapper">
          <img src={settingIcon} alt="Settings Icon" />
          <span>Advanced</span>
        </div>,
          children: 'Content of Tab Pane 3',
        },
      ];
      const onChange = (key: string) => {
        console.log(key);
      };
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
            <div className="left-sidebar-content">
                {/* Sidebar content */}
                <div className="header-text-container">
                    <span className="header-text">Accordion</span>
                </div>
                <div>
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                </div>
            </div>
        </div>
    )
}
export default LeftSidebar