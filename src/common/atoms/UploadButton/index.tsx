import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import type { ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useId, useRef } from "react";
import CustomButton from "../CustomButton/index.tsx";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

type PropTypes = {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  buttonProps?: ButtonProps;
  label: string | React.ReactNode;
  resetInputValue?: boolean;
};

const UploadButton: React.FC<PropTypes> = (props) => {
  const { inputProps, buttonProps, label, resetInputValue = false } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();
  const inputId = inputProps?.id || `upload-input-${id}`;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (inputProps?.onChange) {
      inputProps.onChange(event);
    }
    if (inputRef.current && resetInputValue) {
      inputRef.current.value = ""; // Reset input value after change
    }
  };
  return (
    <CustomButton
      component='label'
      htmlFor={inputId}
      role={undefined}
      variant='contained'
      tabIndex={-1}
      startIcon={<DriveFolderUploadIcon />}
      {...buttonProps}
    >
      {label}
      <VisuallyHiddenInput
        id={inputId}
        ref={inputRef}
        type='file'
        multiple
        {...inputProps}
        onChange={handleChange}
      />
    </CustomButton>
  );
};

export default UploadButton;
