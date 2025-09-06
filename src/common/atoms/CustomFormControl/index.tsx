import { FormControl, type FormControlProps } from "@mui/material";

const CustomFormControl: React.FC<FormControlProps> = (props) => (
  <FormControl {...props}>{props.children}</FormControl>
);

export default CustomFormControl;
