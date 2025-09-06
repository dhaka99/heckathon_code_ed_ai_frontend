import MuiStack, { type StackProps } from "@mui/material/Stack";
import React from "react";

const Stack: React.FC<StackProps> = (props) => (
  <MuiStack direction='column' spacing={2} {...props}>
    {props.children}
  </MuiStack>
);

export default Stack;
