"use client";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./date.css";

function DateField(props) {
  const {
    value,
    onBlur,
    onChange,
    maxDate,
    name,
    id,
    minDate,
    placeholderText,
    dateFormat,
    dateClassName,
    disabled,
    styles,
    eventDate
  } = props;
  return (
    <div>
      <DatePicker
        selected={value}
        placeholderText={placeholderText}
        name={name}
        style={styles}
        id={id}
        onBlur={onBlur}
        onChange={onChange}
        scrollableYearDropdown
        maxDate={maxDate}
        minDate={minDate}
        disabled={disabled}
        showYearDropdown
        dateFormat={dateFormat ? dateFormat : "MM/dd/yyyy"}
        className={`${dateClassName} ${!eventDate ? "search_input" : null} ${"date_input"} `}
        value={value}
      />
    </div>
  );
}

export default DateField;
