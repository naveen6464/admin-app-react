/* ****************************** Import Packages ***************************** */
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
// import Max_Logo from "../../assets/tecosoft-black.svg";
import Min_Logo from "../../assets/logo.svg";
import "./sidebar.css";

const Sidebar = (props) => {
  const {
    Routes,
    sidebarState,
    handleEvent,
    arrow,
    handleArrow,
    scrollActive,
    profileDropdownClose,
  } = props;

  // const [childrenActive, setChildrenActive] = useState(false);
  // const [clickedName, setClickedName] = useState("");
  const [,setChildrenActive] = useState(false);
  const [,setClickedName] = useState("");
  const location = useLocation();

  return (
    <div
      role="none"
      className={`modern-sidebar ${sidebarState ? "minimized" : "expanded"}`}
      onClick={profileDropdownClose}
    >
      {/* Logo Section */}
      <div className="sidebar-header">
        <div className="logo-container">
          {sidebarState === false ? (
            <div className="d-flex align-items-center">
              <div className="logo-icon">
                <img src={Min_Logo} alt="logo" width="38" height="38"  />
              </div>
              <span className="brand-name ms-2">Tecosoft</span>
            </div>
          ) : (
            <div className="logo-icon-minimized">
              <img src={Min_Logo} alt="logo" width="38" height="38" />
            </div>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <ul
        role="none"
        className={`modern-nav-links ${
          scrollActive && sidebarState === false
            ? "scroll-active"
            : "scroll-inactive"
        }`}
        onMouseDown={(e) => handleEvent(e)}
      >
        {Routes.map((item, idx) => {
          return (
            <React.Fragment key={idx}>
              {!item?.subMenu ? (
                <li className="nav-item">
                  <NavLink
                    to={item?.route}
                    className={
                      location.pathname === item?.route
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={() => {
                      setClickedName(item?.name);
                      handleArrow("none");
                    }}
                  >
                    <div className="nav-icon">
                      {location.pathname === item?.route ? (
                        <img
                          src={item?.fillImage}
                          alt={item.name}
                          width="20"
                          height="20"
                        />
                      ) : (
                        <img
                          src={item?.image}
                          alt={item.name}
                          width="20"
                          height="20"
                        />
                      )}
                    </div>
                    {!sidebarState && (
                      <span className="nav-text">{item?.name}</span>
                    )}
                  </NavLink>

                  {/* Tooltip for minimized state */}
                  {sidebarState && (
                    <div className="nav-tooltip">{item?.name}</div>
                  )}
                </li>
              ) : (
                <li
                  className={`nav-item has-submenu ${
                    arrow?.[item.name] ? "expanded" : ""
                  }`}
                >
                  <div
                    role="none"
                    className={`nav-link ${
                      item?.subMenu?.some((e) => e.route === location.pathname)
                        ? "active"
                        : ""
                    }`}
                    onClick={() => handleArrow(item.name)}
                  >
                    <div className="nav-icon">
                      {item?.subMenu?.some(
                        (e) => e.route === location.pathname
                      ) ? (
                        <img
                          src={item.fillImage}
                          alt={item.name}
                          width="20"
                          height="20"
                        />
                      ) : (
                        <img
                          src={item.image}
                          alt={item.name}
                          width="20"
                          height="20"
                        />
                      )}
                    </div>
                    {!sidebarState && (
                      <>
                        <span className="nav-text">{item.name}</span>
                        <span className="nav-arrow">
                          {arrow[item.name]
                            ? item?.iconOpened
                            : item?.iconClosed}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Submenu */}
                  {arrow[item.name] && !sidebarState && (
                    <ul className="submenu-list">
                      {item?.subMenu?.map((subItem, subIdx) => (
                        <li
                          key={subIdx}
                          className="submenu-item"
                          onMouseEnter={() => setChildrenActive(true)}
                          onMouseLeave={() => setChildrenActive(false)}
                        >
                          <NavLink
                            to={subItem?.route}
                            className={
                              location.pathname === subItem?.route
                                ? "submenu-link active"
                                : "submenu-link"
                            }
                          >
                            <span className="submenu-text">{subItem.name}</span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tooltip for minimized state */}
                  {sidebarState && (
                    <div className="nav-tooltip">{item?.name}</div>
                  )}
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
