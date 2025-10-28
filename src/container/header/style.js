/** ********************Import required packages************** */
import styled from "styled-components";

export const Profile = styled.div`
  /* width: 8rem;
  height: ${(props) => (props.clicked ? "12rem" : "4rem")}; */
  /* margin-top: 0; */
  border-radius: 10px;
  display: grid;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  justify-items: center;
  color: black;
  position: relative;
  transition: width 0.35s ease-in-out;
  margin-right: 18px;

  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    cursor: pointer;

    // &:hover {
    //   border: 2px solid var(--grey);
    //   padding: 2px;
    // }
  }
`;

export const Details = styled.div`
  display: ${(props) => (props.clicked ? "grid" : "none")};
  justify-items: center;
  align-items: center;
  position: absolute;
  top: -17%;
  right: 0.8%;
  /* bottom: 14.6rem; */
  z-index: 2;
  background-color: white;
  border-radius: 5px;
  /* box-shadow: 1px 1px 2px 1px #3c4b64; */
  border-bottom: 1px solid #d8dbe0;
  filter: drop-shadow(2px 2px 6px black);
  margin-top: 4rem;
  min-width: 140px;
`;

export const Name = styled.div`
padding-top: 6px;
padding-bottom: 6px;
  display: grid;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #004e73;
  border-radius: 5px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  width:100%;
  h4 {
    display: inline-block;
  }

  a {
    font-size: 0.9rem;
    text-decoration: none;
    color: white !important;

    // &:hover {
    //   text-decoration: underline;
    // }
  }
`;
export const Logout = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  // width: 2rem;
  height: 2rem;
  background-color: transparent;
  margin-top: 10px;
  margin-bottom: 10px;
  img {
    width: 100%;
    height: auto;
    filter: invert(15%) sepia(70%) saturate(6573%) hue-rotate(2deg)
      brightness(100%) contrast(126%);
    transition: width 0.35s ease-in-out;
    // &:hover {
    //   border: none;
    //   padding: 0;
    //   opacity: 0.5;
    // }
  }
`;
