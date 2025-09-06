import {
  type ButtonProps,
  type BoxProps,
  type PopperProps,
  ClickAwayListener,
} from "@mui/material";
import Popper from "@mui/material/Popper";
import { createContext, useContext, useState } from "react";
import Div from "../Div/index.tsx";

interface CustomPopperContextType {
  anchorEl: HTMLElement | null;
  open: boolean;

  handleToggle: (event: React.MouseEvent<HTMLElement>) => void;
}

const CustomPopperContext = createContext<CustomPopperContextType | undefined>(
  undefined,
);

type CustomPopperProps = {
  children?:
    | React.ReactNode
    | ((context: CustomPopperContextType) => React.ReactNode);
};

type ContentPropTypes = {
  container?: BoxProps;
  popper?: Omit<PopperProps, "open" | "anchor">;
  children: React.ReactNode;
  disableClickAway?: boolean;
};

const CustomPopper: React.FC<CustomPopperProps> & {
  Trigger: React.FC<ButtonProps>;
  Content: React.FC<ContentPropTypes>;
} = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const values = {
    anchorEl,
    open,
    handleToggle,
  };

  return (
    <CustomPopperContext.Provider value={values}>
      {typeof children === "function" ? children(values) : children}
    </CustomPopperContext.Provider>
  );
};

const Trigger: React.FC<ButtonProps> = ({ children, ...restProps }) => {
  const context = useContext(CustomPopperContext);
  if (!context) {
    throw new Error("Trigger must be used within CustomPopper");
  }

  return (
    <Div onClick={context.handleToggle} width='fit-content' {...restProps}>
      {children}
    </Div>
  );
};

const Content: React.FC<ContentPropTypes> = (props) => {
  const {
    children,
    container: { sx, ...restBoxProps } = {},
    popper,
    disableClickAway = false,
  } = props;
  const context = useContext(CustomPopperContext);
  if (!context) {
    throw new Error("Content must be used within CustomPopper");
  }

  return (
    <Popper
      id='custom-popper'
      {...popper}
      open={context.open}
      anchorEl={context.anchorEl}
    >
      <ClickAwayListener
        onClickAway={
          //  @ts-expect-error: touch event
          disableClickAway ? () => {} : (e) => context.handleToggle(e)
        }
      >
        <Div sx={{ bgcolor: "white", ...sx }} {...restBoxProps}>
          {children}
        </Div>
      </ClickAwayListener>
    </Popper>
  );
};

// Assign the static properties
CustomPopper.Trigger = Trigger;
CustomPopper.Content = Content;

export default CustomPopper;
