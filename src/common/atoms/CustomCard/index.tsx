import { Card, CardContent, CardProps } from "@mui/material";
import { ReactNode } from "react";
interface CustomCardProps extends CardProps {
  contentSx?: CardProps["sx"];
  sx?: CardProps["sx"];
  children?: ReactNode;
}
const CustomCard: React.FC<CustomCardProps> = (props) => {
  const { children, sx, contentSx, ...restProps } = props;
  return (
    <Card
      sx={{ padding: "12px 24px", borderRadius: "8px", ...sx }}
      {...restProps}
    >
      <CardContent
        sx={{
          padding: "0px",
          "&:last-child": {
            paddingBottom: "0px",
          },
          ...contentSx,
        }}
      >
        {children}
      </CardContent>
    </Card>
  );
};

export default CustomCard;
