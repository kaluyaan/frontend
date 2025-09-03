"use client";

import React from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Moment } from "moment";
import { TextFieldProps } from "@mui/material";
import homeStyle from "../../../components/Home/home.module.css";

interface DateTimePickerFieldProps {
  label?: string;
  selectedDateTime: Moment | null;
  onChange: (dateTime: Moment | null) => void;
  required?: boolean;
  minDateTime?: Moment;
  maxDateTime?: Moment;
  error?: string;
  ampm?: boolean; // true = 12h, false = 24h
}

const DateTimePickerField: React.FC<DateTimePickerFieldProps> = ({
  label,
  selectedDateTime,
  onChange,
  required = false,
  minDateTime,
  maxDateTime,
  error,
  ampm = true,
}) => {
  const showError = (required && !selectedDateTime) || Boolean(error);

  return (
    <>
      {label && <h3 className={homeStyle.normalTitle}>{label}</h3>}
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DateTimePicker
          value={selectedDateTime}
          onChange={onChange}
          minDateTime={minDateTime}
          maxDateTime={maxDateTime}
          ampm={ampm}
          format="DD/MM/YYYY hh:mm A"
          slotProps={{
            textField: {
              fullWidth: true,
              error: showError,
              helperText: showError
                ? error || "This field is required"
                : "",
            } as TextFieldProps,
          }}
        />
      </LocalizationProvider>
    </>
  );
};

export default DateTimePickerField;
