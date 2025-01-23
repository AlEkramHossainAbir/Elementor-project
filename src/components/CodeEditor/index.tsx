import { useState } from "react";
import Editor from "@monaco-editor/react";
interface CodeEditorProps {
  language: string;
  codeValue: string;
}
const CodeEditor: React.FC<CodeEditorProps> = ({ language, codeValue }) => {
  const [code, setCode] = useState<string>(codeValue);


  return (
    <div style={{ height: "1032px", backgroundColor: "#000 " }}>
      <Editor
        height="100%"
        language={language}
        defaultValue="// Start coding here..."
        value={code}
        theme="vs-dark" // You can also use "light" theme
        onChange={(val) => setCode(val|| '')}
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
