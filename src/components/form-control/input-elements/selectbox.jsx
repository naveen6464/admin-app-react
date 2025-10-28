import React from "react";
import styled from "styled-components";

const SelectBoxStyled = styled.select`
outline: none !important;
  margin-top: 2px;
  margin-left:${(props) => props.marginLeft} ;
  border: 0.5px solid #c5d0d8;
  padding: ${(props) => props.padding};
  padding-left: ${(props) => props.paddingLeft};
  margin: ${(props) => props.margin};
  border-radius: 8px !important;
  background-color: ${(props) =>
    props?.disabledValue === true ? "rgba(0, 0, 0, 0.05);" : "#FFFFFF"};
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "38px")};
  &:focus {
    border: 1px solid #2285F9 !important;
  }
`;

function SelectBox({
  name,
  onChange,
  value,
  children,
  disabeld,
  paddingLeft,
  width,
  ...others
}) {
  return (
    <SelectBoxStyled
      name={name}
      className="dropdown-btn"
      value={value}
      onChange={onChange}
      disabled={disabeld}
      disabledValue={disabeld}
      paddingLeft={paddingLeft}
      width={width}
      {...others}
    >
      {children || <option>Options...</option>}
    </SelectBoxStyled>
  );
}
export default SelectBox;
