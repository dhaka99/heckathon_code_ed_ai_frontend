import type { InputBaseProps } from "@mui/material";
import CustomInputBase from "../../../common/atoms/CustomInputBase/index.tsx";

const FormInputBase: React.FC<InputBaseProps> = (props) => (
  <CustomInputBase
    {...props}
    sx={(theme) => ({
      bgcolor: theme.palette.neutral[100],
      borderRadius: "4px",
      overflow: "hidden",
      // py: "6.5px",
      // paddingLeft: "16px",
      "& input": { py: "6.5px", paddingLeft: "16px" },
      "& textarea": { py: "6.5px", paddingLeft: "16px" },
      "& input::placeholder": {
        ...theme.typography.body2Medium,
        color: theme.palette.neutral[400],
      },
      ...theme.typography.body2,
      "&.Mui-error input": {
        border: "1px solid",
        borderColor: theme.palette.error.main,
        borderRadius: "4px",
      },

      "&.Mui-error textarea": {
        border: "1px solid",
        borderColor: theme.palette.error.main,
        borderRadius: "4px",
      },
    })}
  />
);

export default FormInputBase;
