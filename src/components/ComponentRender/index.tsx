import { Col, Form, Input, Row } from "antd";
import { GetElement } from "./helper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./style.css";
import { updateFormData } from "../../redux/formSlice";

type ControlField = {
  name: string;
  type: string;
  default?: string | boolean | number;
  options?: Record<string, string>;
};
type Control = {
  fields: ControlField[];
};

export const CustomizeRequiredMark = (
  label: React.ReactNode,
  { required }: { required: boolean }
) => (
  <>
    {label}
    {required && <span style={{ color: "red", marginLeft: 2 }}>*</span>}
  </>
);
const ComponentRender = ({ controlObject }: { controlObject: Control }) => {
  const selectedController = useSelector(
    (state: RootState) => state.selectedController.selectedController
  );

  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const dynamicProps = {
    labelCol: { span: 8 },
    // ...(isDisabled && { onValuesChange: () => setIsDisabled(false) })
  };

  return (
    <>
      <Form
        requiredMark={CustomizeRequiredMark}
        scrollToFirstError={true}
        form={form}
        onValuesChange={(changedValues,allValues) => {
          if (changedValues.dataKey !== undefined) {
            const sanitizedValue = changedValues.dataKey.toLowerCase().replace(/[^a-z0-9_]/g, '');
            form.setFieldsValue({ dataKey: sanitizedValue }); // Update form state
          }
          
          dispatch(
            updateFormData({
              controlName: selectedController,
              dataKey: form.getFieldValue("dataKey"), // Get updated dataKey value
              ...allValues, // Include other dynamic fields
            })
          );
          }}
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
