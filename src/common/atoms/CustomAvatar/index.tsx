import { Avatar, type AvatarProps } from "@mui/material";

const CustomAvatar: React.FC<AvatarProps> = (props) => (
  <Avatar {...props}>{props.children}</Avatar>
);

export default CustomAvatar;
