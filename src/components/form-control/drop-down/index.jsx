import React from "react";
import { Select } from "./style";
const Dropdown = (props) => {
  const {
    margin,
    type,
    Options,
    valueRequired,
    valueShow,
    onChange,
    placeholder,
    name,
    onBlur,
    value,
  } = props;

  const options =
    Options?.length > 0 ? (
      Options?.map((item) => {
        return (
          <option key="item" value={item?.[valueRequired]}>
            {item?.[valueShow]}
          </option>
        );
      })
    ) : (
      <option value={""}>Select</option>
    );

  return (
    <div>
      <Select
        margin={margin}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        name={name}
        onBlur={onBlur}
        value={value}
      >
        <option value={""}>Select</option>
        {options}
      </Select>
    </div>
  );
};

export default Dropdown;
