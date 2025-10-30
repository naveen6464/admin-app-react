/* ******************************** Import Packages ******************************* */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdMenu } from "react-icons/md";
import { useHistory } from "react-router-dom";

/***************************** Import Actions and API's *****************************/
import { profileDropDown } from "../../redux/action/profile-dropdown.action";

/* ******************************** Import Styles ******************************** */
import "./header.css";
import { deleteLocalUser, getLocalUser } from "../../utils/auth";

const Header = ({ handleSidebarMinimize }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [profileHover, setProfileHover] = useState(false);
  const [userData, setUserData] = useState({});
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const profileDropDownData = useSelector(
    (store) => store.profileDropdown.profileDropDown
  );

  useEffect(() => {
    const loggedUser = getLocalUser();
    setUserData(loggedUser || {});
  }, []);

  const logout = () => {
    deleteLocalUser();
    window.location.href = "/";
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <header
      className="modern-header"
      onClick={() =>
        !profileHover && dispatch(profileDropDown("PROFILE_DROPDOWN_CLOSE"))
      }
    >
      <div className="header-content">
        {/* Left Section - Menu Icon */}
        <div className="header-left">
          <MdMenu className="menu-icon" onClick={handleSidebarMinimize} />
        </div>

        {/* Right Section - Profile */}
        <div className="header-right">
          <div
            className="profile-section"
            onMouseEnter={() => setProfileHover(true)}
            onMouseLeave={() => setProfileHover(false)}
          >
            <div className="profile-trigger" onClick={toggleProfileMenu}>
              <img
                src={
                  userData?.isProfileImage
                    ? `https://dev-truekarma-images.s3.amazonaws.com/system-users/${userData?.id}.jpg`
                    : `https://dev-truekarma-images.s3.amazonaws.com/system-users/default.jpg`
                }
                alt="Profile"
                className="profile-avatar"
              />
              <div className="profile-info">
                <span className="profile-name">
                  {userData?.firstName || "Admin User"}
                </span>
                <span className="profile-role">Super Admin</span>
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className={`dropdown-arrow ${showProfileMenu ? "open" : ""}`}
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {(showProfileMenu || profileDropDownData) && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <img
                    src={
                      userData?.isProfileImage
                        ? `https://dev-truekarma-images.s3.amazonaws.com/system-users/${userData?.id}.jpg`
                        : `https://dev-truekarma-images.s3.amazonaws.com/system-users/default.jpg`
                    }
                    alt="Profile"
                    className="dropdown-avatar"
                  />
                  <div className="dropdown-user-info">
                    <h4 className="dropdown-name">
                      {userData?.firstName || "Admin"}
                    </h4>
                    <p className="dropdown-email">
                      {userData?.email || "admin@example.com"}
                    </p>
                  </div>
                </div>

                <button
                  className="dropdown-item"
                  onClick={() => history.push("/profile-details")}
                >
                  <i className="ri-user-3-line me-2"></i> Profile
                </button>
                <button className="dropdown-item">
                  <i className="ri-settings-3-line me-2"></i> Settings
                </button>

                <div className="dropdown-divider"></div>

                <button className="dropdown-item logout-item" onClick={logout}>
                  <i className="ri-logout-box-r-line me-2"></i> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
