/** ***************************** Import Libraries ****************************** */
import React from "react";

/** **************************** Import components ****************************** */
const BasicDetails = React.lazy(() => import("../pages/profile"));

// ***************************** routes ******************************//
const ProfileMenus = [
  {
    name: "Profile Details",
    route: "/profile-details",
    element: BasicDetails,
    id: 0,
  },
];

export default ProfileMenus;
