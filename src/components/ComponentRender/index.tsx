import { Col, Form, Input, Row } from "antd";
import { GetElement } from "./helper";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./style.css";

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
        onValuesChange={(currentField) => {
          console.log(currentField, selectedController);
        }}
        layout="horizontal"
        {...dynamicProps}
      >
        <Row align='top' className='text-row' >
        <Col span={24}>
        <Form.Item
          label="Custom-key"
          name="customKey"
          rules={[{ required: true, message: "Please input your data!" }]}
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
