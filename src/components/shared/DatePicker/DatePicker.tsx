"use client";

import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import  { Dayjs } from "dayjs";
import { TextFieldProps } from "@mui/material";

interface DatePickerFieldProps {
  label?: string;
  selectedDate: Dayjs | null;
  onChange: (date: Dayjs | null) => void;
  required?: boolean;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  error?: string;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  selectedDate,
  onChange,
  required = false,
  minDate,
  maxDate,
  error,
}) => {
  const showError = (required && !selectedDate) || Boolean(error);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={selectedDate}
        onChange={onChange}
        minDate={minDate}
        maxDate={maxDate}
        format="DD/MM/YYYY"
        slotProps={{
          textField: {
            fullWidth: true,
            error: showError,
            helperText:
              required && !selectedDate
                ? "This field is required"
                : error || "",
          } as TextFieldProps,
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePickerField;
