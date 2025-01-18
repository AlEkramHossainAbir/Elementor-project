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
            <h2>Left Sidebar</h2>
        </div>
    )
}
export default LeftSidebar