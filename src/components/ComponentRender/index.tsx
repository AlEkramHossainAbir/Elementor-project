import { Col, Form, Input, Row } from "antd";
import { GetElement } from "./helper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./style.css";
import { updateFormData } from "../../redux/formSlice";
import { useEffect } from "react";
import { setFormInstance } from "../../redux/formInstanceSlice";

type ControlField = {
  name: string;
  type: string;
  default?: string | boolean | number;
  options?: Record<string, string>;
};
type Control = {
  fields: ControlField[];
};
export interface FormData {
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
const ComponentRender = ({ controlObject, initialData }: { controlObject: Control, initialData?:FormData }) => {
  const selectedController = useSelector(
    (state: RootState) => state.selectedController.selectedController
  );
  const {activeTabKey} = useSelector((state: RootState) => state.controller);

  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const dynamicProps = {
    labelCol: { span: 8 },
    // ...(isDisabled && { onValuesChange: () => setIsDisabled(false) })
  };
  useEffect(() => {
    dispatch(setFormInstance(form));
  }, [dispatch, form]);

  const onFinish = (values: FormData[]) => {
    dispatch(
      updateFormData({
        controlName: selectedController,
        tabId: activeTabKey,
        dataKey: form.getFieldValue("dataKey"), // Get updated dataKey value
        ...values, // Include other dynamic fields
      })
    );
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
            const sanitizedValue = changedValues.dataKey.toLowerCase().replace(/[^a-z0-9_]/g, '');
            form.setFieldsValue({ dataKey: sanitizedValue }); // Update form state
          }
          
         
          }}
        initialValues={initialData}
        layout="horizontal"
        {...dynamicProps}
      >
        <Row align='top' className='text-row' >
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
