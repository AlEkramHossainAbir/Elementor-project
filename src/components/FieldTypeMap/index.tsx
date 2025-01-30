import React from "react";
import { Input, Switch, Radio, Select, InputNumber } from "antd";

// Field type to component mapping
export const fieldTypeComponents: Record<string, React.ReactNode> = {
  text: <Input />,
  textarea: <Input.TextArea />,
  switch: <Switch checkedChildren="on" unCheckedChildren="off"  />,
  radio: <Radio.Group options={[]} />, // Options will be passed dynamically
  select: <Select options={[]} />, // Options will be passed dynamically
  number: <InputNumber />
};
