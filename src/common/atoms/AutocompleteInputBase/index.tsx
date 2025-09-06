import {
  type InputBaseComponentProps,
  type InputBaseProps,
} from "@mui/material";
import { JSX } from "react/jsx-runtime";
import CustomInputBase from "../CustomInputBase/index.tsx";

const AutocompleteInputBase = (props: {
  InputProps: JSX.IntrinsicAttributes & InputBaseProps;
  inputProps: InputBaseComponentProps | undefined;
  placeholder?: string;
  width?: string | number;
  color?: string;
}) => (
  <CustomInputBase
    {...props.InputProps}
    ref={props.InputProps.ref}
    inputProps={{ ...props.inputProps }}
    placeholder={props.placeholder || ""}
    sx={(theme) => ({
      width: props.width || 280,
      height: 34,
      bgcolor: theme.palette.neutral[100],
      borderRadius: "4px",
      overflow: "hidden",
      "& input": {
        py: "6.5px",
        paddingLeft: "16px",
      },
      "& input::placeholder": {
        ...theme.typography.body2Medium,
        color: theme.palette.neutral[400],
      },
      ...theme.typography.body2,
      "&.Mui-error": {
        border: "1px solid",
        borderColor: theme.palette.error.main,
        borderRadius: "4px",
      },
    })}
  />
);

export default AutocompleteInputBase;
