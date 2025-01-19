import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({language}) => {
  const [code, setCode] = useState("// Start coding here...");

  const handleEditorChange = (value) => {
    setCode(value);
  };

  return (
    <div style={{ height: "90vh", border: "1px solid #ddd" }}>
      <Editor
        height="100%"
        width="800px"
        defaultLanguage={language}
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
