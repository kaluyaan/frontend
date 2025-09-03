"use client";

import React from "react";
import { Moment } from "moment";
import homeStyle from "../../../components/Home/home.module.css";
import DatePickerField from "./DatePicker";

interface DatePickerFieldProps {
  label?: string;
  selectedDate: Moment | null;
  onChange: (date: Moment | null) => void;
  required?: boolean;
  minDate?: Moment;
  maxDate?: Moment;
  error?: string;
}

const DatePickerFieldWrapper: React.FC<DatePickerFieldProps> = ({
  label,
  selectedDate,
  onChange,
  required = false,
  minDate,
  maxDate,
  error,
}) => {
  return (
    <section className={homeStyle.sectionWrapper}>
      <DatePickerField
        label={label}
        selectedDate={selectedDate}
        onChange={onChange}
        required={required}
        maxDate={maxDate}
        minDate={minDate}
        error={error}
      />
    </section>
  );
};

export default DatePickerFieldWrapper;
