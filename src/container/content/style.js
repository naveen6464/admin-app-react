/** ************************ Import styled components ***************************** */
import styled from "styled-components";

/** ********************* Import constants for the media query ********************** */
import { devices } from "../../constants/devices";

// constant to convert pixels to width
const px2vw = (size, width = 1440) => `${(size / width) * 100}vw`;

/** ************************** Style Wrapper - Content ****************************** */
export const ContentStyled = styled.main`
  background: #f8f9fc;
  color: white;
  /* width: ${(props) =>
    props.sidebardata ? "calc(100% - 13rem)" : "calc(100% - 3.4rem)"}; */
  padding: 0px 22px 0px 22px;
  left: ${(props) =>
    props.sidebardata1
      ? "0"
      : "13rem" && props.sidebardata
        ? "13rem"
        : "3.3rem"};
  right: ${(props) => (props.sidebardata ? "0" : "0")};
  @media (max-width: 1120px) {
    //mediaquries for sidebar size
    left: ${(props) =>
    props.sidebardata1 ? "0" : props.sidebardata ? "3.5rem" : "13rem"};
    overflow: ${(props) => (props.clicked ? "visible" : "hidden")};
  }
`;

/** ************Grid and flex section containers,rows and columns**************** */
export const Container = styled.div`
  border: none;
  background: #f8f9fc;
  color: black;
  height: auto;
  overflow: visible;
  width: 100%;
  padding-left: 0px;
  padding-right: 0px;
  // padding-top: 6px;
  // margin: ${px2vw(50)};
  // max-width: 100%;

  @media (min-width: 1024px) {
    flex-wrap: nowrap;
  }
`;

/** ********Row for flex****************** */

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  @media only screen and (${devices.mobileS}) {
    display: flex;
    flex-direction: row;

    flex: ${(props) => props.size};
  }
`;

/** *************Column with breakpoints*********** */
export const Col = styled.div`
  display: flex;
  font-size: 24px;
  flex: ${(props) => props.size};
  background-color: ${(props) => props.bgColor};
  justify-content: center;
  align-items: center;
  @media only screen and (${devices.tablet}) {
    display: grid;

    flex: ${(props) => props.size};
  }
`;
