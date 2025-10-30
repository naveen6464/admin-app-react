/** ***************************** Import Libraries ****************************** */
import React from "react";
// import {
//   MdOutlineKeyboardArrowDown,
//   MdOutlineKeyboardArrowUp,
// } from "react-icons/md";

/** ****************************** Import Images ********************************* */
// import DashboardIcon from "../assets/dashboard-icons/dashboard-icons.svg";
import CMS from "../assets/dashboard-icons/cms.svg";
import UsersIcon from "../assets/dashboard-icons/profile-2user.svg";

/** ****************************** Import Filling Images ********************************* */

// import DashboardIconFill from "../assets/dashboard-icons/filling-icons/dashboard-fill.svg";
import CMSFill from "../assets/dashboard-icons/filling-icons/cms-fill.svg";

/** **************************** Import components ****************************** */
// const Dashboard = React.lazy(() => import("../pages/dashboard-page"));

const Blog = React.lazy(() => import("../pages/cms/blog"));
const WhitePaper = React.lazy(() => import("../pages/cms/white-paper"));
const adminUser = React.lazy(() => import("../pages/admin"));

// ***************************** routes ******************************//
const routes = [
  // DashBoard
  // {
  //   name: "Dashboard",
  //   route: "/dashboard",
  //   image: DashboardIcon,
  //   fillImage: DashboardIconFill,
  //   icon: (
  //     <span className="material-symbols-outlined icons-dynamic">dashboard</span>
  //   ),
  //   element: Dashboard,
  //   id: 0,
  // },

  // CMS
  {
    name: "Blogs",
    route: "/blogs",
    image: CMS,
    fillImage: CMSFill,
    icon: (
      <i className="fa-sharp fa-regular fa-circle-dollar-to-slot  icons-dynamic"></i>
    ),
    id: 1,
    element: Blog,
  },

  // CMS
  {
    name: "White-papers",
    route: "/white-papers",
    image: CMSFill,
    fillImage: CMS,
    icon: (
      <i className="fa-sharp fa-regular fa-circle-dollar-to-slot  icons-dynamic"></i>
    ),
    id: 2,
    element: WhitePaper,
  },

  {
    name: "adminUsers",
    route: "/admin-users",
    image: UsersIcon,
    fillImage: UsersIcon, // You might want a different fill icon
    icon: <i className="fa-sharp fa-solid fa-users icons-dynamic"></i>,
    id: 3,
    element: adminUser,
  },
];

export default routes;
