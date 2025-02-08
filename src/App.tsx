import { useSelector } from "react-redux";
import "./App.css"; // Add your styling here
import WidgetList from "./components/WidgetList";
import {  RootState } from "./redux/store";
import BuilderWrapper from "./components/BuilderWrapper";
import { Modal } from "antd";


const App = () => {
  const { isOpen } = useSelector((state: RootState) => state.widgetModal);
 
  return (
    <div id="xyz-widget-builder">
      <WidgetList />
      {
        isOpen &&  (
          <Modal open={isOpen} footer={null} getContainer={()=> document.getElementById('xyz-widget-builder') as HTMLElement}>
            <div className="app">
              <BuilderWrapper />
            </div>
          </Modal>
        )
      }
   
    </div>
  );
};

export default App;
