import { Tabs, TabsProps } from "antd"
import "./style.css"
import CodeEditor from "../CodeEditor";

const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'HTML',
      children: <CodeEditor language="html" codeValue={`
      <!DOCTYPE html>
      <html>
      <head>
        <title>My Website</title>
      </head>
      <body>
        <h1>Hello, World!</h1>
      </body>
      </html>
      
      `} />,
    },
    {
      key: '2',
      label: 'CSS',
      children: <CodeEditor language="css" codeValue={`
      .app{
        background-color: #f5f5f5;
        padding: 20px;
      }
      
      `} />,
    },
    {
      key: '3',
      label: 'JS',
      children: <CodeEditor language="javascript" codeValue={`
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
      
      `} />,
    },
    {
      key: '4',
      label: 'Settings',
      children: 'Content of Tab Pane 4  ',
    },
  ];
const Editor = () =>{
    const onChange = (key: string) => {
        console.log(key);
      };
    return (
        <div className="editor-container">
            
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
    )
}
export default Editor