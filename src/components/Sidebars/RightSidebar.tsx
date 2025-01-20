import Navbar from "../Navbar"

import desktopIcon from "./../../assets/svgs/desktop.svg"
import tabIcon from "./../../assets/svgs/tab.svg"
import mobileIcon from "./../../assets/svgs/mobile.svg"
import { Button, Collapse, CollapseProps } from "antd"
import DropDownArrowIcon from "./../../assets/svgs/DropDownArrow.svg"

const RightSidebar = () =>{
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'What is a design system?',
      children:  <p>
      A design system is a collection of reusable components, patterns,
      and guidelines that are assembled to build a consistent and
      user-friendly user interface for a product.
    </p>,
    },
    {
      key: '2',
      label: 'Why is a design system important?',
      children: <p>
      A design system is a collection of reusable components, patterns,
      and guidelines that are assembled to build a consistent and
      user-friendly user interface for a product.
    </p> ,
    },
    {
      key: '3',
      label: 'Are design systems only for large organizations?',
      children:  <p>
      No, design systems are beneficial for teams of all sizes, as they
      ensure consistency and efficiency.
    </p>,
    },
    {
      key: '4',
      label: 'How does it benefit a development team?',
      children:  <p>
      It reduces redundancy, encourages collaboration between designers
      and developers, and accelerates project timelines.
    </p>,
    },
    {
      key: '5',
      label: 'How do you implement a design system?',
      children:  <p>
      By defining reusable components, establishing guidelines, and
      ensuring adoption across all teams in the project.
    </p>,
    },
  ];

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
                <div className="block-elements custom-collapse">
                  <Collapse items={items} expandIconPosition="end" defaultActiveKey={['1']} onChange={onChange} />,
                </div>
                
            </div>
        </div>
    )
}
export default RightSidebar