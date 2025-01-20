import "./App.css"; // Add your styling here
import LeftSidebar from "./components/Sidebars/LeftSidebar";
import Editor from "./components/Editor";
import RightSidebar from "./components/Sidebars/RightSidebar";
import Split from "react-split";

const App = () => {

  return (
    <div className="app">
      <div className="container left-container">
        <LeftSidebar />
      </div>
      <Split
    sizes={[50, 50]} // Initial percentage sizes
    minSize={100}    // Minimum size in pixels
    expandToMin={true}
    gutterSize={10}   // Size of the gutter
    gutterAlign="center"
    direction="horizontal"
    className="splitter"
  >
     <div className="container">
        <Editor />
      </div>
      <div className="container">
       <RightSidebar />
      </div>
  </Split>

     
    </div>
  );
};

export default App;
