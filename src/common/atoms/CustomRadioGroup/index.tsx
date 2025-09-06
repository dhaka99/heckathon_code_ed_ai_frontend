import { RadioGroup, type RadioGroupProps } from "@mui/material";

const CustomRadioGroup: React.FC<RadioGroupProps> = (props) => (
  <RadioGroup {...props}>{props.children}</RadioGroup>
);

export default CustomRadioGroup;
