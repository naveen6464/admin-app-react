import { NAV_BAR } from "../types/header-nav.types";
const initialState = {
  NavBarMinimizer: false,
};
export const NavBarReducer = (state = initialState, action) => {
  switch (action.type) {
  case NAV_BAR:
    return {
      ...state,
      NavBarMinimizer: !state.NavBarMinimizer,
    };
  default:
    return state;
  }
};
