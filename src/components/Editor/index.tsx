import { Tabs, TabsProps } from "antd"
import "./style.css"
import CodeEditor from "../CodeEditor";

const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'HTML',
      children: <CodeEditor language="html" />,
    },
    {
      key: '2',
      label: 'CSS',
      children: <CodeEditor language="css" />,
    },
    {
      key: '3',
      label: 'JS',
      children: <CodeEditor language="javascript" />,
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