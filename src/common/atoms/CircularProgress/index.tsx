import {
  type CircularProgressProps,
  CircularProgress as MUICircularProgress,
} from "@mui/material";

export default function CircularProgress(props: CircularProgressProps) {
  return <MUICircularProgress color='secondary' size={29} {...props} />;
}
