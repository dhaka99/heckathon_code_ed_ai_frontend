import { MenuItem, type MenuItemProps } from "@mui/material";

const CustomMenuItem: React.FC<MenuItemProps> = (props) => {
  const { children } = props;
  return <MenuItem {...props}>{children}</MenuItem>;
};

export default CustomMenuItem;
