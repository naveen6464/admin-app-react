import { BREAD_CRUMP } from "../types/breadcrumb.types";

const initialState = {
  NavBarMinimizer: false,
  breadCrumb: [
    {
      title: "Dashboard",
      path: "/home/dashboard",
    },
  ],
};

export const BreadCrumbReducer = (state = initialState, action) => {
  switch (action.type) {
    case BREAD_CRUMP:
      return {
        ...state,
        breadCrumb: action.payload,
      };
    default:
      return state;
  }
};
