const initialState = {
    profileDropDown: false,
  };
  
  export const profileDropDownReducer = (state = initialState, action) => {
    switch (action.type) {
    case "PROFILE_DROPDOWN":
      return {
        ...state,
        profileDropDown: !state.profileDropDown,
      };
    case "PROFILE_DROPDOWN_CLOSE":
      return {
        ...state,
        profileDropDown: false,
      };
    default:
      return state;
    }
  };