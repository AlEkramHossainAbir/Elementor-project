import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({language}) => {
  const [code, setCode] = useState(`
  // Imports
  import mongoose, { Schema } from 'mongoose'
  
  // Collection name
  export const collection = 'Product';
  
  // Schema
  const schema = new Schema({
    name: {
      type: String,
      required: true
    },
  
    description: {
      type: String
    }
  }, {timestamps: true})
  
  // Model
  export default mongoose.model(collection, schema, collection)
  
  `);

  const handleEditorChange = (value) => {
    setCode(value);
  };

  return (
    <div style={{ height: "90vh", border: "1px solid #ddd" }}>
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
