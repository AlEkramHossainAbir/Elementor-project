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
  const { widgetDetails } = useSelector((state: RootState) => state.widgets);
  const {selectedWidgetId} = useSelector((state: RootState) => state.widgetModal)

  const items: TabsProps["items"] = [
    { key: "HTML", label: "HTML", children: <CodeEditor language="html" code={selectedWidgetId && widgetDetails[selectedWidgetId]?.markup || ""} /> },
    { key: "CSS", label: "CSS", children: <CodeEditor language="css" code={selectedWidgetId && widgetDetails[selectedWidgetId]?.css || ""} /> },
    { key: "JS", label: "JS", children: <CodeEditor language="javascript" code={selectedWidgetId && widgetDetails[selectedWidgetId]?.js || ""} /> },
    { key: "Settings",label: "Settings",children: (
      <>
      {
        selectedWidgetId && widgetDetails[selectedWidgetId]?.settings && Object.keys(widgetDetails[selectedWidgetId]?.settings).map((setting: string) => (
          <div key={setting} style={{background: '#fff'}}>
            <div>{setting}</div>
            <div>{widgetDetails[selectedWidgetId]?.settings[setting]}</div>
          </div>
        ))
      }
      </>
    )}
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
