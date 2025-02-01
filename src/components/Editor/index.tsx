import { Tabs, TabsProps } from "antd";
import chevronLeft from "./../../assets/svgs/chevronLeft.svg";
import "./style.css";
import CodeEditor from "../CodeEditor";
import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../redux/store";
import { toggleContent } from "../../redux/toggleSlice";
import { RootState } from "../../redux/store";
import { setActiveTabCode } from "../../redux/codeSlice";


const Editor = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state: RootState) => state.code.activeTab);

  const items: TabsProps["items"] = [
    { key: "HTML", label: "HTML", children: <CodeEditor language="html" /> },
    { key: "CSS", label: "CSS", children: <CodeEditor language="css" /> },
    { key: "JS", label: "JS", children: <CodeEditor language="javascript" /> },
    { key: "Settings",label: "Settings",children: "Content of Tab Pane 4  "}
  ];

  const onChange = (key: string) => {
    dispatch(setActiveTabCode(key));
  };
  return (
    <div className="editor-container">
       <div className="toggle-button" onClick={()=>{dispatch(toggleContent())}}> <img src={chevronLeft} alt="collapse icon" /></div>
      <Tabs activeKey={activeTab} items={items} onChange={onChange} />
    </div>
  );
};
export default Editor;
