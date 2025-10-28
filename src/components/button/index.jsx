import React from "react";
import "./button.css";

function Button(props) {
  const {
    children,
    btn_style,
    btn_class,
    type,
    onClick,
    ref,
    disabled,
    onMouseEnter,
    onMouseLeave,
  } = props;
  return (
    <div>
      <button
        disabled={disabled}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        ref={ref}
        type={type}
        style={btn_style}
        className={`btn_style ${btn_class}`}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
