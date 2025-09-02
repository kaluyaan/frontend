"use client";

import React from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Moment } from "moment";
import { TextFieldProps } from "@mui/material";
import homeStyle from "../../../components/Home/home.module.css";

interface TimePickerFieldProps {
  label?: string;
  selectedTime: Moment | null;
  onChange: (time: Moment | null) => void;
  required?: boolean;
  minTime?: Moment;
  maxTime?: Moment;
  error?: string;
}

const TimePickerField: React.FC<TimePickerFieldProps> = ({
  label,
  selectedTime,
  onChange,
  required = false,
  minTime,
  maxTime,
  error,
}) => {
  const showError = (required && !selectedTime) || Boolean(error);

  return (
    <>
      <h3 className={homeStyle.normalTitle}>{label}</h3>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <TimePicker
          label=""
          value={selectedTime}
          onChange={onChange}
          minTime={minTime}
          maxTime={maxTime}
          ampm={true} // change to false for 24-hour format
          slotProps={{
            textField: {
              fullWidth: true,
              error: showError,
              helperText:
                required && !selectedTime
                  ? "This field is required"
                  : error || "",
            } as TextFieldProps,
          }}
        />
      </LocalizationProvider>
    </>
  );
};

export default TimePickerField;
