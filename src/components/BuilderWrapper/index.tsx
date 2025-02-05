import LeftSidebar from "./../LeftSidebar";
import Editor from "./../Editor";
import RightSidebar from "./../RightSidebar";
import { Splitter } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const BuilderWrapper = () =>{
    const showContent = useSelector((state: RootState) => state.toggle.showContent);
    return (
        <>
           {
        !showContent && (
          <div className="container left-container">
          <LeftSidebar />
        </div>
        )
      }
    
      <Splitter className="splitter">
        <Splitter.Panel defaultSize="40%" min="20%" max="70%">
          <div className="container">
            <Editor />
          </div>
        </Splitter.Panel>
        <Splitter.Panel>
          <div className="container">
            <RightSidebar />
          </div>
        </Splitter.Panel>
      </Splitter>
      </>
    )
}
export default BuilderWrapper