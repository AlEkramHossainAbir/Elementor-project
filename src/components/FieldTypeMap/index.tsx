import { Input, Select, InputNumber, ColorPicker, Upload } from "antd";
import Toggler from "../../libs/Toggler";
import AntRadio from "../../libs/Radio"
const { TextArea, Password } = Input;


const FormFields = {
	text: Input,
	input: Input,
	textarea: TextArea,
	password: Password,
	number: InputNumber,
	select: Select,
	radio: AntRadio,
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
export { FormFields };
