import { Col, Form, Row } from "antd";
import { ReactNode } from "react";
import { FormFields } from "../FieldTypeMap";
import "./style.css";

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
    let rowProps = {}
    let updatedProps = {}
    if(field.type === 'textarea'){
      rowProps={
        className: 'textarea-row'
      }
    }
    if(field.type === 'text'){
      rowProps={
        className: 'text-row'
      }
    }
    if(field.type === 'switch'){
        updatedProps = {
            checkedChildren: "on",
            unCheckedChildren: "off",
            defaultChecked: true,
        }
        rowProps={
          className: "switch-row"
        }
    }
    if(field.type === 'radio' || field.type === 'select'){
        updatedProps = {
            options: Object.entries(field.options || {}).map(([key, value]) => ({ label: value, value: key })),
        }
    }
  return (
    <>
     <Row align='top' {...rowProps} >
      <Col span={24}>
      <Form.Item
        name={formattedLabel}
        label={formattedLabel}
        labelAlign="left"
        className="form-item-wrapper"
        colon={false}
        layout={(field.type === 'text' || field.type === 'textarea') ? 'vertical' : 'horizontal'} 
      >
        {
            Component ? <Component style={field.type === 'switch' ? {}: { width: '100%' }} size="middle" {...updatedProps} />:null
        }
      </Form.Item>
      </Col>
    </Row>
    </>
  )
  
  };