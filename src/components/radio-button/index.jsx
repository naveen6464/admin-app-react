import React from "react";
import "./button.css";
const RadioButton = (props) => {
  const { label, value, isChecked, onChange,name,disabled,className } = props;
  return (
    <div className={` radioButton align-middle`}>
      <input
        type="radio"
        name={name}
        value={value}
        className={`radioBtn  ${className}`}
        checked={isChecked}
        onChange={onChange}
        disabled={disabled}
      />
      <label className="mx-2">{label}</label>
    </div>
  );
};
export default RadioButton;
