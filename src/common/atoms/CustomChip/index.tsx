import { Chip, type ChipProps, type SxProps, type Theme } from "@mui/material";

interface PropTypes extends ChipProps {
  selected?: boolean;
}

const getStyles = (theme: Theme, selected?: boolean): SxProps<Theme> => ({
  cursor: "pointer",
  color: selected ? "primary.main" : "white",
  bgcolor: selected ? "white" : "rgba(255, 255, 255, 0.15)",
  height: 26,
  ...theme.typography.caption1Medium,
  "& .MuiChip-label": {
    px: 2,
  },
  "&:hover": {
    color: selected ? "primary.main" : "white",
    bgcolor: selected ? "white" : "rgba(255, 255, 255, 0.15)",
  },
});

const CustomChip: React.FC<PropTypes & { white?: boolean }> = ({
  sx,
  selected,
  white,
  ...props
}) => (
  <Chip
    sx={(theme) => ({
      ...(white ? getStyles(theme, selected) : {}),
      ...(typeof sx === "function" ? sx(theme) : sx || {}),
    })}
    {...props}
  />
);

export default CustomChip;
