import Navbar from "./Navbar"
import wordpressImage from "./../assets/images/wordpress.png"
import plusIcon from "./../assets/svgs/plus.svg"
import collapseIcon from "./../assets/svgs/collapse.svg"

const LeftSidebar = () =>{
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
                <p>This is the left sidebar.</p>
            </div>
        </div>
    )
}
export default LeftSidebar