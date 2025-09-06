import { TimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { TimePickerProps } from "@mui/x-date-pickers/TimePicker";
import { Dayjs } from "dayjs";

const CustomTmePicker: React.FC<TimePickerProps<Dayjs>> = (props) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <TimePicker {...props} />
  </LocalizationProvider>
);

export default CustomTmePicker;
