import "./App.css"; // Add your styling here
import LeftSidebar from "./components/Sidebars/LeftSidebar";
import Editor from "./components/Editor";
import RightSidebar from "./components/Sidebars/RightSidebar";
import { Splitter } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

const App = () => {
  const showContent = useSelector((state: RootState) => state.toggle.showContent);

  return (
    <div className="app">
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
    </div>
  );
};

export default App;
