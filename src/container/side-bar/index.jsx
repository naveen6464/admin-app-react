/* ****************************** Import Packages ***************************** */
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Max_Logo from "../../assets/truekarma-full-logo.svg";
import Min_Logo from "../../assets/truekarma-logo.svg";
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

  const [childrenActive, setChildrenActive] = useState(false);
  const [clickedName, setClickedName] = useState("");
  const location = useLocation();
 

  return (
    <div
      role="none"
      className={`sidebar ${sidebarState ? "close" : "open"} `}
      onClick={profileDropdownClose}
    >
      <div className="sidebar-logo" style={{ paddingTop: "3px" }}>
        {sidebarState === false ? (
          <div className="d-flex justify-content-center">
            <img
              src={Max_Logo}
              alt="sidebar-logo"
              // className="sidebar-logo"
              width="85%"
              height="45"
            />
          </div>
        ) : (
          <div>
            <img
              src={Min_Logo}
              alt="sidebar-logo"
              // className="sidebar-logo"
              width="33"
              height="55"
            />
          </div>
        )}
      </div>
      <ul
        role="none"
        className={`nav-links ${sidebarState ? "" : ""} ${
          scrollActive && sidebarState === false
            ? "scroll-active"
            : "scroll-inactive"
        }`}
        onMouseDown={(e) => handleEvent(e)}
      >
        {Routes.map((item) => {
          return (
            <>
              {!item?.subMenu ? (
                <li className="width-inherit">
                  <NavLink
                    to={item?.route}
                    className={
                      location.pathname === item?.route
                        ? "menu-item active-route"
                        : "menu-item"
                    }
                    onClick={() => {
                      setClickedName(item?.name);
                      handleArrow("none");
                    }}
                  >
                    {location.pathname === item?.route ? (
                      <img
                        src={item?.fillImage}
                        alt={item.name}
                        className="menu-image"
                      />
                    ) : (
                      <img
                        src={item?.image}
                        alt={item.name}
                        className="menu-image"
                      />
                    )}

                    <span className="link-name">
                      {item.name === "Banner" ? "Banner Ads" : item?.name}
                      &nbsp;{" "}
                      <span>
                        {item.name === "Contacts" ? (
                          data?.[0]?.totalUnViewedEnquiresCount &&
                          data?.[0]?.totalUnViewedEnquiresCount > 0 ? (
                            <div className="num-rounded">
                              {data?.[0]?.totalUnViewedEnquiresCount}
                            </div>
                          ) : null
                        ) : null}
                      </span>
                    </span>
                  </NavLink>
                  <ul
                    className={
                      sidebarState
                        ? "submenu minimized blank p-0"
                        : "submenu blank p-0"
                    }
                  >
                    <li
                      className={
                        location.pathname === item?.route ? "active-color" : ""
                      }
                    >
                      <NavLink
                        to={item?.route}
                        className="link-name menu-item"
                        onClick={() => setClickedName(item?.name)}
                      >
                        {item.name === "Banner" ? "Banner Ads" : item?.name}
                      </NavLink>
                    </li>
                  </ul>
                </li>
              ) : (
                <li
                  className={`${
                    arrow?.[item.name]
                      ? ` ${
                          childrenActive
                            ? "showMenu parentSubmenu"
                            : "showMenu "
                        } `
                      : `${
                          childrenActive ? "parentSubmenu " : "width-inherit"
                        } `
                  }`}
                >
                  <div
                    role="none"
                    className={`iocn-links ${
                      item?.subMenu?.some((e) => e.route === location.pathname)
                        ? "active-route"
                        : ""
                    }`}
                    onClick={() => handleArrow(item.name)}
                  >
                    <NavLink
                      to="#"
                      className={
                        location.pathname === item?.route
                          ? "menu-item active-route"
                          : "menu-item"
                      }
                      onClick={() => setClickedName(item?.name)}
                    >
                      {/*  */}
                      {item?.subMenu?.some(
                        (e) => e.route === location.pathname
                      ) ? (
                        <img
                          src={item.fillImage}
                          alt={item.name}
                          className={
                            location.pathname === item?.route
                              ? "menu-image"
                              : ""
                          }
                        />
                      ) : (
                        <img
                          src={item.image}
                          alt={item.name}
                          className={
                            location.pathname === item?.route
                              ? "menu-image"
                              : ""
                          }
                        />
                      )}
                      <span className="link-name">
                        {item.name}
                        {item.name === "Approvals" ? (
                          totalUnViewApprovalsCounter &&
                          totalUnViewApprovalsCounter > 0 ? (
                            <div className="num-rounded">
                              {totalUnViewApprovalsCounter}
                            </div>
                          ) : null
                        ) : null}
                      </span>
                      {!sidebarState
                        ? item.subMenu &&
                          clickedName === item?.name &&
                          arrow[clickedName]
                          ? item?.iconOpened
                          : item?.iconClosed
                        : null}
                    </NavLink>
                  </div>
                  <ul
                    className={
                      sidebarState ? "submenu minimized p-0" : "submenu p-0"
                    }
                  >
                    <li
                      className={`hover-class ${
                        item?.subMenu?.some(
                          (e) => e.route === location.pathname
                        )
                          ? "active-color"
                          : ""
                      }`}
                    >
                      <NavLink
                        to="#"
                        className="link-name menu-item"
                        onClick={() => setClickedName(item?.name)}
                      >
                        {item.name}
                        <span></span>
                      </NavLink>
                    </li>
                    {item?.subMenu?.map((item, index) => (
                      <li
                        key={index}
                        role="none"
                        className="d-flex justify-content-center sub-menu-height"
                        onMouseEnter={() => setChildrenActive(true)}
                        onMouseLeave={() => setChildrenActive(false)}
                      >
                        <NavLink
                          to={item?.route}
                          className={
                            location.pathname === item?.route
                              ? "menu-item "
                              : "menu-item"
                          }
                        >
                          <span
                            className={`${
                              sidebarState
                                ? "link-name-submenu minimized"
                                : "link-name-submenu "
                            } ${
                              location.pathname === item?.route
                                ? "active-route sub-menu-active"
                                : ""
                            }`}
                          >
                            {item.name}

                            {item.name === "FR withdraw" ? (
                              data?.[0]?.totalUnViewFundraiserWithdraw &&
                              data?.[0]?.totalUnViewFundraiserWithdraw > 0 ? (
                                <div className="num-rounded">
                                  {data?.[0]?.totalUnViewFundraiserWithdraw}
                                </div>
                              ) : null
                            ) : item.name === "Events withdraw" ? (
                              data?.[0]?.totalUnViewedEventWithdraw &&
                              data?.[0]?.totalUnViewedEventWithdraw > 0 ? (
                                <div className="num-rounded">
                                  {data?.[0]?.totalUnViewedEventWithdraw}
                                </div>
                              ) : null
                            ) : item.name === "Non Cash" ? (
                              data?.[0]?.totalUnViewedNonCashCount &&
                              data?.[0]?.totalUnViewedNonCashCount > 0 ? (
                                <div className="num-rounded">
                                  {data?.[0]?.totalUnViewedNonCashCount}
                                </div>
                              ) : null
                            ) : item.name === "Charity" ? (
                              data?.[0]?.totalUnViewCharity &&
                              data?.[0]?.totalUnViewCharity > 0 ? (
                                <div className="num-rounded">
                                  {data?.[0]?.totalUnViewCharity}
                                </div>
                              ) : null
                            ) : item.name === "Partners" ? (
                              data?.[0]?.partnerRequestUnViewCount &&
                              data?.[0]?.partnerRequestUnViewCount > 0 ? (
                                <div className="num-rounded">
                                  {data?.[0]?.partnerRequestUnViewCount}
                                </div>
                              ) : null
                            ) : item.name === "Partners withdraw" ? (
                              data?.[0]?.partnerWithdrawRequestUnViewedCount &&
                              data?.[0]?.partnerWithdrawRequestUnViewedCount >
                                0 ? (
                                <div className="num-rounded">
                                  {
                                    data?.[0]
                                      ?.partnerWithdrawRequestUnViewedCount
                                  }
                                </div>
                              ) : null
                            ) : null}
                          </span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              )}
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
