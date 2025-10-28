import Styled from "styled-components";
export const Select = Styled.select`
  padding: 0.5rem;
  margin: ${(props) => props.margin};
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "3rem")};
  border: 0.5px solid rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  color: gray;
  `;
export const Option = Styled.option``;
