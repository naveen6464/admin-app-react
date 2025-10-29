/** ***************************** Import Libraries ****************************** */
import React from "react";
// import {
//   MdOutlineKeyboardArrowDown,
//   MdOutlineKeyboardArrowUp,
// } from "react-icons/md";

/** ****************************** Import Images ********************************* */
// import DashboardIcon from "../assets/dashboard-icons/dashboard-icons.svg";
import CMS from "../assets/dashboard-icons/cms.svg";

/** ****************************** Import Filling Images ********************************* */

// import DashboardIconFill from "../assets/dashboard-icons/filling-icons/dashboard-fill.svg";
import CMSFill from "../assets/dashboard-icons/filling-icons/cms-fill.svg";

/** **************************** Import components ****************************** */
// const Dashboard = React.lazy(() => import("../pages/dashboard-page"));

const Blog = React.lazy(() => import("../pages/cms/blog"));
const WhitePaper = React.lazy(() => import("../pages/cms/white-paper"));

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
    image: CMS,
    fillImage: CMSFill,
    icon: (
      <i className="fa-sharp fa-regular fa-circle-dollar-to-slot  icons-dynamic"></i>
    ),
    id: 2,
    element: WhitePaper,
  },

  // Users
  // {
  //   name: "Generic",
  //   image: CMS,
  //   fillImage: CMSFill,
  //   icon: (
  //     <i className="fa-sharp fa-regular fa-circle-dollar-to-slot  icons-dynamic"></i>
  //   ),
  //   id: 3,
  //   iconClosed: (
  //     <MdOutlineKeyboardArrowDown size={30} className="icons-dynamic" />
  //   ),
  //   iconOpened: (
  //     <MdOutlineKeyboardArrowUp size={30} className="icons-dynamic" />
  //   ),
  //   subMenu: [
  //     {
  //       route: "/white-papers",
  //       name: "White-papers",
  //       element: WhitePaper,
  //     },
  //     {
  //       route: "/blogs",
  //       name: "Blogs",
  //       element: Blog,
  //     },
  //   ],
  // },
];

export default routes;
