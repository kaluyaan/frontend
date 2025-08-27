"use client";

import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment";
import { TextFieldProps } from "@mui/material";
import homeStyle from "../../../components/Home/home.module.css";

interface DatePickerFieldProps {
  label?: string;
  selectedDate: Moment | null;
  onChange: (date: Moment | null) => void;
  required?: boolean;
  minDate?: Moment;
  maxDate?: Moment;
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
    <section className={homeStyle.sectionWrapper}>
      <h3 className={homeStyle.normalTitle}>{label}</h3>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          label=""
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
    </section>
  );
};

export default DatePickerField;
