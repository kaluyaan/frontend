"use client";

import React from "react";
import styles from "../../../components/Home/home.module.css";

interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps {
  label?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
}

const CustomSelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  value,
  onChange,
  required = false,
  error,
}) => {
  const showError = (required && !value) || Boolean(error);

  return (
    <div >
      {label && <h3 className={styles.normalTitle}>{label}</h3>}
      <select
        className={`${styles.dateInput} ${styles.input}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">-- Select an option --</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {showError && (
        <p style={{ color: "red", fontSize: "0.9rem", marginTop: "4px" }}>
          {required && !value ? "This field is required" : error}
        </p>
      )}
    </div>
  );
};

export default CustomSelectField;
