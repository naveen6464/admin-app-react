/* ******************************** Import Packages ******************************* */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdMenu } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
// import { NavLink } from "react-router-dom";

/***************************** Import Actions and API's *****************************/
import { profileDropDown } from "../../redux/action/profile-dropdown.action";

/* ******************************** Import Styles ******************************** */
import { Details, Name, Logout, Profile } from "./style";
import "./header.css";
import { deleteLocalUser, getLocalUser } from "../../utils/auth";
const Header = (props) => {
  const dispatch = useDispatch();

  const { handleSidebarMinimize } = props;

  const [profileHover, setProfileHover] = useState(false);
  const [userData, setUserData] = useState({});
  
  const profileDropDownData = useSelector(
    (store) => store.profileDropdown.profileDropDown
  );

  useEffect(()=>{
   const loggedUser = getLocalUser();
   setUserData(loggedUser)
  }, [])

  const logout = async () => {
    deleteLocalUser();
    window.location.href = "/";
  };

  return (
    <div
      className="home-content container-fluid"
      onClick={
        profileHover
          ? null
          : () => dispatch(profileDropDown("PROFILE_DROPDOWN_CLOSE"))
      }
    >
      <div className="col-12">
        <div className="row">
          <div className="col-6 d-flex align-items-center text-start">
            <MdMenu
              className="menu-icon"
              onClick={() => handleSidebarMinimize()}
            />
            <span className="text-black breadCrumb-text">
              {/* {breadCrumb?.map((item, index) => (
                <NavLink
                  activeClassName="title-header-text styles_breadcrumb"
                  to={item?.path}
                  key={index}
                >
                  {item.title}
                </NavLink>
              ))} */}
            </span>
          </div>
          <div className="col-6 d-flex justify-content-end pt-1">
            <Details
              clicked={profileDropDownData}
              onClick={() => !profileHover}
            >
              <Name>
                <h4 className="text-center name-pop-up">
                  {userData?.firstName}
                </h4>
              </Name>
              <div className="d-flex align-items-center">
                <IoLogOutOutline size={"1.5em"} />
                <Logout onClick={() => logout()}>Logout</Logout>
              </div>
            </Details>
            <Profile
              clicked={profileDropDownData}
              onClick={() => setProfileHover(true)}
              onMouseOut={() => setProfileHover(false)}
            >
              <img
                role="none"
                // onClick={() => dispatch(profileDropDown("PROFILE_DROPDOWN"))}
                onClick={() =>
                  dispatch(profileDropDown("PROFILE_DROPDOWN"))
                }
                src={userData?.isProfileImage === true ? `https://dev-truekarma-images.s3.amazonaws.com/system-users/${userData?.id}.jpg` :  `https://dev-truekarma-images.s3.amazonaws.com/system-users/default.jpg`}
                alt="Profile"
              />
            </Profile>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
