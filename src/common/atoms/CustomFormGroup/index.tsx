import { FormGroup, type FormGroupProps } from "@mui/material";

const CustomFormGroup: React.FC<FormGroupProps> = (props) => (
  <FormGroup {...props}>{props.children}</FormGroup>
);

export default CustomFormGroup;
