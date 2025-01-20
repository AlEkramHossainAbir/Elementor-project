import "./App.css"; // Add your styling here
import LeftSidebar from "./components/Sidebars/LeftSidebar";
import Editor from "./components/Editor";
import RightSidebar from "./components/Sidebars/RightSidebar";

const App = () => {

  return (
    <div className="app">
      <div className="container left-container">
        <LeftSidebar />
      </div>
      <div className="container">
        <Editor />
      </div>
      <div className="container">
       <RightSidebar />
      </div>
    </div>
  );
};

export default App;
