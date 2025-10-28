/** **************************** Import Libs ****************************** */
import { combineReducers } from "redux";
/** **************************** Import Reducers ****************************** */
import { sideBarReducer } from "./reducers/sidebar.reducer";
import { NavBarReducer } from "./reducers/header-nav.reducer";
import { profileDropDownReducer } from "./reducers/profile-dropdown.reducer";
import { BreadCrumbReducer } from "./reducers/breadcrumb.reducer";


const rootReducer = combineReducers({
  SideBar: sideBarReducer,
  NavbarReduce: NavBarReducer,
  profileDropdown: profileDropDownReducer,
  breadCrumb: BreadCrumbReducer,
 
});

export default rootReducer;
