import type { TypographyProps } from "@mui/material";
import { Typography } from "@mui/material";

const Text: React.FC<TypographyProps> = (props) => {
  const { children, ...restProps } = props;
  return <Typography {...restProps}>{children}</Typography>;
};
export default Text;
