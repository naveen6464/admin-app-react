import React from "react";
// import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
// import "react-select-search/style.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
// import {StrictMode} from 'react';

import { createRoot } from "react-dom/client";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);


