import { useState } from "react";
import Editor from "@monaco-editor/react";
interface CodeEditorProps {
  language: string;
  codeValue: string;
}
const CodeEditor: React.FC<CodeEditorProps>  = ({language,codeValue}) => {
  const [code, setCode] = useState(codeValue);

  // const handleEditorChange = (value) => {
  //   setCode(value);
  // };
console.log(setCode)
  return (
    <div style={{ height: "1032px", backgroundColor:"#000 " }}>
      <Editor
        height="100%"
        width="800px"
        language={language}
        defaultValue="// Start coding here..."
        value={code}
        theme="vs-dark" // You can also use "light" theme
        onChange={()=>{}}
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
