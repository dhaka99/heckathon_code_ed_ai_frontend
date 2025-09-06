import MuiSnackbar, { type SnackbarProps } from "@mui/material/Snackbar";

const Snackbar: React.FC<SnackbarProps> = (props) => (
  <MuiSnackbar {...props}>{props.children}</MuiSnackbar>
);

export default Snackbar;
