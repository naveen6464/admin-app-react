import React from "react";
import { LuSearch } from "react-icons/lu";
import "./input.css";

const Input = (props) => {
  const {
    placeholder,
    onChange,
    name,
    dynamic_class,
    value,
    input_icon_style,
    disabled,
    style,
    hideClass,
  } = props;
  return (
    <>
      <div className={hideClass ? "position-relative" : "input-box"}>
        <input
          placeholder={placeholder}
          onChange={onChange}
          name={name}
          value={value}
          className={`input-class ${dynamic_class}`}
          disabled={disabled}
          style={style}
        />
        <div style={input_icon_style} className="input-icon ">
          <LuSearch color="#545454" />
        </div>
      </div>
    </>
  );
};

export default Input;
