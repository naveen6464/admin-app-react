import React from "react";
import Select from "react-select";
import "../form-control.css";

const CustomSelectComponent = (props) => {
  const {
    label,
    name,
    options,
    disabled,
    fullValue,
    form,
    optionValue,
    setCategoryId,
    labelClass,
    heightProps,
    error,
    onChange,
    selectWidth,
    labelSpace
  } = props;

  const handleChange = (selectedOption) => {
    const convertedOption = {
      attribute_value_id: selectedOption.value,
      label: selectedOption.label,
      attribute_type_id: selectedOption.attribute_type_id,
    };
    if (fullValue) {
      const currentOptions = Array.isArray(form.values[name])
        ? form.values[name]
        : [];

      const existingIndex = currentOptions.findIndex(
        (option) =>
          option.attribute_type_id === convertedOption.attribute_type_id
      );

      if (existingIndex !== -1) {
        currentOptions[existingIndex] = convertedOption;
      } else {
        currentOptions.push(convertedOption);
      }

      form.setFieldValue(name, currentOptions);
    } else {
      if (setCategoryId) {
        setCategoryId(selectedOption?.value);
      }

      form.setFieldValue(name, selectedOption?.value);
    }
  };

  return (
    <div className="custom-drop">
      <label
        className={`mb-2 ${labelSpace === false ?  "" : "mt-2"} custom-select-label ${labelClass}`}
        htmlFor={name}
      >
        {label}
      </label>
      <Select
        id={name}
        name={name}
        options={options}
        isDisabled={disabled}
        styles={{
          control: (provided, state) => ({
            ...provided,
            width: selectWidth ? selectWidth : "100%",
            minHeight: "37px",
            borderRadius: "8px",
            height: heightProps ? heightProps : "40px",
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: "18px",
            color: "#333",
            backgroundColor: state?.isDisabled ? "#fafafa" : "white",
            border: state.isFocused
              ? "1px solid #2285F9"
              : error === true
              ? "1px solid #e83147"
              : "1px solid #cccccc",
            "&:hover": {
              border: "1px solid #2285F9",
              cursor: state?.isDisabled ? "not-allowed" : "pointer",
            },
            "&:focus": {
              border: "1px solid #2285F9",
            },
            cursor: state?.isDisabled ? "not-allowed" : "pointer",
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state?.isSelected
              ? "#2285F9"
              : state?.isFocused
              ? "#2285F9"
              : "white",
            borderRadius: "8px",
            width: "95%",
            margin: "2px auto",
            color: "#1C0F03 !important",
            cursor: "pointer !important",
            zIndex: 999,
          }),
          indicatorSeparator: (provided) => ({
            ...provided,
            width: "0px",
          }),
          dropdownIndicator: (provided) => ({
            ...provided,
            width: "30px",
            height: "10px",
            color: "#2285F9",
            marginLeft: "-44px",
            marginTop: "-20px",
          }),
        }}
        onChange={(e) => {
          handleChange(e);
          if (onChange) onChange(e);
        }}
        onInputChange={(inputValue) => {
          console.log("User is typing:", inputValue); // This is similar to e.target.value in a native input
          if (props.onInputChange) {
            props.onInputChange(inputValue);
          }
        }}
        className="custom-dropselect"
        value={
          fullValue
            ? options?.find(
                (option) => option?.value === optionValue?.attribute_value_id
              )
            : options?.find((option) => option?.value === form?.values[name])
        }
        components={{
          Option: ({ data, innerProps, isFocused, isSelected }) => (
            <div
              {...innerProps}
              className={`custom-option ${isFocused ? "focused" : ""} 
                  ${isSelected ? "selected" : ""}
                }`}
              style={{
                backgroundColor: isSelected
                  ? "#F8F8F8"
                  : isFocused
                  ? "#e9f3fe"
                  : "white",
                cursor: isSelected ? "pointer" : "pointer",
                color: isSelected ? "#1C0F03" : "#1C0F03",
                paddingLeft: "10px",
                marginRight: "5px",
                borderRadius: "2px",
                marginTop: "5px",
                zIndex:1000
              }}
            >
              {data.label}
            </div>
          ),
        }}
      />
    </div>
  );
};

export default CustomSelectComponent;
