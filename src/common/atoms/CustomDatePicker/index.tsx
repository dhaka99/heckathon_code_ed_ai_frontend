import { styled } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import type { DatePickerProps } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

interface CustomDatePickerProps extends DatePickerProps<Dayjs> {
  label?: string;
}
const StyledDatePicker = styled(DatePicker)<CustomDatePickerProps>(
  ({ theme }) => ({
    backgroundColor: theme.palette.neutral?.[100] || theme.palette.grey[100],
    "& .MuiIconButton-root": {
      color: theme.palette.primary.main,
    },
  }),
);

const CustomDatePicker: React.FC<CustomDatePickerProps> = (props) => {
  const { label, ...restProps } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledDatePicker
        label={label}
        slotProps={{
          textField: { InputLabelProps: { shrink: true } },
        }}
        {...restProps}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
