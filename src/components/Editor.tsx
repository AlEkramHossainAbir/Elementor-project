import { Tabs, TabsProps } from "antd"
const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'HTML',
      children: 'Content of Tab Pane 1',
    },
    {
      key: '2',
      label: 'CSS',
      children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: 'JS',
      children: 'Content of Tab Pane 3',
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
        <div>
            
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
    )
}
export default Editor