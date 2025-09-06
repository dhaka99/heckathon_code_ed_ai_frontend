// CustomAlert.tsx
import React from "react";
import { Alert, type AlertProps } from "@mui/material";

const CustomAlert: React.FC<AlertProps> = (props) => {
  return <Alert {...props}>{props.children}</Alert>;
};

export default CustomAlert;
