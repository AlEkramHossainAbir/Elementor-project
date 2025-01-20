import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({language,codeValue}) => {
  const [code, setCode] = useState(codeValue);

  const handleEditorChange = (value) => {
    setCode(value);
  };

  return (
    <div style={{ height: "1032px", backgroundColor:"#000 " }}>
      <Editor
        height="100%"
        width="800px"
        language={language}
        defaultValue="// Start coding here..."
        value={code}
        theme="vs-dark" // You can also use "light" theme
        onChange={handleEditorChange}
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
