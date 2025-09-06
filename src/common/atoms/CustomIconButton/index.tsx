import { IconButton, type IconButtonProps } from "@mui/material";

const CustomIconButton: React.FC<IconButtonProps> = ({
  children,
  ...props
}) => <IconButton {...props}>{children}</IconButton>;

export default CustomIconButton;
