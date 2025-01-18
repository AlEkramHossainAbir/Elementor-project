import Navbar from "./Navbar"

import desktopIcon from "./../assets/svgs/desktop.svg"
import tabIcon from "./../assets/svgs/tab.svg"
import mobileIcon from "./../assets/svgs/mobile.svg"
import { Button } from "antd"
import DropDownArrowIcon from "./../assets/svgs/DropDownArrow.svg"

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
            <h1>Right Sidebar</h1>
        </div>
    )
}
export default RightSidebar