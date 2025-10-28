import { SIDE_BAR } from "../types/sidebar.types";
const initialState = {
  storeSideBarMinimizer: true,
};
export const sideBarReducer = (state = initialState, action) => {
  switch (action.type) {
  case SIDE_BAR:
    return {
      ...state,
      storeSideBarMinimizer: !state.storeSideBarMinimizer,
    };
  default:
    return state;
  }
};
