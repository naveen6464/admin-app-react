/* ******************************** Import Packages ***************************** */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

/* ******************************** Import Components **************************** */
import SideBar from "./side-bar";
import Header from "./header";
import Content from "./content";

/********************************Import Actions************************************/
import { profileDropDown } from "../redux/action/profile-dropdown.action";

/* ******************************** Import Constants **************************** */
import Routes from "../constants/routes";
 
/* ******************************** Import Styles ****************************** */
import { LayoutStyled } from "./side-bar/style";
// import { getRolesAndAccessById } from "../api";

const Layout = () => {
  const dispatch = useDispatch();

  const [sidebarMinimize, setSidebarMinimize] = useState(false);
  const [arrow, setArrow] = useState([]);
  const [scrollActive, setScrollActive] = useState("scroll-active");
  const [access, ] = useState();

  useEffect(() => {
    // const { role } = JSON.parse(localStorage.getItem("loggedUser"));
    // getRolesAndAccessById(role).then((res) => {
    //   if (res && res.status && res.result) {
    //     setAccess(res.result.access);
    //   }
    // });
  }, []);

  useEffect(() => {
    let arrowvalue = false;
    let name = {};
    Routes.map((item) => {
      return (name[item.name] = arrowvalue);
    });
    setArrow(name);
  }, []);

  const handleEvent = (event) => {
    if (event.type === "mousedown") {
      setScrollActive(true);
    } else if (event.type === "mouseup") {
      setScrollActive("");
    }
  };

  const handleArrow = (item) => {
    const data = { ...arrow };
    const newObj = {};
    Object.keys(data).forEach((k) => {
      newObj[k] = k === item ? !data[k] : false;
    });
    setArrow(newObj);
  };

  return (
    <LayoutStyled>
      <SideBar
        Routes={Routes}
        sidebarState={sidebarMinimize}
        handleEvent={handleEvent}
        arrow={arrow}
        handleArrow={handleArrow}
        scrollActive={scrollActive}
        profileDropdownClose={() =>
          dispatch(profileDropDown("PROFILE_DROPDOWN_CLOSE"))
        }
      />
      <div className="Home-section">
        <Header
          sidebarState={sidebarMinimize}
          handleSidebarMinimize={() => setSidebarMinimize(!sidebarMinimize)}
        />
        <Content
          sidebarState={sidebarMinimize}
          onClick={() => dispatch(profileDropDown("PROFILE_DROPDOWN_CLOSE"))}
          arrow={arrow}
          access={access}
        />
      </div>
    </LayoutStyled>
  );
};

export default Layout;
