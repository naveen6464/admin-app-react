/** **************************** Import Packages ****************************** */
import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

/** **************************** Import Constants ****************************** */
import { DarkTheme } from "./constants/themes";
/** **************************** Import Pages ****************************** */
import Login from "./container/login";
import { getToken } from "./api/others";
import cookie from "react-cookies";
/** **************************** Import CSS ****************************** */
import "./App.css";
import { hostConfig } from "./config";

const App = () => {

  useEffect(() => {
    // const token = cookie.load("adminToken");
    const currentDate = new Date();
    const expiry = cookie.load("adminTokenExpire");
    const accessExpiryTime = new Date(expiry ? expiry : currentDate);

    // Add 1 hour to the current date
    const currentDatePlusOneHour = new Date(
      currentDate.getTime() + 1 * 60 * 60 * 1000
    );
    
    // Check if the token exists and if the expiry time is greater than currentDate + 1 hour
    if (Number(accessExpiryTime) < Number(currentDatePlusOneHour )) {
      getToken().then((result) => {
       
        if (result && result?.data && result?.data?.token) {
          // Save the new token and expiry time
          cookie.save("adminToken", result?.data?.token);
          cookie.save("adminTokenExpire", result?.data?.expirationTime);
        }
      });
    }
  }, []); // Empty dependency array to run only once

  const Layout = React.lazy(() => import("./container/Layout"));
  
  return (
    <ThemeProvider theme={DarkTheme}>
      <Router>
        <React.Suspense
          fallback={
            <div
              className="d-grid justify-content-center align-items-center"
              style={{ height: "100vh" }}
            >
              {/* <img src={Preloader} alt="" /> */}
            </div>
          }
        >
          <Switch>
            <Route exact path="/" render={() => <Login />} />
            <Route
              path="/"
              name="Home"
              render={(props) =>
                localStorage.getItem(hostConfig.USERNAME) ? (
                  <Layout {...props} />
                ) : (
                  (window.location.href = "/")
                )
              }
            />{" "}
            <Route path="*" exact={true} />{" "}
          </Switch>{" "}
        </React.Suspense>{" "}
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: "",
            duration: 3000,
            style: {
              background: "#fff",
              color: "#000",
            },

            // Default options for specific types
            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
            error: {
              style: {
                background: "#fbe8e9",
                color: "#000",
              },
              duration: 2000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
      </Router>
    </ThemeProvider>
  );
};
export default App;
