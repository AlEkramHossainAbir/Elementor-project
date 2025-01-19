import { ReactNode } from "react";

interface NavbarProps {
    children: ReactNode;
  }
const Navbar : React.FC<NavbarProps> = ({children}) =>{
    return (
      <div className="navbar">
        {
            children
        }
      </div>
    );
}

export default Navbar;