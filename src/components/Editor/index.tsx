import { Col, Form, Input, Row, Tabs, TabsProps } from "antd";
import chevronLeft from "./../../assets/svgs/chevronLeft.svg";
import chevronRight from "./../../assets/svgs/chevronRight.svg";
import "./style.css";
import CodeEditor from "../CodeEditor";
import { useDispatch, useSelector } from "react-redux";
import { toggleContent } from "../../redux/toggleSlice";
import { RootState } from "../../redux/store";
import { setActiveTabCode } from "../../redux/codeSlice";

const Editor = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state: RootState) => state.code.activeTab);
  const { widgetDetails } = useSelector((state: RootState) => state.widgets);
  const {showContent} = useSelector((state: RootState) => state.toggle)
  const { selectedWidgetId } = useSelector(
    (state: RootState) => state.widgetModal
  );
  const [form] = Form.useForm();

  const onFinish = (values: FormData[]) => {
    console.log("Form Submitted:", values);
  };

  const items: TabsProps["items"] = [
    {
      key: "HTML",
      label: "HTML",
      children: (
        <CodeEditor
          language="html"
          code={
            (selectedWidgetId && widgetDetails[selectedWidgetId]?.markup) || ""
          }
        />
      ),
    },
    {
      key: "CSS",
      label: "CSS",
      children: (
        <CodeEditor
          language="css"
          code={
            (selectedWidgetId && widgetDetails[selectedWidgetId]?.css) || ""
          }
        />
      ),
    },
    {
      key: "JS",
      label: "JS",
      children: (
        <CodeEditor
          language="javascript"
          code={(selectedWidgetId && widgetDetails[selectedWidgetId]?.js) || ""}
        />
      ),
    },
    {
      key: "Settings",
      label: "Settings",
      children: (
        <div style={{ background : '#fff', padding: 10}}>
          {selectedWidgetId &&
            widgetDetails[selectedWidgetId]?.settings &&
            Object.keys(widgetDetails[selectedWidgetId]?.settings).map(
              (setting: string) =>(
                <Form
                  key={setting}
                  form={form}
                  onFinish={onFinish}
                  layout="horizontal"
                >
                  <Row align="top" className="text-row">
                    <Col span={24}>
                      <Form.Item
                        label={setting}
                        name={setting}
                        labelAlign="left"
                        className="form-item-wrapper"
                        colon={false}
                        layout="vertical"
                      >
                        <Input
                          defaultValue={
                            widgetDetails[selectedWidgetId]?.settings[setting] || ""
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              )
            )}
        </div>
      ),
    },
  ];

  const onChange = (key: string) => {
    dispatch(setActiveTabCode(key));
  };
  return (
    <div className="editor-container">
      <div
        className="toggle-button"
        onClick={() => {
          dispatch(toggleContent());
        }}
      >
        {showContent ? <img src={chevronRight} alt="chevron Right" /> : <img src={chevronLeft} alt="collapse icon" />}
        
      </div>
      <Tabs activeKey={activeTab} items={items} onChange={onChange} />
    </div>
  );
};
export default Editor;
