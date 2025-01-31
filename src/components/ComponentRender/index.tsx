import { Form } from "antd";
import { fieldTypeComponents } from "../FieldTypeMap";
import { GetElement } from "./helper";
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
        // onFinish={submitForm}
        form={form}
        onValuesChange={(currentField) => {
          console.log(currentField);
        }}
        layout="horizontal"
        {...dynamicProps}
      >
        {controlObject.fields.map((field, index) => {
            console.log(field, index)
          const Component = fieldTypeComponents[
            field.type
          ] as React.ElementType;
          if (!Component) {
            return <p key={field.name}>Unsupported field type: {field.type}</p>;
          }

          return <GetElement field={field} key={index} />;
        })}
      </Form>
    </>
  );
};
export default ComponentRender;
