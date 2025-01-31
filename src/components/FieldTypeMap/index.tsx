import React from "react";
import { Input, Switch, Radio, Select, InputNumber, ColorPicker, Upload } from "antd";
import Toggler from "../../libs/Toggler";
const { TextArea, Password } = Input;

// Field type to component mapping
const fieldTypeComponents: Record<string, React.ReactNode> = {
  text: <Input />,
  textarea: <Input.TextArea />,
  switch: <Switch checkedChildren="on" unCheckedChildren="off"  />,
  radio: <Radio.Group options={[]} />, // Options will be passed dynamically
  select: <Select options={[]} />, // Options will be passed dynamically
  number: <InputNumber />
};

const FormFields = {
	text: Input,
	input: Input,
	textarea: TextArea,
	password: Password,
	number: InputNumber,
	select: Select,
	radio: Radio,
  switch: Toggler,
	// checkbox: Checkbox,
	// date: DatePicker,
	// datetime: DatePicker,
	// daterange: RangePicker,
	// datetimerange: RangePicker,
	// time: TimePicker,
	// timerange: TimeRangePicker,
	upload: Upload,
	hidden: Input,
	color: ColorPicker,
};
export { FormFields, fieldTypeComponents };
