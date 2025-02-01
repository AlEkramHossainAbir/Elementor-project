import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CodeState {
  activeTab: string;
  codeByTab: Record<string, string>;
}

const initialState: CodeState = {
  activeTab: "HTML", // Default active tab
  codeByTab: {
    HTML: `<!DOCTYPE html>
<html>
<head>
  <title>My Website</title>
</head>
<body>
  <h1>Hello, World!</h1>
</body>
</html>`,
    CSS: `.app {
  background-color: #f5f5f5;
  padding: 20px;
}`,
    JS: `   // Imports
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
      export default mongoose.model(collection, schema, collection)`,
  },
};

const codeSlice = createSlice({
  name: "code",
  initialState,
  reducers: {
    setActiveTabCode: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    updateCode: (state, action: PayloadAction<{ tab: string; code: string }>) => {
      state.codeByTab[action.payload.tab] = action.payload.code;
    },
  },
});

export const { setActiveTabCode, updateCode } = codeSlice.actions;
export default codeSlice.reducer;
