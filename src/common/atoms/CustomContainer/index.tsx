import type { BoxProps } from "@mui/material";
import Div from "../Div/index.tsx";

const CustomContainer: React.FC<BoxProps> = ({ children, ...props }) => (
  <Div margin={"0 auto"} padding={"0 34px"} {...props}>
    {children}
  </Div>
);

export default CustomContainer;
