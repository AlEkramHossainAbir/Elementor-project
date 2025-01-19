import Navbar from "../Navbar"

import desktopIcon from "./../../assets/svgs/desktop.svg"
import tabIcon from "./../../assets/svgs/tab.svg"
import mobileIcon from "./../../assets/svgs/mobile.svg"
import { Button } from "antd"
import DropDownArrowIcon from "./../../assets/svgs/DropDownArrow.svg"

const RightSidebar = () =>{
    return (
        <div className="right-sidebar">
             <Navbar>
                <div className="responsive-icons">
                <img src={desktopIcon} alt="desktop Icon" />
                <img src={tabIcon} alt="Tab Icon" />
                <img src={mobileIcon} alt="Mobile Icon" />
                </div>
                <div className="extra-icons">
                <Button className="save-btn">Save Changes</Button>
                <Button className="dropdown-btn">
                    <img src={DropDownArrowIcon} alt="DropDownArrowIcon" />
                </Button>
                </div>
            </Navbar>
            <div className="right-sidebar-container">
                <div className="block-elements">
                    <div className="main-text">What is a design system?</div>
                    <div className="sub-text">A design system is a collection of reusable components, patterns, and guidelines that are assembled to build a consistent and user-friendly user interface for a product.</div>
                </div>
                <div className="block-elements">
                <div className="main-text">Why is a design system important?</div>
                    <div className="sub-text"></div>
                </div>
                <div className="block-elements">
                <div className="main-text"></div>
                    <div className="sub-text"></div>
                </div>
                <div className="block-elements">
                <div className="main-text"></div>
                    <div className="sub-text"></div>
                </div>
            </div>
        </div>
    )
}
export default RightSidebar