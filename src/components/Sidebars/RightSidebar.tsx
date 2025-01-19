import Navbar from "../Navbar"

import desktopIcon from "./../../assets/svgs/desktop.svg"
import tabIcon from "./../../assets/svgs/tab.svg"
import mobileIcon from "./../../assets/svgs/mobile.svg"
import { Button, Collapse } from "antd"
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
                <div className="main-text">Are design systems only for large organizations?</div>
                    <div className="sub-text"></div>
                </div>
                <div className="block-elements">
                <div className="main-text">How does it benefit a development team? </div>
                    <div className="sub-text"></div>
                </div>
                <Collapse
        bordered={false}
        expandIconPosition="end"
        className="custom-collapse"
      >
        <Collapse.Panel header="What is a design system?" key="1">
          <p>
            A design system is a collection of reusable components, patterns,
            and guidelines that are assembled to build a consistent and
            user-friendly user interface for a product.
          </p>
        </Collapse.Panel>
        <Collapse.Panel header="Why is a design system important?" key="2">
          <p>
            A design system provides consistency, improves scalability, and
            speeds up the development process by reusing components and styles.
          </p>
        </Collapse.Panel>
        <Collapse.Panel header="Are design systems only for large organizations?" key="3">
          <p>
            No, design systems are beneficial for teams of all sizes, as they
            ensure consistency and efficiency.
          </p>
        </Collapse.Panel>
        <Collapse.Panel header="How does it benefit a development team?" key="4">
          <p>
            It reduces redundancy, encourages collaboration between designers
            and developers, and accelerates project timelines.
          </p>
        </Collapse.Panel>
        <Collapse.Panel header="How do you implement a design system?" key="5">
          <p>
            By defining reusable components, establishing guidelines, and
            ensuring adoption across all teams in the project.
          </p>
        </Collapse.Panel>
      </Collapse>
            </div>
        </div>
    )
}
export default RightSidebar