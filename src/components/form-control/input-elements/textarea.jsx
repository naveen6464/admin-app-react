import React from "react";
import "../form-control.css";

function TextArea(props) {
  const {
    onChange,
    onKeyPress,
    style,
    name,
    onBlur,
    className,
    value,
    type,
    placeholder,
    labelName,
    labelClass,
    disabled,
    inputClass
  } = props;
  return (
    <div className={`form-input text-class mt-3 ${inputClass}`}>
      <label className={`${labelClass} mb-1`}>{labelName}</label>
      <textarea
        name={name}
        type={type}
        className={className}
        onChange={onChange}
        onKeyPress={onKeyPress}
        value={value}
        placeholder={placeholder}
        style={style}
        onBlur={onBlur}
        disabled={disabled}
      />
    </div>
  );
}

export default TextArea;
