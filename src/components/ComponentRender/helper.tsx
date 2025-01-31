import { Col, Form, Row } from "antd";
import { ReactNode } from "react";
import { FormFields } from "../FieldTypeMap";

type ControlField = {
    name: string;
    type: string;
    default?: string | boolean | number;
    options?: Record<string, string>;
};
type Control = {
    field: ControlField
}

function formatLabel(label: string): string {
    return label.replace(/_/g, " "); // Replace underscores with spaces
  }
export const getComponent = (type?: string) => type ? FormFields[type as keyof typeof FormFields] : null

export const GetElement = ({ field }:Control): ReactNode => {
    const formattedLabel = formatLabel(field.name) ;
    const Component = getComponent(field.type) as React.ElementType;
    console.log(Component)
  return (
    <>
     <Row align='top'>
      <Col span={24}>
      <Form.Item
        name={formattedLabel}
        label={formattedLabel}
        labelAlign="left"
        colon={false}
      >
         {/* <Component style={{ width: '100%' }} size="middle" {...updatedProps} /> */}
            {/* <Component style={{ width: '100%' }} size="middle" /> */}
            {
                Component ? <Component style={field.type === 'switch' ? {}: { width: '100%' }} size="middle" />:null
            }
      </Form.Item>
      </Col>
    </Row>
    </>
  )
  
  };