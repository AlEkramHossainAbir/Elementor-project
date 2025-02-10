import { Col, Form, Input, Row } from "antd";
import { GetElement } from "./helper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import "./style.css";
import { useEffect } from "react";
import { setFormInstance } from "../../redux/formInstanceSlice";
import { storeWidget } from "../../redux/widgetApiSlice";

type ControlField = {
  name: string;
  type: string;
  default?: string | boolean | number;
  options?: Record<string, string>;
};
type Control = {
  fields: ControlField[];
};
interface FormData {
  [key: string]: string;
}

export const CustomizeRequiredMark = (
  label: React.ReactNode,
  { required }: { required: boolean }
) => (
  <>
    {label}
    {required && <span style={{ color: "red", marginLeft: 2 }}>*</span>}
  </>
);
const ComponentRender = ({
  controlObject,
  initialData,
}: {
  controlObject: Control;
  initialData?: FormData;
}) => {
  const selectedController = useSelector(
    (state: RootState) => state.selectedController.selectedController
  );
  const codeData = useSelector((state: RootState) => state.code.codeByTab);
  const { activeTabKey } = useSelector((state: RootState) => state.controller);
  const { widgetDetails } = useSelector((state: RootState) => state.widgets);
  const { selectedWidgetId } = useSelector(
    (state: RootState) => state.widgetModal
  );

  const dispatch = useDispatch<AppDispatch>();

  const [form] = Form.useForm();
  const dynamicProps = {
    labelCol: { span: 8 },
    // ...(isDisabled && { onValuesChange: () => setIsDisabled(false) })
  };
  useEffect(() => {
    dispatch(setFormInstance(form));
  }, [dispatch, form]);

  const onFinish = (values: FormData[]) => {
    console.log("form values", values);
    if (!selectedWidgetId) {
      console.error("No widget selected!");
      return;
    }
    const dataKey = form.getFieldValue("dataKey");
    const newControlledObject = {
      [dataKey]: {
        controlName: selectedController,
        tabId: activeTabKey,
        dataKey: dataKey,
        ...values,
      },
    };
    const widgetData = {
      description:
        "A custom Elementor heading widget with advanced styling options",
      markup: codeData?.HTML,
      icon: "",
      controls: newControlledObject,
      settings: {
        title: widgetDetails[selectedWidgetId]?.settings.title,
        description: widgetDetails[selectedWidgetId]?.settings.description,
        icon: widgetDetails[selectedWidgetId]?.settings.icon,
        category: widgetDetails[selectedWidgetId]?.settings.category,
      },
      css: codeData?.CSS,
      js: codeData?.JS,
    };
    console.log("Aftr form submit", widgetData);
    dispatch(storeWidget({ widgetId: selectedWidgetId, widgetData })).then((response) => {
      console.log("Widget saved successfully", response);
      // form.resetFields();
      dispatch(setFormInstance(null));
    });
  };

  return (
    <>
      <Form
        requiredMark={CustomizeRequiredMark}
        scrollToFirstError={true}
        form={form}
        onFinish={onFinish}
        onValuesChange={(changedValues) => {
          if (changedValues.dataKey !== undefined) {
            const sanitizedValue = changedValues.dataKey
              .toLowerCase()
              .replace(/[^a-z0-9_]/g, "");
            form.setFieldsValue({ dataKey: sanitizedValue }); // Update form state
          }
        }}
        initialValues={initialData}
        layout="horizontal"
        {...dynamicProps}
      >
        <Row align="top" className="text-row">
          <Col span={24}>
            <Form.Item
              label="Data key"
              name="dataKey"
              // rules={[{ required: true, message: "Please input your data!" }]}
              labelAlign="left"
              className="form-item-wrapper"
              colon={false}
              layout="vertical"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        {controlObject.fields.map((field, index) => (
          <GetElement field={field} key={index} />
        ))}
      </Form>
    </>
  );
};
export default ComponentRender;
