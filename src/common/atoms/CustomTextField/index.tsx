import { TextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material";

const CustomTextField: React.FC<TextFieldProps> = (props) => (
  <TextField {...props} />
);

export default CustomTextField;
