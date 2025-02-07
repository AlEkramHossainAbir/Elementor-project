import { useDispatch, useSelector } from "react-redux";
import "./App.css"; // Add your styling here
import WidgetList from "./components/WidgetList";
import { AppDispatch, RootState } from "./redux/store";
import BuilderWrapper from "./components/BuilderWrapper";
import { Modal } from "antd";
import { useEffect } from "react";
import { fetchWidgetDetails } from "./redux/widgetSlice";

const App = () => {
  const dispatch = useDispatch<AppDispatch>(); 
  const { isOpen } = useSelector((state: RootState) => state.widgetModal);
  const {selectedWidgetId} = useSelector((state: RootState) => state.widgetModal)
  
  useEffect(() => {
    if (selectedWidgetId) {
      dispatch(fetchWidgetDetails(selectedWidgetId));
    }
  }, [selectedWidgetId, dispatch]);

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
