import { Button } from "@mui/material";
import type { ButtonProps, SxProps, Theme } from "@mui/material";
import type { ElementType } from "react";

const getStyles = (): SxProps<Theme> => ({
  textTransform: "initial",
});

// interface CustomButtonProps extends Omit<ButtonProps, "sx"> {
//   sx?: SxProps<Theme> | (() => object);
// }

type Props<C extends ElementType> = ButtonProps<C> & { component?: C };

const CustomButton = <C extends ElementType = "button">(props: Props<C>) => {
  const { children, sx, ...restProps } = props;

  return (
    <Button
      sx={(theme) => ({
        ...getStyles(),
        ...(typeof sx === "function" ? sx(theme) : sx || {}),
      })}
      {...restProps}
    >
      {children}
    </Button>
  );
};
// const CustomButton: React.FC<CustomButtonProps> = (props) => {
//   const { children, sx, ...restProps } = props;

//   return (
//     <Button
//       sx={(theme) => ({
//         ...getStyles(),
//         ...(typeof sx === "function" ? sx(theme) : sx || {}),
//       })}
//       {...restProps}
//     >
//       {children}
//     </Button>
//   );
// };

export default CustomButton;
