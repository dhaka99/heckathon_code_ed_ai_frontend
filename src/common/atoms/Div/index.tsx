import { Box } from "@mui/material";
import type { BoxProps } from "@mui/material";
import type { ElementType } from "react";

type DivProps<C extends ElementType> = BoxProps<C> & { component?: C };

const Div = <C extends ElementType = "div">(props: DivProps<C>) => {
  const { component, children, ...restProps } = props;

  return (
    <Box component={component} {...restProps}>
      {children}
    </Box>
  );
};

export default Div;
