import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  DateTimePicker,
  type DateTimePickerProps,
} from "@mui/x-date-pickers/DateTimePicker";
import { Dayjs } from "dayjs";
import React from "react";
import { styled } from "@mui/material";

interface CustomDateTimePickerProps extends DateTimePickerProps<Dayjs> {
  label?: string;
  secondsStep?: string;
}

const StyledDateTimePicker = styled(DateTimePicker)<CustomDateTimePickerProps>(
  ({ theme }) => ({
    backgroundColor: theme.palette.neutral?.[100] || theme.palette.grey[100],
    "& .MuiIconButton-root": {
      color: theme.palette.primary.main,
    },
  }),
);

const CustomDateTimePicker: React.FC<CustomDateTimePickerProps> = (props) => {
  const { label, ...restProps } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledDateTimePicker
        label={label}
        views={["year", "month", "day", "hours", "minutes"]}
        slotProps={{
          textField: {
            InputLabelProps: {
              shrink: true,
            },
            // onKeyDown: (e) => e.preventDefault(), // block typing
            // inputProps: {
            // readOnly: true, // disable keyboard input
            // },
          },
        }}
        minutesStep={1}
        {...restProps}
      />
    </LocalizationProvider>
  );
};

export default CustomDateTimePicker;
