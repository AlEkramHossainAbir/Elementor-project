import Editor from "@monaco-editor/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { updateCode } from "../../redux/codeSlice";
interface CodeEditorProps {
  language: string;
}
const CodeEditor: React.FC<CodeEditorProps> = ({ language }) => {
  const dispatch = useDispatch();
  const activeTabCode = useSelector((state: RootState) => state.code.activeTab);
  const code = useSelector((state: RootState) => state.code.codeByTab[activeTabCode] || "");
  
  const handleChange = (newValue: string | undefined) => {
    dispatch(updateCode({ tab: activeTabCode, code: newValue || "" }));
  };
  
  return (
    <div style={{ height: "1032px", backgroundColor: "#000 " }}>
      <Editor
        height="100%"
        language={language}
        defaultValue="// Start coding here..."
        value={code}
        theme="vs-dark" // You can also use "light" theme
        onChange={handleChange}
        options={{
          fontSize: 14,
          minimap: { enabled: true }, // Toggle minimap
          wordWrap: "on",
        }}
      />
    </div>
  );
};

export default CodeEditor;
