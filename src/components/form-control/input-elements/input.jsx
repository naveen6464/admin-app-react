import React from "react";
import "../form-control.css";

function Input(props) {
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
    icon,
    inputIconClass,
    iconValue,
    id,
    inputClass,
    min,
    input_style,
    marginTop
  } = props;
  return (
    <div style={input_style} className={`form-input ${marginTop ? marginTop : "mt-3"} ${inputClass}`}>
      <label className={`${labelClass} mb-1`}>{labelName}</label>
      <div className="icon-relative">
        <input
          id={id}
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
          min={min}
        />
        {icon === true ? (
          <div className={`icon-absolute ${inputIconClass}`}>{iconValue}</div>
        ) : null}
      </div>
    </div>
  );
}

export default Input;
