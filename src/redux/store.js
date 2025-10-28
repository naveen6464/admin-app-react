/** **************************** Import Libs ****************************** */
import { createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";
import thunk from "redux-thunk";
// import {config }from "../config"

import { composeWithDevTools } from "redux-devtools-extension";

/** **************************** Import Root Reducer ****************************** */
import rootReducer from "./root-reducer";

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
